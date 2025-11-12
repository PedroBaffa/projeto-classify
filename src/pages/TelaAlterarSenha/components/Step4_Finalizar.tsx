import React from "react";
import { Link } from "react-router-dom";

interface step4Props {
    styles: any;
}

export function Step4_Finalizar({ styles }: step4Props) {
    return (
        <div className={styles.formWrapper}>
            <h1 className={styles.title}>Oba, Terminamos seu perfil!</h1>

            <p className={styles.completiontext}>
                Agora, Nosso algoritmo irá organizar sua escala baseado nas suas preferências e a dos outros professores da sua istituição.
            </p>
            <p className={styles.completiontext}>
                Aperte o botão para ir para o seu dashboard de aulas e explorar todas as outras funcionalidades da plataforma!
            </p>

            <Link to="/dashboard" className={styles.formButton}>
                Continuar
            </Link>
        </div>
    );
}