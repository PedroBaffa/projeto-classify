
import styles from '../TelaAtuacao/TelaAtuacao.module.css';

export function TelaServicos() {
  return (
    <main className={styles.mainContent}>

      <h1 className={styles.title}>Serviços</h1>

      <p className={styles.introParagraph}>
        O <strong>Classify</strong> oferece uma gama de funcionalidades
        voltadas à organização acadêmica e à otimização da alocação
        docente. Confira os principais serviços oferecidos pela nossa
        plataforma:
      </p>

      <div className={styles.contentGrid}>

        <div className={styles.card}>
          <h3>Cadastro de Professores com Preferências:</h3>
          <p>
            Permitimos que cada professor informe suas áreas de atuação,
            horários disponíveis, disciplinas preferidas e limites de carga
            horária, garantindo uma alocação mais justa e eficiente.
          </p>
        </div>

        <div className={styles.card}>
          <h3>Gestão Inteligente de Turmas e Disciplinas:</h3>
          <p>
            Automatizamos a distribuição de professores conforme suas
            especializações e preferências, levando em conta as demandas da
            instituição.
          </p>
        </div>

      </div>
    </main>
  );
}