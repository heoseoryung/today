import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// 폴더 구조 기준: src/api/store/index.js → '/api/store'로 접근
import { store } from './api/store';
import AppRoutes from "./router.jsx";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-white">
          <AppRoutes />
        </div>
      </Router>
    </Provider>
  );
}