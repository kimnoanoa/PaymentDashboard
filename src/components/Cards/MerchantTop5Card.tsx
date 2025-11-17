function MerchantTop5Card({ topMerchants }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm min-h-[350px]">
      <h2 className="text-lg font-semibold mb-4">가맹점 결제 금액별 TOP 5</h2>

      <ul className="space-y-2">
        {topMerchants.map((m, i) => (
          <li key={i} className="flex justify-between">
            <span>{i + 1}. {m.name}</span>
            <span className="text-deepgreen-600">{m.amount}원</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MerchantTop5Card;
