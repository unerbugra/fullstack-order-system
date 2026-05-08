import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'

interface Product {
  id: number;
  name: string;
  price: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
  <div className="flex w-full min-h-screen bg-gray-50">
    {/* Sol taraf: Sabit Hepsiburada Sidebar */}
    <Sidebar />

    {/* Sağ taraf: Ana İçerik */}
    <div className="flex-1 pl-64 w-full"> 
      <main className="p-10">
        <header className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Dashboard Hoş Geldin, Buğra</h1>
              <p className="text-gray-500 mt-2">İşte bugün mağazanda olup bitenler.</p>
            </div>
            {/* Sağ üst köşeye şık bir buton ekleyelim */}
            <button className="bg-[#ff6000] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#e65600] transition-colors shadow-lg shadow-orange-200">
              + Yeni Ürün Ekle
            </button>
          </div>
        </header>

        {/* İstatistik Kartları (Hızlı Özet) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-sm font-medium">Toplam Ürün</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">{products.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-green-500">
            <p className="text-gray-500 text-sm font-medium">Aktif Satışlar</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">12</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-orange-500">
            <p className="text-gray-500 text-sm font-medium">Bekleyen Sipariş</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">4</h3>
          </div>
        </div>

        {/* Ana Ürün Listesi Tablosu */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Ürün Listesi (Envanter)</h2>
          </div> 
          
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center gap-4">
              <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
              <p className="text-gray-500 font-medium">Veriler yükleniyor...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
              {products.map(product => (
                <div key={product.id} className="group relative bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-2xl hover:border-orange-200 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-2xl">
                      🏷️
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Stokta</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg group-hover:text-[#ff6000] transition-colors">{product.name}</h3>
                  <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-gray-400 text-sm italic">Birim Fiyatı:</span>
                    <span className="text-[#ff6000] font-black text-xl">{product.price} TL</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  </div>
)
}

export default App