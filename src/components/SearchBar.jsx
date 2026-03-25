import { IconSearch } from '../Icons.jsx'; //같은 폴더 ..임 기억

export default function SearchBar({ searchQuery, onSearchChange, onSearchSubmit }) {
  return (
    <div className="flex-1 max-w-[700px]">
      <form 
        onSubmit={(e) => { e.preventDefault(); onSearchSubmit?.(); }}
        className="flex gap-2 h-11"
      >
        {/* 인풋 영역 */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="동네 이웃과 가깝고 따뜻한 거래를 시작해보세요"
            className="w-full h-full px-4 border-2 border-[#F2F3F6] bg-[#F2F3F6] rounded-xl text-[15px] outline-none focus:border-[#FF6F0F]/30 focus:bg-white focus:shadow-sm transition-all placeholder:text-[#999]"
          />
        </div>

        {/* 주황색 검색 버튼 */}
        <button 
          type="submit"
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 cursor-pointer active:scale-95 transition-all shadow-sm"
          style={{ backgroundColor: '#FF6F0F' }}
        >
          <IconSearch size={20} className="text-white" />
        </button>
      </form>
    </div>
  );
}

