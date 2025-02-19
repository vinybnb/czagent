"use client";

import { useParams } from "next/navigation";
import { Row, Col, Avatar, Layout, Button } from "antd";
const { Content } = Layout;
import { RocketOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
// import { getFirstAndLastString } from '@/app/utils/helper';
import { Address, BoxInfo, ButtonGuide, CustomButton, InputSearch, SearchBox } from "@/app/styled";
import useIsMobile from "@/app/hooks/useIsMobile";
import { TokenData } from "@/app/page";
import {
  Chart,
  IconBuySell,
  IconChartBtn,
  IconInfo,
  IconSearch,
  World,
} from "@/public/elements/icon";
import { getFirstAndLastString } from "@/app/utils/helper";
import HowItWorks from "@/app/components/HowItWorks";
import { API_ENDPOINT } from "@/app/utils/constants";

type Item = "buy/sell" | "chart" | "info";

export default function TokenPage() {
  // Get the address from the URL
  const isMobile = useIsMobile();

  const [token, setToken] = useState<TokenData | undefined>(undefined);
  const [item, setItem] = useState<Item>("chart");
  const [showModal, setShowModal] = useState<boolean>(false);

  // const [cap, setCap] = useState(0);
  const [search, setSearch] = useState("");

  const params = useParams();
  console.log("params", params);
  useEffect(() => {
    (async () => {
      const { address } = params;
      const tokenRes = await axios.post(
        `${API_ENDPOINT}/czagents/gettoken`,
        {
          address: address,
          tokenid: address,
          chain: 8453,
        }
      );
      // const dexScreenerRes = await axios.get(
      //   `https://api.dexscreener.com/latest/dex/tokens/${address}`
      // );
      // const data = dexScreenerRes.data;
      // if (data.pairs && data.pairs.length) {
      //   setCap(data.pairs[0].marketCap);
      // }
      console.log("tokenRes", tokenRes.data);
      setToken(tokenRes.data);
    })();
  }, [params]);

  const onChange = (item: Item) => {
    setItem(item);
  };

  return (
    <Layout>
      <div className="sticky top-0 z-100 items-center flex justify-center bg-[#222222] py-2">
        <div className="md:w-4/5 w-full p-2">
          <Row>
            <Col span={12} md={4} className="flex justify-start items-center">
              <Link href="/">
                <Image
                  src="/images/logo/logo.png"
                  width={60}
                  height={60}
                  alt="logo"
                />
              </Link>
            </Col>

            {isMobile && (
              <Col span={12} md={4} className="flex justify-end items-center">
                <ButtonGuide onClick={() => setShowModal(true)}>
                  How it works
                </ButtonGuide>
              </Col>
            )}
            {!isMobile && <Col span={24} md={16}>
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
            </Col>}

            {!isMobile && (
              <Col span={24} md={4} className="flex justify-end items-center">
                <ButtonGuide onClick={() => setShowModal(true)} >
                  <span className="font-bold">Create Agent</span>
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
                {token.contractAddress ? <iframe
                  style={{
                    width: "100%",
                    border: "none",
                    height: "calc(100vh - 280px)",
                    borderRadius: "20px",
                    overflow: "hidden",
                  }}
                  src={`https://dexscreener.com/bsc/${token?.poolAddress}?embed=1&loadChartSettings=0&info=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=1&chartType=usd&interval=15`}
                />: <div style={{
                    width: "100%",
                    border: "none",
                    height: "calc(100vh - 280px)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    position: 'relative',
                    paddingTop: '20%',
                    left: "40%"
                    // textAlign: 'center'
                  }}>
                    <Button style={{
                      position: 'absolute',
                      backgroundColor: '#FFCC00',
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                      padding: '30px 20px',
                    }}>
                      <RocketOutlined></RocketOutlined>
                      Launch {token.symbol}
                      </Button>
                  </div>}
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
                      <span className="text-[#7a7a7a]">@{token.username}</span>
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
                  {token.contractAddress && <CustomButton
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
                  </CustomButton>}
                </div>
              </BoxInfo>
            </Col>

            <Col span={8} className="flex flex-col justify-between">
              <BoxInfo className="truncate">
                <div className="flex">
                  <Avatar shape="square" size={60} src={token.image || null}>
                    {token.symbol}
                  </Avatar>

                  <div className="ml-4 flex flex-col justify-center">
                    <div className="text-xs md:text-lg font-bold ">
                      {token.name} ({token.symbol})
                    </div>
                    <div>
                      {token.contractAddress && <Address className="text-[#656565]">
                        Address:{" "}
                        <a
                          target="_blank"
                          href={`https://bscscan.org/address/${token.contractAddress}`}
                        >
                          {getFirstAndLastString(token.contractAddress)}
                        </a>
                      </Address>}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className=" text-base">24h Volume:</span>
                  <span className=" text-base">${token.volume24h}</span>
                </div>
                <div className="flex justify-between">
                  <span className=" text-base">Marketcap:</span>
                  <span className=" text-base">${token.marketCap}</span>
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
                  src={`https://pancakeswap.finance/#/swap?exactField=input&outputCurrency=${token?.contractAddress}&chain=base`}
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
                src={`https://pancakeswap.finance/#/swap?exactField=input&outputCurrency=${token?.contractAddress}&chain=base`}
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
            <div style={{ height: "calc(100vh - 200px)" }} className="w-full">
              {token && (
                <BoxInfo className="truncate">
                  <div className="flex">
                    <Avatar shape="square" size={60} src={token.image || null}>
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
                    {token.contractAddress && <CustomButton
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
                    </CustomButton>}
                  </div>
                </BoxInfo>
              )}
            </div>
          )}

          <Row className="w-full justify-between bg-[#FFCC00] border-2 border-black rounded-xl px-4 py-2 mt-2">
            <button
              className={`text-base font-semibold px-2 py-1 ${item === "buy/sell" && "shadow-[2.64px_2.64px_0px_#000000]"
                } border-black rounded-xl border-2`}
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
              className={`text-base font-semibold px-2 py-1 ${item === "chart" && "shadow-[2.64px_2.64px_0px_#000000]"
                } border-black rounded-xl border-2`}
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
              className={`text-base font-semibold px-2 py-1 ${item === "info" && "shadow-[2.64px_2.64px_0px_#000000]"
                } border-black rounded-xl border-2`}
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
      <HowItWorks showModal={showModal} setShowModal={setShowModal} />
      {/* <Footer className='h-2 flex justify-center bg-[#d6eeff] text-md'>
        Copyright © Tokenfather.io
      </Footer> */}
    </Layout>
  );
}
