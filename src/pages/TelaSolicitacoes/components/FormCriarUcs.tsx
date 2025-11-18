import { useState, useEffect } from "react";
import styles from "./FormCriarUCs.module.css";
import { mockUCs } from "../../../data/mockData";

interface FormProps {
  onCancel: () => void;
}

export function FormCriarUCs({ onCancel }: FormProps) {
  const [selectedUCId, setSelectedUCId] = useState(mockUCs[0].id);
  const selectedUC = mockUCs.find((uc) => uc.id === selectedUCId) || mockUCs[0];
  const [ucNameInput, setUcNameInput] = useState(selectedUC.nome);

  useEffect(() => {
    setUcNameInput(selectedUC.nome);
  }, [selectedUC]);

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Solicitação UCs</h2>
        <button onClick={onCancel} className={styles.backButton}>Voltar</button>
      </div>

      <div className={styles.formBody}>
        
        <div className={styles.minhasUCsColumn}>
          <h3>Minhas UCs</h3>
          <select 
            className={styles.dropdown}
            value={selectedUCId}
            onChange={(e) => setSelectedUCId(Number(e.target.value))}
          >
            {mockUCs.map((uc) => (
              <option key={uc.id} value={uc.id}>{uc.nome}</option>
            ))}
          </select>
          
          <h3>Assinado para as classes:</h3>
          <div className={styles.classesBox}>
            {selectedUC.turmas.map((turma, index) => (
              <div key={index} className={styles.pill}>
                {turma}
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.editarColumn}>
          <h3>Editar</h3>
          
          <select 
            className={styles.dropdown}
            value={selectedUCId}
            onChange={(e) => setSelectedUCId(Number(e.target.value))}
          >
            {mockUCs.map((uc) => (
              <option key={uc.id} value={uc.id}>{uc.nome}</option>
            ))}
          </select>

          <input 
            type="text"
            className={styles.textInput}
            value={ucNameInput}
            onChange={(e) => setUcNameInput(e.target.value)}
          />

          <div className={styles.buttonGroup}>
            <button className={`${styles.editButton} ${styles.removeButton}`}>
              Remover
            </button>
            <button className={`${styles.editButton} ${styles.addButton}`}>
              Adicionar
            </button>
            <button className={`${styles.editButton} ${styles.alterarButton}`}>
              Alterar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}