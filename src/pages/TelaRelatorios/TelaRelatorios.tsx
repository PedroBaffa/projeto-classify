import { useState } from "react";
import styles from "./TelaRelatorios.module.css";
import { HeroLogo } from "../../components/HeroLogo/HeroLogo";
import { mockSalas, mockUCs } from "../../data/mockData";

type ActiveTab = "salas" | "ucs" | null;

export function TelaRelatorios() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);
  const [salaSelecionada] = useState(mockSalas[0]);

  const renderContent = () => {
    switch (activeTab) {
      case "salas":
        return (
          <div key="salas" className={`${styles.scrollWrapper} ${styles.animatedContent}`}>
            {mockSalas.map((sala) => (
              <div key={sala.id} className={styles.contentCard}>
                <h3 className={styles.cardTitle}>{sala.nome}</h3>
                <div className={styles.divider}></div>
                <div className={styles.availabilityList}>
                  <p>Disponibilidade</p>
                  {sala.disponibilidade.map((dia) => (
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
            {mockUCs.map((uc) => (
              <div key={uc.id} className={styles.contentCard}>
                <h3 className={styles.cardTitle}>{uc.nome}</h3>
                <div className={styles.divider}></div>
                <div className={styles.turmaList}>
                  {uc.turmas.map((turma, index) => (
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

        {activeTab === "salas" && (
          <div className={styles.infoBox}>
            <div className={styles.infoNav}>
              <span>{'<'}</span>
              <span>{salaSelecionada.nome}</span>
              <span>{'>'}</span>
            </div>
            <p>
              Capacidade: <strong>{salaSelecionada.capacidade}</strong>
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