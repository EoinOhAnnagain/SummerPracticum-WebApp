import { createSlice } from '@reduxjs/toolkit'

export const totalPredictedSecondsSlice = createSlice({
  name: 'totalPredictedSeconds',
  initialState: {
    totalPredictedSeconds: 0,
  },
  reducers: {
    setTotalPredictedSeconds: (state, action) => {
      state.totalPredictedSeconds = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setTotalPredictedSeconds } = totalPredictedSecondsSlice.actions

export default totalPredictedSecondsSlice.reducer