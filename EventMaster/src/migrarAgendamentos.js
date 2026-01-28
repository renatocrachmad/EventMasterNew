import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../src/firebase/firebase"; // Ajuste se seu firebase.ts está em outro caminho

/**
 * Função para migrar os agendamentos e adicionar o campo "hora" se não existir.
 * Também valida se clienteId, prestadorId, data e servicoId são strings válidas.
 */
export async function migrarAgendamentos() {
  try {
    const agendamentosRef = collection(db, "agendamentos");
    const snapshot = await getDocs(agendamentosRef);

    if (snapshot.empty) {
      console.log("Nenhum agendamento encontrado para migrar.");
      return;
    }

    for (const agendamentoDoc of snapshot.docs) {
      const data = agendamentoDoc.data();
      const updates = {};

      // Validar campos obrigatórios
      if (!data.clienteId || typeof data.clienteId !== "string") {
        console.warn(`Agendamento ${agendamentoDoc.id} sem clienteId válido`);
      }
      if (!data.prestadorId || typeof data.prestadorId !== "string") {
        console.warn(`Agendamento ${agendamentoDoc.id} sem prestadorId válido`);
      }
      if (!data.servicoId || typeof data.servicoId !== "string") {
        console.warn(`Agendamento ${agendamentoDoc.id} sem servicoId válido`);
      }

      // Validação de data
      if (!data.data) {
        console.warn(`Agendamento ${agendamentoDoc.id} sem data`);
      }

      // Adicionar "hora" se não existir
      if (!data.hora || typeof data.hora !== "string") {
        updates.hora = "09:00"; // Valor padrão
        console.log(`Campo "hora" adicionado em ${agendamentoDoc.id}`);
      }

      // Atualizar "atualizadoEm" para timestamp atual
      updates.atualizadoEm = new Date().toISOString();

      if (Object.keys(updates).length > 0) {
        await updateDoc(doc(db, "agendamentos", agendamentoDoc.id), updates);
        console.log(`Agendamento ${agendamentoDoc.id} atualizado.`);
      }
    }

    console.log("Migração concluída com sucesso.");
  } catch (error) {
    console.error("Erro ao migrar agendamentos:", error);
  }
}
