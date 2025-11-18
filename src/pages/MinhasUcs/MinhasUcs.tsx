import styles from "./MinhasUcs.module.css";

const mockUCs = [
  {
    id: 1,
    nome: "Cálculo 1",
    salas: ["Sala 301A", "Lab 1 (Bloco B)"],
    dias: ["Segunda-feira", "Quarta-feira"],
    cor: "laranja",
  },
  {
    id: 2,
    nome: "Física Experimental",
    salas: ["Laboratório de Física (Bloco A)"],
    dias: ["Terça-feira", "Quinta-feira"],
    cor: "azul",
  },
  {
    id: 3,
    nome: "Algoritmos e Estrutura de Dados",
    salas: ["Sala 205B"],
    dias: ["Segunda-feira", "Sexta-feira"],
    cor: "verde",
  },
  {
    id: 4,
    nome: "Projeto Interdisciplinar",
    salas: ["Sala 101A", "Sala 101B"],
    dias: ["Quarta-feira"],
    cor: "roxo",
  },
];

export function MinhasUCs() {
  return (
    <div className={styles.container}>
      <div className={styles.headerBar}>
        <h1 className={styles.titulo}>Minhas Unidades Curriculares</h1>

        <div className={styles.controlsContainer}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Procurar UC..."
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>🔍</span> 
          </div>

          <select className={styles.filterDropdown}>
            <option value="">Todos os Períodos</option>
            <option value="matutino">Matutino</option>
            <option value="vespertino">Vespertino</option>
            <option value="noturno">Noturno</option>
          </select>

          <button className={styles.actionButton}>Exportar</button>
        </div>
      </div>

      <div className={styles.gridContainer}>
        {mockUCs.map((uc) => (
          <div key={uc.id} className={`${styles.ucCard} ${styles[uc.cor]}`}>
            <h2 className={styles.ucTitulo}>{uc.nome}</h2>

            <div className={styles.detalheGrupo}>
              <h3 className={styles.detalheTitulo}>Salas:</h3>
              <div className={styles.pillsContainer}>
                {uc.salas.map((sala, index) => (
                  <span key={index} className={styles.pill}>
                    {sala}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.detalheGrupo}>
              <h3 className={styles.detalheTitulo}>Dias da Semana:</h3>
              <div className={styles.pillsContainer}>
                {uc.dias.map((dia, index) => (
                  <span key={index} className={styles.pill}>
                    {dia}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}