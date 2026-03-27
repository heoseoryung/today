import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconSearch, IconBell, IconUser, IconChevronDown } from './Icons.jsx';

export default function Header({ isLoggedIn = false, user = null }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isBellActive, setIsBellActive] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
    // TODO: POST /api/auth/logout 연결
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#EDEDED]">
      <div className="flex items-center justify-between px-6 h-16 max-w-[1200px] mx-auto gap-8">

        {/* 로고 */}
        <Link to="/" className="shrink-0 cursor-pointer">
          <span className="text-[24px] font-black text-[#FF6F0F] tracking-tight">606</span>
        </Link>

        {/* 검색창 */}
        <div className="flex-1 max-w-[700px] flex items-center gap-3 h-11 px-4 rounded-xl bg-[#F2F3F6] border border-transparent focus-within:border-[#FF6F0F]/30 focus-within:bg-white focus-within:shadow-sm transition-all">
          <IconSearch size={18} className="text-[#888]" />
          <input
            placeholder="동네 이웃과 가깝고 따뜻한 거래를 시작해보세요"
            className="flex-1 bg-transparent text-[15px] outline-none text-[#1A1A1A] placeholder:text-[#999]"
          />
        </div>

        {/* 우측 영역 */}
        <div className="flex items-center gap-3 shrink-0">
          {isLoggedIn ? (
            <>
              {/* 알림 벨 */}
              <button
                onClick={() => setIsBellActive(!isBellActive)}
                className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[#F2F3F6] transition-colors"
              >
                <IconBell size={22} className="text-[#444]" />
                {/* 알림 뱃지 */}
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF6F0F] rounded-full border-2 border-white" />
              </button>

              {/* 프로필 드롭다운 */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 h-10 pl-2 pr-3 rounded-xl hover:bg-[#F2F3F6] transition-colors"
                >
                  {/* 아바타 */}
                  {user?.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt="프로필"
                      className="w-7 h-7 rounded-full object-cover border border-[#EDEDED]"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#FFF0E6] flex items-center justify-center">
                      <IconUser size={15} className="text-[#FF6F0F]" />
                    </div>
                  )}
                  <span className="text-[14px] font-bold text-[#1A1A1A]">
                    {user?.nickname ?? '닉네임'}
                  </span>
                  <IconChevronDown
                    size={14}
                    className={`text-[#888] transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* 드롭다운 메뉴 */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] w-52 bg-white rounded-2xl border border-[#EDEDED] shadow-xl shadow-black/5 overflow-hidden">
                    {/* 유저 정보 헤더 */}
                    <div className="px-4 py-3.5 border-b border-[#F0F0F0] bg-[#FAFAFA]">
                      <p className="text-[13px] font-extrabold text-[#1A1A1A]">
                        {user?.nickname ?? '닉네임'}
                      </p>
                      <p className="text-[12px] text-[#999] mt-0.5">
                        {user?.locationName ?? '동네 미설정'}
                      </p>
                      {/* 매너온도 */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex-1 h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#FF6F0F] to-[#FFB347] rounded-full transition-all"
                            style={{ width: `${Math.min(((user?.temperature ?? 36.5) / 100) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-[12px] font-bold text-[#FF6F0F]">
                          {user?.temperature ?? 36.5}°C
                        </span>
                      </div>
                    </div>

                    {/* 메뉴 항목 */}
                    <ul className="py-1.5">
                      {[
                        { label: '내 프로필', path: '/profile/me' },
                        { label: '나의 거래', path: '/trade/history' },
                        { label: '관심 목록', path: '/products/likes' },
                        { label: '동네 설정', path: '/location' },
                      ].map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center px-4 py-2.5 text-[14px] text-[#1A1A1A] hover:bg-[#FFF0E6] hover:text-[#FF6F0F] font-medium transition-colors"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {/* 로그아웃 */}
                    <div className="border-t border-[#F0F0F0] py-1.5">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2.5 text-[14px] text-[#999] hover:bg-[#F2F3F6] hover:text-[#FF4444] font-medium transition-colors"
                      >
                        로그아웃
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg border border-[#D1D1D1] text-[15px] font-bold hover:bg-[#F8F8F8] transition-colors"
            >
              로그인
            </Link>
          )}
        </div>
      </div>

      {/* 탭 네비게이션 */}
      {currentPath !== '/login' && (
        <nav className="flex justify-center gap-10 border-t border-[#F0F0F0] h-14 bg-white">
          {[
            { id: 'trade', name: '중고거래', path: '/trade' },
            { id: 'meeting', name: '모임', path: '/meeting' },
            { id: 'story', name: '스토리', path: '/story' },
            { id: 'dongnae', name: '동네생활', path: '/dongnae' },
          ].map((tab) => (
            <Link
              key={tab.id}
              to={tab.path}
              className={`px-4 h-full flex items-center text-[15px] font-bold relative transition-colors ${
                currentPath.startsWith(tab.path)
                  ? 'text-[#FF6F0F]'
                  : 'text-gray-500 hover:text-[#1A1A1A]'
              }`}
            >
              {tab.name}
              {currentPath.startsWith(tab.path) && (
                <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#FF6F0F] rounded-t-full" />
              )}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}