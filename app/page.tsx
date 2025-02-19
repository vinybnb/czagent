/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

"use client";

import { Avatar, Col, Row } from "antd";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";

import { Chart, IconSearch, World } from "@/public/elements/icon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Marquee from "react-fast-marquee";
import HowItWorks from "./components/HowItWorks";
import useIsMobile from "./hooks/useIsMobile";
import {
  Address,
  BoxContent,
  BoxPrice,
  ButtonDetail,
  ButtonGuide,
  CustomButton,
  InputSearch,
  ListItem,
  RightContent,
  SearchBox,
  SortTag,
  TotalToken,
  WrapperRight,
} from "./styled";
import { getFirstAndLastString } from "./utils/helper";


export type TokenData = {
  userId: string;
  userName: string;
  fid: number;
  name: string;
  contractAddress: string;
  poolAddress: string;
  tags: string;
  chain: number;
  chainString: string;
  dex: number;
  dexString: string;
  supply: string;
  price: string;
  lastUpdated: number;
  createdAt: number;
  status: number;
  hash: string;
  signature: string;
  timestamp: number;
  message: string;
  replyMessage?: string;
  messageUrl?: string;
  symbol: string;
  image: string;
  lockerAddress: string;
  username: string;
  usernameDisplay: string;
  userPicture: string;
  messageType: number;
  teleId: number;
  teleChannelId: number;
  teleMessageId: number;
  teleMessageThreadId: number;
  teleResultThreadId: number;
  totalHolder: number;
  marketCap: number;
  volume24h: number;
  priceChange: number;
};

// type TopInfoCache = {
//   time: number;
//   totalToken: number;
//   top: TokenData[];
// };
const defaultData: any = [
  {
    tokenId: "0820-31b8-3fd2-c56a",
    chain: 8453,
    contractAddress: "0xc18caa1658b91076425c8d287ca1b8e238344bfe",
    dex: 1,
    lastUpdated: 1735717949253,
    name: "Broccoli",
    poolAddress: "0xc18caa1658b91076425c8d287ca1b8e238344bfe",
    price: "0.000002987",
    supply: "1000000000",
    tags: "warpcast",
    userId:
      "9049080x2f9caee04d9876a51fa4e4954ca39db2ef2da0c34f44087957ee9a51b93d952b037f2048fa2fd4c4b863ff50fcb02aeb0450984ef2dd6512408757574162f500",
    chainString: "Bsc",
    dexString: "Uniswap",
    userName: "",
    createdAt: 1735631525552,
    status: 3,
    hash: "0x5ecc204479cae02c21b950c84c910488c7945f20",
    signature:
      "0x2f9caee04d9876a51fa4e4954ca39db2ef2da0c34f44087957ee9a51b93d952b037f2048fa2fd4c4b863ff50fcb02aeb0450984ef2dd6512408757574162f500",
    timestamp: 126172306,
    fid: 904908,
    message:
      "Broccoli (broccolibnb.org) (BROCCOLI) is a cryptocurrency and operates on the BNB Smart Chain (BEP20) platform. Broccoli (broccolibnb.org) has a current supply of 185,614,848.18793503. The last known price of Broccoli (broccolibnb.org) is 0.15501358 USD and is up 148.64 over the last 24 hours. It is currently trading on 6 active market(s) with $125,175,346.30 traded over the last 24 hours. More information can be found at https://broccolibnb.org/.",
    symbol: "BROCCOLI",
    image:
      "https://dd.dexscreener.com/ds-data/tokens/bsc/0x23d3f4eaaa515403c6765bb623f287a8cca28f2b.png",
    lockerAddress: "0xdAE92f2f086EF66FD71C82527C11147965117f2F",
    username: "cryptopioneerxyz",
    usernameDisplay: "CryptoPioneerXyz",
    userPicture:
      "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/2026d0ba-46e6-4785-0dd7-ec6b1693bf00/rectcrop3",
    messageType: 1,
    teleId: 0,
    teleMessageId: 0,
    teleChannelId: 0,
    teleMessageThreadId: 0,
    teleResultThreadId: 0,
    totalHolder: 1,
    marketCap: 2988,
    volume24h: 1000000,
    priceChange: 10,
    replyMessage:
      "Congratulations on creating BabyGaisha! Your token is set to embark on a journey to the stars, inspiring new friendships and future possibilities in the crypto universe!\n\nToken page: https://tokenfather.io/token/0x1E41af2f3432669EA095C8E4E6f08fB66cece116",
    messageUrl:
      "https://warpcast.com/cryptopioneerxyz/0xc18caa1658b91076425c8d287ca1b8e238344bfe",
    teleOriginThreadId: 0,
  },
  {
    tokenId: "0810-31b8-3fd2-c56a",
    chain: 8453,
    contractAddress: "0x1d521bc7b621971183418d3200b1b74a8029e724",
    dex: 1,
    lastUpdated: 1735717949253,
    name: "France Macron",
    poolAddress: "0x1d521bc7b621971183418d3200b1b74a8029e724",
    price: "0.1",
    supply: "1000000000",
    tags: "warpcast",
    userId:
      "9049080x2f9caee04d9876a51fa4e4954ca39db2ef2da0c34f44087957ee9a51b93d952b037f2048fa2fd4c4b863ff50fcb02aeb0450984ef2dd6512408757574162f500",
    chainString: "Bsc",
    dexString: "Uniswap",
    userName: "",
    createdAt: 1735631525552,
    status: 3,
    hash: "0x5ecc204479cae02c21b950c84c910488c7945f20",
    signature:
      "0x2f9caee04d9876a51fa4e4954ca39db2ef2da0c34f44087957ee9a51b93d952b037f2048fa2fd4c4b863ff50fcb02aeb0450984ef2dd6512408757574162f500",
    timestamp: 126172306,
    fid: 904908,
    message: "Vive la blockchain!",
    symbol: "FRANCE",
    image:
      "https://dd.dexscreener.com/ds-data/tokens/bsc/0x6adac9a1fa8c994abb375d2d30f93880c8004f7b.png",
    lockerAddress: "0xdAE92f2f086EF66FD71C82527C11147965117f2F",
    username: "DegenPioneer",
    usernameDisplay: "DegenPioneer",
    userPicture:
      "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/2026d0ba-46e6-4785-0dd7-ec6b1693bf00/rectcrop3",
    messageType: 1,
    teleId: 0,
    teleMessageId: 0,
    teleChannelId: 0,
    teleMessageThreadId: 0,
    teleResultThreadId: 0,
    totalHolder: 1,
    marketCap: 2988,
    volume24h: 20000,
    priceChange: 5,
    replyMessage: "Vive la blockchain!",
    messageUrl:
      "https://warpcast.com/cryptopioneerxyz/0x1d521bc7b621971183418d3200b1b74a8029e724",
    teleOriginThreadId: 0,
  },
  {
    tokenId: "0830-31b8-3fd2-c56a",
    chain: 8453,
    contractAddress: "0x8b4ad896bf0fa37ce639753447ae1442c33aab06",
    dex: 1,
    lastUpdated: 1735717949253,
    name: "Four",
    poolAddress: "0x8b4ad896bf0fa37ce639753447ae1442c33aab06",
    price: "0.4",
    supply: "1000000000",
    tags: "warpcast",
    userId:
      "9049080x2f9caee04d9876a51fa4e4954ca39db2ef2da0c34f44087957ee9a51b93d952b037f2048fa2fd4c4b863ff50fcb02aeb0450984ef2dd6512408757574162f500",
    chainString: "Bsc",
    dexString: "Uniswap",
    userName: "",
    createdAt: 1735631525552,
    status: 3,
    hash: "0x5ecc204479cae02c21b950c84c910488c7945f20",
    signature:
      "0x2f9caee04d9876a51fa4e4954ca39db2ef2da0c34f44087957ee9a51b93d952b037f2048fa2fd4c4b863ff50fcb02aeb0450984ef2dd6512408757574162f500",
    timestamp: 126172306,
    fid: 904908,
    message: "the first meme launched for represent four meme plateform.",
    symbol: "FOUR",
    image:
      "https://dd.dexscreener.com/ds-data/tokens/bsc/0xce30b968d5e76a67f3946e0598f95d551ce03ac3.png",
    lockerAddress: "0xdAE92f2f086EF66FD71C82527C11147965117f2F",
    username: "Web3Visionary",
    usernameDisplay: "Web3Visionary",
    userPicture:
      "https://dd.dexscreener.com/ds-data/tokens/bsc/0xce30b968d5e76a67f3946e0598f95d551ce03ac3/header.png",
    messageType: 1,
    teleId: 0,
    teleMessageId: 0,
    teleChannelId: 0,
    teleMessageThreadId: 0,
    teleResultThreadId: 0,
    totalHolder: 1,
    marketCap: 2988,
    volume24h: 243434,
    priceChange: 20.8,
    replyMessage: "the first meme launched for represent four meme plateform.",
    messageUrl:
      "https://warpcast.com/cryptopioneerxyz/0x8b4ad896bf0fa37ce639753447ae1442c33aab06",
    teleOriginThreadId: 0,
  },
  {
    tokenId: "0840-31b8-3fd2-c56a",
    chain: 8453,
    contractAddress: "0x07f071aa224e2fc2cf03ca2e6558ec6181d66a90",
    dex: 1,
    lastUpdated: 1735717949253,
    name: "CaptainBNB",
    poolAddress: "0x07f071aa224e2fc2cf03ca2e6558ec6181d66a90",
    price: "0.4",
    supply: "1000000000",
    tags: "warpcast",
    userId:
      "9049080x2f9caee04d9876a51fa4e4954ca39db2ef2da0c34f44087957ee9a51b93d952b037f2048fa2fd4c4b863ff50fcb02aeb0450984ef2dd6512408757574162f500",
    chainString: "Bsc",
    dexString: "Uniswap",
    userName: "",
    createdAt: 1735631525552,
    status: 3,
    hash: "0x07f071aa224e2fc2cf03ca2e6558ec6181d66a90",
    signature:
      "0x2f9caee04d9876a51fa4e4954ca39db2ef2da0c34f44087957ee9a51b93d952b037f2048fa2fd4c4b863ff50fcb02aeb0450984ef2dd6512408757574162f500",
    timestamp: 126172306,
    fid: 904908,
    message:
      "CaptainBNB (CaptainBNB) is a cryptocurrency . CaptainBNB has a current supply of 1,000,000,000 with 0 in circulation. The last known price of CaptainBNB is 0.01868055 USD and is down -18.77 over the last 24 hours. It is currently trading on 27 active market(s) with $9,900,341.93 traded over the last 24 hours. More information can be found at https://captainbnb.xyz/.",
    symbol: "CaptainBNB",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/35734.png",
    lockerAddress: "0xdAE92f2f086EF66FD71C82527C11147965117f2F",
    username: "MetaFiGuru",
    usernameDisplay: "MetaFiGuru",
    userPicture:
      "https://dd.dexscreener.com/ds-data/tokens/bsc/0x47a1eb0b825b73e6a14807beaecafef199d5477c/header.png",
    messageType: 1,
    teleId: 0,
    teleMessageId: 0,
    teleChannelId: 0,
    teleMessageThreadId: 0,
    teleResultThreadId: 0,
    totalHolder: 1,
    marketCap: 2988,
    volume24h: 3456766,
    priceChange: 10.05,
    replyMessage:
      "CaptainBNB (CaptainBNB) is a cryptocurrency . CaptainBNB has a current supply of 1,000,000,000 with 0 in circulation. The last known price of CaptainBNB is 0.01868055 USD and is down -18.77 over the last 24 hours. It is currently trading on 27 active market(s) with $9,900,341.93 traded over the last 24 hours. More information can be found at https://captainbnb.xyz/.",
    messageUrl:
      "https://warpcast.com/cryptopioneerxyz/0x07f071aa224e2fc2cf03ca2e6558ec6181d66a90",
    teleOriginThreadId: 0,
  },
  {
    tokenId: "0850-31b8-3fd2-c56a",
    chain: 8453,
    contractAddress: "0x70e4978406bf51361ecc04eb26f233c6fce2c5e1",
    dex: 1,
    lastUpdated: 1735717949253,
    name: "FourXBT",
    poolAddress: "0x70e4978406bf51361ecc04eb26f233c6fce2c5e1",
    price: "0.33",
    supply: "1000000000",
    tags: "warpcast",
    userId:
      "9049080x2f9caee04d9876a51fa4e4954ca39db2ef2da0c34f44087957ee9a51b93d952b037f2048fa2fd4c4b863ff50fcb02aeb0450984ef2dd6512408757574162f500",
    chainString: "Bsc",
    dexString: "Uniswap",
    userName: "",
    createdAt: 1735631525552,
    status: 3,
    hash: "0x07f071aa224e2fc2cf03ca2e6558ec6181d66a90",
    signature:
      "0x2f9caee04d9876a51fa4e4954ca39db2ef2da0c34f44087957ee9a51b93d952b037f2048fa2fd4c4b863ff50fcb02aeb0450984ef2dd6512408757574162f500",
    timestamp: 126172306,
    fid: 904908,
    message:
      "Fourxbt is an advanced, fully autonomous AI-driven blockchain analytics tool tailored for the Web3 ecosystem. It combines cutting-edge AI technology with a user-friendly interface to deliver real-time market insights, analytics, and educational content. Operating seamlessly on Twitter (X) and other platforms, the AI Agent ensures users are informed and equipped to navigate the dynamic world of blockchain and crypto.\r\n\r\nWith 24/7 availability and a direct connection to blockchain networks and news sources, the AI Agent provides an unrivaled blend of precision, efficiency, and privacy. It is designed not just as a passive tool but as an interactive digital assistant that enhances user engagement, from monitoring market trends to answering queries about DeFi and NFTs.",
    symbol: "FXBT",
    image:
      "https://dd.dexscreener.com/ds-data/tokens/bsc/0xcab6311f95faf6b5db4fd306092b6bcd9807e8f0.png",
    lockerAddress: "0xdAE92f2f086EF66FD71C82527C11147965117f2F",
    username: "BlockchainPioneer",
    usernameDisplay: "BlockchainPioneer",
    userPicture:
      "https://dd.dexscreener.com/ds-data/tokens/bsc/0xcab6311f95faf6b5db4fd306092b6bcd9807e8f0/header.png",
    messageType: 1,
    teleId: 0,
    teleMessageId: 0,
    teleChannelId: 0,
    teleMessageThreadId: 0,
    teleResultThreadId: 0,
    totalHolder: 1,
    marketCap: 2988,
    volume24h: 34657,
    priceChange: 10.05,
    replyMessage:
      "Fourxbt is an advanced, fully autonomous AI-driven blockchain analytics tool tailored for the Web3 ecosystem. It combines cutting-edge AI technology with a user-friendly interface to deliver real-time market insights, analytics, and educational content. Operating seamlessly on Twitter (X) and other platforms, the AI Agent ensures users are informed and equipped to navigate the dynamic world of blockchain and crypto.\r\n\r\nWith 24/7 availability and a direct connection to blockchain networks and news sources, the AI Agent provides an unrivaled blend of precision, efficiency, and privacy. It is designed not just as a passive tool but as an interactive digital assistant that enhances user engagement, from monitoring market trends to answering queries about DeFi and NFTs.",
    messageUrl:
      "https://warpcast.com/cryptopioneerxyz/0x70e4978406bf51361ecc04eb26f233c6fce2c5e1",
    teleOriginThreadId: 0,
  },
];
export default function Dashboard() {
  const router = useRouter();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [tokens, setTokens] = useState(defaultData);
  // const [top, setTop] = useState<TopInfoCache | undefined>(undefined);
  const [sort, setSort] = useState("desc");
  const [search, setSearch] = useState("");
  // const debouncedValue = useDebounce(search, 500);

  const [showModal, setShowModal] = useState<boolean>(false);

  const isMobile = useIsMobile();

  const renderRank = (index: number) => {
    if (index == 0) {
      return "🥇";
    } else if (index == 1) {
      return "🥈";
    } else if (index == 2) {
      return "🥉";
    }
    return "";
  };

  // const fetchTokens = async () => {
  //   const response = await axios.post(
  //     "https://api.tokenfather.io/tokenfather",
  //     {
  //       query: search,
  //       page: currentPage,
  //       chain: 8453,
  //       sort,
  //     }
  //   );
  //   console.log(response.data);

  //   setTokens(response.data);
  // };

  // useEffect(() => {
  //   if (debouncedValue) {
  //     console.log("API call with:", debouncedValue);
  //     // Call your API or perform an action with the debounced value here

  //     fetchTokens();
  //   }
  // }, [currentPage, sort, search, debouncedValue]);

  // useEffect(() => {
  //   fetchTokens();
  //   const fetchTop = async () => {
  //     const response = await axios.get(
  //       "https://api.tokenfather.io/tokenfather/gettop"
  //     );
  //     setTop(response.data);
  //   };

  //   fetchTop();
  // }, [sort, currentPage]);

  // const onChangePage: PaginationProps["onShowSizeChange"] = (
  //   current,
  //   pageSize
  // ) => {
  //   setCurrentPage(current);
  //   console.log(pageSize, current);
  // };
  return (
    <div className="min-h-screen bg-[#222222]">
      <div className="sticky top-0 z-100 items-center flex justify-center bg-[#222222] py-2">
        <div className="md:w-4/5 w-full p-2">
          <Row>
            <Col span={12} md={4} className="flex justify-start items-center">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/images/logo/logo.png"
                  width={60}
                  height={60}
                  alt="logo"
                />
                <span className="text-white font-bold text-xl">CZ AGENTS</span>
              </Link>
            </Col>

            {isMobile && (
              <Col span={12} md={4} className="flex justify-end items-center">
                <ButtonGuide
                  onClick={() => router.push("https://x.com/czagents")}
                >
                  CREATE TOKEN
                </ButtonGuide>
              </Col>
            )}
            <Col span={24} md={16}>
              <SearchBox>
                <IconSearch />
                <InputSearch
                  type="text"
                  width="100%"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by token name, symbol or requestor ...."
                />
              </SearchBox>
            </Col>

            {!isMobile && (
              <Col span={24} md={4} className="flex justify-end items-center">
                <ButtonGuide
                  onClick={() => router.push("https://x.com/czagents")}
                >
                  <span className="font-bold">CREATE TOKEN</span>
                </ButtonGuide>
              </Col>
            )}
          </Row>
        </div>
      </div>
      <div className="mt-2 w-full flex justify-center">
        <div className="md:w-4/5 w-full px-2">
          <div className="px-4 py-1 rounded-md border-2 border-[#868686] mb-2">
            <Marquee>
              {" "}
              {defaultData.map((token: TokenData, index: any) => (
                <div key={index} className="mr-4 text-white">
                  <Link href={`/token/${token.contractAddress}`}>
                    <span
                      className={`${
                        index === 0 && "text-yellow-500"
                      } mr-1 font-semibold`}
                    >
                      {index + 1}.
                    </span>
                    <span className="mr-1 font-semibold">{token.symbol}</span>
                    <span
                      className={`${
                        token.priceChange > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {token.priceChange}%
                    </span>
                  </Link>
                </div>
              ))}
            </Marquee>
          </div>
          <div className="flex justify-between w-full">
            <div className="w-1/2 flex justify-between">
              <div>
                <TotalToken className="w-fit px-4 py-2 md:px-4 md:py-2 text-xs md:text-lg font-semibold truncate">
                  {defaultData.length} tokens deployed
                </TotalToken>
              </div>

              <div className="flex gap-2 items-center">
                <SortTag
                  isActive={sort == "desc"}
                  className="text-white cursor-pointer text-base font-semibold truncate"
                  span={12}
                  onClick={() => setSort("desc")}
                >
                  Newest First
                </SortTag>
                <SortTag
                  isActive={sort == "asc"}
                  className="text-white cursor-pointer text-base font-semibold truncate"
                  span={12}
                  onClick={() => setSort("asc")}
                >
                  Oldest First
                </SortTag>
              </div>
            </div>
            {!isMobile && (
              <div className="w-1/2 flex justify-end">
                <div className="flex items-center gap-2">
                  <SortTag
                    isActive={sort == "desc"}
                    className="text-white cursor-pointer text-base font-semibold truncate"
                    span={12}
                    onClick={() => setSort("desc")}
                  >
                    Top Daily
                  </SortTag>
                  <SortTag
                    isActive={sort == "asc"}
                    className="text-white cursor-pointer text-base font-semibold truncate"
                    span={12}
                    onClick={() => setSort("asc")}
                  >
                    Top Gainer
                  </SortTag>
                </div>
              </div>
            )}
          </div>
          <Row justify="space-between" className="md:mt-5 mt-2">
            <Col span={24} md={14}>
              <ListItem>
                {defaultData.map((token: TokenData, index: any) => (
                  <>
                    <Row
                      key={index}
                      className=" border-[2px] sm:px-5 px-2 border-[#393d37]  md:py-3 pt-2 text-white rounded-lg mb-4 shadow transition-transform duration-300 hover:scale-x-95 hover:shadow-lg hover:z-20 cursor-pointer hover:border-[#30E000]"
                    >
                      <Col span={14}>
                        <Row>
                          <Col md={4} span={5}>
                            <Avatar
                              src={token.image || null}
                              shape="square"
                              size={isMobile ? 40 : 70}
                            >
                              {token.symbol}
                            </Avatar>
                          </Col>
                          <Col
                            md={20}
                            span={19}
                            className="flex justify-center flex-col"
                          >
                            <div className="text-xs md:text-lg font-bold">
                              {token.name} ({token.symbol})
                            </div>
                            <div>
                              <Address>
                                Address:{" "}
                                <a
                                  target="_blank"
                                  href={`https://bscscan.com/address/${token.contractAddress}`}
                                >
                                  {getFirstAndLastString(token.contractAddress)}
                                </a>
                              </Address>
                            </div>
                          </Col>
                        </Row>
                        {!isMobile && (
                          <Row justify="space-between" className="mt-4">
                            <Col span={6}>
                              <CustomButton className="px-2 py-1 rounded-2xl">
                                <Link href={`/`} target="_blank">
                                  <div className="flex items-center">
                                    <World />
                                    <span className="ml-2">Website</span>
                                  </div>
                                </Link>
                              </CustomButton>
                            </Col>
                            <Col span={6}>
                              <CustomButton
                                className="px-2 py-1 rounded-2xl"
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
                            </Col>
                            <Col span={12}>
                              <CustomButton className="py-2 px-3 bg-[#FFCC00] rounded-[20px] text-black">
                                <Link href={`/token/${token.contractAddress}`}>
                                  View Detail
                                </Link>
                              </CustomButton>
                            </Col>
                          </Row>
                        )}
                      </Col>

                      <Col
                        span={10}
                        className="justify-center items-center gap-2 flex flex-col"
                      >
                        <Row className="flex items-center justify-center">
                          <div className="text-xs md:text-base px-2 py-1 md:px-5 md:py-2 border-[#5F5F5F] border-[1px]  w-fit rounded-[100px] truncate">
                            {token.usernameDisplay}
                          </div>
                        </Row>
                        <Row className="flex items-center justify-center">
                          <div className="text-xs md:text-base px-2 py-1 md:px-5 md:py-2 border-[#5F5F5F] border-[1px]  w-fit rounded-[20px]">
                            {moment.unix(token.createdAt / 1000).fromNow()}
                          </div>
                        </Row>
                      </Col>
                      {isMobile && (
                        <Row
                          justify="space-between"
                          className="mb-6 mt-3 flex items-center gap-2"
                        >
                          <Col span={6} className="mr-3">
                            <CustomButton className="rounded-2xl px-2 py-1 ">
                              <Link href={`/`} target="_blank">
                                <div className="flex items-center ">
                                  <World />
                                  <span className="ml-2">Website</span>
                                </div>
                              </Link>
                            </CustomButton>
                          </Col>
                          <Col span={6} className="flex justify-end">
                            <CustomButton
                              className="rounded-2xl px-2 py-1"
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
                          </Col>
                          <Col span={9} className="flex justify-end">
                            <ButtonDetail className="py-2 px-3 bg-[#FFCC00] rounded-[20px] text-black">
                              {" "}
                              <Link href={`/token/${token.contractAddress}`}>
                                View Detail
                              </Link>
                            </ButtonDetail>
                          </Col>
                        </Row>
                      )}
                    </Row>
                  </>
                ))}
              </ListItem>
              <div className="flex flex-col md:justify-start justify-center mt-2 md:mt-8">
                {/* {tokens.length > 0 && (
                  <CustomPagination
                    total={top && top?.totalToken}
                    defaultCurrent={1}
                    onChange={onChangePage}
                    pageSize={10}
                    showSizeChanger={false}
                  />
                )} */}
                <span className="text-white text-[px] pt-3 pl-10">
                  Copyright © czagents.fun
                </span>
              </div>
            </Col>

            {!isMobile && (
              <Col span={24} md={10}>
                <WrapperRight>
                  <RightContent>
                    {defaultData.map((token: TokenData, index: any) => (
                      <BoxContent isFirst={index == 0} key={index}>
                        <Link href={`/token/${token.contractAddress}`}>
                          <BoxPrice isFirst={index == 0}>
                            <Row className="justify-between px-5 pt-3">
                              <div className="font-bold text-xl">
                                {token.name}
                                <span style={{ fontSize: "30px" }}>
                                  {renderRank(index)}
                                </span>
                              </div>
                              <div className="text-lg">{token.price}</div>
                            </Row>
                            <Row className="justify-between px-5 pb-3">
                              <div className="text-[#7A7A7A] font-bold">
                                {token.symbol}
                              </div>
                              <div
                                className={`text-lg ${
                                  token.priceChange >= 0
                                    ? "text-[#24B600]"
                                    : "text-[#ed0e4a]"
                                } font-bold`}
                              >
                                {token.priceChange > 0 ? "+" : ""}
                                {token.priceChange.toLocaleString()}%{" "}
                                {index == 0 && "🔥"}
                              </div>
                            </Row>
                          </BoxPrice>
                        </Link>
                        <Row className="justify-between px-5 pt-4">
                          <div>24h Volume:</div>
                          <div>${token.volume24h.toLocaleString()}</div>
                        </Row>
                        <Row className="justify-between px-5">
                          <div>Marketcap:</div>
                          <div>${token.marketCap.toLocaleString()}</div>
                        </Row>
                      </BoxContent>
                    ))}
                    {/* <div className='flex justify-center mt-8 w-full '>
                  {tokens.length > 0 && (
                    <CustomPagination
                      total={top && top?.totalToken}
                      defaultCurrent={1}
                      onChange={onChangePage}
                      pageSize={10}
                    />
                  )}
                </div> */}
                  </RightContent>
                </WrapperRight>
              </Col>
            )}
          </Row>
        </div>
      </div>

      <HowItWorks showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
