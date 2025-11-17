// components/Tables/RecentPaymentsList.tsx
interface Props {
  payments: {
    paymentAt: string;
    mchtName: string;
    amount: number;
    status: string;
  }[];
}

const statusColor: Record<string, string> = {
  SUCCESS: "text-[#4F9F72]",
  FAILED: "text-red-600",
  CANCELLED: "text-yellow-600",
};

function RecentPaymentsList({ payments }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mt-10">
      <h2 className="text-lg font-bold mb-4 text-[#2C3E2F]">최근 결제(10건)</h2>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b text-gray-600">
            <th className="p-2">시간</th>
            <th className="p-2">가맹점</th>
            <th className="p-2">금액</th>
            <th className="p-2">상태</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p, idx) => (
            <tr key={idx} className="border-b hover:bg-[#F0F6F2] transition">
              <td className="p-2">{p.paymentAt.replace("T", " ")}</td>
              <td className="p-2">{p.mchtName}</td>
              <td className="p-2">{p.amount.toLocaleString()}원</td>
              <td className={`p-2 font-semibold ${statusColor[p.status]}`}>
                {p.status === "SUCCESS"
                  ? "성공"
                  : p.status === "FAILED"
                  ? "실패"
                  : "취소"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentPaymentsList;
