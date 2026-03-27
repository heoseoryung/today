// --- 1. 중고거래 ---
export const tradeItems = [
  {
    productId: 1,
    title: "애플 맥북 프로 14인치 M3",
    categoryId: 1,
    categoryName: "디지털기기",
    price: 2200000,
    isNegotiable: true,
    description: "맥북 프로 14인치 M3 모델입니다. 상태 아주 깨끗하고 박스 풀구성이예요. 실사용 기간 1개월 미만입니다.",
    imageUrls: ["https://picsum.photos/400?random=1", "https://picsum.photos/400?random=11"],
    thumbnailUrl: "https://picsum.photos/400?random=1",
    locationName: "해운대구",
    status: "SALE",
    viewCount: 120,
    likeCount: 12,
    chatCount: 3,
    isLiked: false,
    createdAt: "1시간 전",
    seller: { userId: 10, nickname: "맥북장인", profileImageUrl: "https://picsum.photos/100?random=1", temperature: 36.5, locationName: "해운대구" }
  },
  {
    productId: 2,
    title: "나이키 에어맥스 270 270mm",
    categoryId: 3,
    categoryName: "패션의류",
    price: 65000,
    isNegotiable: false,
    description: "사이즈 미스로 판매합니다. 실착 2회라 거의 새제품이에요. 정품 박스 같이 드립니다.",
    imageUrls: ["https://picsum.photos/400?random=2"],
    thumbnailUrl: "https://picsum.photos/400?random=2",
    locationName: "수영구",
    status: "RESERVED",
    viewCount: 45,
    likeCount: 5,
    chatCount: 7,
    isLiked: true,
    createdAt: "3시간 전",
    seller: { userId: 11, nickname: "슈즈홀릭", profileImageUrl: "https://picsum.photos/100?random=2", temperature: 42.0, locationName: "수영구" }
  },
  {
    productId: 3,
    title: "다이슨 에어랩 컴플리트",
    categoryId: 2,
    categoryName: "가구/인테리어",
    price: 380000,
    isNegotiable: true,
    description: "선물받았는데 스타일이 안 맞아서 올립니다. 모든 툴 구성 다 있고 상태 최상입니다.",
    imageUrls: ["https://picsum.photos/400?random=3"],
    thumbnailUrl: "https://picsum.photos/400?random=3",
    locationName: "동래구",
    status: "SALE",
    viewCount: 230,
    likeCount: 23,
    chatCount: 11,
    isLiked: false,
    createdAt: "어제",
    seller: { userId: 12, nickname: "친절한판매자", profileImageUrl: "https://picsum.photos/100?random=3", temperature: 38.5, locationName: "동래구" }
  }
];

// --- 2. 동네생활 ---
export const dongneItems = [
  {
    postId: 500, topicId: 1, topicName: "동네질문",
    title: "부전동 맛집 추천해주세요",
    content: "이사 온 지 얼마 안 됐는데 근처에 맛있는 고기집 있을까요?",
    thumbnailUrl: "https://picsum.photos/400?random=50",
    locationName: "부전동",
    author: { userId: 3, nickname: "새싹", profileImageUrl: "https://picsum.photos/100?random=10" },
    likeCount: 12, commentCount: 5, viewCount: 80, createdAt: "30분 전"
  },
  {
    postId: 501, topicId: 2, topicName: "동네맛집",
    title: "여기 빵집 진짜 맛있네요",
    content: "오늘 아침에 새로 생긴 베이커리 다녀왔는데 소금빵이 예술입니다.",
    thumbnailUrl: "https://picsum.photos/400?random=51",
    locationName: "연산동",
    author: { userId: 4, nickname: "빵순이", profileImageUrl: "https://picsum.photos/100?random=11" },
    likeCount: 25, commentCount: 8, viewCount: 150, createdAt: "2시간 전"
  }
];

// --- 3. 모임 ---
export const meetingItems = [
  {
    groupId: 20, title: "부산 독서 모임", categoryName: "독서",
    coverImageUrl: "https://picsum.photos/400?random=100",
    currentMembers: 5, maxMembers: 10, locationName: "부전동", isJoined: false, createdAt: "2026-03-20"
  },
  {
    groupId: 21, title: "토요일 아침 풋살", categoryName: "스포츠",
    coverImageUrl: "https://picsum.photos/400?random=101",
    currentMembers: 12, maxMembers: 14, locationName: "연제구", isJoined: true, createdAt: "2026-03-22"
  }
];

// --- 4. 카테고리/주제 ---
export const tradeCategories = [
  { categoryId: 1, name: "디지털기기" },
  { categoryId: 2, name: "가구/인테리어" },
  { categoryId: 3, name: "패션의류" }
];

export const dongneTopics = [
  { topicId: 1, name: "동네질문" },
  { topicId: 2, name: "동네맛집" },
  { topicId: 3, name: "동네소식" },
  { topicId: 4, name: "분실/실종" },
  { topicId: 5, name: "생활정보" }
];

export const meetingCategories = [
  { categoryId: 1, name: "전체" },
  { categoryId: 2, name: "독서" },
  { categoryId: 3, name: "스포츠" },
  { categoryId: 4, name: "자기계발" }
];