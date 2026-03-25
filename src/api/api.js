import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // 서버 주소에 맞게 나중에 수정 가능
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (토큰이 있다면 자동으로 헤더에 넣어줌)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (데이터 구조를 편하게 바꿔줌)
api.interceptors.response.use(
  (response) => {
    // 서버 응답 구조가 { data: { ... } } 방식일 때 바로 알맹이만 리턴
    return response.data.data || response.data;
  },
  (error) => {
    console.error('API 에러 발생:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default api;