import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-white border-r h-full p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">PG Dashboard</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-blue-500"> Dashboard</Link>
        <Link to="/payments" className="hover:text-blue-500"> Payments</Link>
        <Link to="/merchants" className="hover:text-blue-500"> Merchants</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
