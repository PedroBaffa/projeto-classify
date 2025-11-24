import { useEffect, useState } from "react";
import styles from "./TelaRelatorios.module.css";
import { HeroLogo } from "../../components/HeroLogo/HeroLogo";

type ActiveTab = "salas" | "ucs" | null;

export function TelaRelatorios() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);
  const [salas, setSalas] = useState<any[]>([]);
  const [ucs, setUcs] = useState<any[]>([]);
  const [selectedSalaIndex, setSelectedSalaIndex] = useState(0);

  useEffect(() => {
    fetch('/api/mock-data')
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setSalas(Array.isArray(data.salas) ? data.salas : []);
          setUcs(Array.isArray(data.ucs) ? data.ucs : []);
          setSelectedSalaIndex(0);
        }
      })
      .catch(() => {
        setSalas([]);
        setUcs([]);
      });
  }, []);

  const prevSala = () => {
    if (salas.length === 0) return;
    setSelectedSalaIndex((i) => (i - 1 + salas.length) % salas.length);
  };

  const nextSala = () => {
    if (salas.length === 0) return;
    setSelectedSalaIndex((i) => (i + 1) % salas.length);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "salas":
        return (
          <div key="salas" className={`${styles.scrollWrapper} ${styles.animatedContent}`}>
            {salas.map((sala) => (
              <div key={sala.id} className={styles.contentCard}>
                <h3 className={styles.cardTitle}>{sala.nome}</h3>
                <div className={styles.divider}></div>
                <div className={styles.availabilityList}>
                  <p>Disponibilidade</p>
                  {sala.disponibilidade.map((dia: any) => (
                    <div
                      key={dia.dia}
                      className={`${styles.diaPill} ${
                        dia.disponivel ? styles.diaDisponivel : styles.diaIndisponivel
                      }`}
                    >
                      {dia.dia}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "ucs":
        return (
          <div key="ucs" className={`${styles.scrollWrapper} ${styles.animatedContent}`}>
            {ucs.map((uc) => (
              <div key={uc.id} className={styles.contentCard}>
                <h3 className={styles.cardTitle}>{uc.nome}</h3>
                <div className={styles.divider}></div>
                <div className={styles.turmaList}>
                  {uc.turmas.map((turma: any, index: number) => (
                    <div key={index} className={styles.turmaPill}>
                      {turma}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div key="default" className={`${styles.placeholder} ${styles.animatedContent}`}>
            <HeroLogo />
          </div>
        );
    }
  };

  const selectedSala = salas[selectedSalaIndex] ?? null;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sidebar}>
        <h1 className={styles.titulo}>Relatórios</h1>
        
        <button
          className={activeTab === "salas" ? styles.navButtonActive : styles.navButton}
          onClick={() => setActiveTab("salas")}
        >
          Salas
        </button>

        <button
          className={activeTab === "ucs" ? styles.navButtonActive : styles.navButton}
          onClick={() => setActiveTab("ucs")}
        >
          UCs
        </button>

        {activeTab === "salas" && selectedSala && (
          <div className={styles.infoBox}>
            <div className={styles.infoNav}>
              <button onClick={prevSala} className={styles.arrowButton} aria-label="Anterior">{'<'}</button>
              <span>{selectedSala.nome}</span>
              <button onClick={nextSala} className={styles.arrowButton} aria-label="Próxima">{'>'}</button>
            </div>
            <p>
              Capacidade: <strong>{selectedSala.capacidade}</strong>
            </p>
          </div>
        )}
      </div>

      <div className={styles.contentArea}>
        {renderContent()}
      </div>
    </div>
  );
}