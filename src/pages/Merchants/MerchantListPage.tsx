import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMerchants } from "../../api/merchants";
import type { Merchant } from "../../types/merchant";

function MerchantListPage() {
  const [list, setList] = useState<Merchant[]>([]);
  const [filtered, setFiltered] = useState<Merchant[]>([]);

  const [search, setSearch] = useState("");
  const [bizTypeFilter, setBizTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortType, setSortType] = useState("NONE");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginatedList = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  /** 업종 → 한글 변환 매핑 */
  const bizTypeMap: Record<string, string> = {
    CAFE: "카페",
    SHOP: "쇼핑",
    MART: "마트",
    APP: "앱 서비스",
    TRAVEL: "여행",
    EDU: "교육",
    TEST: "테스트",
  };

  /** 실제 데이터에서 업종 목록 자동 추출 */
  const bizTypes = Array.from(new Set(list.map((m) => m.bizType)));

  useEffect(() => {
    getMerchants().then((data) => {
      setList(data);
      setFiltered(data);
    });
  }, []);

  /** 필터 + 정렬 적용 */
  useEffect(() => {
    let result = [...list];

    // 검색
    if (search.trim() !== "") {
      result = result.filter(
        (m) =>
          m.mchtName.toLowerCase().includes(search.toLowerCase()) ||
          m.mchtCode.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 업종
    if (bizTypeFilter !== "ALL") {
      result = result.filter((m) => m.bizType === bizTypeFilter);
    }

    // 상태
    if (statusFilter !== "ALL") {
      result = result.filter((m) => m.status === statusFilter);
    }

    // 정렬
    if (sortType === "NAME_ASC") {
      result.sort((a, b) => a.mchtName.localeCompare(b.mchtName));
    } else if (sortType === "NAME_DESC") {
      result.sort((a, b) => b.mchtName.localeCompare(a.mchtName));
    } else if (sortType === "BIZ_ASC") {
      result.sort((a, b) => a.bizType.localeCompare(b.bizType));
    } else if (sortType === "BIZ_DESC") {
      result.sort((a, b) => b.bizType.localeCompare(a.bizType));
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [search, bizTypeFilter, statusFilter, sortType, list]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">가맹점 목록</h1>

      {/* 요약 카드 */}
      <div className="mb-6">
        <div className="inline-block bg-white border rounded-xl px-5 py-3 shadow-sm">
          <p className="text-sm text-gray-500">총 가맹점 수</p>
          <p className="text-2xl font-bold text-gray-800">{filtered.length} 개</p>
        </div>
      </div>

      {/* 필터 영역 */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="가맹점명 또는 코드 검색"
          className="border px-3 py-2 rounded w-60"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 업종 필터 (한글 적용) */}
        <select
          className="border px-3 py-2 rounded"
          value={bizTypeFilter}
          onChange={(e) => setBizTypeFilter(e.target.value)}
        >
          <option value="ALL">전체 업종</option>
          {bizTypes.map((t) => (
            <option key={t} value={t}>
              {bizTypeMap[t] ?? t}
            </option>
          ))}
        </select>

        {/* 상태 필터 */}
        <select
          className="border px-3 py-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">전체 상태</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
          <option value="CLOSED">CLOSED</option>
          <option value="READY">READY</option>
        </select>

        {/* 정렬 */}
        <select
          className="border px-3 py-2 rounded"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="NONE">정렬 없음</option>
          <option value="NAME_ASC">이름 오름차순</option>
          <option value="NAME_DESC">이름 내림차순</option>
          <option value="BIZ_ASC">업종 오름차순</option>
          <option value="BIZ_DESC">업종 내림차순</option>
        </select>
      </div>

      {/* 테이블 */}
      <div className="overflow-hidden border rounded-xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700 border-b">
            <tr>
              <th className="p-3 font-semibold">가맹점명</th>
              <th className="p-3 font-semibold">업종</th>
              <th className="p-3 font-semibold">코드</th>
              <th className="p-3 font-semibold">상태</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {paginatedList.map((m) => (
              <tr
                key={m.mchtCode}
                className="border-b hover:bg-gray-50 transition cursor-pointer"
              >
                <td className="p-3">
                  <Link
                    to={`/merchants/${m.mchtCode}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {m.mchtName}
                  </Link>
                </td>

                {/* 업종을 한글로 표시 */}
                <td className="p-3">{bizTypeMap[m.bizType] ?? m.bizType}</td>

                <td className="p-3 text-gray-600">{m.mchtCode}</td>

                <td className="p-3">
                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        m.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : m.status === "INACTIVE"
                          ? "bg-gray-200 text-gray-700"
                          : m.status === "CLOSED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {m.status}
                  </span>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          이전
        </button>

        <span className="text-gray-700 font-medium">
          {currentPage} / {totalPages}
        </span>

        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default MerchantListPage;
