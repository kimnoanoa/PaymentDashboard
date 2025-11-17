const mock = [
  { id: "P1234", merchant: "스타벅스", amount: "₩5,000", status: "성공", date: "10:32" },
  { id: "P1235", merchant: "배민", amount: "₩12,000", status: "실패", date: "10:35" },
];

function RecentTable() {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-50 text-left text-sm text-gray-600">
          <th className="py-3 px-2 border-b">결제 ID</th>
          <th className="py-3 px-2 border-b">가맹점</th>
          <th className="py-3 px-2 border-b">금액</th>
          <th className="py-3 px-2 border-b">상태</th>
          <th className="py-3 px-2 border-b">시간</th>
        </tr>
      </thead>
      <tbody>
        {mock.map((row) => (
          <tr key={row.id} className="text-sm hover:bg-gray-50">
            <td className="py-3 px-2">{row.id}</td>
            <td className="py-3 px-2">{row.merchant}</td>
            <td className="py-3 px-2">{row.amount}</td>
            <td
              className={`py-3 px-2 ${
                row.status === "성공" ? "text-blue-600" : "text-red-600"
              }`}
            >
              {row.status}
            </td>
            <td className="py-3 px-2">{row.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RecentTable;
