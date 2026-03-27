// src/utils/date.js

// 1. 외부에서 이 함수를 쓸 수 있게 'export'로 내보내기
export const formatTimeAgo = (dateString) => {
  
  // 2. 혹시라도 서버에서 시간 데이터가 안 오면 빈칸으로 보여주기 (에러 방지)
  if (!dateString) return ""; 
  
  // 3. '2026-03-27...' 같은 글자를 컴퓨터가 계산할 수 있는 숫자 형태로 변환
  const date = new Date(dateString); 
  
  // 4. '지금 이 순간'의 시간을 가져오기
  const now = new Date(); 
  
  // 5. (지금 시간 - 올린 시간)을 해서 몇 초 차이 나는지 계산 (밀리초 단위라 1000으로 나눔)
  const diffInSeconds = Math.floor((now - date) / 1000); 

  // 6. 계산된 '초'에 따라 사람이 읽기 편한 말로 바꿔주기
  if (diffInSeconds < 60) return "방금 전"; // 1분 안 넘었으면
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`; // 1시간 안 넘었으면
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`; // 하루 안 넘었으면
  
  // 7. 하루가 넘었으면 '3월 27일' 이런 식으로 날짜 표시
  const month = date.getMonth() + 1; // 월은 0부터 시작해서 1을 더해줘야 함
  const day = date.getDate();
  return `${month}월 ${day}일`;
};

/*실제 사용법 (TradePage.jsx 예시)
JavaScript
// 1. 파일 맨 위에서 불러오기
import { formatTimeAgo } from '../utils/date';

// 2. 화면 그리는 부분에서 감싸주기
<p>{formatTimeAgo(product.createdAt)}</p> 
// 결과: "2026-03-27..." 이 "5분 전"으로 뿅 하고 바뀜!*/