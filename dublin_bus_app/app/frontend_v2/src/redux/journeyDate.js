import { createSlice } from '@reduxjs/toolkit'
import { format } from  "date-fns"

export const journeyDateSlice = createSlice({
  name: 'journeyDate',
  initialState: {
    journeyDate: format(new Date(), 'yyyy-MM-dd'),
  },
  reducers: {
    setJourneyDate: (state, action) => {
      state.journeyDate = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setJourneyDate } = journeyDateSlice.actions

export default journeyDateSlice.reducer