import "./datatable.scss";
import { DataGrid, GridRowsProp, GridColDef  } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Datatable = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("ROOMS")));
  // console.log(localStorage.getItem("USER"));
  // console.log(localStorage.getItem("ROOMS"));
  console.log(data)
  // useEffect(() => {
  //   setData(JSON.parse(localStorage.getItem("ROOMS")).map((item,index) => {
  //     return {
  //         ...item,
  //         id: index,
  //     }
  //   }));
    
  // }, [data]);

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
