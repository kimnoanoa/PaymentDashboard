import { useEffect, useState } from "react";
import { getPayments } from "../../api/payments";
import { getMerchants } from "../../api/merchants";
import type { Payment } from "../../types/payment";
import type { Merchant } from "../../types/merchant";

function PaymentListPage() {
  const [list, setList] = useState<Payment[]>([]);
  const [filtered, setFiltered] = useState<Payment[]>([]);
  const [merchantMap, setMerchantMap] = useState<Record<string, string>>({});

  /** 필터 상태 */
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchMerchant, setSearchMerchant] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  /** 정렬 옵션 */
  const [amountSort, setAmountSort] = useState<"NONE" | "ASC" | "DESC">("NONE");
  const [dateSort, setDateSort] = useState<"NONE" | "NEW" | "OLD">("NONE");

  /** 🔥 결제 + 가맹점 정보 같이 불러오기 */
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

  /** 🔥 필터 + 정렬 적용 */
  useEffect(() => {
    let result = [...list];

    /** 상태 필터 */
    if (filterStatus !== "ALL") {
      result = result.filter((p) => p.status === filterStatus);
    }

    /** 가맹점 검색 */
    if (searchMerchant.trim() !== "") {
      result = result.filter((p) => {
        const name = merchantMap[p.mchtCode] ?? "";
        return (
          p.mchtCode.toLowerCase().includes(searchMerchant.toLowerCase()) ||
          name.toLowerCase().includes(searchMerchant.toLowerCase())
        );
      });
    }

    /** 기간 필터 */
    if (startDate !== "") {
      result = result.filter((p) => p.paymentAt.slice(0, 10) >= startDate);
    }
    if (endDate !== "") {
      result = result.filter((p) => p.paymentAt.slice(0, 10) <= endDate);
    }

    /** 🔥 정렬 적용 (금액 → 날짜 우선순위) */
    if (amountSort !== "NONE") {
      result.sort((a, b) => {
        const x = Number(a.amount);
        const y = Number(b.amount);
        return amountSort === "ASC" ? x - y : y - x;
      });
    } else if (dateSort !== "NONE") {
      result.sort((a, b) => {
        const t1 = new Date(a.paymentAt).getTime();
        const t2 = new Date(b.paymentAt).getTime();
        return dateSort === "NEW" ? t2 - t1 : t1 - t2;
      });
    }

    setFiltered(result);
  }, [
    filterStatus,
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
      <h1 className="text-2xl font-bold mb-4">결제 내역</h1>

      {/* 필터 영역 */}
      <div className="flex flex-wrap items-center gap-4 mb-6">

        {/* 상태 */}
        <div>
          <label className="text-sm font-semibold mr-2">상태:</label>
          <select
            className="border rounded px-3 py-2 text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="ALL">전체</option>
            <option value="SUCCESS">성공</option>
            <option value="FAILED">실패</option>
            <option value="CANCELLED">취소</option>
          </select>
        </div>

        {/* 가맹점 검색 */}
        <div>
          <label className="text-sm font-semibold mr-2">가맹점 검색:</label>
          <input
            type="text"
            className="border rounded px-3 py-2 text-sm"
            placeholder="가맹점명 또는 코드"
            value={searchMerchant}
            onChange={(e) => setSearchMerchant(e.target.value)}
          />
        </div>

        {/* 금액 정렬 */}
        <div>
          <label className="text-sm font-semibold mr-2">금액 정렬:</label>
          <select
            className="border rounded px-3 py-2 text-sm"
            value={amountSort}
            onChange={(e) => setAmountSort(e.target.value as any)}
          >
            <option value="NONE">정렬 없음</option>
            <option value="ASC">낮은 금액순</option>
            <option value="DESC">높은 금액순</option>
          </select>
        </div>

        {/* 날짜 정렬 */}
        <div>
          <label className="text-sm font-semibold mr-2">날짜 정렬:</label>
          <select
            className="border rounded px-3 py-2 text-sm"
            value={dateSort}
            onChange={(e) => setDateSort(e.target.value as any)}
          >
            <option value="NONE">정렬 없음</option>
            <option value="NEW">최신순</option>
            <option value="OLD">오래된순</option>
          </select>
        </div>

        {/* 기간 필터 */}
        <div>
          <label className="text-sm font-semibold mr-2">기간:</label>
          <input
            type="date"
            className="border rounded px-2 py-1 text-sm"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className="mx-2">~</span>
          <input
            type="date"
            className="border rounded px-2 py-1 text-sm"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* 테이블 */}
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2">결제 ID</th>
            <th className="p-2">가맹점 코드</th>
            <th className="p-2">가맹점 이름</th>
            <th className="p-2">금액</th>
            <th className="p-2">상태</th>
            <th className="p-2">시간</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((item) => (
            <tr key={item.paymentCode} className="border-b">
              <td className="p-2">{item.paymentCode}</td>
              <td className="p-2">{item.mchtCode}</td>
              <td className="p-2">{merchantMap[item.mchtCode] ?? "-"}</td>

              <td className="p-2">{item.amount.toLocaleString()}</td>

              <td
                className={`p-2 font-semibold ${
                  item.status === "SUCCESS"
                    ? "text-green-600"
                    : item.status === "FAILED"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {item.status}
              </td>

              <td className="p-2">{item.paymentAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentListPage;
