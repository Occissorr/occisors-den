import React from 'react';
import MainPage from './MainPage/MainPage';
import ValorantGuidesPage from './ValorantGuidesPage/ValorantGuidesPage';
import RecentArticlesPage from './RecentArticlesPage/RecentArticlesPage';
import { PageIds } from '../src/Services/Constants.ts'

function App() {
  const  [page, setPage] = React.useState('');

  const setPageFromInnerPages = (pageName) =>{
    pageName && pageName !== page && setPage(pageName);
  }
  const getPage = (pageId) =>{
    switch (pageId){
      case PageIds.ValorantPage: return <ValorantGuidesPage pageCallback = {setPageFromInnerPages}/>
      case PageIds.RecentArticlesPage : return <RecentArticlesPage pageCallback = {setPageFromInnerPages}/>
      default: return <MainPage pageCallback = {setPageFromInnerPages}/>;
    }
  }
  return (
    <div className='main-app'>
      {getPage(page)}
    </div>
  );
}

export default App;