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
import "./home.scss";
import { setIn } from "immutable";

const Home = () => {
  const data = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState([]);
  console.log(admin);
  
  useEffect(async () => {
    const temp = await getUserRoomDetails(data.RoomID);
    console.log(temp);
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
    },10000)

    return () => clearInterval(myInterval)
  },[admin])

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
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
          <div className="listTitle">Latest Transactions</div>
          {data?.UserType === "user" ? (
            <Table data={user}/>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
