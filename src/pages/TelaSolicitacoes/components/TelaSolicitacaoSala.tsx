import { useState } from "react";
import { useEffect } from "react";
import styles from "./TelaSolicitacaoSala.module.css";
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

interface Sala {
  id: number;
  nome: string;
  capacidade: number;
  disponibilidade: { dia: string; disponivel: boolean }[];
}

const mockReservas = [
  {
    id: 1,
    salaId: 1,
    classe: "ADS - 1º Sem (A)",
    horario: "Segunda (Manhã)",
    professor: "Prof. Carmino",
  },
  {
    id: 2,
    salaId: 1,
    classe: "Eng. Civil - 1º Sem (B)",
    horario: "Quarta (Manhã)",
    professor: "Prof. Ana",
  },
  {
    id: 3,
    salaId: 2,
    classe: "Eng. Comp - 2º Sem (A)",
    horario: "Terça (Tarde)",
    professor: "Prof. Joaquim",
  },
  {
    id: 4,
    salaId: 3,
    classe: "Ciência da Comp. - 3º Sem",
    horario: "Sexta (Noite)",
    professor: "Prof. Joaquim",
  },
];
const mockHorarios = ["Manhã", "Tarde", "Noite"];

 

interface FormProps {
  onCancel: () => void;
}

export function TelaSolicitacaoSala({ onCancel }: FormProps) {
  const { data } = useMockData();
  const ucsState: UC[] = Array.isArray(data?.ucs) ? data.ucs : [];
  const salasState: Sala[] = Array.isArray(data?.salas) ? data.salas : [];

  const mockClasses: string[] = [...new Set((ucsState.flatMap((uc: UC) => Array.isArray(uc.turmas) ? uc.turmas : [])) as string[])];

  const [selectedSalaView, setSelectedSalaView] = useState<number>(0);
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(3);

  const [salaParaAdicionar, setSalaParaAdicionar] = useState<number>(0);
  const [classeParaAdicionar, setClasseParaAdicionar] = useState<string>(""
  );
  const [horarioParaAdicionar, setHorarioParaAdicionar] = useState<string>(""
  );

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const filteredReservas = mockReservas.filter((r) => r.salaId === selectedSalaView);

  useEffect(() => {
    if (salasState.length > 0) {
      setSelectedSalaView((prev) => (prev || salasState[0]?.id));
      setSalaParaAdicionar((prev) => (prev || salasState[0]?.id));
    }
    if (mockClasses.length > 0 && !classeParaAdicionar) {
      setClasseParaAdicionar(mockClasses[0]);
    }
    if (mockHorarios.length > 0 && !horarioParaAdicionar) {
      setHorarioParaAdicionar(mockHorarios[0]);
    }
  }, [salasState, mockClasses]);

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);
  const handleOpenRemoveModal = () => {
    if (selectedReservationId) setIsRemoveModalOpen(true);
  };
  const handleCloseRemoveModal = () => setIsRemoveModalOpen(false);

  const handleConfirmRemove = () => {
    console.log("Removendo reserva ID:", selectedReservationId);
    handleCloseRemoveModal();
    setSelectedReservationId(null);
  };

  const handleConfirmAdd = () => {
    console.log("Adicionando reserva:", {
      salaId: salaParaAdicionar,
      classe: classeParaAdicionar,
      horario: horarioParaAdicionar,
      professor: "Prof. Joaquim",
    });
    handleCloseAddModal();
  };

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>Solicitação de Salas</h2>
          <button onClick={onCancel} className={styles.backButton}>
            Voltar
          </button>
        </div>

        <div className={styles.formBody}>
          <div className={styles.visualizarColumn}>
            <div className={styles.inputGroup}>
              <label htmlFor="sala-view">Visualizar reservas da Sala:</label>
              <select
                id="sala-view"
                className={styles.dropdown}
                value={selectedSalaView}
                onChange={(e) => {
                  setSelectedSalaView(Number(e.target.value));
                  setSelectedReservationId(null);
                }}
              >
                {salasState.map((sala: Sala) => (
                  <option key={sala.id} value={sala.id}>
                    {sala.nome}
                  </option>
                ))}
              </select>
            </div>

            <label className={styles.listLabel}>Reservas para esta sala:</label>
            <div className={styles.reservationList}>
              {filteredReservas.length > 0 ? (
                filteredReservas.map((reserva) => (
                  <button
                    key={reserva.id}
                    className={`
                      ${styles.reservationItem}
                      ${
                        selectedReservationId === reserva.id
                          ? styles.reservationActive
                          : ""
                      }
                    `}
                    onClick={() => setSelectedReservationId(reserva.id)}
                  >
                    <span className={styles.reservaClasse}>{reserva.classe}</span>
                    <span className={styles.reservaHorario}>{reserva.horario}</span>
                    <span className={styles.reservaProfessor}>{reserva.professor}</span>
                  </button>
                ))
              ) : (
                <p className={styles.noReservations}>Nenhuma reserva encontrada.</p>
              )}
            </div>
          </div>

          <div className={styles.acoesColumn}>
            <div className={styles.actionSection}>
              <h4 className={styles.actionTitle}>Adicionar Nova Reserva</h4>
              <div className={styles.inputGroup}>
                <label htmlFor="sala-add">Sala</label>
                <select
                  id="sala-add"
                  className={styles.dropdown}
                  value={salaParaAdicionar}
                  onChange={(e) => setSalaParaAdicionar(Number(e.target.value))}
                >
                  {salasState.map((sala: Sala) => (
                    <option key={sala.id} value={sala.id}>{sala.nome}</option>
                  ))}
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="classe-add">Classe</label>
                <select
                  id="classe-add"
                  className={styles.dropdown}
                  value={classeParaAdicionar}
                  onChange={(e) => setClasseParaAdicionar(e.target.value)}
                >
                  {mockClasses.map((classe: string, index: number) => (
                    <option key={index} value={classe}>{classe}</option>
                  ))}
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="horario-add">Horário</label>
                <select
                  id="horario-add"
                  className={styles.dropdown}
                  value={horarioParaAdicionar}
                  onChange={(e) => setHorarioParaAdicionar(e.target.value)}
                >
                  {mockHorarios.map((horario: string, index: number) => (
                    <option key={index} value={horario}>{horario}</option>
                  ))}
                </select>
              </div>
              <button
                className={styles.editButton}
                onClick={handleOpenAddModal}
              >
                Adicionar
              </button>
            </div>

            <div className={styles.actionSection}>
              <h4 className={styles.actionTitle}>Remover Reserva Selecionada</h4>
              <button
                className={`${styles.removeButton} ${
                  selectedReservationId ? styles.removeButtonActive : ""
                }`}
                onClick={handleOpenRemoveModal}
                disabled={!selectedReservationId}
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <div className={styles.modalBackdrop} onClick={handleCloseAddModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalBody}>
              <p>Tem certeza que deseja enviar esta solicitação de reserva?</p>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.modalConfirmButton} onClick={handleConfirmAdd}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      {isRemoveModalOpen && (
        <div className={styles.modalBackdrop} onClick={handleCloseRemoveModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalBody}>
              <p>Tem certeza que deseja remover a reserva selecionada?</p>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.modalConfirmButton} onClick={handleConfirmRemove}>
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}