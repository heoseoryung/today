import { useEffect } from "react"; // 리액트의 생명주기(시작, 업데이트 등)를 관리하는 훅을 가져옴
import { useSelector, useDispatch } from "react-redux"; // 리덕스 저장소의 데이터를 읽고(useSelector), 수정 신호를 보낼(useDispatch) 함수들을 가져옴
import { setCategory, setProducts } from "../api/store/slice/productSlice"; // 상품 슬라이스(리듀서)에서 만든 카테고리 변경, 상품 저장 액션 함수들을 가져옴
import { useNavigate } from "react-router-dom"; // 다른 페이지로 주소를 이동시켜주는 함수를 가져옴
import { tradeItems, tradeCategories } from '../data/mockData.js'; // 서버 연결 전 테스트용 가짜 상품 데이터와 카테고리 목록을 가져옴

export default function TradePage() { // 중고거래 메인 페이지를 그려주는 함수형 컴포넌트 시작
  const dispatch = useDispatch(); // 리덕스 금고에 '데이터 수정해줘'라고 요청할 배달원(dispatch) 생성
  const navigate = useNavigate(); // 페이지 이동을 실행할 함수 생성
  
  // 리덕스 저장소(state.products)에서 필터링된 상품 목록을 가져옴 (데이터가 없으면 빈 배열로 설정)
  const products = useSelector((state) => state.products.filteredItems) ?? []; 
  // 리덕스 저장소에서 현재 사용자가 선택한 카테고리 이름을 가져옴
  const activeTabName = useSelector((state) => state.products.currentCategory);
  // 전체보기 항목({categoryId: 0, name: '전체'})을 맨 앞에 두고, 나머지는 가져온 카테고리 목록으로 합쳐서 배열 생성
  const categories = [{ categoryId: 0, name: '전체' }, ...tradeCategories];

  // (주석된 부분) 백엔드와 연결하여 실제 카테고리 목록을 서버에서 받아오는 로직이 들어갈 자리
  // useEffect(() => { ... }, []);

  useEffect(() => { // 카테고리 탭이 바뀌거나 디스패치가 준비될 때마다 실행되는 효과 로직
    // 백엔드 연결 전: 현재 선택된 탭이 '전체'거나 선택된 게 없다면 모든 상품을 리덕스에 저장
    if (!activeTabName || activeTabName === '전체') {
      dispatch(setProducts(tradeItems)); // 모든 가짜 데이터를 리덕스 상품 목록에 넣으라고 명령
    } else {
      // 선택된 카테고리가 있다면, 가짜 데이터 중에서 해당 카테고리 이름과 일치하는 것만 걸러서 리덕스에 저장
      dispatch(setProducts(tradeItems.filter(item => item.categoryName === activeTabName)));
    }

    // (주석된 부분) 백엔드 연결 후 실제 서버에서 카테고리별 상품을 요청하고 받아오는 로직이 들어갈 자리
    // const fetchProducts = async () => { ... };
    // fetchProducts();
  }, [dispatch, activeTabName]); // dispatch 함수나 선택된 카테고리 이름이 변경될 때마다 이 안의 코드가 재실행됨

  return ( // 실제 브라우저 화면에 그려질 HTML(JSX) 구조 시작
    <div className="bg-white"> {/* 전체 배경색을 흰색으로 설정 */}
      <main className="max-w-7xl mx-auto px-4 py-6"> {/* 최대 너비를 제한하고 가운데 정렬하며 위아래 안쪽 여백 설정 */}
        {/* 상단 카테고리 탭 영역: 가로로 나열하고 넘치면 스크롤 가능하게 설정 */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) => ( // 카테고리 배열을 하나씩 돌면서 버튼(탭)을 생성
            <button
              key={cat.categoryId} // 리액트가 목록을 식별할 수 있게 고유한 번호(ID)를 키값으로 설정
              onClick={() => dispatch(setCategory(cat.name))} // 버튼 클릭 시 리덕스에 해당 카테고리 이름을 현재 카테고리로 바꾸라고 명령
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTabName === cat.name // 현재 선택된 탭 이름과 버튼의 이름이 같으면
                  ? "bg-orange-500 text-white shadow-md" // 주황색 배경에 흰색 글씨, 그림자 효과 적용
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200" // 다르면 연회색 배경에 진회색 글씨 적용
              }`}
            >
              {cat.name} {/* 버튼 안에 카테고리 이름을 표시 */}
            </button>
          ))}
        </div>

        {/* 상품 리스트 영역 시작 */}
        <div className="lg:col-span-3">
          {/* 현재 필터링된 상품이 총 몇 건인지 표시 */}
          <p className="text-sm text-gray-500 font-semibold mb-6">총 {products.length}건</p>
          {/* 상품들을 그리드(격자) 형태로 배치: 모바일 2열, 중간 이상 화면 3열 설정 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.length > 0 ? ( // 상품이 하나라도 있으면 목록을 보여줌
              products.map((product) => ( // 상품 목록 배열을 하나씩 돌면서 카드 형태의 UI 생성
                <div
                  key={product.productId} // 리액트 식별용 고유 상품 ID 설정
                  onClick={() => navigate(`/trade/${product.productId}`)} // 카드 클릭 시 해당 상품의 상세 페이지 주소로 이동
                  className="group cursor-pointer" // 마우스 올리면 효과를 주기 위한 그룹 설정 및 커서 모양 변경
                >
                  {/* 상품 이미지 영역: 정사각형 비율 유지 및 넘치는 부분 숨김 */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={product.thumbnailUrl || "https://via.placeholder.com/400"} // 이미지 주소가 없으면 기본 이미지 표시
                      alt={product.title} // 이미지 설명 설정
                      className="w-full h-full object-cover group-hover:scale-105 transition-all" // 이미지를 꽉 채우고 마우스 올리면 살짝 커지는 효과
                    />
                  </div>
                  {/* 상품 정보 텍스트 영역: 위아래 간격 설정 */}
                  <div className="space-y-1">
                    {/* 상품 제목: 글자가 길어지면 두 줄까지만 보여주고 생략 기호(...) 처리 */}
                    <h3 className="text-[15px] font-medium text-gray-900 line-clamp-2 leading-snug">{product.title}</h3>
                    {/* 상품 동네 위치와 올린 시간 표시 */}
                    <p className="text-xs text-gray-500">{product.locationName} • {product.createdAt}</p>
                    {/* 상품 가격 표시: 숫자를 원화 세 자릿수 쉼표(,) 형식으로 변환하여 표시 */}
                    <p className="font-bold text-lg text-gray-900">{Number(product.price || 0).toLocaleString()}원</p>
                  </div>
                </div>
              ))
            ) : ( // 보여줄 상품이 하나도 없을 때 표시할 화면
              <div className="col-span-full py-20 text-center text-gray-400">등록된 상품이 없습니다.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}