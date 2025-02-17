"use client";

import React from "react";
import { CustomModal } from "./styled";
import { CustomButton } from "../styled";
import { Col, Row } from "antd";

type Props = {
  showModal: boolean;
  setShowModal: (isShow: boolean) => void | null;
};

const HeaderModal = () => {
  return <div className="text-center text-2xl ">How it works</div>;
};

const HowItWorks = ({ showModal, setShowModal }: Props) => {
  return (
    <CustomModal
      title={<HeaderModal />}
      open={showModal}
      onCancel={() => setShowModal(false)}
      footer={() => (
        <div className="w-full flex justify-center">
          <CustomButton
            className="bg-[#FFCC00] px-8 py-2 rounded-xl"
            onClick={() => setShowModal(false)}
          >
            Close
          </CustomButton>
        </div>
      )}
    >
      <Row>
        <Col span={12} className="p-2 border-r-2 border-gray-300">
          <p>
            {" "}
            • Go to Telegram:{" "}
            <a href="https://t.me/tokenfather_global" target="_blank">
              {" "}
              https://t.me/tokenfather_global
            </a>
          </p>
          <p>
            {" "}
            • Type a new message, tag{" "}
            <a href="https://t.me/tokenfather_global" target="_blank">
              {" "}
              @token_father_bot
            </a>{" "}
            with the token info, included name (mandatory), symbol and total
            supply and attach logo (not mandatory).
          </p>
        </Col>
        <Col span={12} className="p-2">
          <p>
            • Go to Warpcast:{" "}
            <a href="https://warpcast.com" target="_blank">
              {" "}
              https://warpcast.com
            </a>
            /
          </p>
          <p>
            • Start a new cast anywhere, tag{" "}
            <a href="https://warpcast.com" target="_blank">
              @tokenfather
            </a>{" "}
            on your cast with the token info, included name (mandatory), symbol
            and total supply and attach logo (not mandatory).
          </p>
        </Col>
      </Row>
      <p>• Receive a reply from TokenFather with the link to token page</p>
      <p>• Safe trading, it is impossible to get rugpulled on TokenFather</p>
      <p>
        • You will be rewarded 50% liquidity provider fees forever (0.5% total
        trading volume)
      </p>
      <p>
        Example: Hey @tokenfather, could you create a token named &quot;Pepe on
        Base&quot; with the symbol PEPEB? Let&apos;s spread the love for Pepe.
        (attach your token logo if available)
      </p>
    </CustomModal>
  );
};

export default HowItWorks;
