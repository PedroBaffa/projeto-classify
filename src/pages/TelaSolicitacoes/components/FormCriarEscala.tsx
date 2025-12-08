import { useState } from "react";
import styles from "./FormCriarEscala.module.css";
import { useEffect } from "react";
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

export function FormCriarEscala({ onCancel }: FormProps) {
  
  const [selectedUC, setSelectedUC] = useState<number>(0);
  const [selectedTurma, setSelectedTurma] = useState<string>("");
  const [selectedPeriodo, setSelectedPeriodo] = useState<string>("tarde");
  const [isSendModalOpen, setIsSendModalOpen] = useState<boolean>(false);
  const { data: mockData } = useMockData();
  const [ucsState, setUcsState] = useState<UC[]>([]);
  const [description, setDescription] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  

  useEffect(() => {
    const list = Array.isArray(mockData.ucs) ? mockData.ucs : [];
    setUcsState(list);
    if (list.length > 0 && selectedUC === 0) {
      setSelectedUC(list[0].id);
      setSelectedTurma(list[0].turmas?.[0] ?? "");
    }
  }, [mockData]);

  const ucInfo: UC = (ucsState.find((uc: UC) => uc.id === selectedUC) as UC) || (ucsState[0] as UC) || ({ id: 0, nome: '', turmas: [] } as UC);
  const turmasDaUC: string[] = ucInfo?.turmas && Array.isArray(ucInfo.turmas) ? ucInfo.turmas : [];

  const today = new Date();
  const [displayYear, setDisplayYear] = useState<number>(today.getFullYear());
  const [displayMonth, setDisplayMonth] = useState<number>(today.getMonth());

  function buildMonthDays(yr: number, mth: number) {
    const last = new Date(yr, mth + 1, 0);
    const days: Date[] = [];
    for (let d = 1; d <= last.getDate(); d++) {
      days.push(new Date(yr, mth, d));
    }
    return days;
  }

  const monthDays = buildMonthDays(displayYear, displayMonth);

  function prevMonth() {
    setDisplayMonth((m) => {
      if (m === 0) {
        setDisplayYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }

  function nextMonth() {
    setDisplayMonth((m) => {
      if (m === 11) {
        setDisplayYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }

  function weekdayName(date: Date) {
    const names = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
    return names[date.getDay()];
  }

  const classWeekdays = Array.isArray(ucInfo.dias) ? ucInfo.dias : [];

  function toggleDay(d: Date) {
    const key = d.toISOString().slice(0,10);
    setSelectedDays((prev) => prev.includes(key) ? prev.filter(x => x !== key) : [...prev, key]);
  }

  const handleOpenSendModal = () => {
    setIsSendModalOpen(true);
  };
  const handleCloseSendModal = () => {
    setIsSendModalOpen(false);
  };
  const handleConfirmSend = () => {
    const titulo = `Alteração de escala (${selectedPeriodo})`;
    const nova: any = {
      id: Date.now(),
      tipo: 'escala',
      titulo,
      status: 'pendente',
      descricao: description || titulo,
      ucId: selectedUC,
      turma: selectedTurma,
      periodo: selectedPeriodo,
      datas: selectedDays,
      criadoEm: new Date().toISOString()
    };

    (async () => {
      try {
        const resp = await fetch('/api/mock-data');
        const data = await resp.json();
        data.solicitacoes = Array.isArray(data.solicitacoes) ? data.solicitacoes : [];
        data.solicitacoes.push(nova);
        await fetch('/api/mock-data', { method: 'PUT', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(data) });
        try {
          window.dispatchEvent(new CustomEvent('solicitacaoCreated', { detail: nova }));
        } catch (e) {
          // ignore if dispatch not available
        }
      } catch (err) {
        console.error('Erro ao enviar solicitação:', err);
      }
      handleCloseSendModal();
      onCancel();
    })();
  };
  

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>Alterar Escala</h2>
          <button onClick={onCancel} className={styles.backButton}>Voltar</button>
        </div>

        <div className={styles.controls}>
           <select 
            className={styles.dropdown}
            value={selectedUC}
            onChange={(e) => setSelectedUC(Number(e.target.value))}
           >
             {ucsState.map((uc: UC) => (
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
            {turmasDaUC.map((turma: string, i: number) => (
              <option key={i} value={turma}>{turma}</option>
            ))}
           </select>
        </div>

        <div className={styles.formBody}>
          
          <div className={styles.calendarColumn}>
            <div className={styles.calendarHeader}>
              <span>{displayYear} - {displayMonth + 1}</span>
              <div>
                <button className={styles.navButton} onClick={prevMonth}>&lt;</button>
                <button className={styles.navButton} onClick={nextMonth}>&gt;</button>
              </div>
            </div>
            <div className={styles.calendarGrid}>
              <div className={styles.dayName}>D</div><div className={styles.dayName}>S</div><div className={styles.dayName}>T</div><div className={styles.dayName}>Q</div><div className={styles.dayName}>Q</div><div className={styles.dayName}>S</div><div className={styles.dayName}>S</div>
              {monthDays.map((d) => {
                const key = d.toISOString().slice(0,10);
                const isToday = key === today.toISOString().slice(0,10) && displayYear === today.getFullYear() && displayMonth === today.getMonth();
                const isSelected = selectedDays.includes(key);
                const hasClass = classWeekdays.includes(weekdayName(d));
                const cls = [styles.day];
                if (isToday) cls.push(styles.dayAtual);
                if (isSelected) cls.push(styles.daySelecionado);
                if (hasClass) cls.push(styles.dayHasClass);
                return (
                  <div key={key} className={cls.join(' ')} onClick={() => toggleDay(d)}>
                    <div>{d.getDate()}</div>
                    {hasClass && <div className={styles.smallPill}>{ucInfo.nome}</div>}
                  </div>
                );
              })}
            </div>
            <div className={styles.legend}>
              <div><span className={`${styles.dot} ${styles.dotAtual}`}></span> Atual</div>
              <div><span className={`${styles.dot} ${styles.dotSelecionado}`}></span> Selecionado</div>
            </div>
          </div>

          <div className={styles.mainContentColumn}>
            <div className={styles.pillsContainer}>
              <div className={styles.pill}>{selectedTurma}</div>
              <div className={styles.pill}>{ucInfo.nome}</div>
              <div className={styles.pill}>{selectedPeriodo}</div>
            </div>
            <textarea
              className={styles.descricaoTextarea}
              placeholder="Escreva em detalhes sobre sua solicitação..."
              rows={10}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button 
              className={styles.sendButton} 
              onClick={handleOpenSendModal}
            >
              Enviar
            </button>
          </div>
        </div>
      </div> 

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
                className={styles.modalCancelButton}
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