import { useState } from 'react';
import { tradeCategories } from '../data/mockData.js';

const IconPlay = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
);

const IconEye = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

export default function Stories() {
  const [activeCategory, setActiveCategory] = useState('전체');

  const stories = [
    { id: 1, author: '동네카페', avatar: '☕', title: '굳', views: 1234, isVideo: false },
    { id: 2, author: '운동하는사람', avatar: '🏃', title: '미친 ai?', views: 856, isVideo: true },
    { id: 3, author: '맛집탐방', avatar: '🍽️', title: '하.', views: 2341, isVideo: false },
    { id: 4, author: '반려동물', avatar: '🐕', title: '하 미친 ai', views: 3456, isVideo: true },
    { id: 5, author: '취미생활', avatar: '🎨', title: '로또 1등 .', views: 987, isVideo: false },
    { id: 6, author: '자전거매니아', avatar: '🚴', title: '미친!', views: 1567, isVideo: true }
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <main className="max-w-4xl mx-auto px-4 pt-6">
        <div className="mb-6 px-1">
          <h1 className="text-[20px] font-bold text-[#1A1A1A]">스토리</h1>
          <p className="text-[13px] text-gray-500 font-medium">짧고 재미있는 우리 동네 이야기</p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2 mb-6 border-b border-gray-50">
          {tradeCategories.map((cat) => (
            <button
              key={cat.categoryId}             
              onClick={() => setActiveCategory(cat.name)}  
              className={`shrink-0 px-4 py-2 rounded-full text-[14px] font-bold transition-all ${
                activeCategory === cat.name     
                  ? 'bg-[#FF6F0F] text-white' 
                  : 'bg-[#F2F3F6] text-[#4D5159]'
              }`}
            >
              {cat.name}                  
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {stories.map((story) => (
            <div 
              key={story.id} 
              className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-200 cursor-pointer group shadow-sm hover:scale-[1.02] transition-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
              {story.isVideo && (
                <div className="absolute top-3 right-3 z-20"><IconPlay /></div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xs">
                    {story.avatar}
                  </div>
                  <span className="text-[11px] font-bold opacity-90">{story.author}</span>
                </div>
                <h3 className="text-[13px] font-bold leading-tight line-clamp-2 mb-2">{story.title}</h3>
                <div className="flex items-center gap-1">
                  <IconEye />
                  <span className="text-[10px] font-medium opacity-80">{story.views.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}