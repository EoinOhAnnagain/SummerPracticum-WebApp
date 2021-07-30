import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chat: null,
  },
  reducers: {
    setChat: (state, action) => {
      state.chat = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setChat } = chatSlice.actions

export default chatSlice.reducer