import { IconShoppingBag, IconGroup, IconCoffee, IconGrid, IconSearch, IconChevronDown, IconMapPin } from '../components/Icons.jsx';

const SERVICE_CARDS = [
  {
    key: 'trade',
    label: '중고거래',
    icon: IconShoppingBag,
    // 보내주신 이미지의 파스텔 톤 배경색과 아이콘 색상 적용
    bg: 'bg-[#FFF0E6]', 
    iconColor: 'text-[#FF6F0F]',
  },
  {
    key: 'meeting',
    label: '모임',
    icon: IconGroup,
    bg: 'bg-[#FCE4EC]',
    iconColor: 'text-[#E91E8C]',
  },
  {
    key: 'story',
    label: '스토리',
    icon: IconCoffee,
    bg: 'bg-[#FFF8E1]',
    iconColor: 'text-[#F59E0B]',
  },
  {
    key: 'dongnae',
    label: '동네생활',
    icon: IconGrid,
    bg: 'bg-[#E8F5E9]',
    iconColor: 'text-[#4CAF50]',
  },
];

export default function HomePage({ onNavigate }) {
  return (
    // 전체 레이아웃: 화면 중앙에 1024px 너비로 꽉 차게 배치
    <div className="max-w-[1024px] mx-auto px-4 py-12 md:py-20 flex flex-col gap-12 md:gap-16">
      
      {/* 1. Hero: 이미지의 위치 아이콘과 문구 디자인 적용 */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 text-[#FF6F0F] text-sm font-semibold mb-3">
          <IconMapPin size={16} />
          <span>부산 해운대구</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-black text-[#1A1A1A] leading-tight mb-3 break-keep">
          당근에서 러닝 모임<br className="md:hidden" /> 찾고 계신가요?
        </h1>
        <p className="text-[#767676] text-sm md:text-lg">
          동네 이웃과 가깝고 따뜻하게 소통해보세요.
        </p>
      </div>

      {/* 2. Search: 검색창 디자인 (카테고리 선택 포함) */}
      <div className="max-w-3xl mx-auto w-full flex gap-2">
        <div className="flex-1 flex items-center gap-2 h-14 px-5 rounded-2xl border-2 border-[#EDEDED] bg-white focus-within:border-[#FF6F0F] transition-all shadow-sm">
          <select className="bg-transparent text-base font-semibold text-[#1A1A1A] outline-none cursor-pointer border-r border-[#EDEDED] pr-4 mr-2 h-full">
            <option>중고거래</option>
            <option>모임</option>
            <option>동네생활</option>
          </select>
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            className="flex-1 bg-transparent text-base text-[#1A1A1A] placeholder:text-[#ABABAB] outline-none"
          />
        </div>
        <button className="w-14 h-14 rounded-2xl bg-[#FF6F0F] flex items-center justify-center text-white hover:bg-[#E55C00] transition-transform active:scale-95 shrink-0 shadow-lg">
          <IconSearch size={24} />
        </button>
      </div>

      {/* 3. Service Grid: 이미지의 카드 디자인 (파스텔 배경, 둥근 모서리) 적용 */}
      <div className="grid grid-cols-2 gap-4 md:gap-8">
        {SERVICE_CARDS.map(({ key, label, icon: Icon, bg, iconColor }) => (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            // 카드의 전체적인 형태와 마우스 오버 효과
            className="group flex flex-col items-center rounded-3xl border border-[#F0F0F0] bg-white p-2 pb-6 hover:border-[#FF6F0F]/30 hover:shadow-xl transition-all duration-300 text-center cursor-pointer"
          >
            {/* 파스텔 톤 배경의 아이콘 영역 */}
            <div className={`${bg} flex items-center justify-center w-full h-36 md:h-48 rounded-2xl mb-5 transition-transform duration-300 group-hover:scale-[0.98]`}>
              <Icon size={56} className={iconColor} />
            </div>
            {/* 텍스트 영역 */}
            <p className="font-extrabold text-[#1A1A1A] text-xl md:text-2xl">{label}</p>
          </button>
        ))}
      </div>

    </div>
  );
}