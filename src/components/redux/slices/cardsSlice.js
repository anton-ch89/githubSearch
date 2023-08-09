import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {},
    repoInfo: {},
    userUrl: '',
    repoUrl: '',
    userFollowers: [],
    userRepos: [],
};

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        setRepoInfo(state, action) {
            state.repoInfo = action.payload
        },
        setUserUrl(state, action) {
            state.userUrl = action.payload
        },
        setRepoUrl(state, action) {
            state.repoUrl = action.payload
        },
        setUserFollowers(state, action) {
            state.userFollowers = action.payload
        },
        setUserRepos(state, action) {
            state.userRepos = action.payload
        },
    }
})

export const { setUserInfo, setRepoInfo, setUserUrl, setRepoUrl, setUserFollowers, setUserRepos } = cardsSlice.actions

export default cardsSlice.reducer