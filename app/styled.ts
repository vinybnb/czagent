import { Avatar, Col, Pagination } from "antd";
import styled from "styled-components";

export const StyledCard = styled.div<{ isFirst: boolean }>`
  padding: 24px 24px;
  border: solid 2px #000;
  border-radius: 15px;
  background-color: #d6eeff;
  width: 100%;
  box-shadow: ${(props) =>
    props.isFirst ? "6.64px 6.64px 0px #000000" : "none"};
  background-color: ${(props) => (props.isFirst ? "#DBFFAE" : "#FFFFFF")};

  @media (max-width: 768px) {
    padding-top: 20px;
    padding-bottom: 8px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

export const GroupButton = styled.div`
  display: flex;
`;

export const BoxImage = styled.div<{ isMobile: boolean }>`
  width: ${(props) => (props.isMobile ? "60px" : "131px")};
  height: ${(props) => (props.isMobile ? "60px" : "131px")};
  border: solid 1px #ccc;
  border-radius: 5px;
`;

export const TokenName = styled.p`
  font-size: 24px;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const Address = styled.p`
  font-size: 20px;
  font-weight: 400;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const TotalToken = styled.div`
  background-color: #FFCC00;
  border-color: #00000;
  border-radius: 16px;
  border: 0.81px solid;
  box-shadow: 3.64px 3.64px 0px #000000;
`;

export const SortTag = styled(Col)<{ isActive: boolean }>`
  padding: 10px 26px;
  background-color: ${(props) => (props.isActive ? "#222222" : "#454545")};
  color: ${(props) => (props.isActive ? "#ffff" : "#969696")};
  border-color: #00000;
  border-radius: 16px;
  border: 0.81px solid;
  box-shadow: 3.64px 3.64px 0px #000000;
  justify-content: center;
  align-items: center;
  display: flex;

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 2px 8px;
  }
`;

export const AuthorTag = styled(Col)`
  padding: 4px 8px;
  box-shadow: 3.64px 3.64px 0px #000000;
  border: 2px solid;
  background-color: #beff6c;
  border-radius: 4px;
  margin-right: 8px;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 0;
  }
`;

export const TimeTag = styled(Col)`
  padding: 4px 0px;
  box-shadow: 3.64px 3.64px 0px #000000;
  border: 2px solid;
  background-color: #beff6c;
  border-radius: 4px;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 0;
  }
`;

export const SearchBox = styled.div`
  padding: 24px;
  display: flex;
  align-items: center;
  height: 52px;
  background-color: white;
  box-shadow: 2.64px 2.64px 0px #000000;
  border-radius: 12.32px;
  border-color: #0e0e0e;
  border: 2.86px solid;
`;

export const ButtonGuide = styled.button`
  background-color: #FFCC00;
  box-shadow: 3.64px 3.64px 0px #000000;
  border: 2px solid;
  border-radius: 15px;
  color: #000000;
  height: 100%;
  padding: 0 20px;
  font-weight: 600;
  font-size: 16px;
`;

export const WrapperRight = styled.div`
  overflow-y: scroll;
  max-height: calc(100vh - 300px);
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;

    &:hover {
      background-color: #555;
    }
  }
`;

export const RightContent = styled.div`
  margin-right: 20px;
  background-color: #7A7A7A;
  border: 2.86px solid;
  border-color: #0e0e0e;
  border-radius: 14.32px;
  box-shadow: 7.64px 7.64px 0px #000000;
  padding: 10px 35px;
`;

export const TopLabel = styled.div`
  padding: 12px 42px;
  background-color: #beff6c;
  border: 2.86px solid;
  border-color: #0e0e0e;
  border-radius: 10.32px;
  box-shadow: 4.64px 4.64px 0px #000000;
`;

export const TimeLabel = styled.div`
  border-radius: 3.7px;
  border-color: #000;
  border: 2.2px solid;
  padding: 12px 28px;
  background-color: #e2e2e2;
`;

export const BoxContent = styled.div<{ isFirst: boolean }>`
  background-color: ${(props) => (props.isFirst ? " #474747" : "#fff")};
  border: 2px solid;
  border-color: #000000;
  border-radius: 18px;
  height: 166px;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  color: ${(props) => (props.isFirst ? "#ffff" : "#7A7A7A")};
`;

export const BoxPrice = styled.div<{ isFirst: boolean }>`
 background-color: ${(props) => (props.isFirst ? "#FFCC00" : "#fff")};
  width: 100%
  height: 69px;
  border: 2.86px solid;
  border-color: #0e0e0e;
  border-radius: 10.32px;
  box-shadow: 4.64px 4.64px 0px #000000;
`;

export const CardInfo = styled.div`
  border: 2.86px solid;
  border-color: #0e0e0e;
  border-radius: 10.32px;
  box-shadow: 6.64px 6.64px 0px #000000;
  background-color: white;

  @media (max-width: 768px) {
  }
`;
export const ListItem = styled.div`
  padding-top: 23px;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  padding-right: 20px;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;

    &:hover {
      background-color: #555;
    }
  }

  @media (max-width: 768px) {
    padding-right: 10px;
    width: 100%;
    max-height: calc(100vh - 345px);
  }
`;

export const CustomAvatar = styled(Avatar)`
  .ant-avatar-string {
    font-size: 40px;
  }
`;

export const TextColor = styled.p<{ value: number }>`
  color: ${(props) => (props.value > 0 ? "green" : "red")};
`;
export const CustomPagination = styled(Pagination)`
  .ant-pagination-item {
    border: 2px solid #7a7a7a;
    background-color: #D9D9D9;
    color: #7a7a7a;
    font-weight: 400;

    &.ant-pagination-item-active {
      border-color: #000000;
      background-color: #FFCC00;
      & a {
        color: #000000;
        font-weight: 600;
      }
    }
  }
`;

export const CustomButton = styled.button`
  border: 2.86px solid;
  border-color: #0e0e0e;
  border-radius: 15px;
  font-weight: 600;
  font-size: 16px;
  box-shadow: 2.64px 2.64px 0px #5f5f5f;
  &:hover {
    opacity: 0.7;
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const ButtonDetail = styled.button`
  padding: 8px 20px;
  background-color: #ffffff;
  color: #000 !important;
  border: 2px solid;
  border-color: #000000;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  box-shadow: 2.64px 2.64px 0px #000000;
  &:hover {
    opacity: 0.7;
  }
  @media (max-width: 768px) {
    padding: 2px 16px;
    font-size: 12px;
  }
`;

export const InputSearch = styled.input`
  width: 70%;
  height: 42px;
  margin-left: 16px;
  &:focus {
    outline: none;
    border: none;
  }
`;

export const BoxInfo = styled.div`
  padding: 8px;
  margin-top: 8px;
  box-shadow: 2.64px 2.64px 0px #000000;
  border: 2.86px solid;
  border-color: #000000;
  border-radius: 12px;
  background-color: #fff;
`;
