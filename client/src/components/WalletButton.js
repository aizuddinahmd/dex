import React, { useState } from "react";
import { useConnect, useAccount, address } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import styles from "../styles";

const WalletButton = () => {
  const [account, setAccount] = useState("");

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  return (
    <button className={`${styles.walletButton}`} onClick={connect}>
      {isConnected
        ? address.slice(0, 4) + "..." + address.slice(38)
        : "Connect Wallet"}
    </button>
  );
};

export default WalletButton;
