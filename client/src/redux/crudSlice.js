import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedPost: null,
  postSize: null,
  like: null,
  follow: null,
}

export const crudSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    deletePost:(state, action) =>{
        state.selectedPost = action.payload;
        // state.postSize = --postSize;
    },
    postLength: (state, action) =>{
      state.postSize = action.payload;
    },
    postId: (state, action) => {
      state.like = action.payload;
    },
    followId: (state, action) => { // following id
      state.follow = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { deletePost, postLength, postId, followId } = crudSlice.actions

export default crudSlice.reducer


