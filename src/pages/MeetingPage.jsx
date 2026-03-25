import { useState } from 'react';
import { meetingItems, meetingCategories, meetingCircles } from '../data/mockData.js';
import { IconMapPin, IconUsers, IconPlus } from '../components/Icons.jsx'; 

// [기능: 모임 상태 표시]
function StatusChip({ status }) {
  const isActive = status.includes('활발') || status.includes('모집');
  return (
    <span className={`text-[12px] font-bold ${isActive ? 'text-[#FF6F0F]' : 'text-gray-400'}`}>
      {status}
    </span>
  );
}

// [기능: 모임 리스트 카드]
function MeetingRow({ item }) {
  return (
    <div className="flex items-center gap-4 py-5 border-b border-gray-100 cursor-pointer -mx-4 px-4 active:bg-gray-50 transition-colors font-sans">
      <div className="w-24 h-24 rounded-2xl shrink-0 bg-[#F2F3F6] border border-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 bg-gray-200 rounded-full opacity-20" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="mb-1">
          <p className="text-[15px] font-bold text-[#1C1C1C] truncate tracking-tight">
            {item.title}
          </p>
        </div>
        <p className="text-[13px] text-gray-500 truncate mb-2 font-medium">
          {item.desc}
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1 text-[12px] text-gray-400 font-bold">
            <IconMapPin size={13} />
            {item.location}
          </span>
          <span className="flex items-center gap-1 text-[12px] text-gray-400 font-bold">
            <IconUsers size={13} />
            {item.members}명
          </span>
          <StatusChip status={item.status} />
        </div>
      </div>
    </div>
  );
}

export default function MeetingPage() {
  const [activeCategory, setActiveCategory] = useState('전체');

  return (
    <div className="max-w-5xl mx-auto px-5 bg-white min-h-screen">
      
      {/* [기능: 상단 원형 메뉴 - 원 크기 확대 (w-20 -> w-24)] */}
      <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide py-10 border-b border-gray-100">
        {meetingCircles.map((c, i) => (
          <div key={c.id} className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group">
            {/* 원 크기를 w-24 h-24로 키움 */}
            <div className="relative w-24 h-24 rounded-full bg-[#F2F3F6] border border-gray-100 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
              <span className="text-gray-400 font-bold text-[12px]">CATEGORY</span>
              {i === 0 && (
                /* 플러스 버튼 위치 및 크기 소폭 조정 */
                <span className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center border-2 border-white shadow-sm">
                  <IconPlus size={16} className="text-white" />
                </span>
              )}
            </div>
            {/* 텍스트 크기도 소폭 상향 조정 */}
            <span className="text-[14px] font-bold text-[#4D5159] text-center w-24 leading-snug">
              {c.label}
            </span>
          </div>
        ))}
      </div>

      {/* [기능: 카테고리 탭] */}
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-3 border-b border-[#F0F0F0] sticky top-0 bg-white z-30">
        {meetingCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#FF6F0F] text-white shadow-sm' 
                : 'bg-[#F2F3F6] text-[#767676] hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* [기능: 모임 리스트] */}
      <div className="pb-32">
        {meetingItems.map((item) => (
          <MeetingRow key={item.id} item={item} />
        ))}
      </div>

    

    </div>
  );
}