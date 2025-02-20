/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

"use client";

import { useState, useEffect } from "react";
import Web3 from "web3";
import CONTRACT_ABI from './ABI.json'
import { CONTRACT_ADDRESS } from "../utils/constants";
declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      const contractInstance = new web3Instance.eth.Contract(
        CONTRACT_ABI as any,
        CONTRACT_ADDRESS
      );
      setContract(contractInstance);
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

  const generateSalt = (name: string,symbol: string,  supply: string) => {

  }
  return { web3, account, connectWallet, generateSalt, error };
};
