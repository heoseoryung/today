import { createSlice } from '@reduxjs/toolkit';
// mockData import 완전 제거 — 초기값을 빈 배열로 교체

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],          // 서버에서 받아온 전체 상품 목록
    filteredItems: [],  // 화면에 실제로 표시되는 목록
    currentCategory: '전체', // 현재 선택된 카테고리 이름
  },
  reducers: {

    // ─── setCategory ────────────────────────────────────────────────────
    // TradePage에서 탭 클릭 시 호출
    // 역할: currentCategory 상태만 바꿔줌
    // 실제 필터링은 TradePage의 useEffect가 감지해서 서버에 재요청하는 방식
    // (프론트에서 배열 filter 하는 로직 제거 — 서버가 categoryId로 필터링해서 줌)
    setCategory: (state, action) => {
      state.currentCategory = action.payload;
      // ❌ 이전: state.items를 프론트에서 직접 filter → 삭제
      // ✅ 이후: currentCategory만 바꾸면 TradePage useEffect가 감지해서 API 재호출
    },

    // ─── setProducts ────────────────────────────────────────────────────
    // TradePage의 fetchProducts()가 API 응답 받은 후 dispatch
    // res.content 배열을 받아서 items, filteredItems 둘 다 업데이트
    setProducts: (state, action) => {
      state.items = action.payload;        // 원본 보관
      state.filteredItems = action.payload; // 화면 표시용 (서버가 이미 필터링해서 준 결과)
    },

  },
});

export const { setCategory, setProducts } = productSlice.actions;
export default productSlice.reducer;