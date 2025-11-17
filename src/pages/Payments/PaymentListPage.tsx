import { useEffect, useState } from "react";
import { getPayments } from "../../api/payments";
import { getMerchants } from "../../api/merchants";
import type { Payment } from "../../types/payment";
import type { Merchant } from "../../types/merchant";

function PaymentListPage() {
  const [list, setList] = useState<Payment[]>([]);
  const [filtered, setFiltered] = useState<Payment[]>([]);
  const [merchantMap, setMerchantMap] = useState<Record<string, string>>({});

  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterPayType, setFilterPayType] = useState("ALL");
  const [searchMerchant, setSearchMerchant] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [amountSort, setAmountSort] = useState<"NONE" | "ASC" | "DESC">("NONE");
  const [dateSort, setDateSort] = useState<"NONE" | "NEW" | "OLD">("NONE");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginatedList = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // ✔ 결제수단 한글 변환
  const payTypeLabels: Record<string, string> = {
    VACT: "가상계좌",
    BANK: "계좌이체",
    CARD: "카드결제",
    MOBILE: "휴대폰결제",
    ONLINE: "온라인결제",
    BILLING: "정기결제",
    DEVICE: "단말기(POS)",
  };

  // ✔ 결제수단 목록 자동 생성
  const payTypes = Array.from(new Set(list.map((p) => p.payType)));

  // 데이터 로드
  useEffect(() => {
    Promise.all([getPayments(), getMerchants()]).then(
      ([payments, merchants]) => {
        setList(payments);
        setFiltered(payments);

        const map: Record<string, string> = {};
        merchants.forEach((m: Merchant) => {
          map[m.mchtCode] = m.mchtName;
        });
        setMerchantMap(map);
      }
    );
  }, []);

  // 필터 + 정렬 처리
  useEffect(() => {
    let result = [...list];

    if (filterStatus !== "ALL") {
      result = result.filter((p) => p.status === filterStatus);
    }

    if (filterPayType !== "ALL") {
      result = result.filter((p) => p.payType === filterPayType);
    }

    if (searchMerchant.trim() !== "") {
      result = result.filter((p) => {
        const name = merchantMap[p.mchtCode] ?? "";
        return (
          p.mchtCode.toLowerCase().includes(searchMerchant.toLowerCase()) ||
          name.toLowerCase().includes(searchMerchant.toLowerCase())
        );
      });
    }

    if (startDate !== "") {
      result = result.filter((p) => p.paymentAt.slice(0, 10) >= startDate);
    }
    if (endDate !== "") {
      result = result.filter((p) => p.paymentAt.slice(0, 10) <= endDate);
    }

    if (amountSort !== "NONE") {
      result.sort((a, b) =>
        amountSort === "ASC"
          ? Number(a.amount) - Number(b.amount)
          : Number(b.amount) - Number(a.amount)
      );
    } else if (dateSort !== "NONE") {
      result.sort((a, b) => {
        const t1 = new Date(a.paymentAt).getTime();
        const t2 = new Date(b.paymentAt).getTime();
        return dateSort === "NEW" ? t2 - t1 : t1 - t2;
      });
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [
    filterStatus,
    filterPayType,
    searchMerchant,
    startDate,
    endDate,
    amountSort,
    dateSort,
    list,
    merchantMap,
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">결제 내역</h1>

      {/* 총 결제 건수 카드 */}
      <div className="mb-6">
        <div className="inline-block bg-white border rounded-xl px-5 py-3 shadow-sm">
          <p className="text-sm text-gray-500">총 결제 건수</p>
          <p className="text-2xl font-bold text-gray-800">{filtered.length} 건</p>
        </div>
      </div>

      {/* 필터 */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="가맹점명 또는 코드 검색"
          className="border px-3 py-2 rounded text-sm"
          value={searchMerchant}
          onChange={(e) => setSearchMerchant(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded text-sm"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="ALL">전체 상태</option>
          <option value="SUCCESS">성공</option>
          <option value="FAILED">실패</option>
          <option value="CANCELLED">취소</option>
        </select>

        {/* 결제수단 */}
        <select
          className="border px-3 py-2 rounded text-sm"
          value={filterPayType}
          onChange={(e) => setFilterPayType(e.target.value)}
        >
          <option value="ALL">전체 결제수단</option>
          {payTypes.map((t) => (
            <option key={t} value={t}>
              {payTypeLabels[t] ?? t}
            </option>
          ))}
        </select>

        {/* 금액 정렬 */}
        <select
          className="border px-3 py-2 rounded text-sm"
          value={amountSort}
          onChange={(e) => setAmountSort(e.target.value as any)}
        >
          <option value="NONE">금액 정렬 없음</option>
          <option value="ASC">낮은 금액순</option>
          <option value="DESC">높은 금액순</option>
        </select>

        {/* 날짜 정렬 */}
        <select
          className="border px-3 py-2 rounded text-sm"
          value={dateSort}
          onChange={(e) => setDateSort(e.target.value as any)}
        >
          <option value="NONE">날짜 정렬 없음</option>
          <option value="NEW">최신순</option>
          <option value="OLD">오래된순</option>
        </select>

        {/* 기간 */}
        <div>
          <label className="text-sm font-semibold mr-2">기간:</label>
          <input
            type="date"
            className="border px-2 py-1 rounded text-sm"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className="mx-2">~</span>
          <input
            type="date"
            className="border px-2 py-1 rounded text-sm"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-hidden border rounded-xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700 border-b">
            <tr>
              <th className="p-3 font-semibold">결제 ID</th>
              <th className="p-3 font-semibold">가맹점 코드</th>
              <th className="p-3 font-semibold">가맹점 이름</th>
              <th className="p-3 font-semibold">결제수단</th>
              <th className="p-3 font-semibold">금액</th>
              <th className="p-3 font-semibold">상태</th>
              <th className="p-3 font-semibold">시간</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {paginatedList.map((item) => (
              <tr key={item.paymentCode} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{item.paymentCode}</td>
                <td className="p-3">{item.mchtCode}</td>
                <td className="p-3">{merchantMap[item.mchtCode] ?? "-"}</td>

                <td className="p-3">{payTypeLabels[item.payType] ?? item.payType}</td>

                <td className="p-3">{item.amount.toLocaleString()}</td>

                <td
                  className={`p-3 font-semibold ${
                    item.status === "SUCCESS"
                      ? "text-green-600"
                      : item.status === "FAILED"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {item.status}
                </td>

                {/* 날짜 포맷 적용 */}
                <td className="p-3">
                  {item.paymentAt.replace("T", " ")}
                </td>
              </tr>
            ))}

            {paginatedList.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>

        <span className="px-3 py-2 font-semibold">
          {currentPage} / {totalPages}
        </span>

        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default PaymentListPage;
