import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconChat, IconEye, IconMapPin, IconPen } from '../components/Icons.jsx';
import { dongneItems, dongneTopics } from '../data/mockData.js';

// 백엔드 완성 후 아래 import 추가
// import api from '../api/api.js';

const topicColors = {
  '동네질문':  { bg: 'bg-blue-100',   text: 'text-blue-700'   },
  '동네맛집':  { bg: 'bg-orange-100', text: 'text-orange-700' },
  '동네소식':  { bg: 'bg-green-100',  text: 'text-green-700'  },
  '분실/실종': { bg: 'bg-red-100',    text: 'text-red-700'    },
  '생활정보':  { bg: 'bg-purple-100', text: 'text-purple-700' },
  '취미생활':  { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  '일상':      { bg: 'bg-pink-100',   text: 'text-pink-700'   },
};

function CategoryBadge({ category }) {
  const colors = topicColors[category] || { bg: 'bg-gray-100', text: 'text-gray-700' };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}>
      {category}
    </span>
  );
}

function PostCard({ item }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/dongnae/${item.postId}`)}
      className="py-5 border-b border-[#F0F0F0] cursor-pointer hover:bg-[#FAFAFA] transition-colors"
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
        <span className="flex items-center gap-1"><IconChat size={13} />{item.commentCount}</span>
        <span className="flex items-center gap-1"><IconEye size={13} />{item.viewCount}</span>
      </div>
    </div>
  );
}

export default function DongnaePage() {
  const navigate = useNavigate();
  const [activeTopic, setActiveTopic] = useState({ topicId: 0, name: '전체' });

  // 주제 목록 — 백엔드 완성 후 아래로 교체
  // const [topics, setTopics] = useState([{ topicId: 0, name: '전체' }]);
  // useEffect(() => {
  //   api.get('/community/topics').then(res => {
  //     if (Array.isArray(res)) setTopics([{ topicId: 0, name: '전체' }, ...res]);
  //   }).catch(() => setTopics([{ topicId: 0, name: '전체' }, ...dongneTopics]));
  // }, []);
  const topics = [{ topicId: 0, name: '전체' }, ...dongneTopics];

  // 게시글 목록 — 백엔드 완성 후 아래로 교체
  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   const params = activeTopic.topicId !== 0 ? { topicId: activeTopic.topicId } : {};
  //   api.get('/community/posts', { params }).then(res => {
  //     setPosts(Array.isArray(res?.content) ? res.content : dongneItems);
  //   }).catch(() => setPosts(dongneItems));
  // }, [activeTopic]);
  const posts = activeTopic.topicId === 0
    ? dongneItems
    : dongneItems.filter(item => item.topicId === activeTopic.topicId);

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-black text-[#1A1A1A]">동네생활</h2>
          <p className="text-sm text-[#767676] mt-0.5">우리 동네의 다양한 이야기를 나눠보세요</p>
        </div>
        {/* 백엔드 완성 후: POST /api/community/posts */}
        <button
          onClick={() => navigate('/dongnae/write')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF6F0F] text-white text-sm font-semibold hover:bg-[#E55C00] transition-colors shrink-0"
        >
          <IconPen size={14} />
          글쓰기
        </button>
      </div>

      {/* 주제 탭 */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3 border-b border-[#F0F0F0]">
        {topics.map((topic) => (
          <button
            key={topic.topicId}
            onClick={() => setActiveTopic(topic)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTopic.topicId === topic.topicId
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-[#F8F8F8] text-[#767676] hover:bg-[#F0F0F0]'
            }`}
          >
            {topic.name}
          </button>
        ))}
      </div>

      {/* 게시글 목록 */}
      <div>
        {posts.length > 0 ? (
          posts.map((item) => <PostCard key={item.postId} item={item} />)
        ) : (
          <div className="text-center py-16 text-[#ABABAB] text-sm">아직 게시물이 없어요</div>
        )}
      </div>
    </div>
  );
}