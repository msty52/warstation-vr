"use client";
import { useState, useEffect } from "react";
import { gamesData } from "@/data/games";
import { useRouter } from "next/navigation";
import { YMaps, Map, Placemark, ZoomControl } from "@pbe/react-yandex-maps";

export default function Home() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const mapCenter = [47.2435, 39.7850]; 

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
    <main className="min-h-screen bg-[#050508] text-white font-sans selection:bg-rose-500/30 overflow-x-hidden">

      <div className="cyber-bg-wrapper">
        <div className="cyber-grid"></div>
      </div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#050508]/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
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

      <section className="pt-32 pb-10 flex justify-center">
        <div className="relative group">
          <img 
            src="/logo.jpg" 
            alt="Warstation Logo" 
            className="h-32 md:h-48 w-auto rounded-[2rem] shadow-[0_0_50px_rgba(255,0,76,0.2)] border border-white/10 transition-transform duration-500 group-hover:scale-105" 
          />
        </div>
      </section>

      <div id="games-section" className="max-w-7xl mx-auto px-6 pt-10 text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
          Наши <span className="text-[#ff004c]">Игры</span>
        </h2>
        <div className="w-20 h-2 bg-[#ff004c] mt-4 rounded-full mx-auto shadow-[0_0_15px_rgba(255,0,76,0.5)]"></div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gamesData.map((game: any) => (
            <div key={game.id} className="cyber-card-container group flex flex-col">
              <div className="relative aspect-video rounded-[24px] overflow-hidden mb-6 bg-white/5">
                <img src={game.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={game.title}/>
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <button onClick={() => setActiveVideo(game.videoUrl)} className="w-16 h-16 bg-[#ff004c] rounded-full flex items-center justify-center shadow-2xl transform scale-90 hover:scale-100 transition-all duration-300">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                  </button>
                </div>
              </div>
              <div className="flex flex-col flex-grow items-start">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">{game.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed line-clamp-2 mb-8">{game.description}</p>
                <button onClick={() => router.push(`/games/${game.id}`)} className="mt-auto inline-flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 group/btn">
                  <span className="text-[#ff004c] font-bold text-[14px] uppercase tracking-wider">Подробнее</span>
                  <span className="text-[#ff004c] text-xl transition-transform group-hover/btn:translate-x-1">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div id="pricing-section" className="max-w-7xl mx-auto px-6 pt-20 text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
          <span className="text-[#ff004c]">Тарифы</span>
        </h2>
        <div className="w-20 h-2 bg-[#ff004c] mt-4 rounded-full mx-auto mb-12 shadow-[0_0_15px_rgba(255,0,76,0.5)]"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="cyber-price-block program p-10">
            <div className="price-neon-border"></div>
            <h3 className="text-lg font-black uppercase italic text-[#00d2ff] mb-10 tracking-widest">Программа — 2 ч 45 мин</h3>
            {programPricing.map((item, idx) => (
              <div key={idx} className="price-row">
                <span className={`font-bold italic uppercase text-xs ${item.isWeekend ? 'text-[#ff004c]' : 'text-white'}`}>{item.label}</span>
                <div className="price-line"></div>
                <span className={`price-tag ${item.isWeekend ? 'text-[#ff004c]' : 'text-[#00d2ff]'}`}>{item.price} <span className="text-[10px] text-white/30 uppercase">руб</span></span>
              </div>
            ))}
          </div>

          <div className="cyber-price-block company p-10">
            <div className="price-neon-border"></div>
            <h3 className="text-lg font-black uppercase italic text-[#ff004c] mb-10 tracking-widest">Игра компанией</h3>
            <div className="price-row">
              <span className="font-bold italic uppercase text-xs text-[#00d2ff]">ПН-ЧТ (ЗА ЧАС)</span>
              <div className="price-line"></div>
              <span className="price-tag text-[#00d2ff]">6.000 <span className="text-[10px] text-white/30 uppercase">руб</span></span>
            </div>
            <div className="price-row">
              <span className="font-bold italic uppercase text-xs text-[#ff004c]">ПТ-ВС (ЗА ЧАС)</span>
              <div className="price-line"></div>
              <span className="price-tag text-[#ff004c]">8.000 <span className="text-[10px] text-white/30 uppercase">руб</span></span>
            </div>
          </div>
        </div>
      </div>

      <footer id="footer-contact" className="mt-32 border-t border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div>
              <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-6">
                WARSTATION <span className="text-[#ff004c]">VR КЛУБ</span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-12 max-w-md font-medium">
                Погрузитесь в мир за гранью реальности. Лучшее VR-оборудование Ростова ждет вас для командных сражений и незабываемых праздников.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-[#ff004c] text-[10px] font-black uppercase tracking-[0.3em] mb-2">Локация</h4>
                  <p className="text-2xl font-bold italic tracking-tight">г. Ростов-на-Дону, ул. Версальская, 4</p>
                </div>
                <div>
                  <h4 className="text-[#00d2ff] text-[10px] font-black uppercase tracking-[0.3em] mb-2">Связь</h4>
                  <p className="text-2xl font-bold italic tracking-tight">+7 (9XX) XXX-XX-XX</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-video rounded-[32px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <YMaps query={{ lang: 'ru_RU' }}>
                <Map 
                  defaultState={{ center: mapCenter, zoom: 16 }} 
                  width="100%" 
                  height="100%"
                  instanceRef={(ref) => {

                    if (ref) ref.container.parentElement.style.filter = "brightness(0.9) contrast(1.2)";
                  }}
                >
                  <Placemark 
                    geometry={mapCenter} 
                    properties={{
                      balloonContent: '<strong>Warstation VR</strong><br/>Мы находимся здесь!',
                    }}
                    options={{
                      preset: 'islands#redDotIconWithCaption',
                      iconColor: '#ff004c', 
                    }}
                  />
                  <ZoomControl options={{ position: { right: 10, top: 10 } }} />
                </Map>
              </YMaps>

              <div className="absolute top-4 left-4 bg-[#ff004c] px-3 py-1 rounded-full shadow-lg">
                <span className="text-[9px] font-black uppercase tracking-widest text-white">Мы находимся здесь</span>
              </div>
            </div>

          </div>

          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">© 2026 WARSTATION VR</p>
            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-white/40">
              <span className="hover:text-white cursor-pointer transition-colors">VKONTAKTE</span>
              <span className="hover:text-white cursor-pointer transition-colors">TELEGRAM</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Модальное окно видео */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#050508]/95 backdrop-blur-md" onClick={() => setActiveVideo(null)}></div>
          <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe src={`${activeVideo}&autoplay=1`} className="w-full h-full" allow="autoplay; encrypted-media; fullscreen" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </main>
  );
}
