
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideNavbar from './components/SideNavbar';
import Navbar from './components/Navbar';
import Home from './pages/Home' ;
import Search from './pages/Search';
import Library from './pages/Library';

import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-black">
        <SideNavbar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-auto bg-gradient-to-br from-purple-900 via-black to-black">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/library" element={<Library />} />
              {/* <Route path="/playlist/:id" element={<Playlist />} />
              <Route path="/liked-songs" element={<LikedSongs />} /> */}
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;