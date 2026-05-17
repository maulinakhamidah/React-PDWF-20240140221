import React, { useState, useEffect } from 'react';

export default function App() {
  // Data produk dengan rating dan diskon tambahan
  const [products] = useState([
    { id: 1, name: "MacBook Pro M2", price: 21000000, category: "Laptop", rating: 4.9, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=500" },
    { id: 2, name: "iPhone 15 Pro", price: 18500000, category: "Smartphone", rating: 4.8, image: "https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&q=80&w=500" },
    { id: 3, name: "Sony WH-1000XM5", price: 4500000, category: "Accessories", rating: 5.0, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=500" },
    { id: 4, name: "Logitech MX Master 3", price: 1200000, category: "Accessories", rating: 4.7, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=500" },
    { id: 5, name: "iPad Air Gen 5", price: 10500000, category: "Tablet", rating: 4.8, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=500" },
    { id: 6, name: "Keychron K2 V2", price: 1500000, category: "Accessories", rating: 4.9, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=500" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efek Navbar saat di-scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = products.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatIDR = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-700">
      
      {/* --- PRE-NAVBAR PROMO --- */}
      <div className="bg-slate-900 text-white text-[11px] py-2 px-6 flex justify-center items-center gap-4 uppercase tracking-[0.2em] font-bold">
        <span>Gratis Ongkir Seluruh Indonesia</span>
        <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
        <span>Cicilan 0% Hingga 12 Bulan</span>
      </div>

      {/* --- PREMIUM NAVBAR --- */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 px-6 md:px-12 py-4 ${
        isScrolled ? "bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <div className="w-11 h-11 bg-slate-900 rounded-2xl rotate-3 group-hover:rotate-12 transition-transform duration-500"></div>
              <div className="absolute inset-0 w-11 h-11 bg-blue-600 rounded-2xl -rotate-3 group-hover:-rotate-12 transition-transform duration-500 flex items-center justify-center border-2 border-white">
                <span className="text-white font-black text-lg tracking-tighter italic">T</span>
              </div>
            </div>
            <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">TechStore.</h1>
          </div>
          
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/60">
            {['Home', 'Products', 'Deals', 'Support'].map((menu) => (
              <a key={menu} href="#" className="px-5 py-2 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-900 hover:bg-white transition-all">
                {menu}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-8">
             <div className="relative hidden md:block">
               <input 
                type="text"
                placeholder="Search..."
                className="bg-slate-100/80 border-none rounded-2xl py-2.5 pl-11 pr-4 w-44 focus:w-64 transition-all duration-500 outline-none text-sm font-medium focus:ring-2 focus:ring-blue-500/20 shadow-inner"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-4 h-4 absolute left-4 top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2.5 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 transition-colors group shadow-sm">
                <svg className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-lg">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-12 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-left space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-2xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-blue-700 font-bold text-xs uppercase tracking-widest">New Arrivals May 2026</span>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter">
              Bolder. <br/> Better. <br/> 
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">Techified.</span>
            </h2>
            
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
              Experience the next generation of personal computing. Minimalist design meets maximum performance.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black hover:bg-blue-600 transition-all hover:shadow-2xl hover:shadow-blue-200 active:scale-95">
                Shop Collection
              </button>
              <button className="bg-white border-2 border-slate-200 px-10 py-5 rounded-[2rem] font-bold hover:border-slate-900 transition-all">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative group hidden lg:block">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                alt="Hero Gadget"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </header>

      {/* --- PRODUCT GRID --- */}
      <main className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-blue-600"></div>
              <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">Curated</span>
            </div>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Essential Tech.</h3>
          </div>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            {['All', 'Laptop', 'Phone', 'Audio'].map(cat => (
              <button key={cat} className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${cat === 'All' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-[2.5rem] p-6 border border-slate-100 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] transition-all duration-700">
              <div className="relative h-[320px] w-full mb-8 overflow-hidden rounded-[2rem] bg-slate-50">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-5 left-5">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-sm">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-5 right-5 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl">
                  <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <span className="text-white text-[11px] font-bold">{item.rating}</span>
                </div>
              </div>
              
              <div className="space-y-4 px-2">
                <div className="flex justify-between items-start">
                  <h4 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-none">{item.name}</h4>
                </div>
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest leading-none">Best Seller</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-2xl font-black text-slate-900">{formatIDR(item.price)}</span>
                  <button 
                    onClick={() => setCartCount(prev => prev + 1)}
                    className="bg-slate-100 p-4 rounded-2xl text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 active:scale-90 group-hover:rotate-6"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-6">
              <h4 className="text-3xl font-black italic tracking-tighter">TechStore.</h4>
              <p className="text-slate-400 font-medium leading-relaxed">Defining the future of digital retail through innovation and quality.</p>
            </div>
            <div>
              <h5 className="font-black uppercase text-xs tracking-[0.3em] mb-8 text-blue-500">Links</h5>
              <ul className="space-y-4 text-slate-300 font-bold text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Latest Release</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Career</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="lg:col-span-2 space-y-8">
               <h5 className="font-black uppercase text-xs tracking-[0.3em] text-blue-500">Connect With Us</h5>
               <div className="flex gap-4">
                 {['Instagram', 'Twitter', 'Dribbble'].map(social => (
                   <a key={social} href="#" className="px-6 py-3 border border-slate-800 rounded-2xl font-bold text-sm hover:bg-white hover:text-slate-900 transition-all">{social}</a>
                 ))}
               </div>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <p>© 2026 Maulina Khamidah - UMY IT Student</p>
            <div className="flex gap-8">
              <span>Made with ❤️ and React</span>
              <span>Yogyakarta, ID</span>
            </div>
          </div>
        </div>
      </footer>

      {/* --- FLOATING ACTION BUTTON --- */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 text-white rounded-3xl shadow-2xl shadow-blue-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[100] group">
        <svg className="w-8 h-8 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
      </button>

      {/* --- CUSTOM CSS ANIMATIONS --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}} />

    </div>
  );
}