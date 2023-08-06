import { UseFetch } from "./components/UseFetch";
import { Home } from "./components/Home";
import { FullUserCard } from './components/Cards/FullUserCard'
import { FullRepoCard } from "./components/Cards/FullRepoCard";
import { Route, Routes } from "react-router-dom";
import { createContext } from "react";

export const AppContext = createContext();

function App() {
  const [
    items,
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
  ] = UseFetch()


  return (
    <AppContext.Provider value={{
      items,
      repos,
      isLoading,
      setFilter,
      setUserUrl,
      filter,
      searchInput,
      setSearchInput,
      setRepoUrl,
      activeUserPage,
      activeRepoPage,
      setActiveUserPage,
      setActiveRepoPage,
      totalCount,
      totalPageCount,
    }}>
      <Routes>
        <Route path="" element={< Home />} />
        <Route path='FullUserCard' element={<FullUserCard userInfo={userInfo} userFollowers={userFollowers} userRepos={userRepos} />} />
        <Route path='FullRepoCard' element={<FullRepoCard repoInfo={repoInfo} />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
