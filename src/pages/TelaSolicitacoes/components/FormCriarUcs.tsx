import { useState, useEffect } from "react";
import styles from "./FormCriarUcs.module.css";
import { useMockData } from "../../../hooks/useMockData";

interface UC {
  id: number;
  nome: string;
  turmas: string[];
  salas?: string[];
  dias?: string[];
  cor?: string;
  periodos?: string[];
}

interface FormProps {
  onCancel: () => void;
}

export function FormCriarUCs({ onCancel }: FormProps) {
  const { data } = useMockData();
  const ucsState: UC[] = Array.isArray(data.ucs) ? data.ucs : [];
  const [selectedUCId, setSelectedUCId] = useState<number>(ucsState[0]?.id ?? 0);
  const selectedUC: UC = (ucsState.find((uc: UC) => uc.id === selectedUCId) as UC) || (ucsState[0] as UC) || ({ id: 0, nome: '', turmas: [] } as UC);
  const [ucNameInput, setUcNameInput] = useState<string>(selectedUC.nome);

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
            {ucsState.map((uc: UC) => (
              <option key={uc.id} value={uc.id}>{uc.nome}</option>
            ))}
          </select>
          
          <h3>Assinado para as classes:</h3>
          <div className={styles.classesBox}>
            {selectedUC.turmas.map((turma: string, index: number) => (
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
            {ucsState.map((uc: UC) => (
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