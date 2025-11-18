import { useState } from "react";
import styles from "./TelaSolicitacaoClasse.module.css";
import { mockUCs } from "../../../data/mockData";

const mockClasses = [...new Set(mockUCs.flatMap((uc) => uc.turmas))];

const mockAssignments: { [key: string]: number[] } = {
  [mockClasses[0]]: [1, 4],
  [mockClasses[1]]: [1],
  [mockClasses[2]]: [2, 3, 4],
  [mockClasses[3]]: [3],
};

interface FormProps {
  onCancel: () => void;
}

export function TelaSolicitacaoClasse({ onCancel }: FormProps) {
  const [selectedClassView, setSelectedClassView] = useState(mockClasses[2]);

  const [selectedClassEdit, setSelectedClassEdit] = useState(mockClasses[2]);
  const [selectedUCEdit, setSelectedUCEdit] = useState(mockUCs[0].id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");

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

  const ucsDaClasse =
    mockAssignments[selectedClassView]?.map((ucId) =>
      mockUCs.find((uc) => uc.id === ucId)
    ) || [];

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
                {mockClasses.map((classe, index) => (
                  <option key={index} value={classe}>
                    {classe}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Assinado para as UCs:</label>
              <div className={styles.ucListBox}>
                {ucsDaClasse.map((uc) =>
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
                {mockClasses.map((classe, index) => (
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
                {mockUCs.map((uc) => (
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