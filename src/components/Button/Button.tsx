import React from "react";
import styles from "./Button.module.css";
import { NavLink } from "react-router-dom"; // 1. Importe o NavLink

interface ButtonProps {
  children: React.ReactNode;
  variant: "nav" | "primary";
  href?: string; // 2. Adicione a prop 'href' (opcional)
}

export function Button({ children, variant, href }: ButtonProps) {
  // 3. Função para definir as classes CSS
  // O NavLink do React Router dá-nos um 'isActive' de graça!
  const getButtonClasses = ({ isActive = false } = {}) => {
    return `
      ${styles.buttonBase}
      ${isActive ? styles.active : styles[variant]}
    `;
  };

  // 4. Se o botão tiver 'href', renderiza um NavLink
  if (href) {
    return (
      <NavLink to={href} className={getButtonClasses}>
        {children}
      </NavLink>
    );
  }

  // 5. Se não, renderiza um botão normal
  return <button className={getButtonClasses()}>{children}</button>;
}
