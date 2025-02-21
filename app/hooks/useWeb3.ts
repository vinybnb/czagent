/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/** @format */

"use client";

import { useState, useEffect } from "react";
import Web3 from "web3";
import CONTRACT_ABI from "./ABI.json";
import { CONTRACT_ADDRESS } from "../utils/constants";
import { message } from "antd";
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
    const savedAccount = localStorage.getItem("walletAddress");
    if (savedAccount) {
      setAccount(savedAccount);
    }
  }, []);
  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      const contractInstance = new web3Instance.eth.Contract(
        CONTRACT_ABI,
        CONTRACT_ADDRESS
      );
      setContract(contractInstance);
    }
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      message.error("🚨 MetaMask not detected! Please install it.");
      return null;
    }

    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();

      if (accounts.length === 0) {
        message.error("🛑 Please connect your wallet!");
        return null;
      }
      setAccount(accounts[0]);
      localStorage.setItem("walletAddress", accounts[0]);
      return accounts[0];
    } catch (error) {
      console.error("❌ Error checking wallet:", error);
      message.error("❌ Failed to check wallet. Please try again!");
      return null;
    }
  };
  const connectWallet = async () => {
    if (!window.ethereum) {
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      localStorage.setItem("walletAddress", accounts[0]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      setError(error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    localStorage.removeItem("walletAddress");
  };
  const generateSalt = async (
    deployer: string,
    name: string,
    symbol: string,
    supply: string
  ) => {
    if (!contract) return;
    const result = await contract.methods
      .generateSalt(deployer, name, symbol, supply)
      .call();
    return {
      salt: result.salt,
      token: result.token,
    };
  };
  const deployToken = async (
    name: string,
    symbol: string,
    supply: number,
    initialTick: number,
    fee: number,
    salt: string,
    id: string
  ) => {
    await checkWalletConnection();
    if (!contract) return null;

    try {
      const simulationResult = await contract.methods
        .deployToken(name, symbol, supply, initialTick, fee, salt, id)
        .estimateGas({ from: account });
      console.log("simulationResult", simulationResult);

      const result = await contract.methods
        .deployToken(name, symbol, supply, initialTick, fee, salt, id)
        .send({ from: account });

      return {
        token: result.events.TokenDeployed.returnValues.token,
        tokenId: Number(result.events.TokenDeployed.returnValues.tokenId),
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    web3,
    account,
    connectWallet,
    generateSalt,
    error,
    disconnectWallet,
    deployToken,
  };
};
