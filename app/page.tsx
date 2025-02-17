"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Row, Col, Layout, PaginationProps, Tooltip } from "antd";
import moment from "moment";

import { getFirstAndLastString } from "./utils/helper";
import Image from "next/image";
import {
  Address,
  AuthorTag,
  BoxContent,
  BoxImage,
  BoxPrice,
  ButtonDetail,
  ButtonGuide,
  CustomAvatar,
  CustomButton,
  CustomPagination,
  InputSearch,
  ListItem,
  RightContent,
  SearchBox,
  SortTag,
  StyledCard,
  TimeLabel,
  TimeTag,
  TokenName,
  TopLabel,
  TotalToken,
  WrapperRight,
} from "./styled";
import useDebounce from "./hooks/useDebounce";
import useIsMobile from "./hooks/useIsMobile";
import { Chart, IconSearch, World } from "@/public/elements/icon";
import HowItWorks from "./components/HowItWorks";
import Marquee from "react-fast-marquee";

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
    <Layout>
      <div className="sticky top-0 z-100 items-center flex justify-center bg-[#001529] py-2">
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
                <ButtonGuide onClick={() => setShowModal(true)}>
                  How it works
                </ButtonGuide>
              </Col>
            )}
          </Row>
        </div>
      </div>
      <Content className="mt-2 w-full flex justify-center">
        <div className="md:w-4/5 w-full px-2">
          <div className="px-4 py-1 rounded-md border-2 border-[#868686] mb-2 md:hidden">
            <Marquee>
              {" "}
              {top?.top.map((token: TokenData, index) => (
                <div key={index} className="mr-4">
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

          <Row>
            <Col span={12} md={6}>
              <TotalToken className="w-fit px-4 py-2 md:px-4 md:py-2 text-xs md:text-lg font-semibold truncate">
                {top && top?.totalToken} tokens deployed
              </TotalToken>
            </Col>

            <Col span={12} md={6}>
              <Row justify="space-between">
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
                  span={11}
                  onClick={() => setSort("asc")}
                >
                  Oldest First
                </SortTag>
              </Row>
            </Col>

            {/* <SortTag
            isActive={false}
            className="text-white text-lg font-bold hidden"
            span={6}
            md={4}
          >
            {" "}
            All types
          </SortTag>
          {!isMobile && (
            <SortTag
              isActive={false}
              className="text-white text-lg font-bold"
              span={4}
            >
              Proxy only
            </SortTag>
          )} */}
          </Row>
          <Row justify="space-between" className="md:mt-5 mt-2">
            <Col span={24} md={12}>
              <ListItem>
                {tokens.map((token: TokenData, index) => (
                  <div key={index} style={{ position: "relative" }}>
                    <Row className="absolute top-[-24px] z-50 w-full">
                      <AuthorTag
                        md={5}
                        span={8}
                        className="text-lg font-semibold text-center truncate"
                      >
                        <Tooltip
                          title={`${token.usernameDisplay}(@${token.username})`}
                        >
                          <span>{token.usernameDisplay}</span>
                        </Tooltip>
                      </AuthorTag>
                      <TimeTag
                        md={5}
                        span={8}
                        className="text-base font-semibold text-center truncate"
                      >
                        {moment.unix(token.createdAt / 1000).fromNow()}
                      </TimeTag>
                    </Row>

                    <StyledCard
                      isFirst={index == 0}
                      className="p-30 mb-10"
                      key={index}
                    >
                      <Row justify="space-between">
                        <Col md={6}>
                          <BoxImage isMobile={isMobile}>
                            <CustomAvatar
                              src={token.image || null}
                              shape="square"
                              size={isMobile ? 60 : 130}
                            >
                              {token.symbol}
                            </CustomAvatar>
                          </BoxImage>
                        </Col>
                        <Col span={18}>
                          <Row>
                            <TokenName>
                              {token.name} ({token.symbol})
                            </TokenName>
                          </Row>
                          <Row>
                            <Address>
                              Address:{" "}
                              <a
                                target="_blank"
                                href={`https://basescan.org/address/${token.contractAddress}`}
                              >
                                {getFirstAndLastString(token.contractAddress)}
                              </a>
                            </Address>
                          </Row>
                          {!isMobile && (
                            <Row className="mt-8">
                              <Col span={16}>
                                <CustomButton
                                  className="text-[#000] bg-[#A7E5FF] mr-2 md:mr-4 py-2 px-5"
                                  onClick={() =>
                                    window.open(token.messageUrl, "_blank")
                                  }
                                >
                                  <div className="flex items-center">
                                    <World />
                                    <span className="ml-2">Website</span>
                                  </div>
                                </CustomButton>
                                <CustomButton
                                  className="bg-[#CDCDCD] text-black py-2 px-5"
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

                              <Col
                                span={8}
                                className="flex justify-end truncate"
                              >
                                <ButtonDetail>
                                  <Link
                                    href={`/token/${token.contractAddress}`}
                                  >
                                    View Detail
                                  </Link>
                                </ButtonDetail>
                              </Col>
                            </Row>
                          )}
                        </Col>
                      </Row>
                      {isMobile && (
                        <Row style={{ marginTop: isMobile ? "10px" : "32px" }}>
                          <Col md={6} span={8}>
                            <CustomButton
                              className="text-[#000] bg-[#A7E5FF] px-3 py-1"
                              onClick={() =>
                                window.open(token.messageUrl, "_blank")
                              }
                            >
                              <div className="flex items-center">
                                <World />
                                <span className="ml-2">Website</span>
                              </div>
                            </CustomButton>
                          </Col>
                          <Col md={6} span={8}>
                            <CustomButton
                              className="bg-[#CDCDCD] text-black px-3 py-1"
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
                          <Col
                            md={12}
                            span={8}
                            className="flex justify-end truncate"
                          >
                            <ButtonDetail>
                              <Link href={`/token/${token.contractAddress}`}>
                                View Detail
                              </Link>
                            </ButtonDetail>
                          </Col>
                        </Row>
                      )}
                    </StyledCard>
                  </div>
                ))}
              </ListItem>
              <div className="flex justify-center mt-8 w-full md:w-[880px] md:mb-0 mb-3">
                {tokens.length > 0 && (
                  <CustomPagination
                    total={top && top?.totalToken}
                    defaultCurrent={1}
                    onChange={onChangePage}
                    pageSize={10}
                  />
                )}
              </div>
            </Col>

            {!isMobile && (
              <Col span={24} md={10}>
                <WrapperRight>
                  <RightContent>
                    <Row justify="space-between">
                      <TopLabel className="text-lg font-bold">
                        Top Daily
                      </TopLabel>
                      <TimeLabel className="text-lg font-normal">
                        24 hours
                      </TimeLabel>
                    </Row>
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

      <div className="w-full justify-end flex p-2">
        <div className="flex w-32 md:w-[250px] justify-between">
          <a href="https://t.me/tokenfather_global" target="_blank">
            <img
              src="images/logo/logoTele.svg"
              alt="logo tele"
              className="md:w-[52px] md:h-[52px] w-[30px] h-[30px]"
            />
          </a>
          <a href="https://warpcast.com/tokenfather" target="_blank">
            <img
              src="images/logo/logoWarpcast.svg"
              alt="logo warpcast"
              className="md:w-[52px] md:h-[52px] w-[30px] h-[30px]"
            />
          </a>
          <a href="https://tokenfather.io/" target="_blank">
            <img
              src="images/logo/logoWeb.svg"
              alt="logo web"
              className="md:w-[52px] md:h-[52px] w-[30px] h-[30px]"
            />
          </a>
          <a href="https://x.com/tokenfatherx" target="_blank">
            <img
              src="images/logo/logoX.svg"
              alt="logo X"
              className="md:w-[52px] md:h-[52px] w-[30px] h-[30px]"
            />
          </a>
        </div>
      </div>

      <HowItWorks showModal={showModal} setShowModal={setShowModal} />
    </Layout>
  );
}
