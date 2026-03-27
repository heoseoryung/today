import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 백엔드 완성 후 추가
// import api from '../api/api.js';

const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconLock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconEye = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconEyeOff = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// 명세: GET /api/auth/oauth2/authorize/{provider}
const SOCIAL_LOGINS = [
  {
    provider: 'kakao',
    label: '카카오',
    bg: 'bg-[#FEE500]',
    text: 'text-[#3A1D1D]',
    border: '',
    icon: <span className="text-lg">💬</span>,
  },
  {
    provider: 'naver',
    label: '네이버',
    bg: 'bg-[#03C75A]',
    text: 'text-white',
    border: '',
    icon: <span className="text-base font-black">N</span>,
  },
  {
    provider: 'google',
    label: '구글',
    bg: 'bg-white',
    text: 'text-gray-600',
    border: 'border border-gray-200',
    icon: <GoogleIcon />,
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 명세: GET /api/auth/oauth2/authorize/{provider} → 소셜 로그인 리다이렉트
  // 백엔드 완성 후: window.location.href = `http://localhost:8080/api/auth/oauth2/authorize/${provider}`;
  const handleSocialLogin = (provider) => {
    console.log('소셜 로그인:', provider);
    localStorage.setItem('accessToken', 'mock-token');
    navigate('/');
  };

  // 임시 이메일 로그인 — 백엔드 완성 후 소셜 로그인으로 대체
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!formData.email || !formData.password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('accessToken', 'mock-token');
      setLoading(false);
      navigate('/');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        <div className="bg-white rounded-3xl shadow-xl shadow-black/5 px-8 py-10 relative">

          {/* 닫기 버튼 */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* 타이틀 */}
          <div className="text-center mb-8">
            <h1 className="text-[36px] font-black text-[#1A1A1A] mb-2">로그인</h1>
            <p className="text-[13px] text-gray-400">간편하게 가입하고 상품을 확인하세요</p>
          </div>

          {/* 이메일 로그인 폼 — 임시, 백엔드 완성 후 제거 예정 */}
          <form onSubmit={handleSubmit} className="space-y-3 mb-6">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"><IconMail /></span>
              <input
                type="email"
                value={formData.email}
                placeholder="이메일"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 bg-[#F8F8F8] border border-transparent rounded-2xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF6F0F]/30 focus:bg-white transition-all placeholder:text-gray-300"
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"><IconLock /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                placeholder="비밀번호"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-11 pr-12 py-3.5 bg-[#F8F8F8] border border-transparent rounded-2xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF6F0F]/30 focus:bg-white transition-all placeholder:text-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>

            {error && <p className="text-[12px] text-red-400 font-medium pl-1">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-[#FF6F0F] text-white font-bold text-[14px] hover:bg-[#E55C00] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          {/* 구분선 */}
          <div className="relative flex items-center justify-center mb-5">
            <div className="absolute w-full border-t border-gray-100" />
            <span className="relative px-3 bg-white text-[12px] text-gray-300 font-medium">또는</span>
          </div>

          {/* 소셜 로그인 */}
          <div className="space-y-2.5">
            {SOCIAL_LOGINS.map((item) => (
              <button
                key={item.provider}
                type="button"
                onClick={() => handleSocialLogin(item.provider)}
                className={`w-full py-3.5 rounded-2xl font-bold text-[14px] flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] hover:opacity-90 ${item.bg} ${item.text} ${item.border}`}
              >
                {item.icon}
                {item.label}로 이용하기
              </button>
            ))}
          </div>

        </div>

        <p className="text-center text-[12px] text-gray-300 mt-5">
          로그인 시 이용약관 및 개인정보처리방침에 동의합니다
        </p>
      </div>
    </div>
  );
}