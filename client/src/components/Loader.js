import React from "react";
import styles from "../styles";
import { ethereumLogo } from "../assets";

const Loader = ({ title }) => {
  return (
    <div className={`${styles.loader}`}>
      <img src={ethereumLogo} alt="ethlogo" className={`${styles.loaderImg}`} />
      <div className={`${styles.loaderText}`}>{title}</div>
    </div>
  );
};

export default Loader;
