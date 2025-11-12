// 1. REUTILIZAMOS OS ESTILOS DA PÁGINA "ATUAÇÃO"!
import styles from '../TelaAtuacao/TelaAtuacao.module.css'; 

export function TelaServicos() {
  return (
    // 2. Usamos as MESMAS classes CSS: .mainContent, .title, etc.
    <main className={styles.mainContent}>
      
      {/* 3. Trocamos apenas o conteúdo (texto) */}
      <h1 className={styles.title}>Serviços</h1>

      <p className={styles.introParagraph}>
        O <strong>Classify</strong> oferece uma gama de funcionalidades
        voltadas à organização acadêmica e à otimização da alocação
        docente. Confira os principais serviços oferecidos pela nossa
        plataforma:
      </p>

      <div className={styles.contentGrid}>
        
        {/* Card 1: Cadastro de Professores */}
        <div className={styles.card}>
          <h3>Cadastro de Professores com Preferências:</h3>
          <p>
            Permitimos que cada professor informe suas áreas de atuação,
            horários disponíveis, disciplinas preferidas e limites de carga
            horária, garantindo uma alocação mais justa e eficiente.
          </p>
        </div>

        {/* Card 2: Gestão Inteligente */}
        <div className={styles.card}>
          <h3>Gestão Inteligente de Turmas e Disciplinas:</h3>
          <p>
            Automatizamos a distribuição de professores conforme suas
            especializações e preferências, levando em conta as demandas da
            instituição.
          </p>
        </div>

        {/* (Pode adicionar mais cards aqui e o grid vai-se ajustar) */}
      </div>
    </main>
  );
}