import React from "react";
import styles from "../styles";
import { chevronDown } from "../assets";

const SwapIn = ({ placeholder, value, onChange, token, onClick }) => {
  return (
    <div>
      <div className={`${styles.amountContainer}`}>
        <input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${styles.amountInput}`}
        />
        <div className="relative" onClick={onClick}>
          <button className={`${styles.currencyButton} gap-2`}>
            <img
              src={token.img}
              alt="tokenlogo"
              className={`w-8 h-8 object-contain`}
            />
            {token.ticker}
            <img
              src={chevronDown}
              alt="cheveron-down"
              className={`w-4 h-4 object-contain ml-2`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapIn;
