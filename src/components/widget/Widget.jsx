import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDataFromDevice } from "../../redux/authRequest";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import TungstenIcon from "@mui/icons-material/Tungsten";
import "./widget.scss";

const Widget = ({ type }) => {
  let data;
  const [motelData, SetMotelData] = useState({water: "12", electric: "33"})
  useEffect(() => {
    const myInterval = setInterval(() => {
      getDataFromDevice().then(res => {
        console.log(res)
        SetMotelData({
          water: res.WATER,
          electric: res.ELECTRIC
        })
      })
    },1000)

    return () => clearInterval(myInterval)
  },[motelData])

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "room":
      data = {
        amount: 21,
        title: "ROOM",
        isMoney: false,
        link: "Xem danh sách phòng",
        icon: (
          <BedroomParentIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "water":
      data = {
        amount: motelData.water,
        title: "WATER",
        isMoney: false,
        link: "Chỉ số nước hiện tại",
        icon: (
          <WaterDropIcon
            className="icon"
            style={{
              backgroundColor: "#B3FBFD",
              color: "#01E6ED",
            }}
          />
        ),
      };
      break;
    case "electric":
      data = {
        amount: motelData.electric,
        title: "ELECTRIC",
        isMoney: true,
        link: "Chỉ số điện hiện tại",
        icon: (
          <TungstenIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        amount: 3000,
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.amount}</span>
        {data.title === "ROOM" ? (
          <Link to="/users" style={{ textDecoration: "none" }}>
            <span className="link">{data.link}</span>
          </Link>
        ) : (
          <span className="link">{data.link}</span>
        )}
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
