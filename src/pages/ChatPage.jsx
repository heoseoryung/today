import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';



// ─── mockData 기반 채팅방 목록 (API 연결 전 임시) ───────────────────────
// 명세: GET /api/trades/chatrooms 응답 구조 그대로
const mockChatRooms = [
  {
    chatroomId: 1,
    productId: 1,
    productTitle: '애플 맥북 프로 14인치 M3',
    productThumbnailUrl: 'https://picsum.photos/400?random=1',
    opponentNickname: '맥북장인',
    opponentProfileImageUrl: 'https://picsum.photos/100?random=1',
    lastMessage: '아직 판매중인가요?',
    lastMessageAt: '2분 전',
    unreadCount: 2,
    price: 2200000,
  },
  {
    chatroomId: 2,
    productId: 2,
    productTitle: '나이키 에어맥스 270',
    productThumbnailUrl: 'https://picsum.photos/400?random=2',
    opponentNickname: '슈즈홀릭',
    opponentProfileImageUrl: 'https://picsum.photos/100?random=2',
    lastMessage: '직거래 가능하신가요?',
    lastMessageAt: '10분 전',
    unreadCount: 0,
    price: 65000,
  },
  {
    chatroomId: 3,
    productId: 3,
    productTitle: '다이슨 에어랩 컴플리트',
    productThumbnailUrl: 'https://picsum.photos/400?random=3',
    opponentNickname: '친절한판매자',
    opponentProfileImageUrl: 'https://picsum.photos/100?random=3',
    lastMessage: '네 오늘 저녁 6시 어떠세요?',
    lastMessageAt: '1시간 전',
    unreadCount: 1,
    price: 380000,
  },
];

// ─── mockData 기반 메시지 목록 (API 연결 전 임시) ───────────────────────
// 명세: GET /api/trades/chatrooms/{chatroomId}/messages 응답 구조 그대로
const mockMessages = {
  1: [
    { messageId: 1, senderId: 10, content: '안녕하세요', sentAt: '14:23', isRead: true },
    { messageId: 2, senderId: 'me', content: '안녕하세요!', sentAt: '14:25', isRead: true },
    { messageId: 3, senderId: 10, content: '아직 판매중인가요?', sentAt: '14:26', isRead: true },
    { messageId: 4, senderId: 'me', content: '좋아요! 언제 시간 되시나요?', sentAt: '14:28', isRead: true },
    { messageId: 5, senderId: 10, content: '오늘 저녁 6시 어떠세요?', sentAt: '14:30', isRead: false },
  ],
  2: [
    { messageId: 1, senderId: 11, content: '직거래 가능하신가요?', sentAt: '13:10', isRead: true },
    { messageId: 2, senderId: 'me', content: '네 가능해요!', sentAt: '13:12', isRead: true },
  ],
  3: [
    { messageId: 1, senderId: 12, content: '안녕하세요!', sentAt: '11:00', isRead: true },
    { messageId: 2, senderId: 'me', content: '좋아요! 언제 시간 되시나요?', sentAt: '11:30', isRead: true },
    { messageId: 3, senderId: 12, content: '오늘 저녁 6시 어떠세요?', sentAt: '14:30', isRead: false },
  ],
};

export default function ChatPage() {
  const { chatroomId } = useParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // ─── 채팅방 목록 불러오기 ──────────────────────────────────────────────
  // 명세: GET /api/trades/chatrooms (인증 필요 🔒)
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // TODO: 백엔드 완성 후 아래 주석 해제
        // const res = await api.get('/trades/chatrooms');
        // setRooms(res);
        setRooms(mockChatRooms); // 임시 mockData
      } catch (err) {
        console.error('채팅방 목록 로드 실패:', err);
        setRooms(mockChatRooms);
      }
    };
    fetchRooms();
  }, []);

  // ─── URL chatroomId 있으면 자동 선택 ──────────────────────────────────
 useEffect(() => {
  const fetchRooms = async () => {
    try {
      setRooms(mockChatRooms);
      if (chatroomId) {
        const room = mockChatRooms.find(r => r.chatroomId === Number(chatroomId));
        if (room) setSelectedRoom(room);
      }
    } catch (err) {
      console.error('채팅방 목록 로드 실패:', err);
    }
  };
  fetchRooms();
}, [chatroomId]);

  // ─── 메시지 목록 불러오기 ─────────────────────────────────────────────
  // 명세: GET /api/trades/chatrooms/{chatroomId}/messages (인증 필요 🔒)
  // 커서 페이징: cursor, size 파라미터
  useEffect(() => {
    if (!selectedRoom) return;
    const fetchMessages = async () => {
      try {
        // TODO: 백엔드 완성 후 아래 주석 해제
        // const res = await api.get(`/trades/chatrooms/${selectedRoom.chatroomId}/messages`, {
        //   params: { size: 20 }
        // });
        // setMessages(res.messages);
        setMessages(mockMessages[selectedRoom.chatroomId] || []); // 임시 mockData
      } catch (err) {
        console.error('메시지 로드 실패:', err);
      }
    };
    fetchMessages();
  }, [selectedRoom]);

  // ─── 메시지 전송 ───────────────────────────────────────────────────────
  // 명세: WebSocket SEND /app/chat.send { chatroomId, content }
  // TODO: 백엔드 완성 후 stomp client 연결
  const handleSend = () => {
    if (!inputText.trim() || !selectedRoom) return;
    const newMsg = {
      messageId: Date.now(),
      senderId: 'me',
      content: inputText,
      sentAt: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ─── 스크롤 맨 아래로 ─────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ─── 채팅방 나가기 ────────────────────────────────────────────────────
  // 명세: DELETE /api/trades/chatrooms/{chatroomId} (인증 필요 🔒)
  const handleLeaveRoom = async () => {
    if (!selectedRoom) return;
    try {
      // TODO: 백엔드 완성 후 아래 주석 해제
      // await api.delete(`/trades/chatrooms/${selectedRoom.chatroomId}`);
      setRooms(prev => prev.filter(r => r.chatroomId !== selectedRoom.chatroomId));
      setSelectedRoom(null);
      navigate('/chat');
    } catch (err) {
      console.error('채팅방 나가기 실패:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-130px)] flex border border-[#F0F0F0] rounded-2xl overflow-hidden bg-white">

      {/* ── 왼쪽: 채팅방 목록 ── */}
      <div className="w-[340px] shrink-0 border-r border-[#F0F0F0] flex flex-col">
        <div className="px-5 py-4 border-b border-[#F0F0F0]">
          <h2 className="text-[17px] font-black text-[#1A1A1A]">채팅</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {rooms.map((room) => (
            <div
              key={room.chatroomId}
              onClick={() => {
                setSelectedRoom(room);
                navigate(`/chat/${room.chatroomId}`);
              }}
              className={`flex items-center gap-3 px-5 py-4 cursor-pointer transition-colors border-b border-[#F8F8F8] ${
                selectedRoom?.chatroomId === room.chatroomId
                  ? 'bg-[#FFF0E6]'
                  : 'hover:bg-[#FAFAFA]'
              }`}
            >
              {/* 상대방 프로필 */}
              <div className="relative shrink-0">
                <img
                  src={room.opponentProfileImageUrl}
                  alt={room.opponentNickname}
                  className="w-12 h-12 rounded-full object-cover border border-[#F0F0F0]"
                />
                {room.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6F0F] rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                    {room.unreadCount}
                  </span>
                )}
              </div>
              {/* 채팅 정보 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[14px] font-bold text-[#1A1A1A]">{room.opponentNickname}</span>
                  <span className="text-[11px] text-[#ABABAB]">{room.lastMessageAt}</span>
                </div>
                <p className="text-[13px] text-[#767676] truncate">{room.lastMessage}</p>
                {/* 상품 정보 */}
                <p className="text-[11px] text-[#ABABAB] truncate mt-0.5">{room.productTitle} · {room.price?.toLocaleString()}원</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 오른쪽: 채팅창 ── */}
      {selectedRoom ? (
        <div className="flex-1 flex flex-col">
          {/* 채팅창 헤더 */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
            {/* 상품 정보 */}
            <div className="flex items-center gap-3">
              <img
                src={selectedRoom.productThumbnailUrl}
                alt={selectedRoom.productTitle}
                className="w-10 h-10 rounded-xl object-cover border border-[#F0F0F0]"
              />
              <div>
                <p className="text-[13px] font-bold text-[#1A1A1A] line-clamp-1">{selectedRoom.productTitle}</p>
                <p className="text-[12px] text-[#FF6F0F] font-bold">{selectedRoom.price?.toLocaleString()}원</p>
              </div>
              <button
                onClick={() => navigate(`/trade/${selectedRoom.productId}`)}
                className="ml-2 px-3 py-1 rounded-lg border border-[#EDEDED] text-[12px] font-semibold text-[#767676] hover:bg-[#F8F8F8]"
              >
                보기
              </button>
            </div>
            {/* 나가기 버튼 */}
            <button
              onClick={handleLeaveRoom}
              className="text-[13px] text-[#ABABAB] hover:text-[#FF4444] transition-colors"
            >
              나가기
            </button>
          </div>

          {/* 메시지 목록 */}
          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.messageId}
                className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[65%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed ${
                  msg.senderId === 'me'
                    ? 'bg-[#FF6F0F] text-white rounded-br-md'
                    : 'bg-[#F2F3F6] text-[#1A1A1A] rounded-bl-md'
                }`}>
                  <p>{msg.content}</p>
                  <p className={`text-[10px] mt-1 ${msg.senderId === 'me' ? 'text-white/70 text-right' : 'text-[#ABABAB]'}`}>
                    {msg.sentAt}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 메시지 입력창 */}
          <div className="px-6 py-4 border-t border-[#F0F0F0] flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="메시지를 입력하세요"
              className="flex-1 h-11 px-4 rounded-xl bg-[#F2F3F6] text-[14px] outline-none focus:ring-2 focus:ring-[#FF6F0F]/30 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="w-11 h-11 rounded-xl bg-[#FF6F0F] flex items-center justify-center text-white disabled:opacity-40 hover:bg-[#E55C00] transition-colors shrink-0"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-[#ABABAB] text-[15px]">
          채팅방을 선택해주세요
        </div>
      )}
    </div>
  );
}