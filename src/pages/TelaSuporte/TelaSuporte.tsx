import styles from '../TelaAtuacao/TelaAtuacao.module.css'; 

export function TelaSuporte() {
  return (
    <>
      <h1 className={styles.title}>Suporte</h1>

      <p className={styles.introParagraph}>
        O Classify oferece suporte técnico remoto para auxiliar na
        organização acadêmica, solucionando dúvidas e problemas
        operacionais de forma ágil e eficiente. Nosso atendimento é
        realizado por canais digitais, garantindo rapidez e
        praticidade.
      </p>

      <div className={styles.contentGrid}>
        
        <div className={styles.card}>
          <h3>Atendimento via WhatsApp e e-mail:</h3>
          <p>
            Equipe especializada pronta para responder dúvidas e orientar o
            uso do sistema.
          </p>
        </div>

        <div className={styles.card}>
          <h3>Suporte remoto personalizado:</h3>
          <p>
            Realizamos atendimentos por videochamada ou acesso remoto,
            conforme a necessidade da instituição.
          </p>
        </div>

        <div className={styles.card}>
          <h3>Treinamento online para usuários:</h3>
          <p>
            Oferecemos capacitações virtuais para professores, coordenadores
            e equipe administrativa.
          </p>
        </div>
      </div>
    </>
  );
}