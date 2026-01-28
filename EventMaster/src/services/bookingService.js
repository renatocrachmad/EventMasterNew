// src/services/bookingService.js
import { db } from '../firebase/firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  Timestamp, 
  updateDoc, 
  doc, 
  deleteDoc 
} from 'firebase/firestore';

/**
 * Cria um novo agendamento no Firestore.
 * @param {Object} bookingData - Dados do agendamento
 * @returns {Promise} - Documento criado
 */
export const addBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(collection(db, 'agendamentos'), {
      ...bookingData,
      criadoEm: Timestamp.now(),
      atualizadoEm: Timestamp.now(),
    });
    return docRef;
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    throw error;
  }
};

/**
 * Verifica se um horário está disponível para um prestador específico.
 * @param {string} selectedDate - Data do agendamento (YYYY-MM-DD)
 * @param {string} selectedTime - Horário do agendamento (HH:mm)
 * @param {string} prestadorId - ID do prestador
 * @returns {Promise<boolean>} - true se o horário está disponível
 */
export const isTimeAvailable = async (selectedDate, selectedTime, prestadorId) => {
  try {
    const q = query(
      collection(db, "agendamentos"),
      where("data", "==", selectedDate),
      where("hora", "==", selectedTime),
      where("prestadorId", "==", prestadorId)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.empty; // true se não há conflitos
  } catch (error) {
    console.error("Erro ao verificar disponibilidade:", error);
    throw error;
  }
};

/**
 * Busca todos os agendamentos de um prestador em uma data específica.
 * @param {string} prestadorId - ID do prestador
 * @param {string} selectedDate - Data (YYYY-MM-DD)
 * @returns {Promise<Array>} - Lista de agendamentos
 */
export const getBookingsByDate = async (prestadorId, selectedDate) => {
  try {
    const q = query(
      collection(db, "agendamentos"),
      where("data", "==", selectedDate),
      where("prestadorId", "==", prestadorId)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erro ao buscar agendamentos por data:", error);
    throw error;
  }
};

/**
 * Atualiza o status de um agendamento.
 * @param {string} bookingId - ID do agendamento
 * @param {string} status - Novo status (pendente, confirmado, cancelado, concluido)
 */
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const bookingRef = doc(db, 'agendamentos', bookingId);
    await updateDoc(bookingRef, {
      status,
      atualizadoEm: Timestamp.now(),
    });
  } catch (error) {
    console.error("Erro ao atualizar status do agendamento:", error);
    throw error;
  }
};

/**
 * Exclui um agendamento.
 * @param {string} bookingId - ID do agendamento
 */
export const deleteBooking = async (bookingId) => {
  try {
    await deleteDoc(doc(db, 'agendamentos', bookingId));
  } catch (error) {
    console.error("Erro ao deletar agendamento:", error);
    throw error;
  }
};
