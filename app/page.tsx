/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/** @format */

"use client";

import { Avatar, Col, Row, Tag } from "antd";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

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
import useDebounce from "./hooks/useDebounce";
import axios from "axios";
import { API_ENDPOINT } from "./utils/constants";
import { defaultData } from "./hooks/data";
import { useWeb3 } from "./hooks/useWeb3";

export type TokenData = {
  tokenId: string;
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

type TopInfoCache = {
  time: number;
  totalToken: number;
  top: TokenData[];
};

export default function Dashboard() {
  const { account, connectWallet } = useWeb3();
  console.log("account", account);

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [tokens, setTokens] = useState([]);
  const [top, setTop] = useState<TopInfoCache | undefined>(undefined);
  const [sort, setSort] = useState("desc");
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 500);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(top);
    setCurrentPage(1);
    setTimeout(() => setLoading(false), 1000); // Simulating loading
  }, []);

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
    return `#${index + 1}`;
  };

  const fetchTokens = async () => {
    const response = await axios.post(`${API_ENDPOINT}/czagents`, {
      query: search,
      page: currentPage,
      chain: 8453,
      sort,
    });
    console.log(response.data);

    setTokens(response.data.length ? response.data : defaultData);
  };

  useEffect(() => {
    if (debouncedValue) {
      console.log("API call with:", debouncedValue);
      // Call your API or perform an action with the debounced value here

      fetchTokens();
    }
  }, [currentPage, sort, search, debouncedValue]);

  useEffect(() => {
    fetchTokens();
    const fetchTop = async () => {
      const response = await axios.get(`${API_ENDPOINT}/czagents/gettop`);
      setTop(response.data.length ? response.data : defaultData);
    };

    fetchTop();
  }, [sort, currentPage]);

  // const onChangePage: PaginationProps["onShowSizeChange"] = (
  //   current,
  //   pageSize
  // ) => {
  //   setCurrentPage(current);
  //   console.log(pageSize, current);
  // };
  return (
    <div>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-500 animate-pulse"></div>
      ) : (
        <div className="min-h-screen bg-[#1a1a1a]">
          <div className="sticky top-0 z-40 items-center flex justify-center bg-[#1a1a1a] py-2">
            <div className="md:w-4/5 w-full p-2">
              <Row>
                <Col
                  span={12}
                  md={4}
                  className="flex justify-start items-center"
                >
                  <Link href="/" className="flex items-center gap-3">
                    <Image
                      src="/images/logo/logo.png"
                      width={60}
                      height={60}
                      alt="logo"
                    />
                    <span className="text-white font-bold text-xl">
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
                      placeholder="Search by agent name, symbol or requestor ...."
                    />
                  </SearchBox>
                </Col>

                {!isMobile && (
                  <Col
                    span={24}
                    md={4}
                    className="flex justify-end items-center"
                  >
                    <ButtonGuide
                      // onClick={() => router.push("https://x.com/czagents")}
                      onClick={connectWallet}
                    >
                      <span className="font-bold">Create Agent</span>
                    </ButtonGuide>
                  </Col>
                )}
              </Row>
            </div>
          </div>
          <div className="mt-2 z-10 w-full flex justify-center">
            <div className="md:w-4/5 w-full px-2">
              <div className="px-4 py-1 rounded-md border-2 border-[#868686] mb-2">
                <Marquee>
                  {" "}
                  {tokens.map((token: TokenData, index: number) => (
                    <div key={index} className="mr-4 text-white">
                      <Link href={`/agent/${token.tokenId}`}>
                        <span
                          className={`${
                            index === 0 && "text-yellow-500"
                          } mr-1 font-semibold`}
                        >
                          {index + 1}.
                        </span>
                        <span className="mr-1 font-semibold">
                          {token.symbol}
                        </span>
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
                <Col
                  span={24}
                  md={14}
                  className="w-full flex justify-between pr-5"
                >
                  <div>
                    <TotalToken className="w-fit px-4 py-2 md:px-4 md:py-2 text-xs md:text-lg font-semibold truncate text-black">
                      {tokens.length} agents deployed
                    </TotalToken>
                  </div>

                  <div className="flex gap-2 items-center justify-end ">
                    <SortTag
                      isActive={sort == "desc"}
                      className="cursor-pointer text-base font-semibold truncate"
                      span={12}
                      onClick={() => setSort("desc")}
                    >
                      Newest First
                    </SortTag>
                    <SortTag
                      isActive={sort == "asc"}
                      className="cursor-pointer text-base font-semibold truncate"
                      span={12}
                      onClick={() => setSort("asc")}
                    >
                      Oldest First
                    </SortTag>
                  </div>
                </Col>
                {!isMobile && (
                  <Col span={24} md={10} className=" flex justify-end pr-5">
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
                  </Col>
                )}
              </div>
              <Row justify="space-between" className="md:mt-5 mt-2">
                <Col span={24} md={14}>
                  <ListItem>
                    {tokens.map((token: TokenData, index: number) => (
                      <>
                        <Row
                          key={index}
                          className="bg-[#1f1f1f] sm:px-5 px-2 md:py-3 pt-2 text-white rounded-lg mb-4 shadow transition-transform duration-300 hover:scale-x-95 hover:shadow-lg hover:z-20 cursor-pointer hover:border-[2px] hover:border-[#30E000]"
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
                                  {!token.contractAddress && (
                                    <Tag color="#f50">Not Deployed</Tag>
                                  )}
                                </div>
                                <div>
                                  {token.contractAddress && (
                                    <Address>
                                      Address:{" "}
                                      <a
                                        target="_blank"
                                        href={`https://bscscan.com/address/${token.contractAddress}`}
                                      >
                                        {getFirstAndLastString(
                                          token.contractAddress
                                        )}
                                      </a>
                                    </Address>
                                  )}
                                </div>
                              </Col>
                            </Row>
                            {!isMobile && (
                              <Row justify="space-between" className="mt-4">
                                <Col span={6}>
                                  <CustomButton className="px-2 py-1 rounded-2xl">
                                    <Link
                                      href={`${token.messageUrl}`}
                                      target="_blank"
                                    >
                                      <div className="flex items-center">
                                        <World />
                                        <span className="ml-2">Website</span>
                                      </div>
                                    </Link>
                                  </CustomButton>
                                </Col>
                                {token.contractAddress && (
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
                                )}
                                <Col span={12}>
                                  <CustomButton className="py-2 px-3 bg-[#FFCC00] rounded-[20px] text-black">
                                    <Link href={`/agent/${token.tokenId}`}>
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
                                  <Link
                                    href={`${token.messageUrl}`}
                                    target="_blank"
                                  >
                                    <div className="flex items-center ">
                                      <World />
                                      <span className="ml-2">Website</span>
                                    </div>
                                  </Link>
                                </CustomButton>
                              </Col>
                              {token.contractAddress && (
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
                              )}
                              <Col span={9} className="flex justify-end">
                                <ButtonDetail className="py-2 px-3 bg-[#FFCC00] rounded-[20px] text-black">
                                  {" "}
                                  <Link href={`/agent/${token.tokenId}`}>
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
                      {/* Copyright © czagents.fun */}
                      Copyright © CZ Agents
                    </span>
                  </div>
                </Col>

                {!isMobile && (
                  <Col span={24} md={10}>
                    <WrapperRight>
                      <RightContent>
                        {tokens.map((token: TokenData, index: number) => (
                          <BoxContent isFirst={index == 0} key={index}>
                            <Link href={`/agent/${token.tokenId}`}>
                              <BoxPrice isFirst={index == 0}>
                                <Row className="justify-between px-5">
                                  <div className="flex items-center">
                                    <div className="font-bold text-xl mr-2">
                                      <span className="pr-2 text-xl">
                                        {renderRank(index)}
                                      </span>
                                      {token.name}
                                    </div>
                                    <div className="text-[#7A7A7A] font-bold mr-2">
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
                                  </div>

                                  <div className="text-lg">${token.price}</div>
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
      )}
    </div>
  );
}
