import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import PaymentListPage from "../pages/Payments/PaymentListPage";
import PaymentDetailPage from "../pages/Payments/PaymentDetailPage";
import MerchantListPage from "../pages/Merchants/MerchantListPage";
import MerchantDetailPage from "../pages/Merchants/MerchantDetailPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />

          {/* 결제 */}
          <Route path="payments" element={<PaymentListPage />} />
          <Route path="payments/:paymentCode" element={<PaymentDetailPage />} />

          {/* 가맹점 */}
          <Route path="merchants" element={<MerchantListPage />} />
          <Route path="merchants/:mchtCode" element={<MerchantDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
