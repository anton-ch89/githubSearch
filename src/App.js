import { UseFetch } from "./components/UseFetch";
import { Home } from "./components/Home";
import { FullUserCard } from './components/Cards/FullUserCard'
import { FullRepoCard } from "./components/Cards/FullRepoCard";
import { Route, Routes } from "react-router-dom";



function App() {

  UseFetch();
  return (
    <Routes>
      <Route path="" element={< Home />} />
      <Route path='FullUserCard' element={<FullUserCard />} />
      <Route path='FullRepoCard' element={<FullRepoCard />} />
    </Routes>
  );
}

export default App;
