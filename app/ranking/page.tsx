/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/** @format */

"use client";

import { Col, Row } from "antd";

import Link from "next/link";
import { useEffect, useState } from "react";

import { IconMenu, IconSearch } from "@/public/elements/icon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Marquee from "react-fast-marquee";
import {
  BoxContent,
  BoxPrice,
  ButtonGuide,
  InputSearch,
  SearchBox,
  SortTag,
  TotalToken,
} from "../styled";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";
import { API_ENDPOINT } from "../utils/constants";
import { defaultData } from "../hooks/data";
import Menu from "../components/Menu";

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

export default function Ranking() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [tokens, setTokens] = useState([]);
  const [top, setTop] = useState<TopInfoCache | undefined>(undefined);
  const [sort, setSort] = useState("desc");
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 500);
  const [isOpened, setIsOpened] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(top);
    setCurrentPage(1);
    setTimeout(() => setLoading(false), 1000); // Simulating loading
  }, []);

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

  const handleToggleMenu = () => {
    setIsOpened(!isOpened);
  };
  return (
    <div>
      <Menu isOpen={isOpened} setIsOpen={setIsOpened} />

      {loading ? (
        <div className="fixed top-0 left-0 h-1 bg-blue-500 animate-pulse"></div>
      ) : (
        <div className="min-h-screen bg-[#1a1a1a]">
          <div className="sticky top-0 z-40 items-center flex justify-center bg-[#1a1a1a]">
            <div className="w-full p-2">
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

                <Col span={12} md={4} className="flex justify-end items-center">
                  <ButtonGuide
                    onClick={() => router.push("https://x.com/czagents")}
                  >
                    Create Agent
                  </ButtonGuide>
                  <button onClick={handleToggleMenu}>
                    <IconMenu />
                  </button>
                </Col>

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
              </Row>
            </div>
          </div>
          <div className="mt-2 z-10 flex justify-center">
            <div className="w-full px-2">
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
                <Col span={24} className="w-full flex justify-between pr-5">
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
                      Top Daily
                    </SortTag>
                    <SortTag
                      isActive={sort == "asc"}
                      className="cursor-pointer text-base font-semibold truncate"
                      span={12}
                      onClick={() => setSort("asc")}
                    >
                      Top Gainer
                    </SortTag>
                  </div>
                </Col>
              </div>
              <Row justify="space-between" className="md:mt-5 mt-2">
                <Col span={24}>
                  <div>
                    <div>
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
                      <div className="w-full flex justify-center mt-3">
                        <span className="text-white ">
                          {/* Copyright © czagents.fun */}
                          Copyright © CZ Agents
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
