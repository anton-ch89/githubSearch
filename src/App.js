import { UseFetch } from "./components/UseFetch";
import { Home } from "./components/Home";
import { FullUserCard } from './components/Cards/FullUserCard'
import { FullRepoCard } from "./components/Cards/FullRepoCard";
import { Route, Routes } from "react-router-dom";


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
    <Routes>
      <Route path="" element={
        < Home
          items={items}
          repos={repos}
          isLoading={isLoading}
          setFilter={setFilter}
          setUserUrl={setUserUrl}
          filter={filter}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setRepoUrl={setRepoUrl}
          activeUserPage={activeUserPage}
          activeRepoPage={activeRepoPage}
          setActiveUserPage={setActiveUserPage}
          setActiveRepoPage={setActiveRepoPage}
          totalCount={totalCount}
          totalPageCount={totalPageCount}
        />} />
      <Route path='FullUserCard' element={<FullUserCard userInfo={userInfo} userFollowers={userFollowers} userRepos={userRepos} />} />
      <Route path='FullRepoCard' element={<FullRepoCard repoInfo={repoInfo} />} />
    </Routes>
  );
}

export default App;
