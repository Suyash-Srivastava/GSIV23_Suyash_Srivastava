import { createSlice } from '@reduxjs/toolkit'
export interface CounterState {
    value: number
}

const initialState = { values: '' }

export const searchSlice = createSlice({
    name: 'searchInput',
    initialState,
    reducers: {
        setSearchInput: (state, action) => {
            state.values = (action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const {  setSearchInput } = searchSlice.actions

export default searchSlice.reducer