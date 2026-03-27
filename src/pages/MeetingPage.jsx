import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconMapPin, IconUsers, IconPlus } from '../components/Icons.jsx';
import { meetingItems, meetingCategories } from '../data/mockData.js';

// 백엔드 완성 후 아래 import 추가
// import api from '../api/api.js';

function StatusChip({ currentMembers, maxMembers }) {
  const isFull = currentMembers >= maxMembers;
  return (
    <span className={`text-[12px] font-bold ${isFull ? 'text-gray-400' : 'text-[#FF6F0F]'}`}>
      {isFull ? '모집완료' : '모집중'}
    </span>
  );
}

function MeetingRow({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 py-5 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div className="w-20 h-20 rounded-2xl shrink-0 bg-[#F2F3F6] border border-gray-100 overflow-hidden">
        {item.coverImageUrl
          ? <img src={item.coverImageUrl} alt={item.title} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center bg-gray-200" />
        }
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-bold text-[#1C1C1C] truncate mb-0.5">{item.title}</p>
        <p className="text-[13px] text-gray-500 truncate mb-2">{item.description || item.categoryName}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1 text-[12px] text-gray-400 font-bold">
            <IconMapPin size={13} />{item.locationName}
          </span>
          <span className="flex items-center gap-1 text-[12px] text-gray-400 font-bold">
            <IconUsers size={13} />{item.currentMembers}/{item.maxMembers}명
          </span>
          <StatusChip currentMembers={item.currentMembers} maxMembers={item.maxMembers} />
        </div>
      </div>
    </div>
  );
}

export default function MeetingPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState({ categoryId: 0, name: '전체' });

  // 카테고리 목록 — 백엔드 완성 후 아래로 교체
  // const [categories, setCategories] = useState([{ categoryId: 0, name: '전체' }]);
  // useEffect(() => {
  //   api.get('/meet/categories').then(res => {
  //     if (Array.isArray(res)) setCategories([{ categoryId: 0, name: '전체' }, ...res]);
  //   }).catch(() => {});
  // }, []);
  const categories = [{ categoryId: 0, name: '전체' }, ...meetingCategories];

  // 모임 목록 — 백엔드 완성 후 아래로 교체
  // const [groups, setGroups] = useState([]);
  // useEffect(() => {
  //   const params = activeCategory.categoryId !== 0 ? { categoryId: activeCategory.categoryId } : {};
  //   api.get('/meet/groups', { params }).then(res => {
  //     setGroups(Array.isArray(res?.content) ? res.content : []);
  //   }).catch(() => setGroups(meetingItems));
  // }, [activeCategory]);
  const groups = activeCategory.categoryId === 0
    ? meetingItems
    : meetingItems.filter(item => item.categoryName === activeCategory.name);

  return (
    <div className="max-w-5xl mx-auto px-5 bg-white min-h-screen">

      {/* 상단 원형 카테고리 */}
      <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide py-10 border-b border-gray-100">
        {categories.map((cat, i) => (
          <div
            key={cat.categoryId}
            onClick={() => setActiveCategory(cat)}
            className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group"
          >
            <div className={`relative w-20 h-20 rounded-full border flex items-center justify-center transition-colors ${
              activeCategory.categoryId === cat.categoryId
                ? 'bg-[#FF6F0F] border-[#FF6F0F]'
                : 'bg-[#F2F3F6] border-gray-100 group-hover:bg-gray-100'
            }`}>
              <span className={`font-bold text-[11px] text-center px-1 ${
                activeCategory.categoryId === cat.categoryId ? 'text-white' : 'text-gray-400'
              }`}>
                {cat.name?.slice(0, 4) || ''}
              </span>
              {i === 0 && (
                <span
                  onClick={(e) => { e.stopPropagation(); navigate('/meeting/create'); }}
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#1A1A1A] flex items-center justify-center border-2 border-white shadow-sm"
                >
                  <IconPlus size={14} className="text-white" />
                </span>
              )}
            </div>
            <span className="text-[13px] font-bold text-[#4D5159] text-center w-20 leading-snug truncate">
              {cat.name}
            </span>
          </div>
        ))}
      </div>

      {/* 카테고리 탭 */}
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-3 border-b border-[#F0F0F0] sticky top-0 bg-white z-30">
        {categories.map((cat) => (
          <button
            key={cat.categoryId}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
              activeCategory.categoryId === cat.categoryId
                ? 'bg-[#FF6F0F] text-white'
                : 'bg-[#F2F3F6] text-[#767676] hover:bg-gray-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 모임 목록 */}
      <div className="pb-32">
        {groups.length > 0 ? (
          groups.map((item) => (
            <MeetingRow
              key={item.groupId}
              item={item}
              onClick={() => navigate(`/meeting/${item.groupId}`)}
            />
          ))
        ) : (
          <div className="text-center py-16 text-gray-400 text-sm">모임이 없습니다.</div>
        )}
      </div>
    </div>
  );
}