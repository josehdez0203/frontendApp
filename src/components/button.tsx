import React from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
  children?: string;
}
export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};
