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
    { label: "ПН-ЧТ", time: "10-13", price: "15.000", color: "text-[#00d2ff]" },
    { label: "ПН-ЧТ", time: "13-22", price: "20.000", color: "text-[#00d2ff]" },
    { label: "ПТ-ВС", time: "10-13", price: "20.000", color: "text-[#ff004c]" },
    { label: "ПТ-ВС", time: "13-22", price: "25.000", color: "text-[#ff004c]" },
  ];

  return (
    <main className="min-h-screen bg-[#050208] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#050208]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ff004c]/10 blur-[120px] rounded-full"></div>

        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #4f4f4f 1px, transparent 1px), linear-gradient(to bottom, #4f4f4f 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#050208]/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-sm font-black uppercase tracking-[0.3em]">
            Warstation <span className="text-[#ff004c]">VR</span>
          </div>
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
            <button onClick={() => scrollToSection('games-section')} className="hover:text-[#ff004c] transition-colors">Игры</button>
            <button onClick={() => scrollToSection('pricing-section')} className="hover:text-[#ff004c] transition-colors">Тарифы</button>
            <button onClick={() => scrollToSection('footer-contact')} className="hover:text-[#ff004c] transition-colors">Контакты</button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-16 flex flex-col items-center px-6 text-center">
        <img src="/logo.jpg" alt="Logo" className="h-32 md:h-40 w-auto rounded-3xl mb-10 shadow-[0_0_50px_rgba(139,92,246,0.3)] border border-purple-500/20" />
        <p className="max-w-2xl text-lg md:text-xl font-medium leading-relaxed text-white/80 italic">
          VR-арена — место, где оживают любые праздники и мероприятия. День рождения, корпоратив, выпускной или просто встреча с друзьями — мы превращаем это в игру, где каждый становится героем.
        </p>
      </section>

      <section id="pricing-section" className="max-w-5xl mx-auto px-6 py-20">
        <div className="space-y-10">

          <div className="relative p-[2px] rounded-[20px] overflow-hidden group">

            <div className="absolute inset-0 bg-[#00d2ff] opacity-50"></div>
            <div className="relative bg-[#0a0a0f] rounded-[18px] p-8 border border-[#00d2ff]/30 shadow-[inset_0_0_20px_rgba(0,210,255,0.1)]">
              
              <div className="flex items-center gap-5 mb-8 border-b border-white/5 pb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[#00d2ff] text-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.4)]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Программа — 2 ч 45 мин</h3>
              </div>

              <div className="space-y-4">
                {programPricing.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between group/row">
                    <div className="flex items-center gap-4 min-w-[140px]">
                      <span className={`text-lg font-black italic tracking-tighter ${item.color}`}>{item.label}</span>
                      <span className="text-white font-black text-lg italic">{item.time}</span>
                    </div>
                    <div className="flex-grow mx-6 border-b border-dotted border-white/20 h-2"></div>
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl font-black italic tracking-tighter ${item.color}`}>{item.price}</span>
                      <span className="text-[#00d2ff]/60 text-[10px] font-bold uppercase mt-1">РУБ</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative p-[2px] rounded-[20px] overflow-hidden group">
            <div className="absolute inset-0 bg-[#ff004c] opacity-50"></div>
            <div className="relative bg-[#0a0a0f] rounded-[18px] p-8 border border-[#ff004c]/30 shadow-[inset_0_0_20px_rgba(255,0,76,0.1)]">
              
              <div className="flex items-center gap-5 mb-8 border-b border-white/5 pb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[#ff004c] text-[#ff004c] shadow-[0_0_15px_rgba(255,0,76,0.4)]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Игра компанией</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black italic tracking-tighter text-[#00d2ff]">ПН-ЧТ (ЗА ЧАС)</span>
                  <div className="flex-grow mx-6 border-b border-dotted border-white/20 h-2"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black italic tracking-tighter text-[#00d2ff]">6.000</span>
                    <span className="text-[#00d2ff]/60 text-[10px] font-bold uppercase mt-1">РУБ</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black italic tracking-tighter text-[#ff004c]">ПТ-ВС (ЗА ЧАС)</span>
                  <div className="flex-grow mx-6 border-b border-dotted border-white/20 h-2"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black italic tracking-tighter text-[#ff004c]">8.000</span>
                    <span className="text-[#ff004c]/60 text-[10px] font-bold uppercase mt-1">РУБ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <footer id="footer-contact" className="mt-32 border-t border-purple-500/10 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-6">WARSTATION <span className="text-purple-500">VR</span></h2>
            <div className="space-y-6">
               <p className="text-2xl font-bold italic">Ростов-на-Дону, ул. Версальская, 4</p>
               <p className="text-3xl font-black text-purple-400 italic">+7 (928) 625-50-20</p>
            </div>
          </div>
          <div className="h-[300px] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
            <YMaps query={{ lang: 'ru_RU' }}>
              <Map defaultState={{ center: mapCenter, zoom: 16 }} width="100%" height="100%">
                <Placemark geometry={mapCenter} options={{ preset: 'islands#violetDotIconWithCaption', iconColor: '#8b5cf6' }} />
                <ZoomControl options={{ position: { right: 10, top: 10 } }} />
              </Map>
            </YMaps>
          </div>
        </div>
      </footer>
    </main>
  );
}
