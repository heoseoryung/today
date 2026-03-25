import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux' // 추가
import { store } from "./api/store/index"; 
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Provider로 App을 감싸줌 */}
      <App />
    </Provider>
  </StrictMode>,
)