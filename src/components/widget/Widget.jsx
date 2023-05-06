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
import { useSelector } from "react-redux";

const Widget = ({ type , value}) => {
  const user = useSelector((state) => {
    return state.auth.login.currentUser;
  })

  console.log(user)
  let data;
  const [motelData, SetMotelData] = useState({water: "12", electric: "33"})
  useEffect(() => {
    const myInterval = setInterval(() => {
      getDataFromDevice().then(res => {
        console.log(res)
        SetMotelData({
          water: res.WATER,
          electric: res.ENERGY
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
        amount: user.UserType === 'admin' ? 21 : value ,
        title: user.UserType === 'admin' ? "SỐ PHÒNG" : "PHÒNG",
        isMoney: false,
        link: user.UserType === 'admin' ? "Xem danh sách phòng": "",
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
        amount: user.UserType === 'admin' ? motelData.water : value,
        title: "CHỈ SỐ NƯỚC",
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
        amount: user.UserType === 'admin' ? motelData.electric : value,
        title: "CHỈ SỐ ĐIỆN",
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
        amount: user.UserType === 'admin' ? '0.00 VND' : value + " VND",
        title: "TỔNG GIÁ ĐIỆN NƯỚC",
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
        {data.title === "SỐ PHÒNG" ? (
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
