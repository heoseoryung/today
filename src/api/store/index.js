import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slice/productSlice';
import chatReducer from './slice/chatSlice';

export const store = configureStore({
  reducer: {
    products: productReducer, // TradePage에서 useSelector(state => state.products)로 접근
    chat: chatReducer,
  },
});

export default store;