import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const { pathname } = useLocation();

  const menu = [
    { label: "Dashboard", path: "/" },
    { label: "Payments", path: "/payments" },
    { label: "Merchants", path: "/merchants" },
  ];

  return (
    <div className="w-60 bg-white border-r h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">PG Dashboard</h1>

      <nav className="flex flex-col gap-3">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-sm font-medium hover:text-blue-600 ${
              pathname === item.path ? "text-blue-600" : "text-gray-700"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
