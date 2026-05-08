import React from 'react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Siparişler', icon: '📦' },
    { name: 'Ürünler', icon: '🏷️' },
    { name: 'Müşteriler', icon: '👥' },
    { name: 'Kampanyalar', icon: '🚀' },
    { name: 'Ayarlar', icon: '⚙️' },
  ];

  return (
<div className="w-64 min-w-[256px] h-screen bg-white text-gray-800 flex flex-col fixed left-0 top-0 border-r border-gray-200 shadow-sm z-50">      <div className="p-6 text-2xl font-black flex items-center gap-2">
        <span className="text-[#ff6000]">hepsi</span>
        <span className="text-gray-900">burada</span>
        <div className="w-2 h-2 bg-[#ff6000] rounded-full mt-2"></div>
      </div>

      <div className="px-6 mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
        Satıcı Paneli
      </div>

      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className="px-6 py-4 flex items-center gap-4 hover:bg-orange-50 hover:text-[#ff6000] cursor-pointer transition-all border-l-4 border-transparent hover:border-[#ff6000] group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="font-semibold text-sm">{item.name}</span>
          </div>
        ))}
      </nav>

      {/* Alt Kısım */}
      <div className="p-6 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-[#ff6000] rounded-full flex items-center justify-center text-white font-bold">
            B
          </div>
          <div className="text-sm">
            <p className="font-bold text-gray-800">Buğra Uner</p>
            <p className="text-xs text-gray-500">Premium Satıcı</p>
          </div>
        </div>
        <p className="text-[10px] text-gray-400">© 2026 Hepsiburada Partner</p>
      </div>
    </div>
  );
};

export default Sidebar;