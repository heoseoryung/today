import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./router.jsx"

export default function App() {
  return (
    // 1. Router가 앱 전체의 주소를 관리해줌
    <Router>
      <div className="min-h-screen bg-white">
        {/* 2. 실제 페이지 전환 로직은 여기서 다 일어남 */}
        <AppRoutes />
      </div>
    </Router>
  );
}