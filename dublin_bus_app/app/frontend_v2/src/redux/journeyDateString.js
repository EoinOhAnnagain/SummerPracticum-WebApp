import { createSlice } from '@reduxjs/toolkit'
import { format } from  "date-fns"

export const journeyDateStringSlice = createSlice({
  name: 'journeyDateString',
  initialState: {
    journeyDateString: new Date().toString()
  },
  reducers: {
    setJourneyDateString: (state, action) => {
      state.journeyDateString = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setJourneyDateString } = journeyDateStringSlice.actions

export default journeyDateStringSlice.reducer