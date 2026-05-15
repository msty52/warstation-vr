"use client";
import { useState, useEffect } from "react";
import { gamesData } from "@/data/games";
import { useRouter } from "next/navigation";
import { YMaps, Map, Placemark, ZoomControl } from "@pbe/react-yandex-maps";

export default function Home() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const mapCenter = [47.310535, 39.803793]; 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const programPricing = [
    { label: "ПН-ЧТ 10-13", price: "15.000", isWeekend: false },
    { label: "ПН-ЧТ 13-22", price: "20.000", isWeekend: false },
    { label: "ПТ-ВС 10-13", price: "20.000", isWeekend: true },
    { label: "ПТ-ВС 13-22", price: "25.000", isWeekend: true },
  ];

  return (
    <main className="min-h-screen bg-[#0a0510] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">

      <div className="cyber-bg-wrapper" style={{ 
        background: 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #050208 100%)' 
      }}>
        <div className="cyber-grid" style={{ opacity: 0.4 }}></div>
      </div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0a0510]/80 backdrop-blur-md border-b border-purple-500/10 py-4" : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-sm font-black uppercase tracking-[0.3em] text-white">
            Warstation <span className="text-[#ff004c]">VR</span>
          </div>
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
            <button onClick={() => scrollToSection('games-section')} className="hover:text-[#ff004c] transition-colors">Игры</button>
            <button onClick={() => scrollToSection('pricing-section')} className="hover:text-[#ff004c] transition-colors">Тарифы</button>
            <button onClick={() => scrollToSection('footer-contact')} className="hover:text-[#ff004c] transition-colors">Контакты</button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-16 flex flex-col items-center px-6">
        <div className="relative group mb-10">
          <img 
            src="/logo.jpg" 
            alt="Warstation Logo" 
            className="h-32 md:h-48 w-auto rounded-[2rem] shadow-[0_0_60px_rgba(139,92,246,0.3)] border border-purple-500/20 transition-transform duration-500 group-hover:scale-105" 
          />
        </div>
        <div className="max-w-3xl text-center">
          <p className="text-lg md:text-xl font-medium leading-relaxed bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            <span className="text-purple-400 font-bold uppercase tracking-widest block mb-2 text-sm">Добро пожаловать</span>
            VR-арена — место, где оживают любые праздники и мероприятия. День рождения, корпоратив, выпускной или просто встреча с друзьями — мы превращаем это в игру, где каждый становится героем.
          </p>
        </div>
      </section>

      <div id="games-section" className="max-w-7xl mx-auto px-6 pt-10 text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
          Наши <span className="text-purple-500">Игры</span>
        </h2>
        <div className="w-20 h-2 bg-purple-600 mt-4 rounded-full mx-auto shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gamesData.map((game: any) => (
            <div key={game.id} className="cyber-card-container group flex flex-col">
              <div className="relative aspect-video rounded-[24px] overflow-hidden mb-6 bg-white/5 border border-white/5">
                <img src={game.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={game.title}/>
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <button onClick={() => setActiveVideo(game.videoUrl)} className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-2xl transform scale-90 hover:scale-100 transition-all duration-300">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                  </button>
                </div>
              </div>
              <div className="flex flex-col flex-grow items-start">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">{game.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed line-clamp-2 mb-8">{game.description}</p>
                <button onClick={() => router.push(`/games/${game.id}`)} className="mt-auto inline-flex items-center gap-3 px-8 py-3 bg-purple-500/5 hover:bg-purple-500/10 rounded-xl transition-all border border-purple-500/20 group/btn">
                  <span className="text-purple-400 font-bold text-[14px] uppercase tracking-wider">Подробнее</span>
                  <span className="text-purple-400 text-xl transition-transform group-hover/btn:translate-x-1">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div id="pricing-section" className="max-w-7xl mx-auto px-6 pt-20 text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
          Наши <span className="text-[#ff004c]">Тарифы</span>
        </h2>
        <div className="w-20 h-2 bg-[#ff004c] mt-4 rounded-full mx-auto mb-16 shadow-[0_0_15px_rgba(255,0,76,0.5)]"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="cyber-price-block program flex flex-col items-start text-left bg-purple-900/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full border border-purple-400/30 flex items-center justify-center text-purple-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-lg font-black uppercase italic text-white tracking-widest">Программа — 2 ч 45 мин</h3>
            </div>
            
            {programPricing.map((item, idx) => (
              <div key={idx} className="price-row w-full">
                <span className={`font-bold italic uppercase text-xs tracking-wider ${item.isWeekend ? 'text-[#ff004c]' : 'text-purple-400'}`}>{item.label}</span>
                <div className="price-line"></div>
                <span className={`price-tag ${item.isWeekend ? 'text-[#ff004c]' : 'text-purple-400'}`}>
                  {item.price} <span className="text-[10px] text-white/30 uppercase ml-1">руб</span>
                </span>
              </div>
            ))}
          </div>

          <div className="cyber-price-block company flex flex-col items-start text-left bg-purple-900/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full border border-[#ff004c]/30 flex items-center justify-center text-[#ff004c]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.75 8a.75.75 0 100-1.5.75.75 0 000 1.5zM7 11.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.5 11.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.5 15a.75.75 0 10-1.5 0 .75.75 0 001.5 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M8.464 8.464a5 5 0 000 7.072m-2.828-9.9a9 9 0 000 12.728"></path></svg>
              </div>
              <h3 className="text-lg font-black uppercase italic text-white tracking-widest">Игра компанией</h3>
            </div>
            
            <div className="price-row w-full">
              <span className="font-bold italic uppercase text-xs text-purple-400 tracking-wider">ПН-ЧТ (ЗА ЧАС)</span>
              <div className="price-line"></div>
              <span className="price-tag text-purple-400">6.000 <span className="text-[10px] text-white/30 uppercase ml-1">руб</span></span>
            </div>
            <div className="price-row w-full">
              <span className="font-bold italic uppercase text-xs text-[#ff004c] tracking-wider">ПТ-ВС (ЗА ЧАС)</span>
              <div className="price-line"></div>
              <span className="price-tag text-[#ff004c]">8.000 <span className="text-[10px] text-white/30 uppercase ml-1">руб</span></span>
            </div>
          </div>
        </div>
      </div>

      <footer id="footer-contact" className="mt-32 border-t border-purple-500/10 bg-[#050208]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-6">
                WARSTATION <span className="text-purple-500">VR КЛУБ</span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-12 max-w-md font-medium">
                Погрузитесь в мир за гранью реальности. Лучшее VR-оборудование Ростова ждет вас для командных сражений и праздников.
              </p>
              <div className="space-y-8">
                <div>
                  <h4 className="text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Локация</h4>
                  <p className="text-2xl font-bold italic tracking-tight">г. Ростов-на-Дону, ул. Версальская, 4</p>
                </div>
                <div>
                  <h4 className="text-[#00d2ff] text-[10px] font-black uppercase tracking-[0.3em] mb-2">Связь</h4>
                  <p className="text-2xl font-bold italic tracking-tight">+7 (928) 625-50-20</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-video rounded-[32px] overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-500/10">
              <YMaps query={{ lang: 'ru_RU' }}>
                <Map 
                  defaultState={{ center: mapCenter, zoom: 16 }} 
                  width="100%" 
                  height="100%"
                >
                  <Placemark 
                    geometry={mapCenter} 
                    properties={{
                      balloonContent: '<strong>Warstation VR</strong><br/>Мы находимся здесь!',
                    }}
                    options={{
                      preset: 'islands#violetDotIconWithCaption',
                      iconColor: '#8b5cf6', 
                    }}
                  />
                  <ZoomControl options={{ position: { right: 10, top: 10 } }} />
                </Map>
              </YMaps>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">© 2026 WARSTATION VR</p>
          </div>
        </div>
      </footer>

      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0a0510]/95 backdrop-blur-md" onClick={() => setActiveVideo(null)}></div>
          <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-purple-500/20 shadow-[0_0_50px_rgba(139,92,246,0.2)]">
            <iframe src={`${activeVideo}&autoplay=1`} className="w-full h-full" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </main>
  );
}
