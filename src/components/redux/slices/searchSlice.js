import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    searchInput: '',
    filter: 'users',
}


export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchInput(state, action) {
            state.searchInput = action.payload
        },
        setFilter(state, action) {
            state.filter = action.payload
        },
    }
});

export const { setSearchInput, setFilter } = searchSlice.actions

export default searchSlice.reducer;


