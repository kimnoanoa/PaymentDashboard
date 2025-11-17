import { useEffect, useState } from "react";
import { 
  getDashboardSummary, 
  getDailyStats 
} from "../../api/dashboard";

import { 
  getTopMerchants,
  getFailReasonStats,
  getRecentPayments,
  getWeeklyStats
} from "../../api/dashboardExtra";

import StatCard from "../../components/Cards/StatCard";
import LineChart from "../../components/Charts/LineChart";

import MerchantTop5Card from "../../components/Cards/MerchantTop5Card";
import RecentPaymentsList from "../../components/Table/RecentPaymentsList";
import FailReasonChart from "../../components/Charts/FailReasonChart";
import WeeklyBarChart from "../../components/Charts/WeeklyBarChart";

import type { DashboardSummary, DailyStat } from "../../types/dashboard";

function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);

  // TOP 5 가맹점
  const [topMerchants, setTopMerchants] = useState<
    { name: string; amount: number }[]
  >([]);

  // 실패 사유
  const [failReasonStats, setFailReasonStats] = useState<
    { reason: string; count: number }[]
  >([]);

  // 최근 결제 10건
  const [recentPayments, setRecentPayments] = useState<
    {
      paymentCode: string;
      mchtName: string;
      amount: number;
      status: string;
      paymentAt: string;
    }[]
  >([]);

  // 요일별 통계
  const [weeklyStats, setWeeklyStats] = useState<
    { day: string; amount: number }[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getDashboardSummary(),
      getDailyStats(),
      getTopMerchants(),
      getFailReasonStats(),
      getRecentPayments(),
      getWeeklyStats(),
    ])
      .then(([
        summaryData,
        dailyData,
        topData,
        failData,
        recentData,
        weeklyData
      ]) => {
        setSummary(summaryData);
        setDailyStats(dailyData);
        setTopMerchants(topData);
        setFailReasonStats(failData);
        setRecentPayments(recentData);
        setWeeklyStats(weeklyData);
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
      
      {/* 최근 결제 10건 */}
      <div className="mb-12">
        <RecentPaymentsList payments={recentPayments} />
      </div>


      {/* TOP5 / 실패사유 */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <MerchantTop5Card topMerchants={topMerchants} />
        <FailReasonChart data={failReasonStats} />
        <WeeklyBarChart data={weeklyStats} />
      </div>


      {/* 일자별 결제 그래프 */}
      <LineChart data={dailyStats} />
    </>
  );
}

export default DashboardPage;
