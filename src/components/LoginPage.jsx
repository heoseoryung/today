import { useState } from 'react';


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

const IconX = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
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

const SOCIAL_LOGINS = [
  {
    provider: '카카오',
    bg: 'bg-[#FEE500]',
    text: 'text-black',
    border: '',
    icon: <span className="text-xl">💬</span>,
  },
  {
    provider: '네이버',
    bg: 'bg-[#03C75A]',
    text: 'text-white',
    border: '',
    icon: <span className="text-xl font-black">N</span>,
  },
  {
    provider: '구글',
    bg: 'bg-white',
    text: 'text-gray-700',
    border: 'border-2 border-gray-200',
    icon: <GoogleIcon />,
  },
];

// ─────────────────────────────────────────────
// props:
//   onNavigate(page)  — App의 setCurrentPage
//   setIsLoggedIn(bool) — App의 로그인 상태
// ─────────────────────────────────────────────
export default function LoginPage({ onNavigate, setIsLoggedIn }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = (message) => {
    setLoading(true);
    // 실제 API 연동 시 여기에 fetch 넣으면 됩니다
    setTimeout(() => {
      if (setIsLoggedIn) setIsLoggedIn(true);
      setLoading(false);
      onNavigate('home');
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    handleLoginSuccess('로그인 되었습니다!');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full relative">

        {/* 닫기 버튼 */}
        <button
          onClick={() => onNavigate('home')}
          className="absolute -top-12 right-0 p-2 text-gray-400 hover:text-gray-700 hover:rotate-90 transition-all duration-200"
        >
          <IconX />
        </button>

        {/* 헤더 */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-black text-[#1A1A1A] mb-2">로그인</h1>
          <p className="text-gray-500 text-sm">하 미친 안끝나</p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          {/* 이메일 */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">이메일</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <IconMail />
              </span>
              <input
                type="email"
                required
                value={formData.email}
                placeholder="example@email.com"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6F0F] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">비밀번호</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <IconLock />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                placeholder="비밀번호를 입력하세요"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6F0F] focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <p className="text-sm text-red-500 font-medium pl-1">{error}</p>
          )}

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-[#FF6F0F] text-white font-bold text-base hover:bg-[#E55C00] active:scale-[0.98] transition-all shadow-lg shadow-orange-100 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        {/* 구분선 */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute w-full border-t border-gray-100" />
          <span className="relative px-4 bg-white text-sm text-gray-400">또는</span>
        </div>

        {/* 소셜 로그인 */}
        <div className="space-y-3">
          {SOCIAL_LOGINS.map((item) => (
            <button
              key={item.provider}
              type="button"
              onClick={() => handleLoginSuccess(`${item.provider} 로그인`)}
              className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${item.bg} ${item.text} ${item.border}`}
            >
              {item.icon}
              {item.provider}로 이용하기
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}