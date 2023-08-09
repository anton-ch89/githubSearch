import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    activeUserPage: 1,
    activeRepoPage: 1,
    totalCount: null,
    perPage: 10,
}


const paginationSclice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setActiveUserPage(state, action) {
            state.activeUserPage = action.payload
        },
        setActiveRepoPage(state, action) {
            state.activeRepoPage = action.payload
        },
        setTotalCount(state, action) {
            state.totalCount = action.payload
        },
    }
})

export const { setActiveUserPage, setActiveRepoPage, setTotalCount } = paginationSclice.actions;

export default paginationSclice.reducer;