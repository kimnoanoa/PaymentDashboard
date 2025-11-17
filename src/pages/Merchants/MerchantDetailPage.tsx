import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getMerchantDetail } from "../../api/merchants";
import type { MerchantDetail } from "../../types/merchant";

function MerchantDetailPage() {
  const { mchtCode } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<MerchantDetail | null>(null);

  // 상태 뱃지 스타일
  const statusBadge: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-700",
    INACTIVE: "bg-gray-200 text-gray-700",
    CLOSED: "bg-red-100 text-red-700",
    READY: "bg-yellow-100 text-yellow-700",
  };

  useEffect(() => {
    if (!mchtCode) return;
    getMerchantDetail(mchtCode).then((data) => setDetail(data));
  }, [mchtCode]);

  if (!detail)
    return <p className="text-center mt-10 text-gray-500">불러오는 중...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* 상단 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{detail.mchtName}</h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              statusBadge[detail.status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {detail.status}
          </span>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          뒤로가기
        </button>
      </div>

      {/* 하나로 통합된 상세 카드 */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">

        <h2 className="font-semibold text-xl mb-4">가맹점 정보</h2>

        {/* 2열 정보 그리드 */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-10">

          <div>
            <p className="text-gray-500 text-sm">가맹점 코드</p>
            <p className="font-medium">{detail.mchtCode}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">업종</p>
            <p className="font-medium">{detail.bizType}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">사업자 번호</p>
            <p className="font-medium">{detail.bizNo}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">전화번호</p>
            <p className="font-medium">{detail.phone}</p>
          </div>

          <div className="col-span-2">
            <p className="text-gray-500 text-sm">주소</p>
            <p className="font-medium">{detail.address}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">이메일</p>
            <p className="font-medium">{detail.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">등록일</p>
            <p className="font-medium">{detail.registeredAt}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">수정일</p>
            <p className="font-medium">{detail.updatedAt}</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MerchantDetailPage;
