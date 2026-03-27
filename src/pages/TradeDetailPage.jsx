import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tradeItems } from '../data/mockData.js';
import { IconArrowLeft, IconHeart, IconMapPin, IconClock, IconEye, IconStar } from '../components/Icons.jsx';

// 백엔드 완성 후 추가
// import api from '../api/api.js';

export default function TradeDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  // 백엔드 완성 후 아래로 교체
  // useEffect(() => {
  //   api.get(`/main/product/${productId}`).then(res => setProduct(res)); // ✅ 변경: /products/:id → /main/product/:id
  // }, [productId]);

  const product = tradeItems.find(item => item.productId === Number(productId)) || {
    productId: 0,
    title: '상품 정보가 없습니다',
    price: 0,
    isNegotiable: false,
    description: '',
    imageUrls: [],
    seller: { nickname: '익명', temperature: 36.5 },
    locationName: '위치 정보 없음',
    createdAt: '',
    viewCount: 0,
  };

  // 찜 토글 — 백엔드 완성 후 아래로 교체
  // ✅ 변경: POST /api/products/{productId}/like → POST /api/v1/wishlist/{memberId}/{productId}
  // const handleLike = async () => {
  //   try {
  //     const memberId = localStorage.getItem('memberId');
  //     await api.post(`/api/v1/wishlist/${memberId}/${productId}`);
  //     setLiked(prev => !prev);
  //   } catch (err) {
  //     console.error('찜 토글 실패:', err);
  //   }
  // };

  return (
    <div className="max-w-5xl mx-auto md:py-10 bg-white">
      <div className="flex items-center gap-2 px-4 py-3 md:hidden">
        <button onClick={() => navigate(-1)} className="p-1 text-[#1A1A1A]"><IconArrowLeft /></button>
        <span className="font-bold text-[#1A1A1A]">상품 정보</span>
      </div>

      <div className="md:flex md:border md:border-[#F0F0F0] md:rounded-2xl md:overflow-hidden bg-white">
        <div className="md:w-[55%] shrink-0 bg-[#FAFAFA]">
          <div className="w-full aspect-square overflow-hidden">
            <img
              src={product.imageUrls?.[0] || product.thumbnailUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col px-5 md:px-8 py-5 md:border-l md:border-[#F0F0F0]">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0F0F0] mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F0F0F0] overflow-hidden">
                {product.seller?.profileImageUrl && (
                  <img src={product.seller.profileImageUrl} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <div>
                <p className="font-bold text-sm text-[#1A1A1A]">{product.seller?.nickname}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <IconStar />
                  <span className="text-xs text-[#767676]">매너온도 {product.seller?.temperature}℃</span>
                </div>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-full border border-[#EDEDED] text-xs font-semibold text-[#767676]">
              프로필
            </button>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black text-[#1A1A1A] mb-2">{product.title}</h1>
            <button onClick={() => navigate(-1)} className="hidden md:block text-xs text-gray-400 hover:text-gray-600">닫기</button>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <p className="text-2xl font-black text-[#FF6F0F]">{product.price?.toLocaleString()}원</p>
            {product.isNegotiable && (
              <span className="text-[10px] bg-[#FFF0E6] text-[#FF6F0F] px-1.5 py-0.5 rounded font-bold border border-[#FF6F0F]/20">
                가격 제안 가능
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-[#ABABAB] mb-5">
            <span className="flex items-center gap-1"><IconMapPin />{product.locationName}</span>
            <span className="flex items-center gap-1"><IconClock />{product.createdAt}</span>
            <span className="flex items-center gap-1"><IconEye />조회 {product.viewCount}</span>
          </div>

          <div className="border-t border-[#F0F0F0] mb-5" />

          <div className="mb-6 flex-1">
            <p className="text-sm font-bold text-[#1A1A1A] mb-2">상품 설명</p>
            <p className="text-sm text-[#767676] leading-relaxed whitespace-pre-line">{product.description}</p>
          </div>

          <div className="mt-auto flex items-center gap-2 pt-4 border-t border-[#F0F0F0]">
            <button
              onClick={() => setLiked(!liked)}
              // 백엔드 완성 후: onClick={handleLike}
              className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${liked ? 'border-[#FF6F0F] bg-[#FFF0E6]' : 'border-[#EDEDED]'}`}
            >
              <IconHeart filled={liked} />
            </button>
            {/* 백엔드 완성 후: POST /trades/chatrooms { productId } → chatroomId 받아서 navigate(`/chat/${chatroomId}`) */}
            <button
              onClick={() => navigate('/chat')}
              className="flex-1 h-12 rounded-xl bg-[#FF6F0F] text-white font-bold text-sm hover:bg-[#E55C00] transition-colors"
            >
              채팅하기
            </button>
            <button className="flex-1 h-12 rounded-xl border-2 border-[#FF6F0F] text-[#FF6F0F] font-bold text-sm hover:bg-[#FFF0E6] transition-colors">
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}