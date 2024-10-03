import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import ValorantGuidesPage from './ValorantGuidesPage/ValorantGuidesPage';
import RecentArticlesPage from './RecentArticlesPage/RecentArticlesPage';
import './App.css'

const PageIds = {
  MainPage: 'main',
  ValorantPage: 'valorant',
  RecentArticlesPage: 'recent-articles'
};
function App() {

  const navigate = useNavigate(); // Initialize useNavigate hook

  function navigateToPage(pageId) {
    navigate(`/${pageId}`); // Use navigate function here
  };

  return (
      <div className='main-app'>
        <Routes>
          {/* Main Page Route (root path) */}
          <Route path="/" element={<MainPage />} />
          
          {/* Valorant Guides Page Route */}
          <Route path={`/${PageIds.ValorantPage}`} element={<ValorantGuidesPage pageCallback={navigateToPage} />} />
          
          {/* Recent Articles Page Route */}
          <Route path={`/${PageIds.RecentArticlesPage}`} element={<RecentArticlesPage pageCallback={navigateToPage} />} />
          
          {/* Fallback Route (could be 404 or redirect to main page) */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
  );
}

export default App;