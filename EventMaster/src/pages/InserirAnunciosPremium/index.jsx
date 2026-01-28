import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Image,
  Tag,
  PlusCircle,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Calendar,
  Info,
  Upload,
} from "lucide-react";

import {
  storage,
  db
} from "../../firebase/firebase";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

import "./style.css";

const PremiumProviderDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("carousel");

  // Estado dos anúncios do carrossel
  const [carouselAds, setCarouselAds] = useState([]);
  // Estado das promoções
  const [promotions, setPromotions] = useState([]);

  // Novo anúncio
  const [newAd, setNewAd] = useState({
    imageUrl: "",
    link: "",
    title: "",
    description: "",
  });
  // Anúncio em edição
  const [editingAd, setEditingAd] = useState(null);

  // Nova promoção
  const [newPromotion, setNewPromotion] = useState({
    title: "",
    description: "",
    discount: "",
    expiresAt: "",
    imageUrl: "",
  });
  // Promoção em edição
  const [editingPromotion, setEditingPromotion] = useState(null);

  // Arquivos selecionados para upload
  const [imageFile, setImageFile] = useState(null);
  const [editImageFile, setEditImageFile] = useState(null);
  const [promoImageFile, setPromoImageFile] = useState(null);
  const [editPromoImageFile, setEditPromoImageFile] = useState(null);

  // -------- Carregar dados Firestore ao iniciar --------
  useEffect(() => {
    async function fetchAds() {
      try {
        const adsCol = collection(db, "carouselAds");
        const adsSnapshot = await getDocs(adsCol);
        const adsList = adsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCarouselAds(adsList);
      } catch (error) {
        alert("Erro ao carregar anúncios: " + error.message);
      }
    }

    async function fetchPromotions() {
      try {
        const promoCol = collection(db, "promotions");
        const promoSnapshot = await getDocs(promoCol);
        const promoList = promoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPromotions(promoList);
      } catch (error) {
        alert("Erro ao carregar promoções: " + error.message);
      }
    }

    fetchAds();
    fetchPromotions();
  }, []);

  // -------- Função para upload de imagem --------
  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }
      const storageRef = ref(storage, `adsImages/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        () => {}, 
        (error) => reject(error), 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve);
        }
      );
    });
  };

  // -------- Função para deletar imagem do Storage --------
  const deleteImageFromStorage = async (imageUrl) => {
    if (!imageUrl) return;
    try {
      // Extrai o caminho do arquivo dentro do storage a partir da URL
      // A URL do Firebase Storage normalmente contém um token e parâmetros, precisamos pegar só o caminho após "o/"
      const baseUrl = "https://firebasestorage.googleapis.com/v0/b/serraservicosauto.appspot.com/o/";
      if (!imageUrl.startsWith(baseUrl)) return;

      // Exemplo URL: https://firebasestorage.googleapis.com/v0/b/serraservicosauto.appspot.com/o/adsImages%2F12345_file.jpg?alt=media&token=...
      // Precisamos extrair a parte depois de "o/", que é o caminho codificado
      const start = imageUrl.indexOf("/o/") + 3;
      const end = imageUrl.indexOf("?");
      let fullPathEncoded = imageUrl.substring(start, end);
      // Decode URL encoded path
      const fullPath = decodeURIComponent(fullPathEncoded);

      const imageRef = ref(storage, fullPath);
      await deleteObject(imageRef);
    } catch (error) {
      console.warn("Erro ao apagar imagem do Storage:", error.message);
    }
  };

  // -------- Manipulação dos anúncios --------

  const handleAddAd = async () => {
    if (!newAd.title) {
      alert("Título é obrigatório");
      return;
    }
    try {
      const imageUrl = await uploadImage(imageFile);
      const adData = { ...newAd, imageUrl: imageUrl || "" };

      const docRef = await addDoc(collection(db, "carouselAds"), adData);
      setCarouselAds(prev => [...prev, { id: docRef.id, ...adData }]);
      setNewAd({ imageUrl: "", link: "", title: "", description: "" });
      setImageFile(null);
      alert("Anúncio adicionado com sucesso!");
    } catch (error) {
      alert("Erro ao adicionar anúncio: " + error.message);
    }
  };

  const handleUpdateAd = async () => {
    if (!editingAd.title) {
      alert("Título é obrigatório");
      return;
    }
    try {
      let imageUrl = editingAd.imageUrl;

      if (editImageFile) {
        // Se trocar a imagem, apagar a anterior (se existir)
        await deleteImageFromStorage(editingAd.imageUrl);

        imageUrl = await uploadImage(editImageFile);
      }

      const adRef = doc(db, "carouselAds", editingAd.id);
      await updateDoc(adRef, { ...editingAd, imageUrl });

      setCarouselAds(prev => prev.map(ad => ad.id === editingAd.id ? { ...editingAd, imageUrl } : ad));
      setEditingAd(null);
      setEditImageFile(null);
      alert("Anúncio atualizado com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar anúncio: " + error.message);
    }
  };

  const handleDeleteAd = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este anúncio?")) return;
    try {
      const ad = carouselAds.find(a => a.id === id);
      if (ad && ad.imageUrl) {
        await deleteImageFromStorage(ad.imageUrl);
      }
      await deleteDoc(doc(db, "carouselAds", id));
      setCarouselAds(prev => prev.filter(ad => ad.id !== id));
      alert("Anúncio excluído com sucesso!");
    } catch (error) {
      alert("Erro ao excluir anúncio: " + error.message);
    }
  };

  // -------- Manipulação das promoções --------

  const handleAddPromotion = async () => {
    if (!newPromotion.title || !newPromotion.description || !newPromotion.discount || !newPromotion.expiresAt) {
      alert("Todos os campos são obrigatórios para a promoção.");
      return;
    }
    try {
      const imageUrl = await uploadImage(promoImageFile);
      const promoData = { ...newPromotion, imageUrl: imageUrl || "" };

      const docRef = await addDoc(collection(db, "promotions"), promoData);
      setPromotions(prev => [...prev, { id: docRef.id, ...promoData }]);
      setNewPromotion({
        title: "",
        description: "",
        discount: "",
        expiresAt: "",
        imageUrl: "",
      });
      setPromoImageFile(null);
      alert("Promoção adicionada com sucesso!");
    } catch (error) {
      alert("Erro ao adicionar promoção: " + error.message);
    }
  };

  const handleUpdatePromotion = async () => {
    if (!editingPromotion.title || !editingPromotion.description || !editingPromotion.discount || !editingPromotion.expiresAt) {
      alert("Todos os campos são obrigatórios para a promoção.");
      return;
    }
    try {
      let imageUrl = editingPromotion.imageUrl;

      if (editPromoImageFile) {
        await deleteImageFromStorage(editingPromotion.imageUrl);
        imageUrl = await uploadImage(editPromoImageFile);
      }

      const promoRef = doc(db, "promotions", editingPromotion.id);
      await updateDoc(promoRef, { ...editingPromotion, imageUrl });

      setPromotions(prev => prev.map(promo => promo.id === editingPromotion.id ? { ...editingPromotion, imageUrl } : promo));
      setEditingPromotion(null);
      setEditPromoImageFile(null);
      alert("Promoção atualizada com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar promoção: " + error.message);
    }
  };

  const handleDeletePromotion = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta promoção?")) return;
    try {
      const promo = promotions.find(p => p.id === id);
      if (promo && promo.imageUrl) {
        await deleteImageFromStorage(promo.imageUrl);
      }
      await deleteDoc(doc(db, "promotions", id));
      setPromotions(prev => prev.filter(promo => promo.id !== id));
      alert("Promoção excluída com sucesso!");
    } catch (error) {
      alert("Erro ao excluir promoção: " + error.message);
    }
  };

  // -------- Upload de imagem para anúncio e promoção --------

  const handleImageUpload = (event, isEditing = false) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecione apenas arquivos de imagem.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("O arquivo deve ter no máximo 5MB.");
        return;
      }

      if (activeTab === "carousel") {
        if (isEditing) {
          setEditImageFile(file);
          setEditingAd({ ...editingAd, imageUrl: URL.createObjectURL(file) });
        } else {
          setImageFile(file);
          setNewAd({ ...newAd, imageUrl: URL.createObjectURL(file) });
        }
      } else if (activeTab === "promotions") {
        if (isEditing) {
          setEditPromoImageFile(file);
          setEditingPromotion({ ...editingPromotion, imageUrl: URL.createObjectURL(file) });
        } else {
          setPromoImageFile(file);
          setNewPromotion({ ...newPromotion, imageUrl: URL.createObjectURL(file) });
        }
      }
    }
  };

  // -------- Limpar preview de imagem --------

  const clearImagePreview = (isEditing = false) => {
    if (activeTab === "carousel") {
      if (isEditing) {
        setEditingAd({ ...editingAd, imageUrl: "" });
        setEditImageFile(null);
      } else {
        setNewAd({ ...newAd, imageUrl: "" });
        setImageFile(null);
      }
    } else if (activeTab === "promotions") {
      if (isEditing) {
        setEditingPromotion({ ...editingPromotion, imageUrl: "" });
        setEditPromoImageFile(null);
      } else {
        setNewPromotion({ ...newPromotion, imageUrl: "" });
        setPromoImageFile(null);
      }
    }
  };

  // Cancelar edição anúncio/promoção
  const handleCancelEditAd = () => {
    setEditingAd(null);
    setEditImageFile(null);
  };

  const handleCancelEditPromotion = () => {
    setEditingPromotion(null);
    setEditPromoImageFile(null);
  };

  return (
    <div className="premium-dashboard-page">
      <div className="header">
        <div className="container">
          <button onClick={() => navigate(-1)} className="back-button">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="header-content"
          >
            <h1>Gerenciamento Premium</h1>
            <p>Gerencie seus anúncios no carrossel e promoções em destaque na página inicial.</p>
          </motion.div>
        </div>
      </div>

      <div className="container content-section">
        <div className="dashboard-tabs">
          <button
            onClick={() => setActiveTab("carousel")}
            className={`tab-button ${activeTab === "carousel" ? "active" : ""}`}
          >
            <Image className="w-5 h-5" />
            Anúncios do Carrossel
          </button>
          <button
            onClick={() => setActiveTab("promotions")}
            className={`tab-button ${activeTab === "promotions" ? "active" : ""}`}
          >
            <Tag className="w-5 h-5" />
            Promoções em Destaque
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "carousel" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="carousel-ads-section"
            >
              <h2>Anúncios do Carrossel</h2>
              <p>Adicione e gerencie os anúncios que aparecerão no carrossel da página Home.</p>

              <div className="form-section">
                <h3>{editingAd ? "Editar Anúncio" : "Adicionar Novo Anúncio"}</h3>

                <div className="input-group">
                  <label>Imagem do Anúncio:</label>
                  <div className="image-upload-section">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, !!editingAd)}
                      className="file-input"
                      id={editingAd ? "edit-image-upload" : "new-image-upload"}
                    />
                    <label
                      htmlFor={editingAd ? "edit-image-upload" : "new-image-upload"}
                      className="file-upload-label"
                    >
                      <Upload className="w-5 h-5" />
                      Selecionar Imagem
                    </label>
                    <p className="file-upload-hint">
                      Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB
                    </p>
                  </div>

                  {(editingAd ? editingAd.imageUrl : newAd.imageUrl) && (
                    <div className="image-preview-section">
                      <h4>Pré-visualização:</h4>
                      <div className="image-preview-container">
                        <img
                          src={editingAd ? editingAd.imageUrl : newAd.imageUrl}
                          alt="Preview"
                          className="image-preview"
                        />
                        <button
                          type="button"
                          onClick={() => clearImagePreview(!!editingAd)}
                          className="remove-image-btn"
                        >
                          <XCircle className="w-4 h-4" />
                          Remover
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="input-group">
                  <label>Link (opcional):</label>
                  <input
                    type="text"
                    value={editingAd ? editingAd.link : newAd.link}
                    onChange={(e) =>
                      editingAd
                        ? setEditingAd({ ...editingAd, link: e.target.value })
                        : setNewAd({ ...newAd, link: e.target.value })
                    }
                    placeholder="Ex: https://seusite.com/promocao"
                  />
                </div>

                <div className="input-group">
                  <label>Título:</label>
                  <input
                    type="text"
                    value={editingAd ? editingAd.title : newAd.title}
                    onChange={(e) =>
                      editingAd
                        ? setEditingAd({ ...editingAd, title: e.target.value })
                        : setNewAd({ ...newAd, title: e.target.value })
                    }
                    placeholder="Ex: Super Promoção de Verão"
                  />
                </div>

                <div className="input-group">
                  <label>Descrição (opcional):</label>
                  <textarea
                    value={editingAd ? editingAd.description : newAd.description}
                    onChange={(e) =>
                      editingAd
                        ? setEditingAd({ ...editingAd, description: e.target.value })
                        : setNewAd({ ...newAd, description: e.target.value })
                    }
                    placeholder="Uma breve descrição do seu anúncio."
                  />
                </div>

                <div className="form-actions">
                  {editingAd ? (
                    <>
                      <button onClick={handleUpdateAd} className="btn-primary">
                        <CheckCircle /> Atualizar
                      </button>
                      <button onClick={handleCancelEditAd} className="btn-secondary">
                        <XCircle /> Cancelar
                      </button>
                    </>
                  ) : (
                    <button onClick={handleAddAd} className="btn-primary">
                      <PlusCircle /> Adicionar Anúncio
                    </button>
                  )}
                </div>
              </div>

              <div className="list-section">
                <h3>Anúncios Atuais</h3>
                {carouselAds.length === 0 ? (
                  <div className="empty-state">
                    <Info className="w-8 h-8" />
                    <p>Nenhum anúncio no carrossel adicionado ainda.</p>
                  </div>
                ) : (
                  <div className="item-list">
                    {carouselAds.map((ad) => (
                      <div key={ad.id} className="list-item">
                        <img src={ad.imageUrl} alt={ad.title} className="item-image" />
                        <div className="item-details">
                          <h4>{ad.title}</h4>
                          <p>{ad.description}</p>
                          {ad.link && (
                            <a href={ad.link} target="_blank" rel="noopener noreferrer">
                              Ver Link
                            </a>
                          )}
                        </div>
                        <div className="item-actions">
                          <button onClick={() => setEditingAd(ad)} className="btn-icon edit">
                            <Edit />
                          </button>
                          <button onClick={() => handleDeleteAd(ad.id)} className="btn-icon delete">
                            <Trash2 />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "promotions" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="promotions-section"
            >
              <h2>Promoções em Destaque</h2>
              <p>Adicione e gerencie as promoções que aparecerão em destaque na página Home.</p>

              <div className="form-section">
                <h3>{editingPromotion ? "Editar Promoção" : "Adicionar Nova Promoção"}</h3>

                <div className="input-group">
                  <label>Imagem da Promoção:</label>
                  <div className="image-upload-section">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, !!editingPromotion)}
                      className="file-input"
                      id={editingPromotion ? "edit-promo-image-upload" : "new-promo-image-upload"}
                    />
                    <label
                      htmlFor={editingPromotion ? "edit-promo-image-upload" : "new-promo-image-upload"}
                      className="file-upload-label"
                    >
                      <Upload className="w-5 h-5" />
                      Selecionar Imagem
                    </label>
                    <p className="file-upload-hint">
                      Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB
                    </p>
                  </div>

                  {(editingPromotion ? editingPromotion.imageUrl : newPromotion.imageUrl) && (
                    <div className="image-preview-section">
                      <h4>Pré-visualização:</h4>
                      <div className="image-preview-container">
                        <img
                          src={editingPromotion ? editingPromotion.imageUrl : newPromotion.imageUrl}
                          alt="Preview"
                          className="image-preview"
                        />
                        <button
                          type="button"
                          onClick={() => clearImagePreview(!!editingPromotion)}
                          className="remove-image-btn"
                        >
                          <XCircle className="w-4 h-4" />
                          Remover
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="input-group">
                  <label>Título:</label>
                  <input
                    type="text"
                    value={editingPromotion ? editingPromotion.title : newPromotion.title}
                    onChange={(e) =>
                      editingPromotion
                        ? setEditingPromotion({ ...editingPromotion, title: e.target.value })
                        : setNewPromotion({ ...newPromotion, title: e.target.value })
                    }
                    placeholder="Ex: Promoção de Natal"
                  />
                </div>

                <div className="input-group">
                  <label>Descrição:</label>
                  <textarea
                    value={editingPromotion ? editingPromotion.description : newPromotion.description}
                    onChange={(e) =>
                      editingPromotion
                        ? setEditingPromotion({ ...editingPromotion, description: e.target.value })
                        : setNewPromotion({ ...newPromotion, description: e.target.value })
                    }
                    placeholder="Detalhes da promoção"
                  />
                </div>

                <div className="input-group">
                  <label>Desconto (ex: 20%):</label>
                  <input
                    type="text"
                    value={editingPromotion ? editingPromotion.discount : newPromotion.discount}
                    onChange={(e) =>
                      editingPromotion
                        ? setEditingPromotion({ ...editingPromotion, discount: e.target.value })
                        : setNewPromotion({ ...newPromotion, discount: e.target.value })
                    }
                    placeholder="Ex: 15%"
                  />
                </div>

                <div className="input-group">
                  <label>Validade:</label>
                  <input
                    type="date"
                    value={editingPromotion ? editingPromotion.expiresAt : newPromotion.expiresAt}
                    onChange={(e) =>
                      editingPromotion
                        ? setEditingPromotion({ ...editingPromotion, expiresAt: e.target.value })
                        : setNewPromotion({ ...newPromotion, expiresAt: e.target.value })
                    }
                  />
                </div>

                <div className="form-actions">
                  {editingPromotion ? (
                    <>
                      <button onClick={handleUpdatePromotion} className="btn-primary">
                        <CheckCircle /> Atualizar
                      </button>
                      <button onClick={handleCancelEditPromotion} className="btn-secondary">
                        <XCircle /> Cancelar
                      </button>
                    </>
                  ) : (
                    <button onClick={handleAddPromotion} className="btn-primary">
                      <PlusCircle /> Adicionar Promoção
                    </button>
                  )}
                </div>
              </div>

              <div className="list-section">
                <h3>Promoções Atuais</h3>
                {promotions.length === 0 ? (
                  <div className="empty-state">
                    <Info className="w-8 h-8" />
                    <p>Nenhuma promoção adicionada ainda.</p>
                  </div>
                ) : (
                  <div className="item-list">
                    {promotions.map((promo) => (
                      <div key={promo.id} className="list-item">
                        <img src={promo.imageUrl} alt={promo.title} className="item-image" />
                        <div className="item-details">
                          <h4>{promo.title}</h4>
                          <p>{promo.description}</p>
                          <p><strong>Desconto:</strong> {promo.discount}</p>
                          <p><strong>Validade:</strong> {promo.expiresAt}</p>
                        </div>
                        <div className="item-actions">
                          <button onClick={() => setEditingPromotion(promo)} className="btn-icon edit">
                            <Edit />
                          </button>
                          <button onClick={() => handleDeletePromotion(promo.id)} className="btn-icon delete">
                            <Trash2 />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PremiumProviderDashboard;
