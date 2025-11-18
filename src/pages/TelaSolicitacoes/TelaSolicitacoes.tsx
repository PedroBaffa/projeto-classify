// src/pages/TelaSolicitacoes/TelaSolicitacoes.tsx
import React, { useState } from "react";
import styles from "./TelaSolicitacoes.module.css";
import { mockSolicitacoes } from "../../data/mockData";
import { HeroLogo } from "../../components/HeroLogo/HeroLogo";
import { FormCriarEscala } from "./components/FormCriarEscala"; 

// --- TIPOS ---
type Solicitacao = (typeof mockSolicitacoes)[0];
type ViewMode = 'list' | 'create';
type FormType = 'escala' | 'ucs' | 'classes' | 'salas' | null;

export function TelaSolicitacoes() {
  
  // --- ESTADOS PRINCIPAIS ---
  const [selectedRequest, setSelectedRequest] = useState<Solicitacao | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [formType, setFormType] = useState<FormType>(null);

  // --- ESTADOS DOS MODAIS ---
  // Modal para REMOVER (Apagar)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  // Modal para RESOLVER (Marcar como Resolvido)
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);


  // --- FUNÇÕES DO MODAL DE REMOÇÃO (APAGAR) ---
  const handleOpenRemoveModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRemoveModalOpen(true);
  };
  const handleCloseRemoveModal = () => {
    setIsRemoveModalOpen(false);
  };
  const handleConfirmRemove = () => {
    console.log("Removendo solicitação:", selectedRequest?.id);
    handleCloseRemoveModal();
    setSelectedRequest(null);
  };

  // --- FUNÇÕES DO MODAL DE RESOLVER ---
  const handleOpenResolveModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResolveModalOpen(true);
  };
  const handleCloseResolveModal = () => {
    setIsResolveModalOpen(false);
  };
  const handleConfirmResolve = () => {
    console.log("Resolvendo solicitação:", selectedRequest?.id);
    // (Aqui, numa app real, mudaríamos o status do item)
    handleCloseResolveModal();
    setSelectedRequest(null); // Limpa a seleção para "resetar"
  };

  // --- FUNÇÕES DE NAVEGAÇÃO DA PÁGINA ---
  const handleShowForm = (type: FormType) => {
    setViewMode('create');
    setFormType(type);
  };
  const handleBackToList = () => {
    setViewMode('list');
    setFormType(null);
  };

  // --- RENDERIZAÇÃO: MODO LISTA (COLUNA 3) ---
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
          // Botão "Resolvido" agora abre seu próprio modal
          <button 
            className={styles.detailActionButton}
            onClick={handleOpenResolveModal}
          >
            Marcar como Resolvido
          </button>
        ) : (
          // Botão "Remover" chama a função renomeada
          <button 
            className={styles.detailRemoveButton}
            onClick={handleOpenRemoveModal}
          >
            Remover do Histórico
          </button>
        )}
      </div>
    );
  };

  // --- RENDERIZAÇÃO: MODO LISTA (COLUNAS 2 e 3) ---
  const renderListView = () => (
    <>
      {/* --- COLUNA 2: LISTA --- */}
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

      {/* --- COLUNA 3: DETALHE --- */}
      <div className={styles.contentArea}>
        {renderDetailContent()}
      </div>
    </>
  );

  // --- RENDERIZAÇÃO: MODO CRIAÇÃO (FORMULÁRIO) ---
  const renderCreateView = () => {
    switch (formType) {
      case 'escala':
        return <FormCriarEscala onCancel={handleBackToList} />;
      case 'ucs':
      case 'classes':
      case 'salas':
        return (
          <div className={styles.contentArea}>
            <p>Formulário de "{formType}" em construção.</p>
            <button onClick={handleBackToList} className={styles.backButtonForm}>Voltar</button>
          </div>
        );
      default:
        return null;
    }
  };


  // --- JSX PRINCIPAL ---
  return (
    <div className={styles.pageContainer}>
      
      {/* --- COLUNA 1: SIDEBAR --- */}
      <div className={styles.sidebar}>
        <h1 className={styles.titulo}>Solicitações</h1>
        
        {/* ClassNames agora são condicionais para o "ativo" */}
        <button 
          className={`
            ${styles.createButton}
            ${(viewMode === 'create' && formType === 'escala') ? styles.createButtonActive : ''}
          `}
          onClick={() => handleShowForm('escala')}
        >
          Escala
        </button>
        
        <button 
          className={`
            ${styles.createButton}
            ${(viewMode === 'create' && formType === 'ucs') ? styles.createButtonActive : ''}
          `}
          onClick={() => handleShowForm('ucs')}
        >
          UCs
        </button>
        
        <button 
          className={`
            ${styles.createButton}
            ${(viewMode === 'create' && formType === 'classes') ? styles.createButtonActive : ''}
          `}
          onClick={() => handleShowForm('classes')}
        >
          Classes
        </button>
        
        <button 
          className={`
            ${styles.createButton}
            ${(viewMode === 'create' && formType === 'salas') ? styles.createButtonActive : ''}
          `}
          onClick={() => handleShowForm('salas')}
        >
          Salas
        </button>
      </div>

      {/* --- RENDERIZAÇÃO CONDICIONAL (LISTA vs FORMULÁRIO) --- */}
      {viewMode === 'list' ? renderListView() : renderCreateView()}

      
      {/* --- MODAL 1: "RESOLVER SOLICITAÇÃO" --- */}
      {isResolveModalOpen && (
        <div className={styles.modalBackdrop} onClick={handleCloseResolveModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <button className={styles.modalCloseButton} onClick={handleCloseResolveModal}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>Tem certeza que deseja marcar esta solicitação como resolvida?</p>
            </div>
            <div className={styles.modalFooter}>
              <button 
                className={styles.modalConfirmButton} 
                onClick={handleConfirmResolve}
              >
                Sim, marcar como resolvida
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: "REMOVER (APAGAR) SOLICITAÇÃO" --- */}
      {isRemoveModalOpen && (
        <div className={styles.modalBackdrop} onClick={handleCloseRemoveModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <button className={styles.modalCloseButton} onClick={handleCloseRemoveModal}>
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