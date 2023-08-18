import { createSlice } from '@reduxjs/toolkit'
const initialState = { values: [] }

export const movieSlice = createSlice({
    name: 'movielist',
    initialState,
    reducers: {
        setMovieList: (state, action) => {
            state.values=(action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const { setMovieList } = movieSlice.actions

export default movieSlice.reducer