import { createSlice } from '@reduxjs/toolkit'

export const showAllStopsBooleanSlice = createSlice({
  name: 'showAllStopsBoolean',
  initialState: {
    showAllStopsBoolean: true,
  },
  reducers: {
    setShowAllStopsBoolean: (state, action) => {
      state.showAllStopsBoolean = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setShowAllStopsBoolean } = showAllStopsBooleanSlice.actions

export default showAllStopsBooleanSlice.reducer