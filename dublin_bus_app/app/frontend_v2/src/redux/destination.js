import { createSlice } from '@reduxjs/toolkit'

export const destinationSlice = createSlice({
  name: 'destination',
  initialState: {
    destination: {lat: 53.421, lng: -6.222},
  },
  reducers: {
    setDestination: (state, action) => {
      state.destination = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setDestination } = destinationSlice.actions

export default destinationSlice.reducer