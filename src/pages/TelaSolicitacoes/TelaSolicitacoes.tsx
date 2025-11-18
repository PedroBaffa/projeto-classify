// src/pages/TelaSolicitacoes/TelaSolicitacoes.tsx
import React, { useState } from "react";
import styles from "./TelaSolicitacoes.module.css";
import { mockSolicitacoes } from "../../data/mockData";
import { HeroLogo } from "../../components/HeroLogo/HeroLogo";

type Solicitacao = (typeof mockSolicitacoes)[0];

export function TelaSolicitacoes() {
  const [selectedRequest, setSelectedRequest] = useState<Solicitacao | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsModalOpen(true);
  };

  
  const handleConfirmRemove = () => {
    
    console.log("Removendo solicitação:", selectedRequest?.id);
    handleCloseModal();
    setSelectedRequest(null); 
  };

  
  const renderDetailContent = () => {
    if (!selectedRequest) {
      return (
        <div className={styles.placeholder}>
          <HeroLogo />
        </div>
      );
    }

    return (
      <div className={styles.detailBox}>
        <h2 className={styles.detailTitle}>{selectedRequest.titulo}</h2>
        <p className={styles.detailDescription}>{selectedRequest.descricao}</p>
        
        {selectedRequest.status === "pendente" ? (
          <button className={styles.detailActionButton}>Marcar como Resolvido</button>
        ) : (
          
          <button 
            className={styles.detailRemoveButton}
            onClick={handleOpenModal} // 
          >
            Remover do Histórico
          </button>
        )}
      </div>
    );
  };

  return (
    <div className={styles.pageContainer}>
      
      
      <div className={styles.sidebar}>
        <h1 className={styles.titulo}>Solicitações</h1>
        <button className={styles.createButton}>Escala</button>
        <button className={styles.createButton}>UCs</button>
        <button className={styles.createButton}>Classes</button>
        <button className={styles.createButton}>Salas</button>
      </div>

      <div className={styles.requestList}>
        <h2 className={styles.listTitle}>Pendentes</h2>
        <div className={styles.listWrapper}>
          {mockSolicitacoes.map((item) => (
            <button
              key={item.id}
              className={`
                ${styles.requestButton} 
                ${item.status === "pendente" ? styles.buttonPendente : styles.buttonResolvido}
                ${selectedRequest?.id === item.id ? styles.buttonActive : ''}
              `}
              onClick={() => setSelectedRequest(item)}
            >
              {item.titulo}
            </button>
          ))}
        </div>
        
      </div>

      <div className={styles.contentArea}>
        {renderDetailContent()}
      </div>

      {isModalOpen && (
        <div className={styles.modalBackdrop} onClick={handleCloseModal}>
          
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            
            <div className={styles.modalHeader}>
              <button className={styles.modalCloseButton} onClick={handleCloseModal}>
                &times;
              </button>
            </div>

            <div className={styles.modalBody}>
              <p>Tem certeza que deseja remover esta solicitação?</p>
            </div>

            <div className={styles.modalFooter}>
              <button 
                className={styles.modalConfirmButton} 
                onClick={handleConfirmRemove}
              >
                Remover
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}