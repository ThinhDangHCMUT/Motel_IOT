import { useEffect, useState } from "react";
import { getUserRoomDetails } from "../../redux/authRequest";
import { useSelector } from "react-redux";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import ChartAdmin from "../../components/chartadmin/ChartAdmin";
import Table from "../../components/table/Table";
import TableAdmin from "../../components/tableAdmin/TableAdmin";
import "./home.scss";
// import { setIn } from "immutable";

const Home = () => {
  const data = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState([]);

  console.log(user)
  
  useEffect(async () => {
    const temp = await getUserRoomDetails(data.RoomID);
    console.log("ádsadsad:", temp);
    setUser(temp);
  }, []);
  

  useEffect(() => {
    axios.get("http://localhost:8000/api/value")
    .then(response => {
      setAdmin(state=>{return [...state,response.data]});
    })
  },[])

  useEffect(() => {
   
    const myInterval = setInterval( async() => {
      axios.get("http://localhost:8000/api/value")
      .then(response => {
        setAdmin(state=>{return [...state,response.data]});
      })
    },1000)

    return () => clearInterval(myInterval)
  },[admin])

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="room" value={data.RoomID}/>
          <Widget type="water" value={user[user.length - 1]?.WaterReading - user[0]?.WaterReading }/>
          <Widget type="electric" value={user[user.length - 1]?.ElectricReading - user[0]?.ElectricReading }/>
          <Widget type="balance" value={(user[user.length - 1]?.WaterReading - user[0]?.WaterReading)* 2000 + (user[user.length - 1]?.ElectricReading - user[0]?.ElectricReading)*2500 }/>
        </div>
        <div className="charts">
          <Featured />
          {data?.UserType === "user" ? (
            <Chart data={user} title="Last Tracking" aspect={2 / 1} />
          ) : (
            <ChartAdmin data={admin} title="Last Tracking" aspect={2 / 1} />
          )}
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Tracking</div>
          {data?.UserType === "user" ? (
            <Table data={user}/>
          ) : (
            <TableAdmin data={admin}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
