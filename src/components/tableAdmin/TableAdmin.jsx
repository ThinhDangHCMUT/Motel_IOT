import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableAdmin = ({ data =[]}) => {
  return (
    <TableContainer sx = {{ maxHeight:200}} component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 150 }} className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Water (m3)</TableCell>
            <TableCell className="tableCell">Water Cost (m3/VND)</TableCell>
            <TableCell className="tableCell">ENERGY (kWH)</TableCell>
            <TableCell className="tableCell">ENERGY Cost (kWH/VND)</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data?.map((item, index) => {
            let statusE = 0
            let statusW = 0
            const initWater = data[index].WATER - data[0].WATER
            const initENERGY = data[index].ENERGY - data[0].ENERGY
            if(index > 0 ){
              statusE = data[index].ENERGY - data[index - 1].ENERGY - 150
              statusW = data[index].WATER - data[index - 1].WATER - 150
            }
            return (
              <TableRow key={index}>
                <TableCell className="tableCell">{ item.date }</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    {/* <img src={row.img} alt="" className="image" /> */}
                    {item.WATER}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{initWater}</TableCell>
                <TableCell className="tableCell">{item.ENERGY}</TableCell>
                <TableCell className="tableCell">{initENERGY}</TableCell>
                {/* <TableCell className="tableCell">{item.method}</TableCell> */}
                <TableCell className="tableCell">
                  <span className={`status ${statusE < 0 && statusW < 0 ? 'Approved' : 'Warning'}`}>{statusE < 0 && statusW < 0 ? 'Approved' : 'Warning'}</span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableAdmin;
