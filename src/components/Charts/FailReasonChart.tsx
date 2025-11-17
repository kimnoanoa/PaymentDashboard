import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: { reason: string; count: number }[];
}

function FailReasonChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm min-h-[350px]">

      <h2 className="text-lg font-bold mb-4 text-[#2C3E2F]">결제 실패 사유별 통계</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="reason" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4F9F72" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FailReasonChart;
