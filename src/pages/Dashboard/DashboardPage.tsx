import { useEffect, useState } from "react";
import { getDashboardSummary, getDailyStats } from "../../api/dashboard";

import StatCard from "../../components/Cards/StatCard";
import LineChart from "../../components/Charts/LineChart";

import type { DashboardSummary, DailyStat } from "../../types/dashboard";

function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDashboardSummary(), getDailyStats()])
      .then(([summaryData, dailyData]) => {
        setSummary(summaryData);
        setDailyStats(dailyData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !summary)
    return <p className="text-center mt-10">불러오는 중...</p>;

  const s = summary;

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* 오늘 결제 */}
      <h2 className="text-lg font-semibold text-gray-700 mb-2">오늘 결제</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard title="오늘 결제 성공" value={s.successCount} />
        <StatCard title="오늘 결제 실패" value={s.failCount} color="red" />
        <StatCard title="오늘 결제 취소" value={s.canceledCount} color="yellow" />
      </div>

      {/* 전체 결제 */}
      <h2 className="text-lg font-semibold text-gray-700 mb-2">전체 결제</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard title="총 결제 성공" value={s.totalSuccessCount} />
        <StatCard title="총 결제 실패" value={s.totalFailCount} color="red" />
        <StatCard title="총 결제 취소" value={s.totalCanceledCount} color="yellow" />
      </div>

      {/* 기타 */}
      <h2 className="text-lg font-semibold text-gray-700 mb-2">기타</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard title="총 결제 금액" value={s.totalAmount.toLocaleString()} />
        <StatCard title="가맹점 수" value={s.merchantCount} />
        <StatCard title="결제 성공률" value={`${s.successRate}%`} />
      </div>

      {/* 그래프 */}
      <LineChart data={dailyStats} />

      


    
    </>
  );
}

export default DashboardPage;
