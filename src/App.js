import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "./components"
import { Home, Team, Tournament, CreateTournament, Login, Register,  MyProfile, MyTeam, MySchedule } from "./pages"
import "./App.css";

const App = () => {
  return (
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
                    <Route path="/CreateTournament" element={<CreateTournament />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    
                    {/* User Management */}
                    <Route path="/myProfile" element={<MyProfile />} />
                    <Route path="/myTeam" element={<MyTeam />} />
                    <Route path="/mySchedule" element={<MySchedule />} />
                </Routes>
            </div>
        </div>
    </BrowserRouter>
  )
}

export default App