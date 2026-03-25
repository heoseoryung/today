// 중고거래 목록
export const tradeItems = [
  { id: 1, title: '애플 맥북 프로 14인치 M3', price: 2200000, location: '해운대구', time: '2분 전', status: null, likes: 12, chats: 3 },
  { id: 2, title: '나이키 에어맥스 270 270mm', price: 65000, location: '수영구', time: '15분 전', status: '예약중', likes: 5, chats: 7 },
  { id: 3, title: '다이슨 에어랩 컴플리트', price: 380000, location: '동래구', time: '30분 전', status: null, likes: 23, chats: 11 },
  { id: 4, title: '아이패드 프로 11인치 4세대 256GB', price: 850000, location: '남구', time: '1시간 전', status: '판매완료', likes: 8, chats: 4 },
  { id: 5, title: '삼성 갤럭시 버즈2 프로', price: 89000, location: '북구', time: '2시간 전', status: null, likes: 3, chats: 2 },
  { id: 6, title: '소니 WH-1000XM5 블루투스 헤드폰', price: 250000, location: '사상구', time: '3시간 전', status: null, likes: 17, chats: 6 },
  { id: 7, title: '레고 테크닉 포르쉐 911 GT3', price: 120000, location: '금정구', time: '5시간 전', status: null, likes: 9, chats: 1 },
  { id: 8, title: '올리브영 화장품 미개봉 세트', price: 35000, location: '연제구', time: '7시간 전', status: null, likes: 6, chats: 5 },
];

export const tradeCategories = ['전체', '디지털기기', '여성의류', '남성의류', '게임/취미', '가구/인테리어', '스포츠/레저'];

// 모임 목록
export const meetingItems = [
  { id: 1, title: '해운대 새벽 러닝 크루', desc: '매주 화목 6시 해운대 해변 러닝', location: '해운대구', members: 150, status: '활발 모집 중', category: '운동' },
  { id: 2, title: '부산 보드게임 모임', desc: '매주 토요일 카페에서 보드게임', location: '수영구', members: 46, status: '일정 모집 중', category: '게임' },
  { id: 3, title: '반려동물 산책 메이트', desc: '강아지랑 함께 동네 산책해요', location: '남구', members: 77, status: '37분 전 활동', category: '반려동물' },
  { id: 4, title: '독서 토론 클럽', desc: '한 달에 한 권, 함께 읽고 이야기해요', location: '동래구', members: 34, status: '활발 모집 중', category: '자기계발' },
  { id: 5, title: '부산 사진 출사 모임', desc: '매주 다른 스팟에서 사진 찍어요', location: '중구', members: 92, status: '일정 모집 중', category: '문화/예술' },
  { id: 6, title: '요가 & 명상 클래스', desc: '초보자 환영! 함께 건강해져요', location: '부산진구', members: 28, status: '활발 모집 중', category: '운동' },
];

export const meetingCategories = ['전체', '운동', '동네친구', '야외도어/여행', '자기계발', '게임'];

export const meetingCircles = [
  { id: 1, label: '동네친구 모임', color: '#FF6F0F' },
  { id: 2, label: '반려동물 모임', color: '#E91E8C' },
  { id: 3, label: '자기계발 모임', color: '#4CAF50' },
  { id: 4, label: '음악/악기 모임', color: '#2196F3' },
  { id: 5, label: '문화/예술 모임', color: '#9C27B0' },
];

// 스토리
export const storyItems = [
  { id: 1, channel: '동네카페', title: '해운대 카페 신메뉴 출시', views: 1234, isVideo: false, color: '#FFF0E6' },
  { id: 2, channel: '운동하는사람', title: '새벽 러닝 후기 공유해요', views: 856, isVideo: true, color: '#E8F5E9' },
  { id: 3, channel: '맛집탐방', title: '남포동 숨은 맛집 발견', views: 2341, isVideo: false, color: '#E3F2FD' },
  { id: 4, channel: '반려동물', title: '우리 강아지 산책 브이로그', views: 3456, isVideo: true, color: '#FCE4EC' },
  { id: 5, channel: '동네소식', title: '해운대 축제 일정 안내', views: 987, isVideo: false, color: '#F3E5F5' },
  { id: 6, channel: '일상공유', title: '퇴근 후 부산 야경 감상', views: 1567, isVideo: true, color: '#E0F7FA' },
];

// 동네생활
export const dongneItems = [
  { id: 1, category: '동네질문', title: '해운대 근처 강아지 미용 잘 하는 곳 아시나요?', desc: '소형견 전문으로 봐주는 곳 찾고 있어요', location: '해운대구', time: '10분 전', comments: 5, views: 123 },
  { id: 2, category: '동네맛집', title: '수영구 숨은 칼국수 맛집 발견했어요', desc: '완전 맛있어서 공유하고 싶었어요!', location: '수영구', time: '1시간 전', comments: 12, views: 456 },
  { id: 3, category: '분실/실종', title: '검은 고양이 분실했어요 ㅠㅠ', desc: '어제 저녁부터 보이지 않아요 제발 연락주세요', location: '동래구', time: '2시간 전', comments: 8, views: 234 },
  { id: 4, category: '동네소식', title: '오늘 남구 도서관 임시 휴관이래요', desc: '공사로 인해 이번주 내내 휴관 예정', location: '남구', time: '3시간 전', comments: 3, views: 89 },
  { id: 5, category: '취미생활', title: '부산 보드게임 같이 하실 분 구해요', desc: '매주 토요일 오후 모여요!', location: '부산진구', time: '4시간 전', comments: 7, views: 178 },
];

export const dongneCategories = ['전체', '동네질문', '동네맛집', '동네소식', '분실/실종', '취미생활', '일상'];

// 카테고리 색상
export const categoryColors = {
  '동네질문': { bg: 'bg-blue-100', text: 'text-blue-700' },
  '동네맛집': { bg: 'bg-orange-100', text: 'text-orange-700' },
  '분실/실종': { bg: 'bg-red-100', text: 'text-red-700' },
  '동네소식': { bg: 'bg-green-100', text: 'text-green-700' },
  '취미생활': { bg: 'bg-purple-100', text: 'text-purple-700' },
  '일상': { bg: 'bg-gray-100', text: 'text-gray-700' },
};
