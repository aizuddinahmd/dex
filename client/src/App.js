import React from "react";
import styles from "./styles";
import { uniswapLogo } from "./assets";
import { Loader, Exchange } from "./components";
import WalletButton from "./components/WalletButton";

function App() {
  return (
    <div className={`${styles.container} bg-black`}>
      <div className={`${styles.innerContainer}`}>
        <header className={`${styles.header}`}>
          <img
            src={uniswapLogo}
            alt="logo"
            className="w-16 h-16 object-contain"
          />
          <WalletButton />
        </header>
        <div className={`${styles.exchangeContainer}`}>
          <div className={`${styles.headTitle}`}>Swap Your Token</div>
          <div className={`${styles.exchangeBoxWrapper}`}>
            <div className={`${styles.exchangeBox}`}>
              <div className="pink_gradient" />
              <div className={`${styles.exchange}`}>
                {/* <Loader title="Please wait" /> */}
                <Exchange />
              </div>
              <div className="blue_gradient" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
