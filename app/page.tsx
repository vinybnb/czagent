/** @format */

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Row, Col, Layout, PaginationProps, Avatar } from "antd";
import moment from "moment";

import { getFirstAndLastString } from "./utils/helper";
import Image from "next/image";
import {
  Address,
  BoxContent,
  BoxPrice,
  ButtonDetail,
  ButtonGuide,
  CustomButton,
  CustomPagination,
  InputSearch,
  ListItem,
  RightContent,
  SearchBox,
  SortTag,
  TotalToken,
  WrapperRight,
} from "./styled";
import useDebounce from "./hooks/useDebounce";
import useIsMobile from "./hooks/useIsMobile";
import { Chart, IconSearch, World } from "@/public/elements/icon";
import HowItWorks from "./components/HowItWorks";
import Marquee from "react-fast-marquee";
import { useRouter } from "next/navigation";

const { Content } = Layout;

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

type TopInfoCache = {
  time: number;
  totalToken: number;
  top: TokenData[];
};

export default function Dashboard() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [tokens, setTokens] = useState([]);
  const [top, setTop] = useState<TopInfoCache | undefined>(undefined);
  const [sort, setSort] = useState("desc");
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 500);

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

  const fetchTokens = async () => {
    const response = await axios.post(
      "https://api.tokenfather.io/tokenfather",
      {
        query: search,
        page: currentPage,
        chain: 8453,
        sort,
      }
    );

    setTokens(response.data);
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
      const response = await axios.get(
        "https://api.tokenfather.io/tokenfather/gettop"
      );
      setTop(response.data);
    };

    fetchTop();
  }, [sort, currentPage]);

  const onChangePage: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setCurrentPage(current);
    console.log(pageSize, current);
  };
  return (
    <div className="min-h-screen bg-[#222222]">
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
                <ButtonGuide onClick={() => router.push('/create-token')}>
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
                <ButtonGuide onClick={() => router.push('/create-token')}>
                  <span className="font-bold">CREATE TOKEN</span>
                </ButtonGuide>
              </Col>
            )}
          </Row>
        </div>
      </div>
      <Content className="mt-2 w-full flex justify-center">
        <div className="md:w-4/5 w-full px-2">
          <div className="px-4 py-1 rounded-md border-2 border-[#868686] mb-2">
            <Marquee>
              {" "}
              {top?.top.map((token: TokenData, index) => (
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
                  {top && top?.totalToken} tokens deployed
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
                {tokens.map((token: TokenData, index) => (
                  <>
                    <Row
                      key={index}
                      className="border-t-[1px] border-t-black md:py-3 pt-2 text-white"
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
                                  href={`https://basescan.org/address/${token.contractAddress}`}
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
                                <Link
                                  href={token.messageUrl ?? `/`}
                                  target="_blank"
                                >
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
                                    `https://dexscreener.com/base/${token.poolAddress}`,
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

                      <Col span={10} className="justify-center flex-col flex">
                        <Row className="flex items-center justify-center mb-2">
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
                    </Row>
                    {isMobile && (
                      <Row justify="space-between" className="mb-6 mt-3">
                        <Col span={6}>
                          <CustomButton className="rounded-2xl">
                            <Link
                              href={token.messageUrl ?? `/`}
                              target="_blank"
                            >
                              <div className="flex items-center ">
                                <World />
                                <span className="ml-2">Website</span>
                              </div>
                            </Link>
                          </CustomButton>
                        </Col>
                        <Col span={6}>
                          <CustomButton
                            className="rounded-2xl px-2 py-1"
                            onClick={() =>
                              window.open(
                                `https://dexscreener.com/base/${token.poolAddress}`,
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
                        <Col span={10} className="flex justify-end mr-4">
                          <ButtonDetail>
                            {" "}
                            <Link href={`/token/${token.contractAddress}`}>
                              View Detail
                            </Link>
                          </ButtonDetail>
                        </Col>
                      </Row>
                    )}
                  </>
                ))}
              </ListItem>
              <div className="flex flex-col md:justify-start justify-center mt-2 md:mt-8">
                {tokens.length > 0 && (
                  <CustomPagination
                    total={top && top?.totalToken}
                    defaultCurrent={1}
                    onChange={onChangePage}
                    pageSize={10}
                    showSizeChanger={false}
                  />
                )}
                <span className="text-white text-[px] pt-3 pl-10">Copyright © czagents.fun</span>
              </div> 
            </Col>

            {!isMobile && (
              <Col span={24} md={10}>
                <WrapperRight>
                  <RightContent>
                    {top?.top.map((token: TokenData, index) => (
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
      </Content>

      <HowItWorks showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
