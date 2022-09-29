import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "./components"
import { Home, Team, Tournament, MyProfile, MyTeam, MySchedule } from "./pages"
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
        <div>
            <div><Navbar /></div>
            <div>
                <Routes>
                    {/* Web */}
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/tournament" element={<Tournament />} />
                    
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