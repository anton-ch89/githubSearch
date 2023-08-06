

import axios from 'axios';
import { useEffect, useState } from 'react'

export const UseFetch = () => {

    const [items, setItems] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [repos, setRepos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const [repoInfo, setRepoInfo] = useState({});
    const [userUrl, setUserUrl] = useState('');
    const [repoUrl, setRepoUrl] = useState('');
    const [userFollowers, setUserFollowers] = useState([]);
    const [userRepos, setUserRepos] = useState([]);
    const [filter, setFilter] = useState('users')
    const [activeUserPage, setActiveUserPage] = useState(1);
    const [activeRepoPage, setActiveRepoPage] = useState(1);
    const [totalCount, setTotalCount] = useState(null);
    const [perPage, setPerPage] = useState(10);

    const searchName = 'a';
    const totalPageCount = Math.ceil(totalCount / perPage);

    const rootUrl = `https://api.github.com`
    const axiosUsers = `${filter}?q=${!searchInput.length ? searchName : searchInput}&per_page=${perPage}&page=${activeUserPage}`;
    const axiosRepos = `${filter}?q=${!searchInput.length ? searchName : searchInput}&sort=stars&per_page=${perPage}&page=${activeRepoPage}`;
    useEffect(() => {
        try {
            setIsLoading(true)
            const fetchData = async () => {
                setTotalCount(null)
                if (filter === 'users') {
                    const resp = await axios.get(`${rootUrl}/search/${axiosUsers}`)
                    setTotalCount(resp.data.total_count)
                    const data = resp.data.items;
                    setItems(data)
                } else {
                    const resp = await axios.get(`${rootUrl}/search/${axiosRepos}`)
                    setTotalCount(resp.data.total_count)
                    const data = resp.data.items;
                    setRepos(data)
                }
                setIsLoading(false)
            }
            fetchData()
        } catch (error) {
            console.error(error);
        }
    }, [filter, searchInput, activeUserPage, activeRepoPage])
    useEffect(() => {
        if (userUrl.length) {
            setUserInfo({})
            try {
                const fetchData = async () => {
                    const resp = await axios.get(`${userUrl}`);
                    const respFollowers = await axios.get(`${userUrl}/followers?&per_page=5&`)
                    const respRepos = await axios.get(`${userUrl}/repos?&per_page=5`)
                    setUserFollowers(respFollowers.data)
                    setUserRepos(respRepos.data)
                    setUserInfo(resp.data)
                }
                fetchData()
            } catch (error) {
                console.error(error);
            }
        }

    }, [userUrl]);
    useEffect(() => {
        if (repoUrl.length) {
            setRepoInfo({})
            try {
                const fetchData = async () => {
                    const resp = await axios.get(`${repoUrl}`);
                    setRepoInfo(resp.data)

                }
                fetchData()
            } catch (error) {
                console.error(error);
            }
        }

    }, [repoUrl]);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("user")) !== null) {
            setUserInfo(JSON.parse(localStorage.getItem("user")))
            setUserFollowers(JSON.parse(localStorage.getItem("followers")))
            setUserRepos(JSON.parse(localStorage.getItem("userRepos")))
        }

    }, []);
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("repo")) !== null) {
            setRepoInfo(JSON.parse(localStorage.getItem("repo")))
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


    return [items,
        repos,
        isLoading,
        setFilter,
        setUserUrl,
        userInfo,
        filter,
        searchInput,
        setSearchInput,
        userFollowers,
        setRepoUrl,
        repoInfo,
        userRepos,
        activeUserPage,
        activeRepoPage,
        setActiveUserPage,
        setActiveRepoPage,
        totalCount,
        totalPageCount
    ]
}
