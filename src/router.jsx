import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Login from './components/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import TradePage from './pages/TradePage.jsx';
import TradeDetailPage from './pages/TradeDetailPage.jsx';
import DongnaePage from './pages/DongnaePage.jsx';
import MeetingPage from './pages/MeetingPage.jsx';
import StoryPage from './pages/StoryPage.jsx';
import ChatPage from './pages/ChatPage.jsx';

export default function AppRoutes() {
  return (
    <>
      <Header isLoggedIn={false} />  {/* Routes 밖에 있어야 함 ✅ */}
      <Routes>                        {/* Routes 안에는 Route만 ✅ */}
        <Route path="/" element={<HomePage />} />
        <Route path="/trade" element={<TradePage />} />
        <Route path="/trade/:productId" element={<TradeDetailPage />} />
        <Route path="/dongnae" element={<DongnaePage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/meeting" element={<MeetingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat" element={<ChatPage />} />
<Route path="/chat/:chatroomId" element={<ChatPage />} />
      </Routes>
    </>
  );
}