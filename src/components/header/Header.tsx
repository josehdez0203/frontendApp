import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
interface datos {
  jwtToken: string;
  logOut: any;
}
export const Header: React.FC<datos> = ({ logOut, jwtToken }) => {
  const isLogged = jwtToken.length > 0;
  return (
    <header className={styles.header}>
      <div className={styles.titulo}>HEADER</div>
      <div className={styles.menu}>
        <ul>
          {isLogged && (
            <>
              <li className={styles.item}>
                <Link to="/">Home</Link>
              </li>
              <li className={styles.item}>
                <a href="#!" onClick={logOut}>
                  Salir
                </a>
              </li>
            </>
          )}
          {!isLogged && (
            <>
              <li className={styles.item}>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};
