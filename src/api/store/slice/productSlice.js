import { createSlice } from '@reduxjs/toolkit';
import { tradeItems } from "../../../data/mockData";

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: tradeItems, // mockData.js의 tradeItems가 초기값
    filteredItems: tradeItems,
    currentCategory: '전체',
  },
  reducers: {
    // 명세서 3-3 카테고리 필터링 로직
    setCategory: (state, action) => {
      const category = action.payload;
      state.currentCategory = category;
      
      if (category === '전체') {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(
          (item) => item.categoryName === category
        );
      }
    },
    // 나중에 백엔드 API 연결했을 때 데이터를 저장하는 용도
    setProducts: (state, action) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    }
  },
});

export const { setCategory, setProducts } = productSlice.actions;
export default productSlice.reducer;