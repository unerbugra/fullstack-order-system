import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock_quantity: string;
}

export default function Products() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/products');
        if (!response.ok) throw new Error('Network response was not ok');
        const json = await response.json();
        setProductList(json);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      {/* Üst Başlık ve İstatistik Özeti */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Tüm Ürünler</h1>
          <p className="text-gray-500 mt-1.5 font-medium">
            Toplam <span className="text-[#ff6000]">{productList.length}</span> adet ürün listeleniyor.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm">
            Dışa Aktar (Excel)
          </button>
          <button className="bg-[#ff6000] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#e65600] transition-all shadow-lg shadow-orange-100">
            + Yeni Ürün
          </button>
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6000]"></div>
        </div>
      ) : (
        /* Ürün Kartları Container */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productList.map((product: Product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-xl hover:border-orange-200 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    📦
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    Number(product.stock_quantity) > 0 
                      ? 'bg-green-50 text-green-600' 
                      : 'bg-red-50 text-red-600'
                  }`}>
                    {Number(product.stock_quantity) > 0 ? 'Stokta' : 'Tükendi'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#ff6000] transition-colors line-clamp-1">
                  {product.name}
                </h3>
                
                <p className="text-gray-400 text-sm mt-2 line-clamp-2 min-h-[40px]">
                  {product.description || 'Açıklama belirtilmemiş.'}
                </p>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Birim Fiyat</p>
                    <p className="text-2xl font-black text-gray-900 leading-none mt-1">
                      {product.price} <span className="text-sm font-bold">TL</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Stok</p>
                    <p className="text-sm font-bold text-gray-700 mt-1">{product.stock_quantity} Adet</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 border-t border-gray-50 pt-4">
                  <button className="text-gray-500 text-sm font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    Düzenle
                  </button>
                  <button className="text-red-500 text-sm font-bold py-2 rounded-lg hover:bg-red-50 transition-colors">
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Eğer ürün yoksa gösterilecek alan */}
      {!loading && productList.length === 0 && (
        <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-100">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800">Henüz ürün eklemedin</h2>
          <p className="text-gray-500 mt-2">Satış yapmaya başlamak için ilk ürününü hemen ekle.</p>
        </div>
      )}
    </main>
  );
}