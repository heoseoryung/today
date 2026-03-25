import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { dongneItems, dongneTopics, categoryColors } from '../data/mockData.js';
import { IconChat, IconEye, IconMapPin, IconPen } from '../components/Icons.jsx';

// --- 서브 컴포넌트: 카테고리 배지 ---
function CategoryBadge({ category }) {
  const colors = categoryColors[category] || { bg: 'bg-gray-100', text: 'text-gray-700' };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}>
      {category}
    </span>
  );
}

// --- 서브 컴포넌트: 게시글 카드 ---
function PostCard({ item }) {
  const navigate = useNavigate(); // 1. 카드마다 이동 함수 준비

  return (
    <div 
      // 2. 카드 전체 클릭 시 상세 페이지 이동
      onClick={() => navigate(`/dongnae/${item.postId}`)} 
      className="py-5 border-b border-[#F0F0F0] cursor-pointer hover:bg-[#FAFAFA] -mx-4 px-4 transition-colors"
    >
      <div className="flex items-center gap-2 mb-2">
        <CategoryBadge category={item.topicName} />
        <div className="flex items-center gap-1 text-xs text-[#ABABAB]">
          <IconMapPin size={11} />
          <span>{item.locationName}</span>
          <span>·</span>
          <span>{item.createdAt}</span>
        </div>
      </div>
      <h3 className="text-sm font-bold text-[#1A1A1A] mb-1 leading-snug">{item.title}</h3>
      <p className="text-sm text-[#767676] leading-relaxed line-clamp-2">{item.content}</p>
      <div className="flex items-center gap-3 mt-3 text-xs text-[#ABABAB]">
        <span className="flex items-center gap-1">
          <IconChat size={13} />
          {item.commentCount}
        </span>
        <span className="flex items-center gap-1">
          <IconEye size={13} />
          {item.viewCount}
        </span>
      </div>
    </div>
  );
}

// --- 메인 페이지 컴포넌트 ---
export default function DongnaePage() {
  const [activeTopic, setActiveTopic] = useState('전체');
  const navigate = useNavigate(); // 3. 글쓰기 버튼용 네비게이트

  const filtered = activeTopic === '전체'
    ? dongneItems
    : dongneItems.filter((item) => item.topicName === activeTopic);

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h2 className="text-xl font-black text-[#1A1A1A]">동네생활</h2>
          <p className="text-sm text-[#767676] mt-0.5">우리 동네의 다양한 이야기를 나눠보세요</p>
        </div>
        <button 
          // 4. 글쓰기 버튼 클릭 시 이동
          onClick={() => navigate('/dongnae/write')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF6F0F] text-white text-sm font-semibold hover:bg-[#E55C00] transition-colors shrink-0"
        >
          <IconPen size={14} />
          글쓰기
        </button>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-4">
        <button
          onClick={() => setActiveTopic('전체')}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
            activeTopic === '전체' ? 'bg-[#1A1A1A] text-white' : 'bg-[#F8F8F8] text-[#767676] hover:bg-[#F0F0F0]'
          }`}
        >
          전체
        </button>
        {dongneTopics.map((topic) => (
          <button
            key={topic.topicId}
            onClick={() => setActiveTopic(topic.name)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeTopic === topic.name ? 'bg-[#1A1A1A] text-white' : 'bg-[#F8F8F8] text-[#767676] hover:bg-[#F0F0F0]'
            }`}
          >
            {topic.name}
          </button>
        ))}
      </div>

      <div className="border-t border-[#F0F0F0]" />

      {/* Posts List */}
      <div>
        {filtered.length > 0 ? (
          filtered.map((item) => <PostCard key={item.postId} item={item} />)
        ) : (
          <div className="text-center py-16 text-[#ABABAB] text-sm">
            아직 게시물이 없어요
          </div>
        )}
      </div>
    </div>
  );

}