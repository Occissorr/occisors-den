import { React, useEffect} from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation  } from 'react-router-dom';
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
  const location = useLocation();

  function navigateToPage(pageId) {
    navigate(`/${pageId}`); // Use navigate function here
  };

  function changeFavicon(faviconURL) {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = faviconURL;
    }
  }
  
  useEffect(() => {
    // Check the path and set the favicon accordingly
    switch (location.pathname) {
      case `/${PageIds.ValorantPage}`:
        changeFavicon(`${process.env.PUBLIC_URL}/favicon2.ico`);  // Correct path handling
        break;
      case `/${PageIds.MainPage}`:
      case `/${PageIds.RecentArticlesPage}`:
      default:
        changeFavicon(`${process.env.PUBLIC_URL}/favicon1.ico`);  // Correct path handling
        break;
    }
  }, [location]);

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