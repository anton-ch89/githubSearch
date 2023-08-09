

import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setRepos, setIsLoading, setError } from './redux/slices/dataSlice';
import { setUserInfo, setRepoInfo, setUserFollowers, setUserRepos } from './redux/slices/cardsSlice';
import { setTotalCount } from './redux/slices/paginationSlice';

export const UseFetch = () => {

    const dispatch = useDispatch();
    const { searchInput, filter } = useSelector((state) => state.search)
    const { userInfo, repoInfo, userUrl, repoUrl, userFollowers, userRepos } = useSelector((state) => state.cards)
    const { activeUserPage, activeRepoPage, perPage } = useSelector((state) => state.pagination)

    const searchName = 'a';
    const rootUrl = `https://api.github.com`
    const axiosUsers = `${filter}?q=${!searchInput.length ? searchName : searchInput}&per_page=${perPage}&page=${activeUserPage}`;
    const axiosRepos = `${filter}?q=${!searchInput.length ? searchName : searchInput}&sort=stars&per_page=${perPage}&page=${activeRepoPage}`;
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setIsLoading(true))
                dispatch(setTotalCount(null))
                if (filter === 'users') {
                    const resp = await axios.get(`${rootUrl}/search/${axiosUsers}`)
                    dispatch(setTotalCount(resp.data.total_count))
                    const data = resp.data.items;
                    dispatch(setUsers(data))
                } else {
                    const resp = await axios.get(`${rootUrl}/search/${axiosRepos}`)
                    dispatch(setTotalCount(resp.data.total_count))
                    const data = resp.data.items;
                    dispatch(setRepos(data))
                }
                dispatch(setIsLoading(false))

            } catch (error) {
                // const newErr = error.message
                dispatch(setError(error.message))
            }
        }
        fetchData()

    }, [filter, searchInput, activeUserPage, activeRepoPage])
    useEffect(() => {
        if (userUrl.length) {
            dispatch(setUserInfo({}))
            try {
                const fetchData = async () => {
                    const resp = await axios.get(`${userUrl}`);
                    const respFollowers = await axios.get(`${userUrl}/followers?&per_page=5&`)
                    const respRepos = await axios.get(`${userUrl}/repos?&per_page=5`)
                    dispatch(setUserFollowers(respFollowers.data))
                    dispatch(setUserRepos(respRepos.data))
                    dispatch(setUserInfo(resp.data))
                }
                fetchData()
            } catch (error) {
                console.error(error);
            }
        }

    }, [userUrl]);
    useEffect(() => {
        if (repoUrl.length) {
            dispatch(setRepoInfo({}))
            try {
                const fetchData = async () => {
                    const resp = await axios.get(`${repoUrl}`);
                    dispatch(setRepoInfo(resp.data))

                }
                fetchData()
            } catch (error) {
                console.error(error);
            }
        }

    }, [repoUrl]);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("user")) !== null) {
            dispatch(setUserInfo(JSON.parse(localStorage.getItem("user"))))
            dispatch(setUserFollowers(JSON.parse(localStorage.getItem("followers"))))
            dispatch(setUserRepos(JSON.parse(localStorage.getItem("userRepos"))))
        }

    }, []);
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("repo")) !== null) {
            dispatch(setRepoInfo(JSON.parse(localStorage.getItem("repo"))))
        }

    }, []);

    useEffect(() => {
        const jsonUser = JSON.stringify(userInfo);
        localStorage.setItem("user", jsonUser);
        const jsonFollowers = JSON.stringify(userFollowers);
        localStorage.setItem("followers", jsonFollowers);
        const jsonUserRepos = JSON.stringify(userRepos);
        localStorage.setItem("userRepos", jsonUserRepos);
    }, [userInfo]);
    useEffect(() => {
        const jsonRepo = JSON.stringify(repoInfo);
        localStorage.setItem("repo", jsonRepo);
    }, [repoInfo]);


}
