import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = ({ data =[]}) => {


  return (
    <TableContainer sx = {{ maxHeight:200}} component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 150 }} className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Water (m3)</TableCell>
            <TableCell className="tableCell">Water Cost (m3/VND)</TableCell>
            <TableCell className="tableCell">Electric (kWH)</TableCell>
            <TableCell className="tableCell">Electric Cost (kWH/VND)</TableCell>
            {/* <TableCell className="tableCell">Threshold</TableCell> */}
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data?.map((item, index) => {
            let statusE = 0
            let statusW = 0
            const initWater = data[index].WaterReading - data[0].WaterReading
            const initElectric = data[index].ElectricReading - data[0].ElectricReading
            if(index > 0 ){
              statusE = data[index].ElectricReading - data[index - 1].ElectricReading - 2
              statusW = data[index].WaterReading - data[index - 1].WaterReading - 200
            }
            return (
              <TableRow key={index}>
                <TableCell className="tableCell">{  item.ReadingDate.split('T')[0].split('-').reverse().join('/')}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    {/* <img src={row.img} alt="" className="image" /> */}
                    {item.WaterReading}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{initWater}</TableCell>
                <TableCell className="tableCell">{item.ElectricReading}</TableCell>
                <TableCell className="tableCell">{initElectric}</TableCell>
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

export default List;
