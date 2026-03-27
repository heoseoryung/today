import { configureStore } from '@reduxjs/toolkit'; // 리덕스 툴킷에서 저장소(Store)를 설정하고 생성하는 함수를 가져옴
import productReducer from './slice/productSlice'; // 상품 관련 데이터와 로직이 담긴 리듀서를 가져옴
import chatReducer from './slice/chatSlice'; // 채팅 관련 데이터와 로직이 담긴 리듀서를 가져옴

export const store = configureStore({ // 프로젝트 전체에서 사용할 단 하나의 중앙 저장소(Store)를 생성함
  reducer: { // 여러 개의 작은 리듀서(슬라이스)들을 하나로 합치는 영역
    products: productReducer, // 이제 state.products 라는 이름으로 상품 데이터에 접근할 수 있게 등록함
    chat: chatReducer, // 이제 state.chat 이라는 이름으로 채팅 데이터에 접근할 수 있게 등록함
  },
});

export default store; // 설정이 끝난 저장소를 내보내서 main.jsx에서 프로젝트에 주입할 수 있게 함