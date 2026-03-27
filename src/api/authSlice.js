import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,         // 사용자 정보 (id, nickname, profileImageUrl 등)
  token: null,        // API 호출용 JWT 토큰
  isLoggedIn: false,  // 로그인 여부
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 로그인 성공 시 실행할 함수
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    // 로그아웃 시 실행할 함수 (초기화)
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      // 로컬 스토리지에 토큰이 있다면 여기서 같이 지워주는 게 좋아
      localStorage.removeItem("token");
    },
    // 프로필 정보만 수정할 때
    updateUserInfo: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

// 컴포넌트에서 쓸 수 있게 액션(함수)들을 내보내기
export const { loginSuccess, logout, updateUserInfo } = authSlice.actions;

// store에 등록하기 위해 리듀서 내보내기
export default authSlice.reducer;