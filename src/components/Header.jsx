import { useState } from 'react';
import { IconSearch, IconBell, IconUser, IconChevronDown } from './Icons.jsx';

export default function Header({ currentPage, onNavigate, isLoggedIn }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#EDEDED]">
      {/* max-w를 1200으로 늘려 더 넓은 레이아웃 확보 */}
      <div className="flex items-center justify-between px-6 h-16 max-w-[1200px] mx-auto gap-8">
        
        {/* 로고 영역 */}
        <button onClick={() => onNavigate('home')} className="shrink-0 cursor-pointer">
          <span className="text-[24px] font-black text-[#FF6F0F] tracking-tight">606</span>
        </button>

        {/* 검색창 영역 - flex-1과 max-w를 크게 설정하여 길게 만듦 */}
        <div className="flex-1 max-w-[700px] flex items-center gap-3 h-11 px-4 rounded-xl bg-[#F2F3F6] border border-transparent focus-within:border-[#FF6F0F]/30 focus-within:bg-white focus-within:shadow-sm transition-all">
          <IconSearch size={18} className="text-[#888]" />
          <input 
            placeholder="동네 이웃과 가깝고 따뜻한 거래를 시작해보세요" 
            className="flex-1 bg-transparent text-[15px] outline-none text-[#1A1A1A] placeholder:text-[#999]"
          />
        </div>

        {/* 우측 아이콘 영역 */}
        <div className="flex items-center gap-4 relative shrink-0">
          {isLoggedIn ? (
            <>
              {/* 알림 아이콘 */}
              <button className="p-2 text-[#1A1A1A] hover:bg-gray-100 rounded-full relative transition-colors">
                <IconBell size={24} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF6F0F] rounded-full border-2 border-white"></span>
              </button>

              {/* 프로필 영역 */}
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-1 p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer border border-transparent hover:border-gray-200"
                >
                  <div className="w-9 h-9 bg-gray-200 rounded-full overflow-hidden border border-gray-100 flex items-center justify-center">
                    <IconUser size={28} className="mt-1 text-gray-500" />
                  </div>
                  <IconChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* 프로필 드롭다운 */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-3 border-b border-gray-50 mb-1">
                      <p className="text-[13px] font-bold text-[#1A1A1A]">당근이웃님</p>
                      <p className="text-[11px] text-gray-500">매너온도 36.5°C</p>
                    </div>
                    <button className="w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-gray-50 transition-colors">나의 당근</button>
                    <button className="w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-gray-50 transition-colors">설정</button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button 
                      onClick={() => { alert('로그아웃 되었습니다.'); window.location.reload(); }}
                      className="w-full px-4 py-2.5 text-left text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button 
              onClick={() => onNavigate('login')}
              className="px-5 py-2 rounded-lg border border-[#D1D1D1] text-[15px] font-bold hover:bg-[#F8F8F8] transition-colors"
            >
              로그인
            </button>
          )}
        </div>
      </div>
      
      {/* 탭 네비게이션 */}
      {currentPage !== 'home' && currentPage !== 'login' && (
        <nav className="flex justify-center gap-10 border-t border-[#F0F0F0] h-14 bg-white">
          {['trade', 'meeting', 'story', 'dongnae'].map((tab) => (
            <button 
              key={tab}
              onClick={() => onNavigate(tab)}
              className={`px-4 h-full text-[15px] font-bold relative transition-colors ${
                currentPage === tab ? 'text-[#FF6F0F]' : 'text-gray-500 hover:text-[#1A1A1A]'
              }`}
            >
              {tab === 'trade' ? '중고거래' : tab === 'meeting' ? '모임' : tab === 'story' ? '스토리' : '동네생활'}
              {currentPage === tab && <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#FF6F0F] rounded-t-full" />}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}