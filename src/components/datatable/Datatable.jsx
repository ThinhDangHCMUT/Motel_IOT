import "./datatable.scss";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Datatable = () => {
  const [data, setData] = useState({id:"",});
  // console.log(localStorage.getItem("USER"));
  // console.log(localStorage.getItem("ROOMS"));
  // console.log(data)
  useEffect(() => {
    const myInterval = setInterval( async () =>{
      await axios.get("http://localhost:8000/rooms")
      .then(response => {
        console.log(response.data)
        setData(response.data.map((item,index) => {
          return {
            id: index,
              ...item,
          }
        }));
        localStorage.setItem("ROOMS", JSON.stringify(data))
      })
    }, 2000)
    return () => {
      clearInterval(myInterval);
    };
    
  }, [data]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Room List
        {/* <Link to="/users/new" className="link">
          Add New
        </Link> */}
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
