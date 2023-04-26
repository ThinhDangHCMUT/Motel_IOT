import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useParams } from "react-router-dom";
import { getUserRoomDetails } from "../../redux/authRequest";
import { useEffect, useState } from "react";

const Single = () => {
  const params = useParams();
  const [user, setUser] = useState([]);
  useEffect(async () => {
    const temp = await getUserRoomDetails(params.RoomID);
    console.log(temp);
    setUser(temp);
  }, []);
  console.log(user);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              {user[0] && (
                <div className="details">
                  <h1 className="itemTitle">{user[0].UserName}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{user[0].Email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{user[0].Phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Room: </span>
                    <span className="itemValue">{user[0].roomName}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Room Type: </span>
                    <span className="itemValue">{user[0].roomType}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="right">
            <Chart
              data={user}
              aspect={3 / 1}
              title="User Spending ( Last 6 Months)"
            />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List data={user} />
        </div>
      </div>
    </div>
  );
};

export default Single;
