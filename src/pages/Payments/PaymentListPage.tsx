import { useEffect, useState } from "react";
import { getPayments } from "../../api/payments";
import type { Payment } from "../../types/payment";


function PaymentListPage() {
  const [list, setList] = useState<Payment[]>([]);

  useEffect(() => {
    getPayments().then((data) => setList(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">결제 내역</h1>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2">결제 ID</th>
            <th className="p-2">가맹점</th>
            <th className="p-2">금액</th>
            <th className="p-2">상태</th>
            <th className="p-2">시간</th>
          </tr>
        </thead>
       <tbody>
        {list.map((item) => (
          <tr key={item.paymentCode} className="border-b">
            <td className="p-2">{item.paymentCode}</td>
            <td className="p-2">{item.mchtCode}</td>
            <td className="p-2">{item.amount.toLocaleString()}</td>
            <td className="p-2">{item.status}</td>
            <td className="p-2">{item.paymentAt}</td>
          </tr>
        ))}
      </tbody>


      </table>
    </div>
  );
}

export default PaymentListPage;

