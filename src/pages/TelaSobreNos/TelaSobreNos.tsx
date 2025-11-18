import styles from '../TelaAtuacao/TelaAtuacao.module.css'; 

export function TelaSobreNos() {
  return (
    <>
      <h1 className={styles.title}>Sobre nós</h1>

      <p className={styles.introParagraph}>
        <strong>Classify</strong>, um serviço de gestão e organização de escalas
        de aulas para instituições educacionais e professores das mesmas.
      </p>

      <div className={styles.contentGrid}>
        
        <div className={styles.card}>
          <h3>Diferencial:</h3>
          <p>
            Ele oferece um algoritmo de escalas, visualização de quadro de
            aulas para os docentes e visualização de salas por turma e
            notificações de alterações na escala dos professores.
          </p>
        </div>

        <div className={styles.card}>
          <h3>Objetivo:</h3>
          <p>
            Seu objetivo é facilitar a criação e organização de escalas de
            aulas para os professores das instituições de ensino.
          </p>
        </div>
      </div>
    </>
  );
}