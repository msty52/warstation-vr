"use client";
import { useState, useEffect } from "react";
import { gamesData } from "@/data/games";
import { useRouter } from "next/navigation";
import Image from "next/image"; 
import Script from "next/script"; 
import { YMaps, Map, Placemark, ZoomControl } from "@pbe/react-yandex-maps";

export default function Home() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const mapCenter = [47.310535, 39.803793]; 

  const initMyReviewsWidget = () => {
    if (typeof window !== "undefined" && (window as any).myReviews?.BlockWidget) {
      try {
        new (window as any).myReviews.BlockWidget({
          uuid: "3ac6368e-7900-4257-bf31-ce6a0577057f",
          name: "g2107361",
          additionalFrame: "none",
          lang: "ru",
          widgetId: "1"
        }).init();
      } catch (error) {
        console.error("Ошибка инициализации виджета отзывов:", error);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    initMyReviewsWidget();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const formatVideoUrl = (url: string) => {
    if (!url) return "";

    if (url.includes("vk.com/video") || url.includes("vkvideo.ru")) {
      if (url.includes("video_ext.php")) return url;
      const match = url.match(/(?:video|clip)(-?\d+)_(\d+)/);
      if (match) return `https://vk.com/video_ext.php?oid=${match[1]}&id=${match[2]}&autoplay=1`;
    }

    return url; 
  };

  const arenaVideos = [
    { id: 1, title: "Игровой процесс VR", src: "/IMG_5712.MP4", poster: "" },
    { id: 2, title: "Презентация Арены", src: "/IMG_5856.mp4", poster: "" },
    { id: 3, title: "Динамичные Сражения", src: "/IMG_6206.mp4", poster: "" },
    { id: 4, title: "Обзор Локации", src: "/IMG_6207.MP4", poster: "" },
  ];

  return (
    <main className="min-h-screen text-white font-sans relative selection:bg-purple-500/30 overflow-x-hidden bg-[#04000e]">

      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[100vw] sm:w-[70vw] h-[70vh] bg-blue-700/40 rounded-full blur-[100px] md:blur-[120px] mix-blend-screen" />
        <div className="absolute top-[10%] right-[-10%] w-[100vw] sm:w-[60vw] h-[60vh] bg-yellow-500/20 rounded-full blur-[100px] md:blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[10%] w-[100vw] sm:w-[80vw] h-[70vh] bg-pink-600/30 rounded-full blur-[100px] md:blur-[120px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10">

        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#03000a]/85 backdrop-blur-md border-b border-purple-500/10 py-3 sm:py-4 shadow-[0_4px_30px_rgba(176,38,255,0.03)]" : "bg-transparent py-4 sm:py-6"
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">

            <button 
              onClick={() => scrollToSection('top')} 
              className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:text-purple-400 transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] cursor-pointer group"
            >
              <svg 
                viewBox="0 0 644 556" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-auto sm:h-6 transition-transform duration-300 group-hover:scale-105"
              >
                <path d="M322.016 0V194.154L271.274 223.354L219.403 253.207V177.158L322.016 0Z" fill="currentColor"/>
                <path opacity="0.95" d="M424.638 177.194V253.207L372.731 223.354L322.025 194.154V0L424.638 177.194Z" fill="currentColor"/>
                <path opacity="0.8" d="M271.266 517.97L219.395 547.86L205.225 555.995H0V555.958L168.653 458.918L219.395 488.117L271.266 517.97Z" fill="currentColor"/>
                <path d="M168.653 340.854V458.959L0 556L102.612 378.842L116.782 370.707L168.653 340.854Z" fill="currentColor"/>
                <path opacity="0.8" d="M643.959 555.958V555.995H438.734L424.601 547.86L372.693 517.97L424.601 488.117L475.306 458.918L643.959 555.958Z" fill="currentColor"/>
                <path opacity="0.95" d="M644 556L475.347 458.959V340.854L527.218 370.707L541.387 378.842L644 556Z" fill="currentColor"/>
                <path d="M219.579 429.391L322.017 370.82V253.723L219.579 312.294V429.391Z" fill="currentColor"/>
                <path opacity="0.8" d="M403.376 418.29L321.964 371.404L219.388 430.493L322 489.545L424.613 430.493L403.376 418.29Z" fill="currentColor"/>
                <path opacity="0.95" d="M321.999 253.298L321.963 371.403L424.612 430.492V312.35L321.999 253.298Z" fill="currentColor"/>
              </svg>
              <span>Warstation</span>
            </button>
            
            <div className="flex flex-wrap justify-end gap-x-2.5 gap-y-1 sm:gap-8 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em]">
              <button onClick={() => scrollToSection('gallery-section')} className="hover:text-purple-400 hover:drop-shadow-[0_0_6px_#b026ff] transition-all cursor-pointer">
                <span className="md:hidden">Локация</span>
                <span className="hidden md:inline">Локация и геймплей</span>
              </button>
              <button onClick={() => scrollToSection('games-section')} className="hover:text-purple-400 hover:drop-shadow-[0_0_6px_#b026ff] transition-all cursor-pointer">Игры</button>
              <button onClick={() => scrollToSection('pricing-section')} className="hover:text-purple-400 hover:drop-shadow-[0_0_6px_#b026ff] transition-all cursor-pointer">Тарифы</button>
              <button onClick={() => scrollToSection('reviews-section')} className="hover:text-purple-400 hover:drop-shadow-[0_0_6px_#b026ff] transition-all cursor-pointer">Отзывы</button>
              <button onClick={() => scrollToSection('about-heading-section')} className="hover:text-purple-400 hover:drop-shadow-[0_0_6px_#b026ff] transition-all cursor-pointer">О нас</button>
            </div>
          </div>
        </nav>

        <section className="pt-32 sm:pt-40 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 text-center">

          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 order-2 lg:order-1 w-full max-w-[340px] sm:max-w-[380px]">
            <div className="relative group w-full p-2">
              <div className="absolute inset-0 border-2 border-blue-500/30 -skew-x-12 translate-x-4 -translate-y-3 pointer-events-none transition-all duration-500 group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:translate-x-2" />
              
              <div className="relative z-10 p-4 rounded-xl bg-[#080914]/90 border border-blue-500/20 backdrop-blur-sm shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                <Image 
                  src="/characters-left.jpg" 
                  alt="Сражающиеся персонажи команды синих" 
                  width={400} 
                  height={500} 
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center order-1 lg:order-2 z-10 px-4 shrink-0">
            <div className="relative group mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <img 
                src="/favicon.ico" 
                alt="Warstation VR Logo" 
                className="relative h-28 sm:h-32 md:h-36 w-auto rounded-3xl shadow-[0_0_50px_rgba(176,38,255,0.25)] border border-purple-500/20" 
              />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-[0_2px_10px_rgba(168,85,247,0.3)]">
              WARSTATION VR
            </h1>
            <p className="mt-2 text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">
              Арена виртуальной реальности
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-4 order-3 w-full max-w-[340px] sm:max-w-[380px]">
            <div className="relative group w-full p-2">
              <div className="absolute inset-0 border-2 border-red-500/30 skew-x-12 -translate-x-4 -translate-y-3 pointer-events-none transition-all duration-500 group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] group-hover:-translate-x-2" />
              
              <div className="relative z-10 p-4 rounded-xl bg-[#1a0f05]/90 border border-red-600/20 backdrop-blur-sm shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                <Image 
                  src="/characters-right.jpg" 
                  alt="Сражающиеся персонажи команды красных" 
                  width={400} 
                  height={500} 
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  priority
                />
              </div>
            </div>
          </div>

        </section>

        <section id="gallery-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-8 sm:mb-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Локация и геймплей
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {arenaVideos.map((video) => (
              <div 
                key={video.id} 
                onClick={() => setActiveVideo(video.src)}
                className="bg-[#0b0518]/40 border border-white/5 rounded-2xl overflow-hidden flex flex-col group relative backdrop-blur-sm cursor-pointer"
              >
                <div className="relative aspect-video lg:aspect-[9/16] w-full bg-purple-950/20 overflow-hidden">
                  <video 
                    src={`${video.src}#t=0.001`}
                    poster={video.poster ? video.poster : undefined}
                    muted 
                    loop 
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0; }}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/30 md:bg-black/40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-600/90 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_#b026ff] group-hover:scale-105 transition-transform">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent sm:border-t-[8px] sm:border-l-[14px] sm:border-b-[8px] ml-1"></div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 bg-gradient-to-t from-[#04000e] via-[#04000e]/70 to-transparent pointer-events-none z-20">
                    <h3 className="text-[11px] sm:text-[13px] md:text-sm font-black uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] text-center">
                      {video.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="games-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 scroll-mt-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white text-center mb-8 sm:mb-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Наши Игры
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {gamesData.map((game: any) => (
              <div key={game.id} className="group flex flex-col bg-[#0b0518]/60 backdrop-blur-md rounded-[24px] border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/20 shadow-lg">
                <div className="relative aspect-video overflow-hidden bg-purple-950/10">
                  <img src={game.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={game.title}/>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => setActiveVideo(game.videoUrl)} className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-[0_0_20px_#b026ff] transform scale-95 hover:scale-105 transition-all cursor-pointer">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent sm:border-t-[8px] sm:border-l-[14px] sm:border-b-[8px] ml-1"></div>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col flex-grow items-start p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide mb-2 sm:mb-3 text-white">{game.title}</h3>
                  <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3 font-light">{game.description}</p>
                  <button onClick={() => router.push(`/games/${game.id}`)} className="mt-auto inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-2 sm:py-3 bg-purple-500/5 hover:bg-purple-500/10 rounded-xl transition-all border border-purple-500/20 group/btn cursor-pointer">
                    <span className="text-purple-400 font-bold text-xs sm:text-[14px] uppercase tracking-wider">Подробнее</span>
                    <span className="text-purple-400 text-lg sm:text-xl transition-transform group-hover/btn:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing-section" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20 scroll-mt-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white text-center mb-10 sm:mb-16 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            ТАРИФЫ
          </h2>

          <div className="space-y-6 sm:space-y-8">
            <div className="relative bg-transparent backdrop-blur-xl rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 md:p-12 border border-[#00d2ff]/30 shadow-[0_0_40px_rgba(0,210,255,0.1)]">
              <h3 className="text-xl sm:text-2xl font-black uppercase italic text-white mb-6 sm:mb-10 flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00d2ff]/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#00d2ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span>Программа - 2 ч 45 мин</span>
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                {[
                  { day: "ПН-ЧТ", time: "10-13", type:"ТАРИФ РАННИЙ БУДНИЙ", price: "15.000", color: "#00d2ff" },
                  { day: "ПН-ЧТ", time: "13-22", type:"ТАРИФ СТАНДАРТ БУДНИЙ", price: "20.000", color: "#00d2ff" },
                  { day: "ПТ-ВС", time: "10-13", type:"ТАРИФ РАННИЙ ВЫХОДНЫЕ", price: "20.000", color: "#ff004c" },
                  { day: "ПТ-ВС", time: "13-22", type:"ТАРИФ СТАНДАРТ ВЫХОДНЫЕ", price: "25.000", color: "#ff004c" },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 sm:gap-4 border-b border-white/5 pb-4 last:border-0 group">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="text-lg sm:text-xl font-black italic min-w-[70px] sm:min-w-[100px]" style={{ color: item.color }}>{item.day}</span>
                      <span className="text-white font-black text-lg sm:text-xl italic">{item.time}</span>
                    </div>
                    <div className="hidden lg:block h-6 w-[2px] bg-white/10 mx-4"></div>
                    <div className="flex-grow text-white/40 text-[10px] sm:text-sm font-bold tracking-widest uppercase">{item.type}</div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-xl sm:text-2xl font-black italic" style={{ color: item.color }}>{item.price}</span>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase mt-1 opacity-50">РУБ</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative bg-[#eab308]/5 backdrop-blur-xl rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 border-2 border-[#eab308]/40 shadow-[0_0_30px_rgba(234,179,8,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 group hover:scale-[1.01] transition-transform duration-300">
              <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-col sm:flex-row w-full md:w-auto">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#eab308]/20 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.3)] shrink-0">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#eab308]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase italic text-[#eab308]">ТАРИФ СТАНДАРТ +</h3>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 sm:items-center mt-1">
                    <span className="text-white font-bold italic text-sm sm:text-base">3 Ч 45 МИН</span>
                    <span className="text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-widest"> В ЛЮБОЙ ДЕНЬ НЕДЕЛИ</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 mt-2 md:mt-0">
                <span className="text-2xl sm:text-3xl font-black italic text-[#eab308]">+ 5.000</span>
                <span className="text-[10px] sm:text-xs font-bold uppercase text-[#eab308] opacity-60">РУБ</span>
              </div>
            </div>

            <div className="relative bg-transparent backdrop-blur-xl rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 md:p-10 border border-[#ff004c]/30 shadow-[0_0_40px_rgba(255,0,76,0.05)]">
              <h3 className="text-xl sm:text-2xl font-black uppercase italic text-white mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#ff004c]/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff004c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <span>Игровая компания (до 10 чел.)</span>
              </h3>
              
              <div className="grid gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 group hover:bg-[#00d2ff]/5 hover:border-[#00d2ff]/20 transition-all duration-300 gap-2 sm:gap-0">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-[#00d2ff] font-black italic text-lg sm:text-xl">ПН-ВС</span>
                    <span className="text-white/30 text-[10px] sm:text-xs font-bold tracking-widest uppercase">ОТ 6 ДО 10 ЧЕЛОВЕК</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-black italic text-[#00d2ff]">6.000</span>
                    <span className="text-[9px] sm:text-[10px] font-bold opacity-40 uppercase">РУБ В ЧАС</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 group hover:bg-[#ff004c]/5 hover:border-[#ff004c]/20 transition-all duration-300 gap-2 sm:gap-0">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-[#ff004c] font-black italic text-lg sm:text-xl">ПН-ВС</span>
                    <span className="text-white/30 text-[10px] sm:text-xs font-bold tracking-widest uppercase">ОТ 1 ДО 5 ЧЕЛОВЕК</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-black italic text-[#ff004c]">1.000</span>
                    <span className="text-[9px] sm:text-[10px] font-bold opacity-40 uppercase">РУБ В ЧАС</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews-section" className="pt-12 pb-8 scroll-mt-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tight text-white text-center drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-8">
            ОТЗЫВЫ С ЯНДЕКС КАРТ
          </h2>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 relative z-10">
            <div className="relative rounded-[24px] border border-purple-500/20 bg-[#111115] p-1 shadow-[0_0_40px_rgba(176,38,255,0.15)] overflow-visible">
              
              <div className="w-full min-h-[450px] h-auto rounded-2xl bg-[#111115] overflow-visible relative flex justify-center items-start">
                <iframe 
                  title="Виджет с отзывами «Карусель» от MyReviews" 
                  className="w-full min-h-[480px] h-auto max-w-[1170px] border-0 outline-none p-0 m-0" 
                  id="myReviews__block-widget"
                />
              </div>

            </div>

            <Script 
              src="https://myreviews.dev/widget/dist/blockWidget.js"
              strategy="afterInteractive"
              onReady={initMyReviewsWidget}
            />
          </div>
        </section>

<div className="max-w-4xl mx-auto mb-20 px-4 relative z-20">
  <div className="relative group p-[1px] rounded-3xl bg-gradient-to-r from-[#00d2ff]/40 via-[#b026ff]/30 to-[#ff004c]/40 shadow-[0_0_30px_rgba(176,38,255,0.1)] transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,210,255,0.2)]">
    <div className="bg-[#0b0518]/70 backdrop-blur-xl rounded-[23px] py-8 px-6 sm:px-10 text-center border border-white/5">
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-white/90 leading-relaxed">
        При подписке на все наши соцсети и написании отзыва - <br className="hidden sm:inline" />
        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] via-[#b026ff] to-[#ff004c] text-2xl sm:text-3xl md:text-4xl drop-shadow-[0_0_20px_rgba(176,38,255,0.6)] ml-1 italic tracking-wide inline-block mt-3 uppercase">
          скидка 500 руб
        </span>
      </p>
    </div>
  </div>
</div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-center w-full">
            
            <div className="flex flex-col justify-center items-start lg:pl-8 text-center sm:text-left w-full">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tight mb-3 sm:mb-4 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] w-full sm:w-auto">Наши контакты</h2>
              <p className="text-lg sm:text-xl md:text-2xl font-bold italic text-white/90 mb-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] w-full sm:w-auto">г.Ростов-на-Дону, ул. Версальская 4</p>
              <p className="mb-8 sm:mb-10 w-full sm:w-auto">
                <a 
                  href="tel:+79286255020" 
                  className="text-2xl sm:text-3xl md:text-4xl font-black italic text-[#b026ff] drop-shadow-[0_0_8px_rgba(176,38,255,0.4)] hover:text-[#ff00ea] hover:drop-shadow-[0_0_12px_rgba(255,0,234,0.6)] transition-all inline-block duration-300 cursor-pointer"
                >
                  +7 (928) 625-50-20
                </a>
              </p>

              <div className="flex gap-3 sm:gap-4 flex-wrap justify-center sm:justify-start w-full sm:w-auto">
                <a href="https://t.me/warstationrnd" target="_blank" rel="noopener noreferrer" className="px-4 sm:px-6 py-2 sm:py-3 bg-[#0b0518]/80 hover:bg-white/5 border border-[#00d2ff]/30 rounded-xl transition-all duration-300 group flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#00d2ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/70">TELEGRAM</span>
                </a>

                <a href="https://www.instagram.com/warstation.rnd" target="_blank" rel="noopener noreferrer" className="px-4 sm:px-6 py-2 sm:py-3 bg-[#0b0518]/80 hover:bg-white/5 border border-[#ff004c]/30 rounded-xl transition-all duration-300 group flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff004c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/70">INSTAGRAM</span>
                </a>

                <a href="https://max.ru/join/1qVPVBcfyyEzcwxLXVyNWDeDrVGxEWWdEJJ-fhjBiWs" target="_blank" rel="noopener noreferrer" className="px-4 sm:px-6 py-2 sm:py-3 bg-[#0b0518]/80 hover:bg-white/5 border border-[#00ff88]/30 rounded-xl transition-all duration-300 group flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#00ff88]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 22h4l2-4h8l2 4h4L12 2zM12 6L9 14h6L12 6z" />
                  </svg>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/70">MAX</span>
                </a>
              </div>
            </div>
            
            <div className="flex flex-col items-center lg:items-end w-full mt-8 lg:mt-0">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase italic mb-4 sm:mb-6 text-white text-center w-full">МЫ НАХОДИМСЯ ЗДЕСЬ</h3>
              <div className="h-[250px] sm:h-[350px] lg:h-[400px] w-full rounded-[24px] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] bg-[#0b0518]">
                <YMaps query={{ lang: 'ru_RU' }}>
                  <Map defaultState={{ center: mapCenter, zoom: 16 }} width="100%" height="100%">
                    <Placemark 
                      geometry={mapCenter} 
                      options={{ 
                        preset: 'islands#yellowDotIconWithCaption', 
                        iconColor: '#eab308' 
                      }} 
                    />
                    <ZoomControl options={{ position: { right: 12, top: 12 } }} />
                  </Map>
                </YMaps>
              </div>
            </div>

          </div>
        </section>

        <footer className="py-6 border-t border-white/5 text-center relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">© 2026 WARSTATION</p>
        </footer>

      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#03000a]/60 backdrop-blur-2xl transition-all duration-500" onClick={() => setActiveVideo(null)}></div>
          
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(176,38,255,0.25)] bg-black/90">
            {activeVideo.includes('vk.com') || activeVideo.includes('vkvideo.ru') || activeVideo.includes('video_ext.php') ? (
              <iframe 
                src={formatVideoUrl(activeVideo)} 
                className="w-full h-full border-0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            ) : (
              <video src={activeVideo} controls autoPlay playsInline className="w-full h-full object-contain" />
            )}
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/10 hover:bg-white/20 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors font-bold cursor-pointer z-10"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
