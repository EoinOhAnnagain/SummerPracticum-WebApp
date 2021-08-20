import { createSlice } from '@reduxjs/toolkit'

export const directionsRenderBooleanSlice = createSlice({
  name: 'directionsRenderBoolean',
  initialState: {
    directionsRenderBoolean: false,
  },
  reducers: {
    setDirectionsRenderBoolean: (state, action) => {
      state.directionsRenderBoolean = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setDirectionsRenderBoolean } = directionsRenderBooleanSlice.actions

export default directionsRenderBooleanSlice.reducer