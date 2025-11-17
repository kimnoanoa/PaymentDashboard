import { useEffect, useState } from "react";
import { getDashboardSummary } from "../../api/dashboard";
import StatCard from "../../components/Cards/StatCard";
import type { DashboardSummary } from "../../types/dashboard";

function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardSummary()
      .then((data) => {
        setSummary(data);
      })
      .finally(() => setLoading(false));
  }, []);

  // 로딩 중 또는 summary가 아직 없을 경우
  if (loading || !summary)
    return <p className="text-center mt-10">불러오는 중...</p>;

  // null 체크 이후 summary는 타입이 좁혀져 DashboardSummary로 확정됨
  const s = summary;

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* 통계 카드 */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="오늘 결제 성공" value={s.successCount} />
        <StatCard title="오늘 결제 실패" value={s.failCount} color="red" />
        <StatCard title="총 결제 금액" value={s.totalAmount.toLocaleString()} />
        <StatCard title="가맹점 수" value={s.merchantCount} />
      </div>
    </>
  );
}

export default DashboardPage;
