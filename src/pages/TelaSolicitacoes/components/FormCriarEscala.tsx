// src/pages/TelaSolicitacoes/components/FormCriarEscala.tsx
import React, { useState } from "react";
import styles from "./FormCriarEscala.module.css";
import { mockUCs } from "../../../data/mockData";

interface FormProps {
  onCancel: () => void; 
}

export function FormCriarEscala({ onCancel }: FormProps) {
  
  // --- Estados do Formulário ---
  const [selectedUC, setSelectedUC] = useState(mockUCs[0].id);
  const [selectedTurma, setSelectedTurma] = useState(mockUCs[0].turmas[0]);
  const [selectedPeriodo, setSelectedPeriodo] = useState("tarde");
  
  // --- NOVO: Estado do Modal de Envio ---
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const ucInfo = mockUCs.find((uc) => uc.id === selectedUC) || mockUCs[0];
  const turmasDaUC = mockUCs.flatMap(uc => uc.turmas);

  // --- NOVAS FUNÇÕES DO MODAL ---
  const handleOpenSendModal = () => {
    setIsSendModalOpen(true);
  };
  const handleCloseSendModal = () => {
    setIsSendModalOpen(false);
  };
  const handleConfirmSend = () => {
    // A Lógica de "Enviar" (ex: API call) iria aqui
    console.log("Enviando solicitação...");
    
    // Fecha o modal
    handleCloseSendModal();
    
    // Volta para a tela de lista (passado por props)
    onCancel(); 
  };
  

  return (
    // Usamos um Fragment <> para permitir que o modal fique fora do .formContainer
    <>
      <div className={styles.formContainer}>
        {/* HEADER */}
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>Alterar Escala</h2>
          <button onClick={onCancel} className={styles.backButton}>Voltar</button>
        </div>

        {/* CONTROLES */}
        <div className={styles.controls}>
          {/* ... (os 3 dropdowns <select> continuam aqui) ... */}
           <select 
            className={styles.dropdown}
            value={selectedUC}
            onChange={(e) => setSelectedUC(Number(e.target.value))}
           >
            {mockUCs.map((uc) => (
              <option key={uc.id} value={uc.id}>{uc.nome}</option>
            ))}
           </select>
           <select 
            className={styles.dropdown}
            value={selectedPeriodo}
            onChange={(e) => setSelectedPeriodo(e.target.value)}
           >
            <option value="manha">Manhã</option>
            <option value="tarde">Tarde</option>
            <option value="noite">Noite</option>
           </select>
           <select 
            className={styles.dropdown}
            value={selectedTurma}
            onChange={(e) => setSelectedTurma(e.target.value)}
           >
            {turmasDaUC.map((turma, i) => (
              <option key={i} value={turma}>{turma}</option>
            ))}
           </select>
        </div>

        {/* CORPO */}
        <div className={styles.formBody}>
          
          {/* Coluna 1: Calendário */}
          <div className={styles.calendarColumn}>
            {/* ... (todo o JSX do calendário) ... */}
            <div className={styles.calendarHeader}>
              <span>2025</span> 
              <div><span>{'<'}</span><span>{'>'}</span></div>
            </div>
            <div className={styles.calendarGrid}>
              {/* ... (todos os .dayName e .day) ... */}
              <div className={styles.dayName}>M</div><div className={styles.dayName}>T</div><div className={styles.dayName}>W</div><div className={styles.dayName}>T</div><div className={styles.dayName}>F</div><div className={styles.dayName}>S</div><div className={styles.dayName}>S</div>
              <div className={styles.day}></div><div className={styles.day}></div><div className={styles.day}></div><div className={styles.day}></div>
              <div className={styles.day}>1</div>
              <div className={styles.day}>2</div><div className={styles.day}>3</div><div className={styles.day}>4</div>
              <div className={`${styles.day} ${styles.dayAtual}`}>5</div>
              <div className={styles.day}>6</div><div className={styles.day}>7</div><div className={styles.day}>8</div>
              <div className={styles.day}>9</div><div className={styles.day}>10</div><div className={styles.day}>11</div>
              <div className={`${styles.day} ${styles.daySelecionado}`}>12</div>
              <div className={styles.day}>13</div><div className={styles.day}>14</div><div className={styles.day}>15</div>
              <div className={styles.day}>16</div><div className={styles.day}>17</div>
              <div className={`${styles.day} ${styles.daySelecionado}`}>18</div>
              <div className={`${styles.day} ${styles.dayAtual}`}>19</div>
              <div className={styles.day}>20</div><div className={styles.day}>21</div><div className={styles.day}>22</div>
              <div className={styles.day}>23</div><div className={styles.day}>24</div>
              <div className={`${styles.day} ${styles.daySelecionado}`}>25</div>
              <div className={styles.day}>26</div><div className={styles.day}>27</div><div className={styles.day}>28</div><div className={styles.day}>29</div>
            </div>
            <div className={styles.legend}>
              <div><span className={`${styles.dot} ${styles.dotAtual}`}></span> Atual</div>
              <div><span className={`${styles.dot} ${styles.dotSelecionado}`}></span> Selecionado</div>
            </div>
          </div>

          {/* Coluna 2: Área de Solicitação */}
          <div className={styles.mainContentColumn}>
            {/* Pills */}
            <div className={styles.pillsContainer}>
              <div className={styles.pill}>{selectedTurma}</div>
              <div className={styles.pill}>{ucInfo.nome}</div>
              <div className={styles.pill}>{selectedPeriodo}</div>
            </div>
            {/* Textarea */}
            <textarea
              className={styles.descricaoTextarea}
              placeholder="Escreva em detalhes a sua solicitação..."
              rows={10} 
            />
            {/* ATUALIZADO: Botão de Enviar agora abre o modal */}
            <button 
              className={styles.sendButton} 
              onClick={handleOpenSendModal}
            >
              Enviar
            </button>
          </div>
        </div>
      </div> 

      {/* --- (NOVO) MODAL DE CONFIRMAÇÃO DE ENVIO --- */}
      {isSendModalOpen && (
        <div className={styles.modalBackdrop} onClick={handleCloseSendModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <button className={styles.modalCloseButton} onClick={handleCloseSendModal}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>Tem certeza que quer enviar esta solicitação?</p>
            </div>
            <div className={styles.modalFooter}>
              <button 
                className={styles.modalCancelButton} // Novo botão
                onClick={handleCloseSendModal}
              >
                Cancelar
              </button>
              <button 
                className={styles.modalConfirmButton} 
                onClick={handleConfirmSend}
              >
                Sim, Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}