import { useEffect,} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategory, setProducts } from "../api/store/slice/productSlice";
import { useNavigate } from "react-router-dom";
import { tradeItems, tradeCategories } from '../data/mockData.js';

// 백엔드 완성 후 추가
// import api from "../api/api.js";

export default function TradePage() {  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.filteredItems) ?? [];
  const activeTabName = useSelector((state) => state.products.currentCategory);

  // 카테고리 — 백엔드 완성 후 아래로 교체
  // const [categories, setCategories] = useState([{ categoryId: 0, name: '전체' }]);
  // useEffect(() => {
  //   api.get('/categories').then(res => {  // ✅ 변경: /api/products/categories → /categories
  //     const list = Array.isArray(res) ? res : [];
  //     setCategories([{ categoryId: 0, name: '전체' }, ...list]);
  //   }).catch(() => setCategories([{ categoryId: 0, name: '전체' }, ...tradeCategories]));
  // }, []);
  const categories = [{ categoryId: 0, name: '전체' }, ...tradeCategories];

  useEffect(() => {
    // 백엔드 완성 전 — mockData 사용
    if (!activeTabName || activeTabName === '전체') {
      dispatch(setProducts(tradeItems));
    } else {
      dispatch(setProducts(tradeItems.filter(item => item.categoryName === activeTabName)));
    }

    // 백엔드 완성 후 아래 주석 해제
    // const fetchProducts = async () => {
    //   try {
    //     const params = {};
    //     if (activeTabName && activeTabName !== '전체') {
    //       params.categoryName = activeTabName; // ✅ 변경: categoryId → categoryName
    //     }
    //     const res = await api.get('/main/products', { params }); // ✅ 변경: /products → /main/products
    //     const items = Array.isArray(res) ? res : [];
    //     dispatch(setProducts(items.length > 0 ? items : tradeItems));
    //   } catch {
    //     dispatch(setProducts(tradeItems));
    //   }
    // };
    // fetchProducts();
  }, [dispatch, activeTabName]);

  return (
    <div className="bg-white">
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.categoryId}
              onClick={() => dispatch(setCategory(cat.name))}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTabName === cat.name
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          <p className="text-sm text-gray-500 font-semibold mb-6">총 {products.length}건</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.length > 0 ? (
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
                    <h3 className="text-[15px] font-medium text-gray-900 line-clamp-2 leading-snug">{product.title}</h3>
                    <p className="text-xs text-gray-500">{product.locationName} • {product.createdAt}</p>
                    <p className="font-bold text-lg text-gray-900">{Number(product.price || 0).toLocaleString()}원</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-400">등록된 상품이 없습니다.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}