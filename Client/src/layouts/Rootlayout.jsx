import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../pages/Footer'; // Assuming this is your file path

const Rootlayout = () => {
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  return (
    // 🔥 FIX 1: flex-col & min-h-screen ensures the Footer ALWAYS stays at the bottom.
    // 🔥 FIX 2: Custom selection color matches your brand's purple theme.
    <div className="flex flex-col min-h-screen bg-[#eef1f5] font-sans selection:bg-purple-500 selection:text-white">
      <ScrollToTop />

      {/* ✅ SINGLE NAVBAR */}
      <Navbar
        search={search}
        setSearch={setSearch}
        isSearching={isSearching}
      />

      {/* 🔥 FIX 3: flex-grow expands to fill space, pushing the footer down.
        🔥 FIX 4: pt-[104px] perfectly offsets your fixed double-row navbar.
        🔥 FIX 5: Removed global px-5 so your Home page Hero Banner can stretch edge-to-edge! 
      */}
      <main className="flex-grow pt-[104px]">
        <Outlet context={{ search, setSearch, isSearching, setIsSearching }} />
      </main>

      {/* ✅ FOOTER */}
      <Footer />
    </div>
  );
};

export default Rootlayout;