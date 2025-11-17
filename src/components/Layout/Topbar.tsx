import { useState } from "react";

function Topbar() {
  const [openNoti, setOpenNoti] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <div className="w-full h-14 bg-[#EAF3EC] border-b border-[#D8E6D8] 
                    flex items-center justify-between px-6 relative">

      {/* 좌측 타이틀 */}
      <span className="font-semibold text-[#2C3E2F] text-sm">
        (주)올페이즈 대시보드
      </span>

      {/* 우측 메뉴 */}
      <div className="flex items-center gap-6">

        {/* 알림 */}
        <div
          className="relative cursor-pointer text-[#4F9F72] hover:text-[#336049] transition"
          onClick={() => {
            setOpenNoti(!openNoti);
            setOpenProfile(false);
          }}
        >
          🔔
          <span className="absolute -top-1 -right-2 bg-red-500 text-white 
                           text-xs w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>

          {/* 알림 목록 */}
          {openNoti && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-[#D8E6D8] rounded shadow-lg z-50">
              <div className="p-3 text-sm text-[#2C3E2F] border-b">
                결제 실패 1건
              </div>
              <div className="p-3 text-sm text-[#2C3E2F] border-b">
                신규 가맹점 등록 요청
              </div>
              <div className="p-3 text-sm text-[#2C3E2F]">
                취소 요청 1건
              </div>
            </div>
          )}
        </div>

        {/*  프로필 */}
        <div
          className="relative cursor-pointer"
          onClick={() => {
            setOpenProfile(!openProfile);
            setOpenNoti(false);
          }}
        >
          <div className="w-8 h-8 bg-[#4F9F72] text-white rounded-full 
                        flex items-center justify-center text-sm font-semibold">
            N
          </div>

          {/* 프로필 메뉴 */}
          {openProfile && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-[#D8E6D8] rounded shadow-lg z-50">
              <button className="block w-full text-left px-4 py-2 text-sm text-[#2C3E2F] hover:bg-[#F0F6F2]">
                내 정보
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm text-[#2C3E2F] hover:bg-[#F0F6F2]">
                설정
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm text-[#2C3E2F] hover:bg-[#F0F6F2]">
                로그아웃
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Topbar;
