import "./chart.scss";
import {
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";

const Chart = ({ aspect, title, data }) => {
  const dataChart = data?.map((item, index) => {
    return {
      date: item.ReadingDate.split('T')[0].split('-').reverse().slice(0,2).join('/'),
      water: data[index]?.WaterReading - data[index - 1]?.WaterReading,
      electric: data[index]?.ElectricReading - data[index - 1]?.ElectricReading
    };
  });
  console.log(data);
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <LineChart
          width={730}
          height={250}
          data={dataChart}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs> */}
          <XAxis dataKey="date" stroke="gray" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="electric" stroke="#8884d8" />
          <Line type="monotone" dataKey="water" stroke="#82ca9d" />
          {/* <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
