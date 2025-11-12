import React from "react";
import styles from "./Button.module.css";
import { NavLink } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
  variant: "nav" | "primary";
  href?: string;
}

export function Button({ children, variant, href }: ButtonProps) {
  const getButtonClasses = ({ isActive = false } = {}) => {
    return `
      ${styles.buttonBase}
      ${isActive ? styles.active : styles[variant]}
    `;
  };

  if (href) {
    return (
      <NavLink to={href} className={getButtonClasses}>
        {children}
      </NavLink>
    );
  }

  return <button className={getButtonClasses()}>{children}</button>;
}
