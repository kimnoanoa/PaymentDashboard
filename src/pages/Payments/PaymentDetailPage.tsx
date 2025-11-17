import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPaymentDetail } from "../../api/payments";
import type { Payment } from "../../types/payment";

function PaymentDetailPage() {
  const { paymentCode } = useParams();
  const [detail, setDetail] = useState<Payment | null>(null);

  useEffect(() => {
    if (!paymentCode) return;

    getPaymentDetail(paymentCode).then((data) => {
      setDetail(data);
    });
  }, [paymentCode]);

  if (!detail) return <p className="text-center mt-10">불러오는 중...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">결제 상세 정보</h1>

      <div className="border p-5 rounded-lg shadow-md bg-white w-[400px]">
        <p><strong>결제 ID:</strong> {detail.paymentCode}</p>
        <p><strong>가맹점 코드:</strong> {detail.mchtCode}</p>
        <p><strong>금액:</strong> {detail.amount.toLocaleString()}원</p>
        <p><strong>결제 방식:</strong> {detail.payType}</p>
        <p><strong>상태:</strong> {detail.status}</p>
        <p><strong>결제 시각:</strong> {detail.paymentAt}</p>
      </div>
    </div>
  );
}

export default PaymentDetailPage;
