/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

"use client";

import { useState, useEffect } from "react";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      setError(error);
    }
  };

  return { web3, account, connectWallet, error };
};
