import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = ({ data =[]}) => {


  const rows = [
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];
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
              statusE = data[index].ElectricReading - data[index - 1].ElectricReading - 150
              statusW = data[index].WaterReading - data[index - 1].WaterReading - 150
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
