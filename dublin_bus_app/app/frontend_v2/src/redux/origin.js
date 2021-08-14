import { createSlice } from '@reduxjs/toolkit'

export const originSlice = createSlice({
  name: 'origin',
  initialState: {
    origin: {lat: 53.3, lng: -6.259719573},
  },
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setOrigin } = originSlice.actions

export default originSlice.reducer