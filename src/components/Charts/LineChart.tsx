import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { date: string; amount: number }[];
}

// 커스텀 툴팁
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow border text-sm">
        <p className="font-semibold text-deepgreen-700">{label}</p>
        <p className="text-gray-700">
          <span className="font-medium">금액: </span>
          {payload[0].value.toLocaleString()}원
        </p>
      </div>
    );
  }
  return null;
}

function DailyLineChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4">일자별 결제 금액</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#C9D9C9" />
          <XAxis dataKey="date" stroke="#24553A" />
          <YAxis stroke="#24553A" />

          {/* 커스텀 툴팁 사용 */}
          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#24553A"
            strokeWidth={3}
            dot={{ r: 4, stroke: "#1E4630", strokeWidth: 2, fill: "#24553A" }}
            activeDot={{ r: 6, fill: "#1E4630" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DailyLineChart;
