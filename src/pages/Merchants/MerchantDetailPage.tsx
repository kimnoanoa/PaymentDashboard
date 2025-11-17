import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getMerchantDetail } from "../../api/merchants"; 
import type { MerchantDetail } from "../../types/merchant"; // OK

function MerchantDetailPage() {
  const { mchtCode } = useParams();
  const [detail, setDetail] = useState<MerchantDetail | null>(null);

  useEffect(() => {
    if (!mchtCode) return;

    getMerchantDetail(mchtCode).then((data) => {
      setDetail(data);
    });
  }, [mchtCode]);

  if (!detail) return <p>불러오는 중...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{detail.mchtName}</h1>

      <p>업종: {detail.bizType}</p>
      <p>상태: {detail.status}</p>
      <p>전화번호: {detail.phone}</p>
      <p>주소: {detail.address}</p>
      <p>등록일: {detail.registeredAt}</p>
      <p>수정일: {detail.updatedAt}</p>
      <p>사업자번호: {detail.bizNo}</p>
      <p>이메일: {detail.email}</p>
    </div>
  );
}

export default MerchantDetailPage;
