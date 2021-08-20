import { createSlice } from '@reduxjs/toolkit'

export const directionsResponseBooleanSlice = createSlice({
  name: 'directionsResponseBoolean',
  initialState: {
    directionsResponseBoolean: false,
  },
  reducers: {
    setDirectionsResponseBoolean: (state, action) => {
      state.directionsResponseBoolean = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setDirectionsResponseBoolean } = directionsResponseBooleanSlice.actions

export default directionsResponseBooleanSlice.reducer