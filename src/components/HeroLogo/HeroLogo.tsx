import styles from "./HeroLogo.module.css";
import logoIcon from "../../assets/Logo.png";
export function HeroLogo() {
  return (
    <div className={styles.container}>
      {<img className={styles.icon} alt="Logo Icon" src={logoIcon} />}

      <div className={styles.textContainer}>
        <h1 className={styles.title}>Classify</h1>
        <p className={styles.subtitle}>seu programa de escalas escolares</p>
      </div>
    </div>
  );
}
