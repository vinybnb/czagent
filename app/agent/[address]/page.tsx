/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

"use client";

import { RocketOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Dropdown, Layout, Row, } from "antd";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
const { Content } = Layout;
import useIsMobile from "@/app/hooks/useIsMobile";
import { useWeb3 } from "@/app/hooks/useWeb3";
import { TokenData } from "@/app/page";
import {
  Address,
  BoxInfo,
  ButtonGuide,
  CustomButton,
  InputSearch,
  SearchBox,
} from "@/app/styled";
import { API_ENDPOINT } from "@/app/utils/constants";
import { getFirstAndLastString, getShortenedAddress } from "@/app/utils/helper";
import {
  Chart,
  IconBuySell,
  IconChartBtn,
  IconInfo,
  IconSearch,
  World,
  IconMenu,
} from "@/public/elements/icon";
import { useRouter } from "next/navigation";
import MenuBar from "@/app/components/Menu";
import { toast } from "react-toastify";

type Item = "buy/sell" | "chart" | "info";
type DeployTokenInfoType = {
  name: string;
  symbol: string;
  supply: number;
  initialTick: number;
  fee: number;
  id: string;
  salt: string;
};
export default function TokenPage() {
  // Get the address from the URL
  const isMobile = useIsMobile();
  const router = useRouter();
  const {
    account,
    connectWallet,
    generateSalt,
    deployToken,
    checkWalletConnection,
    disconnectWallet,
  } = useWeb3();
  const [token, setToken] = useState<TokenData | undefined>(undefined);
  const [item, setItem] = useState<Item>("chart");
  const [isOpened, setIsOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const deployTokenInfo = useRef<DeployTokenInfoType | undefined>();
  const [isCallCA, setIsCallCA] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simulating loading
  }, []);

  // const [cap, setCap] = useState(0);
  const [search, setSearch] = useState("");

  const params = useParams();
  useEffect(() => {
    (async () => {
      const { address } = params;
      const tokenRes = await axios.post(`${API_ENDPOINT}/czagents/gettoken`, {
        address: address,
        tokenid: address,
        chain: 8453,
      });
      // const dexScreenerRes = await axios.get(
      //   `https://api.dexscreener.com/latest/dex/tokens/${address}`
      // );
      // const data = dexScreenerRes.data;
      // if (data.pairs && data.pairs.length) {
      //   setCap(data.pairs[0].marketCap);
      // }
      const tokenDetail = tokenRes.data;
      if (tokenDetail && account) {
        const saltData = await generateSalt(
          account,
          tokenDetail.name,
          tokenDetail.symbol,
          tokenDetail.supply
        );
        deployTokenInfo.current = {
          name: tokenDetail.name,
          symbol: tokenDetail.symbol,
          id: tokenDetail.tokenId,
          supply: 1000000000000000000000000,
          fee: 10000,
          initialTick: -140000,
          salt: saltData?.salt,
        };
        console.log("salt", saltData);
      }
      setToken(tokenRes.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, account]);

  const onChange = (item: Item) => {
    setItem(item);
  };

  const handleDeployToken = async () => {
    checkWalletConnection();
    if (!deployTokenInfo.current) {
      return;
    }
    setIsCallCA(true);
    try {
      const deployInfo = deployTokenInfo.current;
      const resultDeploy = await deployToken(
        deployInfo.name,
        deployInfo.symbol,
        deployInfo.supply,
        deployInfo.initialTick,
        deployInfo.fee,
        deployInfo.salt,
        deployInfo.id
      );
      if (resultDeploy?.token && resultDeploy?.tokenId) {
        console.log("✅ Deployment successful:", resultDeploy);
        setTimeout(() => {
          window.location.reload();
        }, 10000);
      }
    } catch (error: any) {
      setIsCallCA(false);
      toast.error("❌ Deployment failed:", error);
    }
  };

  const handleToggleMenu = () => {
    setIsOpened(!isOpened);
  };
  const WalletButton = () => {
    return (
      <Dropdown
        overlay={
          <div onClick={disconnectWallet} className="bg-[#222222] font-bold text-[#ffffff] cursor-pointer  w-full rounded-lg p-3">
              Disconnect
          </div>
        }
        trigger={["click"]}
      >
        <div className="cursor-pointer font-bold">
          {getShortenedAddress(account as string)}
        </div>
      </Dropdown>
    );
  };
  return (
    <div className="relative">
      {isCallCA && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      )}
      <MenuBar isOpen={isOpened} setIsOpen={setIsOpened} />
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-500 animate-pulse"></div>
      ) : (
        <Layout>
          <div className="sticky top-0 z-100 items-center flex justify-center bg-[#1a1a1a] py-2">
            <div className="md:w-4/5 w-full p-2">
              <Row>
                <Col
                  span={12}
                  md={4}
                  className="flex justify-start items-center mb-3 sm:mb-0"
                >
                  <Link href="/" className="flex items-center gap-3">
                    <Image
                      src="/images/logo/logo.png"
                      width={60}
                      height={60}
                      alt="logo"
                      className="sm:w-[60px] sm:h-[60px] w-[40px] h-[40px]"
                    />
                    <span className="text-white font-bold sm:text-xl text-lg">
                      CZ AGENTS
                    </span>
                  </Link>
                </Col>

                {isMobile && (
                  <Col
                    span={12}
                    md={4}
                    className="flex justify-end items-center"
                  >
                    <ButtonGuide
                      onClick={() => router.push("https://x.com/czagents")}
                    >
                      Create Agent
                    </ButtonGuide>
                    <button onClick={handleToggleMenu}>
                      <IconMenu />
                    </button>
                  </Col>
                )}
                <Col span={24} md={14}>
                  <SearchBox>
                    <IconSearch />
                    <InputSearch
                      type="text"
                      width="100%"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search by agent name, symbol or requestor ...."
                    />
                  </SearchBox>
                </Col>

                {!isMobile && (
                  <Col
                    span={24}
                    md={6}
                    className="flex justify-end items-center"
                  >
                    <ButtonGuide
                      onClick={() => router.push("https://x.com/czagents")}
                    >
                      <span className="font-bold">Create Agent</span>
                    </ButtonGuide>
                    <ButtonGuide>
                      {account ? (
                        <WalletButton />
                      ) : (
                        <div onClick={connectWallet} className="font-bold">
                          Connect wallet
                        </div>
                      )}
                    </ButtonGuide>
                  </Col>
                )}
              </Row>
            </div>
          </div>
          <Content
            style={{
              marginTop: "20px",
              height: isMobile ? "100%" : "calc(100vh - 415px)",
              padding: isMobile ? "0 4px" : "0 80px",
            }}
          >
            {token ? (
              <Row gutter={8} className="md:flex hidden text-white">
                <Col span={16}>
                  <div>
                    {token.contractAddress ? (
                      <iframe
                        style={{
                          width: "100%",
                          border: "none",
                          height: "calc(100vh - 280px)",
                          borderRadius: "20px",
                          overflow: "hidden",
                        }}
                        src={`https://dexscreener.com/bsc/${token?.poolAddress}?embed=1&loadChartSettings=0&info=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=1&chartType=usd&interval=15`}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          border: "none",
                          height: "calc(100vh - 280px)",
                          borderRadius: "20px",
                          overflow: "hidden",
                          position: "relative",
                          paddingTop: "20%",
                          left: "40%",
                          // textAlign: 'center'
                        }}
                      >
                        <Button
                          style={{
                            position: "absolute",
                            backgroundColor: "#FFCC00",
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                            padding: "30px 20px",
                          }}
                          onClick={handleDeployToken}
                        >
                          <RocketOutlined></RocketOutlined>
                          Launch {token.symbol}
                        </Button>
                      </div>
                    )}
                  </div>
                  <BoxInfo className="truncate">
                    <div className="flex">
                      <Avatar
                        size={60}
                        shape="square"
                        icon={<UserOutlined />}
                        src={token.userPicture || null}
                      />

                      <div className="ml-4 flex flex-col justify-center">
                        <div className="inline-block">
                          <span className="mr-5 font-semibold">
                            {token.usernameDisplay}
                          </span>
                          <span className="text-[#7a7a7a]">
                            @{token.username}
                          </span>
                        </div>
                        <div>
                          <p>{token.message}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-white">
                      <CustomButton className="px-4 py-2 rounded-2xl">
                        <Link href={token.messageUrl ?? `/`} target="_blank">
                          <div className="flex items-center">
                            <World />
                            <span className="ml-2">Website</span>
                          </div>
                        </Link>
                      </CustomButton>
                      {token.contractAddress && (
                        <CustomButton
                          className="ml-4 px-4 py-2 rounded-2xl"
                          onClick={() =>
                            window.open(
                              `https://dexscreener.com/bsc/${token.poolAddress}`,
                              "_blank"
                            )
                          }
                        >
                          <div className="flex items-center">
                            <Chart />
                            <span className="ml-2">Chart</span>
                          </div>
                        </CustomButton>
                      )}
                    </div>
                  </BoxInfo>
                </Col>

                <Col span={8} className="flex flex-col justify-between">
                  <BoxInfo className="truncate">
                    <div className="flex">
                      <Avatar
                        shape="square"
                        size={60}
                        src={token.image || null}
                      >
                        {token.symbol}
                      </Avatar>

                      <div className="ml-4 flex flex-col justify-center">
                        <div className="text-xs md:text-lg font-bold ">
                          {token.name} ({token.symbol})
                        </div>
                        <div>
                          {token.contractAddress && (
                            <Address className="text-[#656565]">
                              Address:{" "}
                              <a
                                target="_blank"
                                href={`https://bscscan.com/address/${token.contractAddress}`}
                              >
                                {getFirstAndLastString(token.contractAddress)}
                              </a>
                            </Address>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className=" text-base">24h Volume:</span>
                      <span className=" text-base">
                        ${Number(token.volume24h).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className=" text-base">Marketcap:</span>
                      <span className=" text-base">
                        ${Number(token.marketCap).toLocaleString()}
                      </span>
                    </div>
                  </BoxInfo>
                  <div className="mt-2">
                    {" "}
                    <iframe
                      style={{
                        width: "100%",
                        border: "none",
                        height: "calc(100vh - 300px)",
                        borderRadius: "20px",
                      }}
                      src={`https://pancakeswap.finance/?outputCurrency=${token?.contractAddress}`}
                    />
                  </div>
                </Col>
              </Row>
            ) : (
              <div className="w-full justify-center flex-col items-center text-2xl h-1/2 flex">
                <span>Token not found !</span>
              </div>
            )}
          </Content>

          <div className="flex md:hidden">
            <Row className="text-black w-full px-2">
              {item == "buy/sell" && (
                <div className="w-full">
                  {" "}
                  <iframe
                    style={{
                      width: "100%",
                      border: "none",
                      height: "calc(100vh - 200px)",
                      borderRadius: "20px",
                    }}
                    src={`https://pancakeswap.finance/?outputCurrency=${token?.contractAddress}`}
                  />
                </div>
              )}
              {item == "chart" && (
                <div className="w-full">
                  <iframe
                    style={{
                      width: "100%",
                      border: "none",
                      height: "calc(100vh - 200px)",
                      borderRadius: "20px",
                      overflow: "hidden",
                    }}
                    src={`https://dexscreener.com/bsc/${token?.poolAddress}?embed=1&loadChartSettings=0&info=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=1&chartType=usd&interval=15`}
                  />
                </div>
              )}

              {item == "info" && (
                <div
                  style={{ height: "calc(100vh - 200px)" }}
                  className="w-full"
                >
                  {token && (
                    <BoxInfo className="truncate">
                      <div className="flex">
                        <Avatar
                          shape="square"
                          size={60}
                          src={token.image || null}
                        >
                          {token.symbol}
                        </Avatar>

                        <div className="ml-4 flex flex-col justify-center">
                          <div className="text-xs md:text-lg font-bold ">
                            {token.name} ({token.symbol})
                          </div>
                          <div>
                            <Address className="text-[#656565]">
                              Address:{" "}
                              <a
                                target="_blank"
                                href={`https://bscscan.com/address/${token.contractAddress}`}
                              >
                                {getFirstAndLastString(token.contractAddress)}
                              </a>
                            </Address>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className=" text-base">24h Volume:</span>
                        <span className=" text-base">${token.volume24h}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className=" text-base">Marketcap:</span>
                        <span className=" text-base">${token.marketCap}</span>
                      </div>
                    </BoxInfo>
                  )}
                  {token && (
                    <BoxInfo className="truncate">
                      <div className="flex">
                        <Avatar
                          size={60}
                          shape="square"
                          icon={<UserOutlined />}
                          src={token.userPicture || null}
                        />

                        <div className="ml-4 flex flex-col justify-center">
                          <div className="inline-block">
                            <span className="mr-5 font-semibold">
                              {token.usernameDisplay}
                            </span>
                            <span className="text-[#7a7a7a]">
                              @{token.username}
                            </span>
                          </div>
                          <div>
                            <p>{token.message}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <CustomButton className="px-4 py-2 bg-[#A7E5FF] rounded-2xl">
                          <Link href={token.messageUrl ?? `/`} target="_blank">
                            <div className="flex items-center">
                              <World />
                              <span className="ml-2">Website</span>
                            </div>
                          </Link>
                        </CustomButton>
                        {token.contractAddress && (
                          <CustomButton
                            className="ml-4 px-4 py-2 rounded-2xl"
                            onClick={() =>
                              window.open(
                                `https://dexscreener.com/bsc/${token.poolAddress}`,
                                "_blank"
                              )
                            }
                          >
                            <div className="flex items-center">
                              <Chart />
                              <span className="ml-2">Chart</span>
                            </div>
                          </CustomButton>
                        )}
                      </div>
                    </BoxInfo>
                  )}
                </div>
              )}

              <Row className="w-full justify-between bg-[#FFCC00] border-2 border-black rounded-xl px-4 py-2 mt-2">
                <button
                  className={`text-base font-semibold px-2 py-1 border-black rounded-xl border-2`}
                  onClick={() => onChange("buy/sell")}
                >
                  <div className="flex items-center">
                    <div className="w-[30px] h-[30px] bg-black flex justify-center items-center rounded-md">
                      <IconBuySell />
                    </div>
                    <span className="ml-2">Buy/Sell</span>
                  </div>
                </button>
                <button
                  className={`text-base font-semibold px-2 py-1 border-black rounded-xl border-2`}
                  onClick={() => onChange("chart")}
                >
                  <div className="flex items-center">
                    <div className="w-[30px] h-[30px] bg-black flex justify-center items-center rounded-md">
                      <IconChartBtn />
                    </div>
                    <span className="ml-2">Chart</span>
                  </div>
                </button>
                <button
                  className={`text-base font-semibold px-2 py-1 border-black rounded-xl border-2`}
                  onClick={() => onChange("info")}
                >
                  <div className="flex items-center">
                    <div className="w-[30px] h-[30px] bg-black flex justify-center items-center rounded-md">
                      <IconInfo />
                    </div>
                    <span className="ml-2">Info</span>
                  </div>
                </button>
              </Row>
            </Row>
          </div>
          <div className="w-full flex justify-center mt-3">
            <span className="text-white ">
              {/* Copyright © czagents.fun */}
              Copyright © CZ Agents
            </span>
          </div>
        </Layout>
      )}
    </div>
  );
}
