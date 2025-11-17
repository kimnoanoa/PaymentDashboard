import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* 좌측 사이드바 */}
      <Sidebar />

      {/* 우측 메인 영역 */}
      <div className="flex flex-col flex-1">
        <Topbar />

        {/* 페이지 내용이 보여지는 자리 */}
        <div className="p-6 overflow-auto flex-1">
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default Layout;
