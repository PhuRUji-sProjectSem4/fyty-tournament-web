import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "./components"
import { Home, Team, Tournament, CreateTournament, MyProfile, MySchedule } from "./pages"
import "./App.css";
import coreApi from "./core/axios";
import { ApiRounteKey, ClientRounteKey } from "./path/coverPath";
import { getGames } from "./apis/game/game-queries";
import errorPage from "./pages/ErrorPage";
import TeamEach from "./pages/TeamEach";

export const GameContext = React.createContext(); 
export const UserContext = React.createContext();

const App = () => {
  const [games, setGames] = useState(null);
  const [error, setError] = useState(null);

  const user = useState(null);


  useEffect(() => {
    getGames()
      .then((gamesData) => setGames(gamesData))
      .catch((error) => setError(error))
  }, []);

  if(error) return (
    <errorPage/>
  )
 
  return (
    <UserContext.Provider value={user}>
      <GameContext.Provider value={games}>
        <BrowserRouter>
            <div>
                <div><Navbar /></div>
                <div className='webBody'>
                    <Routes>
                        {/* Web */}
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/tournament" element={<Tournament />} />
                        <Route path="/createTournament" element={<CreateTournament />} />
                        
                        {/* User Management */}
                        <Route path="/myProfile" element={<MyProfile />} />
                        <Route path="/mySchedule" element={<MySchedule />} />

                        {/* Detail */}
                        <Route path="/team/:id"  element={<TeamEach />} />

                    </Routes>
                </div>
            </div>
        </BrowserRouter>
      </GameContext.Provider>
    </UserContext.Provider>
  )
}

export default App