import "./featured.scss";
import {useState} from 'react'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = ({value}) => {
  const [currentDate, setCurrentDate] = useState('');
  const date = new Date();
  const options = { day: "2-digit", month: "short", year: "numeric" };
  // const formattedDate = date.toLocaleDateString("en-US", options)
  // setCurrentDate(date.toLocaleDateString("en-US", options));
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title"></h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">{date.toLocaleDateString("vi-VN", options)}</p>
        <p className="amount">{value} VND</p>
        <p className="desc">
          Bảng báo giá tiền điện nước
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">400.000VND</div>
            </div>
          </div>
          {/* <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div> */}
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">312.000VND</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
