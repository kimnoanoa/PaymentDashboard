import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMerchants } from "../../api/merchants";   // 이름수정
import type { Merchant } from "../../types/merchant";

function MerchantListPage() {
  const [list, setList] = useState<Merchant[]>([]);

  useEffect(() => {
    getMerchants().then((data) => {
      setList(data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Merchant List</h1>

      {list.length === 0 && <p>불러오는 중...</p>}

      <div className="space-y-4">
        {list.map((m) => (
          <Link
            key={m.mchtCode}
            to={`/merchants/${m.mchtCode}`}
            className="block p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            <div className="font-semibold text-lg">{m.mchtName}</div>
            <div className="text-sm text-gray-600">
              코드: {m.mchtCode} · 업종: {m.bizType} · 상태: {m.status}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MerchantListPage;
