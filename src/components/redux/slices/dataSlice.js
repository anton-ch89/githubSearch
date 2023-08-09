import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    users: [],
    repos: [],
    isLoading: true,
    error: null,
};


export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload
        },
        setRepos(state, action) {
            state.repos = action.payload
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        },
    }
});

export const { setUsers, setRepos, setIsLoading, setError } = dataSlice.actions

export default dataSlice.reducer;


