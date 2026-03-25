// --- 중고거래 목록 & 상세 (명세서 3-1 반영) ---
export const tradeItems = [
  {
    productId: 1,
    title: "애플 맥북 프로 14인치 M3",
    categoryId: 1,
    categoryName: "디지털기기",
    price: 2200000,
    isNegotiable: true, // 추가
    description: "맥북 프로 14인치 M3 모델입니다. 상태 아주 깨끗하고 박스 풀구성이예요.", // 추가
    imageUrls: ["https://picsum.photos/400?random=1", "https://picsum.photos/400?random=11"], // 추가
    thumbnailUrl: "https://picsum.photos/400?random=1",
    locationName: "해운대구",
    status: "SALE",
    viewCount: 120, // 추가
    likeCount: 12,
    chatCount: 3,
    isLiked: false, // 추가
    createdAt: "2026-03-25T10:00:00",
    seller: { // 상세페이지용 필수 데이터
      userId: 10,
      nickname: "맥북장인",
      profileImageUrl: "https://picsum.photos/100?random=1",
      temperature: 36.5,
      locationName: "해운대구"
    }
  },
  {
    productId: 2,
    title: "나이키 에어맥스 270 270mm",
    categoryId: 3,
    categoryName: "패션의류",
    price: 65000,
    isNegotiable: false,
    description: "사이즈 미스로 판매합니다. 실착 2회라 거의 새제품이에요.",
    imageUrls: ["https://picsum.photos/400?random=2"],
    thumbnailUrl: "https://picsum.photos/400?random=2",
    locationName: "수영구",
    status: "RESERVED",
    viewCount: 45,
    likeCount: 5,
    chatCount: 7,
    isLiked: true,
    createdAt: "2026-03-25T11:00:00",
    seller: {
      userId: 11,
      nickname: "슈즈홀릭",
      profileImageUrl: "https://picsum.photos/100?random=2",
      temperature: 42.0,
      locationName: "수영구"
    }
  },
  {
    productId: 3,
    title: "다이슨 에어랩 컴플리트",
    categoryId: 2,
    categoryName: "가구/인테리어",
    price: 380000,
    isNegotiable: true,
    description: "와이프가 선물받았는데 안 쓴다고 해서 올립니다. 풀박스입니다.",
    imageUrls: ["https://picsum.photos/400?random=3"],
    thumbnailUrl: "https://picsum.photos/400?random=3",
    locationName: "동래구",
    status: "SALE",
    viewCount: 230,
    likeCount: 23,
    chatCount: 11,
    isLiked: false,
    createdAt: "2026-03-25T12:00:00",
    seller: {
      userId: 12,
      nickname: "친절한판매자",
      profileImageUrl: "https://picsum.photos/100?random=3",
      temperature: 38.5,
      locationName: "동래구"
    }
  }
];

// --- 동네생활 (명세서 규격 유지) ---
export const dongneItems = [
  {
    postId: 500,
    title: "부전동 맛집 추천해주세요",
    content: "이사 온 지 얼마 안 됐는데 근처에 맛있는 고기집 있을까요?",
    thumbnailUrl: "https://picsum.photos/400?random=50",
    topicName: "동네질문",
    locationName: "부전동",
    author: {
      userId: 3,
      nickname: "새싹",
      profileImageUrl: "https://picsum.photos/100?random=10"
    },
    likeCount: 12,
    commentCount: 5,
    viewCount: 80,
    createdAt: "2026-03-25T09:00:00"
  }
];

// --- 모임 (명세서 규격 유지) ---
export const meetingItems = [
  {
    groupId: 20,
    title: "부산 독서 모임",
    categoryName: "독서",
    coverImageUrl: "https://picsum.photos/400?random=100",
    currentMembers: 5,
    maxMembers: 10,
    locationName: "부전동",
    isJoined: false,
    createdAt: "2026-03-20T00:00:00"
  }
];

// --- 카테고리/주제 목록 (명세서 3-3 반영) ---
export const tradeCategories = [
  { categoryId: 1, name: "디지털기기" },
  { categoryId: 2, name: "가구/인테리어" },
  { categoryId: 3, name: "패션의류" }
];

export const dongneTopics = [
  { topicId: 1, name: "동네질문" },
  { topicId: 2, name: "동네맛집" }
];

export const meetingCategories = [
  { categoryId: 1, name: "전체" },
  { categoryId: 2, name: "독서" },
  { categoryId: 3, name: "스포츠" },
  { categoryId: 4, name: "자기계발" }
];

export const categoryColors = {
  "디지털기기": "bg-gray-100 text-gray-800",
  "가구/인테리어": "bg-brown-100 text-brown-800",
  "패션의류": "bg-blue-100 text-blue-800",
  "게임/취미": "bg-purple-100 text-purple-800",
  "동네질문": "bg-orange-100 text-orange-800",
  "동네맛집": "bg-red-100 text-red-800",
  "독서": "bg-green-100 text-green-800",
  "스포츠": "bg-sky-100 text-sky-800",
  "전체": "bg-orange-500 text-white"
};