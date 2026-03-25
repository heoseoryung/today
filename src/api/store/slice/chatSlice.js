import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    rooms: [], // 명세서 4-1 채팅방 목록
    currentRoom: null,
    unreadTotal: 0,
  },
  reducers: {
    setChatRooms: (state, action) => {
      state.rooms = action.payload;
    },
    selectRoom: (state, action) => {
      state.currentRoom = action.payload;
    }
  },
});

export const { setChatRooms, selectRoom } = chatSlice.actions;
export default chatSlice.reducer;