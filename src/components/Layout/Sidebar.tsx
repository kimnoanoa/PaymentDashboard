import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const { pathname } = useLocation();

  const menus = [
    { name: "대시보드", path: "/" },
    { name: "결제 내역", path: "/payments" },
    { name: "가맹점 관리", path: "/merchants" },
  ];

  return (
    <aside className="w-60 bg-white border-r h-screen p-5 flex flex-col sidebar">
      <h1 className="text-xl font-bold mb-6 text-[#2C3E2F]">(주)올페이즈</h1>

      <nav className="flex flex-col gap-3">
        {menus.map((menu) => {
          const isActive = pathname === menu.path;

          return (
            <Link
              key={menu.path}
              to={menu.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-[#DAF3E3] text-[#336049]" // 활성화 상태 (연녹색)
                  : "text-gray-700 hover:bg-[#EAF3EC] hover:text-[#336049]" // 일반 + hover
              }`}
            >
              {menu.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
