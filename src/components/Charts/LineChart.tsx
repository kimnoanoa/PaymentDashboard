import {
  LineChart as LC,
  Line,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "10:00", success: 30, fail: 3 },
  { name: "11:00", success: 45, fail: 5 },
  { name: "12:00", success: 50, fail: 2 },
];

function LineChart() {
  return (
    <LC width={800} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="success" stroke="#3b82f6" />
      <Line type="monotone" dataKey="fail" stroke="#ef4444" />
    </LC>
  );
}

export default LineChart;
