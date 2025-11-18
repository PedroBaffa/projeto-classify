import styles from './TelaAtuacao.module.css'; 

export function TelaAtuacao() {
  return (
    <>
      <h1 className={styles.title}>Atuação</h1>

      <p className={styles.introParagraph}>
        O <strong>Classify</strong> é um sistema desenvolvido para auxiliar
        na organização e distribuição de professores em instituições de
        ensino. Atuamos em diferentes níveis da educação, oferecendo
        soluções práticas e eficientes tanto para ambientes públicos
        quanto privados:
      </p>

      <div className={styles.contentGrid}>
        
        <div className={styles.card}>
          <h3>Escolas Públicas:</h3>
          <p>
            Facilitamos o processo de alocação de professores, respeitando
            critérios pedagógicos e preferências individuais, otimizando o
            uso de recursos humanos nas redes municipais e estaduais.
          </p>
        </div>

        <div className={styles.card}>
          <h3>Escolas Particulares:</h3>
          <p>
            Oferecemos uma plataforma flexível que se adapta à grade
            curricular personalizada de cada instituição, garantindo melhor
            aproveitamento das especializações dos docentes e maior controle
            da gestão escolar.
          </p>
        </div>

        <div className={styles.card}>
          <h3>Faculdades e Instituições de Ensino Superior:</h3>
          <p>
            Auxiliamos na organização das unidades curriculares por
            período, curso e turma, promovendo clareza na distribuição das
            disciplinas e facilitando o planejamento semestral da equipe
            acadêmica.
          </p>
        </div>

      </div>
    </>
  );
}