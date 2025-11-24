 

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HeroLogo } from "../../components/HeroLogo/HeroLogo";
import styles from "./TelaLogin.module.css";

 
import capelo1 from "../../assets/icons/capelo1.svg";
import livro1 from "../../assets/icons/livro1.svg";
import teacher1 from "../../assets/icons/teacher1.svg";
import livros1 from "../../assets/icons/livros1.svg";
import capelo2 from "../../assets/icons/capelo2.svg";
import livro2 from "../../assets/icons/livro2.svg";
import teacher2 from "../../assets/icons/teacher2.svg";

export function TelaLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        
        try { localStorage.setItem('userEmail', data.user.email); } catch {}
        navigate("/primeiro-login");
      } else {
        setError(data?.message || "Usuário ou senha inválidos.");
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await fetch('/api/mock-data');
        if (!resp.ok) return;
        const data = await resp.json();
        const firstUser = data?.users?.[0];
        if (mounted && firstUser) {
          setEmail(firstUser.email || '');
          setSenha(firstUser.senha || '');
        }
      } catch (err) {
        
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className={styles.loginPage}>
      <div className={styles.leftPanel}>
        <div className={styles.fallingItemsContainer}>
          <img
            src={capelo1}
            alt=""
            className={`${styles.item} ${styles.item1}`}
          />
          <img
            src={livro1}
            alt=""
            className={`${styles.item} ${styles.item2}`}
          />
          <img
            src={teacher1}
            alt=""
            className={`${styles.item} ${styles.item3}`}
          />
          <img
            src={livros1}
            alt=""
            className={`${styles.item} ${styles.item4}`}
          />
          <img
            src={capelo2}
            alt=""
            className={`${styles.item} ${styles.item5}`}
          />
          <img
            src={livro2}
            alt=""
            className={`${styles.item} ${styles.item6}`}
          />
          <img
            src={teacher2}
            alt=""
            className={`${styles.item} ${styles.item7}`}
          />
          <img
            src={capelo1}
            alt=""
            className={`${styles.item} ${styles.item8}`}
          />
          <img
            src={livro1}
            alt=""
            className={`${styles.item} ${styles.item9}`}
          />
          <img
            src={livros1}
            alt=""
            className={`${styles.item} ${styles.item10}`}
          />
        </div>

        
        <div className={styles.heroWrapper}>
          <HeroLogo />
        </div>
      </div>

      <div className={styles.rightPanel}>
        <h1 className={styles.title}>Bem-vindo!</h1>
        <p className={styles.subtitle}>É bom ter você aqui de novo.</p>


        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail ou RP:</label>
            <input
              type="text"
              id="email"
              className={styles.formInput}
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              className={styles.formInput}
              value={senha}
              onChange={e => setSenha(e.target.value)}
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          {error && <div style={{ color: "#c00", marginBottom: 8 }}>{error}</div>}

          <button
            type="submit"
            className={styles.formButton}
            disabled={loading || !email || !senha}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className={styles.signupLink}>
          Professor, não tem uma conta ainda?
          <Link to="/cadastro"> Cadastre-se!</Link>
        </p>
      </div>
    </div>
  );
}
