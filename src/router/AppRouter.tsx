import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import PaymentListPage from "../pages/Payments/PaymentListPage";
import MerchantListPage from "../pages/Merchants/MerchantListPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="payments" element={<PaymentListPage />} />
          <Route path="merchants" element={<MerchantListPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
