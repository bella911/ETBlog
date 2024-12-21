import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.currentUser = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { signIn, signOut } = authSlice.actions

export default authSlice.reducer


