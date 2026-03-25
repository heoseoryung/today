import { useState } from 'react';
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import TradePage from './pages/TradePage.jsx';
import MeetingPage from './pages/MeetingPage.jsx';
import StoryPage from './pages/StoryPage.jsx';
import Login from './components/LoginPage.jsx';

// DongnaePage 관련 데이터 및 아이콘
import { dongneItems, dongneCategories, categoryColors } from './data/mockData.js';
import { IconChat, IconEye, IconMapPin } from './components/Icons.jsx';

// --- 서브 컴포넌트: CategoryBadge ---
function CategoryBadge({ category }) {
  const colors = categoryColors[category] || { bg: 'bg-gray-100', text: 'text-gray-700' };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}>
      {category}
    </span>
  );
}

// --- 서브 컴포넌트: PostCard ---
function PostCard({ item }) {
  return (
    <div className="py-5 border-b border-[#F0F0F0] cursor-pointer hover:bg-[#FAFAFA] -mx-4 px-4 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <CategoryBadge category={item.category} />
        <div className="flex items-center gap-1 text-xs text-[#ABABAB]">
          <IconMapPin size={11} />
          <span>{item.location}</span>
          <span>·</span>
          <span>{item.time}</span>
        </div>
      </div>
      <h3 className="text-sm font-bold text-[#1A1A1A] mb-1 leading-snug">{item.title}</h3>
      <p className="text-sm text-[#767676] leading-relaxed line-clamp-2">{item.desc}</p>
      <div className="flex items-center gap-3 mt-3 text-xs text-[#ABABAB]">
        <span className="flex items-center gap-1"><IconChat size={13} />{item.comments}</span>
        <span className="flex items-center gap-1"><IconEye size={13} />{item.views}</span>
      </div>
    </div>
  );
}

// --- 페이지 컴포넌트: 동네생활 ---
function DongnaePage() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const filtered = activeCategory === '전체'
    ? dongneItems
    : dongneItems.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-6">
      <div className="mb-2">
        <h2 className="text-xl font-black text-[#1A1A1A]">동네생활</h2>
        <p className="text-sm text-[#767676] mt-0.5">우리 동네의 다양한 이야기를 나눠보세요</p>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-4">
        {dongneCategories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeCategory === cat ? 'bg-[#1A1A1A] text-white' : 'bg-[#F8F8F8] text-[#767676] hover:bg-[#F0F0F0]'
            }`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="border-t border-[#F0F0F0]" />
      <div>
        {filtered.length > 0
          ? filtered.map((item) => <PostCard key={item.id} item={item} />)
          : <div className="text-center py-16 text-[#ABABAB] text-sm">아직 게시물이 없어요</div>
        }
      </div>
    </div>
  );
}

const PAGES = {
  home: HomePage,
  trade: TradePage,
  meeting: MeetingPage,
  story: StoryPage,
  dongnae: DongnaePage,
  login: Login,
};

// --- 메인 App 컴포넌트 ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const PageComponent = PAGES[currentPage] || HomePage;

  // 헤더를 숨길 페이지 리스트
  const hideHeaderPages = ['home', 'login'];
  const shouldHideHeader = hideHeaderPages.includes(currentPage);

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. 홈과 로그인 페이지가 아닐 때만 헤더를 보여줌 */}
      {!shouldHideHeader && (
        <Header 
          currentPage={currentPage} 
          onNavigate={setCurrentPage} 
          isLoggedIn={isLoggedIn}
          onLogout={() => {
            setIsLoggedIn(false);
            setCurrentPage('home');
          }}
        />
      )}
      
      {/* 2. 헤더가 없는 페이지는 상단 여백을 없애고, 있는 페이지는 하단 여백 추가 */}
      <main className={shouldHideHeader ? '' : 'pb-16'}>
        <PageComponent 
          onNavigate={setCurrentPage} 
          setIsLoggedIn={setIsLoggedIn} 
        />
      </main>
    </div>
  );
}