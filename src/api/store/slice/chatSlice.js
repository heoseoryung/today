import { createSlice } from '@reduxjs/toolkit'; // 리덕스 툴킷에서 슬라이스(상태+액션 합치기) 생성 함수를 가져옴

const chatSlice = createSlice({ // 채팅 관련 데이터와 기능을 하나의 덩어리(슬라이스)로 정의함
  name: 'chat', // 이 슬라이스의 고유 이름 설정 (나중에 state.chat으로 접근하게 됨)
  initialState: { // 채팅 기능에서 사용할 데이터들의 초기값 설정
    rooms: [], // 사용자가 참여 중인 채팅방 목록 (명세서 4-1번 응답 데이터가 들어올 자리)
    currentRoom: null, // 현재 사용자가 클릭해서 들어가 있는 채팅방 정보
    unreadTotal: 0, // 읽지 않은 모든 메시지의 총 개수 (앱 아이콘 등에 표시할 용도)
  },
  reducers: { // 데이터를 실제로 어떻게 바꿀지 정의하는 함수(공식)들의 모임
    // 서버에서 채팅방 목록을 받아왔을 때, 우리 금고(rooms)에 통째로 저장하는 함수
    setChatRooms: (state, action) => {
      // action.payload에는 서버가 보내준 채팅방 배열 데이터가 담겨 있음
      state.rooms = action.payload; 
    },
    // 채팅 목록에서 특정 방을 클릭했을 때, '현재 보고 있는 방'으로 설정하는 함수
    selectRoom: (state, action) => {
      // action.payload에는 클릭한 채팅방의 정보(ID 등)가 담겨 있음
      state.currentRoom = action.payload;
    }
  },
});

// 컴포넌트(ChatPage 등)에서 "방 목록 저장해!", "방 선택해!"라고 명령할 수 있게 액션 함수들을 내보냄
export const { setChatRooms, selectRoom } = chatSlice.actions;

// 리덕스 중앙 금고(Store)에 이 채팅 슬라이스를 등록하기 위해 리듀서를 내보냄
export default chatSlice.reducer;