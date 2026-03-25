import { Routes, Route } from 'react-router-dom';

// 1. components 폴더 안의 파일들 (./components/)
import Header from './components/Header.jsx';
import Login from './components/LoginPage.jsx'; // 캡처본에 components 폴더 안에 있음!

// 2. pages 폴더 안의 파일들 (./pages/)
import HomePage from './pages/HomePage.jsx';
import TradePage from './pages/TradePage.jsx';
import TradeDetailPage from './pages/TradeDetailPage.jsx';
import DongnaePage from './pages/DongnaePage.jsx';
import MeetingPage from './pages/MeetingPage.jsx';
import StoryPage from './pages/StoryPage.jsx';

export default function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trade" element={<TradePage />} />
        <Route path="/trade/:productId" element={<TradeDetailPage />} />
        <Route path="/dongnae" element={<DongnaePage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/meeting" element={<MeetingPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}