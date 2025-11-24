import React, { useEffect, useState } from "react";
import styles from "./TelaSolicitacoes.module.css";
import { HeroLogo } from "../../components/HeroLogo/HeroLogo";
import { FormCriarEscala } from "./components/FormCriarEscala"; 
import { FormCriarUCs } from "./components/FormCriarUcs";
import { TelaSolicitacaoSala } from "./components/TelaSolicitacaoSala"; 
import { TelaSolicitacaoClasse } from "./components/TelaSolicitacaoClasse";

type Solicitacao = any;
type ViewMode = 'list' | 'create';
type FormType = 'escala' | 'ucs' | 'classes' | 'salas' | null;

export function TelaSolicitacoes() {
  
  const [selectedRequest, setSelectedRequest] = useState<Solicitacao | null>(null);
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [formType, setFormType] = useState<FormType>(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);

  const handleOpenRemoveModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRemoveModalOpen(true);
  };
  const handleCloseRemoveModal = () => {
    setIsRemoveModalOpen(false);
  };
  const handleConfirmRemove = () => {
    if (!selectedRequest) return;
    const idToResolve = selectedRequest.id;
    
    setSolicitacoes((prev) => prev.map((s) => (s.id === idToResolve ? { ...s, status: 'resolvido' } : s)));
    setSelectedRequest((prev: Solicitacao | null) => (prev ? { ...prev, status: 'resolvido' } : prev));
    handleCloseRemoveModal();

    
    (async () => {
      try {
        const resp = await fetch('/api/mock-data');
        const data = await resp.json();
        if (Array.isArray(data.solicitacoes)) {
          data.solicitacoes = data.solicitacoes.map((s: any) => (s.id === idToResolve ? { ...s, status: 'resolvido' } : s));
          await fetch('/api/mock-data', { method: 'PUT', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(data) });
        }
      } catch (err) {
        console.error('Erro ao marcar como resolvido (remove):', err);
      }
    })();
  };

  const handleOpenResolveModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResolveModalOpen(true);
  };
  const handleCloseResolveModal = () => {
    setIsResolveModalOpen(false);
  };
  const handleConfirmResolve = () => {
    if (!selectedRequest) return;
    const idToResolve = selectedRequest.id;
    
    setSolicitacoes((prev) => prev.map((s) => (s.id === idToResolve ? { ...s, status: 'resolvido' } : s)));
    setSelectedRequest((prev: Solicitacao | null) => (prev ? { ...prev, status: 'resolvido' } : prev));
    handleCloseResolveModal();

    
    (async () => {
      try {
        const resp = await fetch('/api/mock-data');
        const data = await resp.json();
        if (Array.isArray(data.solicitacoes)) {
          data.solicitacoes = data.solicitacoes.map((s: any) => (s.id === idToResolve ? { ...s, status: 'resolvido' } : s));
          await fetch('/api/mock-data', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        }
      } catch (err) {
        console.error('Erro ao marcar como resolvido:', err);
      }
    })();
  };

  const handleShowForm = (type: FormType) => {
    setViewMode('create');
    setFormType(type);
  };
  const handleBackToList = () => {
    setViewMode('list');
    setFormType(null);
  };

  useEffect(() => {
    fetch('/api/mock-data')
      .then((r) => r.json())
      .then((data) => setSolicitacoes(Array.isArray(data.solicitacoes) ? data.solicitacoes : []))
      .catch(() => setSolicitacoes([]));
  }, []);

  useEffect(() => {
    function onCreated() {
      fetch('/api/mock-data')
        .then((r) => r.json())
        .then((data) => setSolicitacoes(Array.isArray(data.solicitacoes) ? data.solicitacoes : []))
        .catch(() => {});
    }
    window.addEventListener('solicitacaoCreated', onCreated as EventListener);
    return () => window.removeEventListener('solicitacaoCreated', onCreated as EventListener);
  }, []);

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
          <button 
            className={styles.detailActionButton}
            onClick={handleOpenResolveModal}
          >
            Marcar como Resolvido
          </button>
        ) : (
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

  const renderListView = () => (
    <>
      <div className={styles.requestList}>
        <h2 className={styles.listTitle}>Pendentes</h2>
        <div className={styles.listWrapper}>
          {solicitacoes.map((item) => (
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
    </>
  );

  const renderCreateView = () => {
    switch (formType) {
      case 'escala':
        return <FormCriarEscala onCancel={handleBackToList} />;
      
      case 'ucs':
        return <FormCriarUCs onCancel={handleBackToList} />;
        
      case 'salas':
        return <TelaSolicitacaoSala onCancel={handleBackToList} />;

      case 'classes':
        return <TelaSolicitacaoClasse onCancel={handleBackToList} />;
        
      default:
        return null;
    }
  };


  return (
    <div className={styles.pageContainer}>
      
      <div className={styles.sidebar}>
        <h1 className={styles.titulo}>Solicitações</h1>
        
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

      {viewMode === 'list' ? renderListView() : renderCreateView()}

      
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