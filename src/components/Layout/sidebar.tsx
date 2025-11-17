import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const { pathname } = useLocation();

  const menus = [
    { name: "대시보드", path: "/" },
    { name: "결제 내역", path: "/payments" },
    { name: "가맹 목록 조회", path: "/merchants" },
  ];

  return (
    <aside className="w-60 bg-white border-r h-screen p-5 flex flex-col">
      <h1 className="text-xl font-bold mb-6">올페이즈 대시보드</h1>

      <nav className="flex flex-col gap-3">
        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              pathname === menu.path
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {menu.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
