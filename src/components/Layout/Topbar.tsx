function Topbar() {
  return (
    <div className="w-full h-14 bg-white border-b flex items-center justify-between px-6">
      <span className="font-semibold text-gray-700">노아 대시보드</span>

      <div className="flex items-center gap-4">
        <input
          placeholder="Search..."
          className="border rounded-md px-3 py-1 text-sm focus:outline-blue-500"
        />

        <div className="relative cursor-pointer">
          🔔
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
          N
        </div>
      </div>
    </div>
  );
}

export default Topbar;
