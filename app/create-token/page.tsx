/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

"use client";

import { Col, Input, Row } from "antd";
import Link from "next/link";

import { IconSearch } from "@/public/elements/icon";
import Image from "next/image";

import { ArrowLeftOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import useIsMobile from "../hooks/useIsMobile";
import { ButtonGuide, InputSearch, SearchBox, TotalToken } from "../styled";
const CreateTokenComponent = () => {
  const [top, setTop] = useState<any | undefined>(undefined);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchTop = async () => {
      const response = await axios.get(
        "https://api.tokenfather.io/tokenfather/gettop"
      );
      setTop(response.data);
    };

    fetchTop();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-[#1a1a1a]">
        <div className="sticky top-0 z-100 items-center flex justify-center bg-[#1a1a1a] py-2">
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
                  <ButtonGuide onClick={() => {}}>Create Agent</ButtonGuide>
                </Col>
              )}
              <Col span={24} md={16}>
                <SearchBox>
                  <IconSearch />
                  <InputSearch
                    type="text"
                    width="100%"
                    value={""}
                    onChange={() => {}}
                    placeholder="Search by agent name, symbol or requestor ...."
                  />
                </SearchBox>
              </Col>

              {!isMobile && (
                <Col span={24} md={4} className="flex justify-end items-center">
                  <ButtonGuide onClick={() => {}}>
                    <span className="font-bold">Connect Wallet</span>
                  </ButtonGuide>
                </Col>
              )}
            </Row>
          </div>
        </div>
        <div className="mx-auto flex-col w-full flex items-center justify-center">
          <div className="md:w-4/5 w-full px-4 py-1 rounded-md border-2 border-[#868686] mb-2">
            <Marquee>
              {" "}
              {top?.top.map((token: any, index: any) => (
                <div key={index} className="mr-4 text-white">
                  <Link href={`/agent/${token.tokenid}`}>
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
          <div className="md:w-4/5 w-full flex justify-between">
            <div>
              <TotalToken className="w-fit px-4 text-black py-2 md:px-4 md:py-2 text-xs md:text-lg font-semibold truncate">
                {top && top?.totalToken} agents deployed
              </TotalToken>
            </div>

            <div className="flex gap-2 items-center">
              <TotalToken className="w-fit flex items-center gap-2 px-4 text-black py-2 md:px-4 md:py-2 text-xs md:text-lg font-semibold truncate">
                <ArrowLeftOutlined className="text-black" /> Back
              </TotalToken>
            </div>
          </div>
        </div>
        {/* Main Form */}
        <div className=" mx-auto flex justify-center mt-10">
          <div className="md:w-4/5 w-full bg-[#5E5E5E] rounded-lg">
            <div className="bg-[#FFCC00] flex items-center justify-between w-full rounded-lg py-14 px-10">
              <div className="flex  relative items-center">
                <div className="flex-1 ">
                  <h3 className="font-semibold text-3xl text-black mb-1">
                    Token logo
                  </h3>
                  <p className="text-sm text-[#5E5E5E] mb-2">
                    Format: JPEG/GIF/PNG/WEBP {"<"}5MB
                  </p>
                </div>
              </div>
              <div className="w-[15%] h-[50px]">
                <ButtonGuide
                  className="flex items-center gap-2"
                  onClick={() => {}}
                >
                  <span>Upload media</span>
                  <svg
                    width="15"
                    height="13"
                    viewBox="0 0 15 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.600359 7.33672L10.1864 7.33672L7.3745 10.2423C7.14757 10.4801 7.14757 10.8655 7.3745 11.102L8.19575 11.9629C8.42148 12.1994 8.78888 12.1994 9.017 11.9629L14.2399 6.55149C14.4656 6.31256 14.4656 5.92714 14.2399 5.69061L9.04942 0.311645C8.8225 0.0727131 8.45389 0.0727131 8.22817 0.311645L7.40812 1.17252C7.18119 1.40905 7.18119 1.79446 7.40812 2.03099L10.2189 4.9354L0.600359 4.9354C0.268976 4.9354 2.85782e-05 5.20434 2.85637e-05 5.53573L2.85112e-05 6.73639C2.84967e-05 7.06777 0.268976 7.33672 0.600359 7.33672Z"
                      fill="black"
                    />
                  </svg>
                </ButtonGuide>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6 p-14">
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-lg mb-2">
                      Token name <span className="text-red-500">*</span>
                    </label>
                    <Input className="bg-[#5E5E5E] h-12 border-white" />
                  </div>
                  <div>
                    <label className="block font-bold text-lg mb-2">
                      Token symbol <span className="text-red-500">*</span>
                    </label>
                    <Input className="bg-[#5E5E5E] h-12 border-white" />
                  </div>
                  <div>
                    <label className="block font-bold text-lg mb-2">
                      Token description
                    </label>
                    <TextArea className="bg-[#5E5E5E] border-white min-h-[220px] h-[220px]" />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4 p-14">
                <div>
                  <label className="block font-bold text-lg mb-2">
                    Website
                  </label>
                  <Input
                    className="bg-[#5E5E5E] h-12 border-white"
                    placeholder="ex: https://..."
                  />
                </div>
                <div>
                  <label className="block font-bold text-lg mb-2">
                    Twitter
                  </label>
                  <Input
                    className="bg-[#5E5E5E] h-12 border-white"
                    placeholder="ex: https://twitter.com/..."
                  />
                </div>
                <div>
                  <label className="block font-bold text-lg mb-2">
                    Telegram
                  </label>
                  <Input
                    className="bg-[#5E5E5E] h-12 border-white"
                    placeholder="ex: https://t.me/..."
                  />
                </div>
                <div className="pt-4 w-full items-center flex flex-col justify-center">
                  <div className="w-[30%] h-[50px]">
                    <ButtonGuide onClick={() => {}}>Connect Wallet</ButtonGuide>
                  </div>
                  <p className="text-center text-sm text-white mt-4">
                    No creation fee. Receive 50% volume trading fee from
                    Pancakeswap forever!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateTokenComponent;
