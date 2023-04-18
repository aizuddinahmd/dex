import React, { useState } from "react";
import styles from "../styles";
import { chevronDown } from "../assets";
import { Modal } from "antd";
import { tokenList } from "../constant";
import SwapIn from "./SwapIn";
import SwapOut from "./SwapOut";
import { useAccount, useSendTransaction } from "wagmi";
import axios from "axios";

const Exchange = () => {
  const { address, isConnected } = useAccount();
  const [tokenOneAmount, setTokenOneAmount] = useState("");
  const [tokenTwoAmount, setTokenTwoAmount] = useState("");
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState("");
  const [txDetails, setTxDetails] = useState({
    to: "",
    from: "",
    value: "",
  });

  const { data, sendTransaction } = useSendTransaction({
    request: {
      from: address,
      to: String(txDetails.to),
      data: String(txDetails.data),
      value: String(txDetails.value),
    },
  });

  const changeAmount = (e) => {
    setTokenOneAmount(e.target.value);
    if (e.target.value && prices) {
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2));
    } else {
      setTokenTwoAmount("");
    }
  };

  const fetchPrices = async (one, two) => {
    const res = await axios.get(`http://localhost:3001/tokenPrice`, {
      params: { addressOne: one, addressTwo: two },
    });

    setPrices(res.data);
  };

  const switchToken = () => {
    setTokenOneAmount("");
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    fetchPrices(two.address, one.address);
  };

  const modifyToken = (i) => {
    if (changeToken === 1) {
      setTokenOne(tokenList[i]);
      fetchPrices(tokenList[i].address, tokenTwo.address);
    } else {
      setTokenTwo(tokenList[i]);
      fetchPrices(tokenOne.address, tokenList[i].address);
    }
    setIsOpen(false);
  };

  const openModal = (asset) => {
    setChangeToken(asset);
    setIsOpen(true);
  };

  const fetchSwap = async () => {
    const allowance = await axios.get(
      `https://api.1inch.io/v5.0/1/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`
    );

    if (allowance.data.allowance === "0") {
      const approve = await axios.get(
        `https://api.1inch.io/v5.0/1/approve/transaction?tokenAddress=${tokenOne.address}`
      );

      setTxDetails(approve.data);
      console.log("not approved");
      return;
    }

    const tx = await axios.get(
      `https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${
        tokenOne.address
      }&toTokenAddress=${tokenTwo.address}&amount=${tokenOneAmount.padEnd(
        tokenOne.decimals + tokenOneAmount.length,
        "0"
      )}&fromAddress=${address}`
    );

    let decimals = Number(`1E${tokenTwo.decimals}`);
    setTokenTwoAmount((Number(tx.data.toTokenAmount) / decimals).toFixed(2));

    setTxDetails(tx.data.tx);
  };

  return (
    <>
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title="Select a token"
      >
        <div className={`${styles.currencyList} flex flex-col`}>
          {tokenList?.map((e, i) => {
            return (
              <div
                key={i}
                className={`${styles.currencyListItem} flex justify-between`}
                onClick={() => modifyToken(i)}
              >
                <img src={e.img} className={`h-10 w-10 object-contain`} />
                <div>{e.name}</div>
                <div>{e.ticker}</div>
              </div>
            );
          })}
        </div>
      </Modal>
      <div>
        <div className="">
          <SwapIn
            placeholder="0"
            value={tokenOneAmount}
            onChange={changeAmount}
            onClick={() => openModal(1)}
            token={tokenOne}
          />
        </div>
        <div className={`flex justify-center`}>
          <img
            src={chevronDown}
            alt="down"
            className={`w-8 h-8 object-contain cursor-pointer`}
            onClick={switchToken}
          />
        </div>
        <div className="mb-8">
          <SwapOut
            placeholder="0"
            value={tokenTwoAmount}
            onClick={() => openModal(2)}
            token={tokenTwo}
            disabled={true}
          />
        </div>
        <button
          className={`${styles.actionButton} bg-site-pink`}
          onClick={fetchSwap}
        >
          Swap
        </button>
      </div>
    </>
  );
};

export default Exchange;
