import { useState } from "react";
import styles from "./TelaSolicitacaoClasse.module.css";
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

 
const defaultAssignments: { [key: string]: number[] } = {};

interface FormProps {
  onCancel: () => void;
}

export function TelaSolicitacaoClasse({ onCancel }: FormProps) {
  const { data } = useMockData();
  const ucsState: UC[] = Array.isArray(data.ucs) ? data.ucs : [];
  const mockClasses: string[] = [...new Set(ucsState.flatMap((uc: UC) => Array.isArray(uc.turmas) ? uc.turmas : []))];
  const mockAssignments: { [key: string]: number[] } =
    data && typeof data.assignments === "object" && data.assignments !== null
      ? (data.assignments as { [key: string]: number[] })
      : Object.keys(defaultAssignments).length
      ? defaultAssignments
      : {};

  const [selectedClassView, setSelectedClassView] = useState<string>(mockClasses[0] ?? "");

  const [selectedClassEdit, setSelectedClassEdit] = useState<string>(mockClasses[0] ?? "");
  const [selectedUCEdit, setSelectedUCEdit] = useState<number>(ucsState[0]?.id ?? 0);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<string>("");

  const handleOpenModal = (action: string) => {
    setModalAction(action);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmSend = () => {
    console.log("Enviando solicitação:", {
      acao: modalAction,
      classe: selectedClassEdit,
      ucId: selectedUCEdit,
      professor: "Prof. Joaquim",
    });
    handleCloseModal();
    onCancel();
  };

  const ucsDaClasse: UC[] =
    (mockAssignments[selectedClassView] || []).map((ucId: number) =>
      ucsState.find((uc: UC) => uc.id === ucId) as UC
    ).filter(Boolean) || [];

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>Solicitação de Classes</h2>
          <button onClick={onCancel} className={styles.backButton}>
            Voltar
          </button>
        </div>

        <div className={styles.formBody}>
          <div className={styles.visualizarColumn}>
            <div className={styles.inputGroup}>
              <label htmlFor="classe-view">Minhas Classes</label>
              <select
                id="classe-view"
                className={styles.dropdown}
                value={selectedClassView}
                onChange={(e) => setSelectedClassView(e.target.value)}
              >
                {mockClasses.map((classe: string, index: number) => (
                  <option key={index} value={classe}>
                    {classe}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Assinado para as UCs:</label>
              <div className={styles.ucListBox}>
                {ucsDaClasse.map((uc: UC) =>
                  uc ? (
                    <span key={uc.id} className={styles.pill}>
                      {uc.nome}
                    </span>
                  ) : null
                )}
                <span className={`${styles.pill} ${styles.pillExemplo}`}>
                  Física
                </span>
              </div>
            </div>
          </div>

          <div className={styles.editarColumn}>
            <h3 className={styles.editTitle}>Editar</h3>
            <div className={styles.inputGroup}>
              <label htmlFor="classe-edit">Classe</label>
              <select
                id="classe-edit"
                className={styles.dropdown}
                value={selectedClassEdit}
                onChange={(e) => setSelectedClassEdit(e.target.value)}
              >
                {mockClasses.map((classe: string, index: number) => (
                  <option key={index} value={classe}>
                    {classe}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="uc-edit">UC (Matéria)</label>
              <select
                id="uc-edit"
                className={styles.dropdown}
                value={selectedUCEdit}
                onChange={(e) => setSelectedUCEdit(Number(e.target.value))}
              >
                {ucsState.map((uc: UC) => (
                  <option key={uc.id} value={uc.id}>
                    {uc.nome}
                  </option>
                ))}
                <option value={99}>Física</option>
              </select>
            </div>

            <div className={styles.buttonGroup}>
              <button
                className={`${styles.editButton} ${styles.btnRemover}`}
                onClick={() => handleOpenModal("Remover")}
              >
                Remover
              </button>
              <button
                className={`${styles.editButton} ${styles.btnAdicionar}`}
                onClick={() => handleOpenModal("Adicionar")}
              >
                Adicionar
              </button>
              <button
                className={`${styles.editButton} ${styles.btnAlterar}`}
                onClick={() => handleOpenModal("Alterar")}
              >
                Alterar
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalBackdrop} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalBody}>
              <p>Tem certeza que deseja enviar essa solicitação?</p>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.modalConfirmButton}
                onClick={handleConfirmSend}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}