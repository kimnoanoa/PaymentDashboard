import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  data: { day: string; amount: number }[];
}

function WeeklyBarChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm min-h-[350px]">

      <h2 className="text-lg font-bold mb-4 text-[#2C3E2F]">
        요일별 결제 금액
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [`${value.toLocaleString()}원`, "금액"]}
          />

          <Bar dataKey="amount" fill="#4F9F72" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeeklyBarChart;
