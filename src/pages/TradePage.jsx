import { useEffect } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { setCategory, setProducts } from "../api/store/slice/productSlice"; 
import { useNavigate } from "react-router-dom";
// [수정] 중괄호 {} 제거하고, 실제 폴더 구조인 ../api/api.js로 연결
import api from "../api/api.js"; 

export default function TradePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const products = useSelector((state) => state.products.filteredItems);
  const activeTabName = useSelector((state) => state.products.currentCategory);

  // 1. 페이지가 마운트될 때 데이터를 가져오는 로직
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // [수정] 존재하지 않는 productApi 대신, import한 api 객체 사용
        // 서버의 상품 목록 엔드포인트(예: /products)를 넣어줘
        const response = await api.get('/products'); 
        
        // [수정] api.js에서 이미 response.data를 처리해서 보내주므로 구조에 맞춰 저장
        // 만약 서버 응답이 { data: { content: [...] } } 구조라면 아래처럼
        const items = response.content || response;
        dispatch(setProducts(items));
      } catch (error) {
        console.error("상품을 불러오지 못했습니다:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const categories = [
    { id: 0, name: '전체' },
    { id: 1, name: '디지털기기' },
    { id: 2, name: '가구/인테리어' },
    { id: 3, name: '패션의류' },
    { id: 4, name: '게임/취미' }
  ];

  const handleTabClick = (categoryName) => {
    dispatch(setCategory(categoryName));
  };

  return (
    <div className="bg-white">
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 카테고리 탭 */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleTabClick(cat.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${activeTabName === cat.name 
                  ? "bg-orange-500 text-white shadow-md" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
             {/* 필터 영역 (필요시 추가) */}
          </aside>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500 font-semibold">총 {products?.length || 0}건</p>
            </div>

            {/* 상품 리스트 그리드 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <div 
                    key={product.productId} 
                    onClick={() => navigate(`/trade/${product.productId}`)} 
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3">
                      <img 
                        src={product.thumbnailUrl || "https://via.placeholder.com/400"} 
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-[15px] font-medium text-gray-900 line-clamp-2 leading-snug">
                        {product.title}
                      </h3>
                      <p className="text-xs text-gray-500">{product.locationName} • {product.createdAt}</p>
                      <p className="font-bold text-lg text-gray-900">
                        {product.price ? product.price.toLocaleString() : 0}원
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-gray-400">
                  등록된 상품이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}