"use client";
import { useParams, useRouter } from "next/navigation";
import { gamesData } from "@/data/games";
import { useEffect, useState } from "react";

export default function GameDetail() {
  const params = useParams();
  const router = useRouter();
  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    const foundGame = gamesData.find((g) => g.id === params.id);
    setGame(foundGame);
  }, [params.id]);

  if (!game) return (
    <div className="min-h-screen bg-[#04000e] flex items-center justify-center font-bold italic text-white/201">
      Загрузка
    </div>
  );

  return (
    <main className="relative min-h-screen bg-[#04000e] text-white font-sans selection:bg-rose-500/30 overflow-x-hidden">

      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vh] bg-blue-700/40 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[10%] right-[-10%] w-[60vw] h-[60vh] bg-yellow-500/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[10%] w-[80vw] h-[70vh] bg-pink-600/30 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10">

        <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-lg border-b border-white/5 py-6">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <button 
              onClick={() => router.push('/')}
              className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-[#ff004c] transition-colors cursor-pointer"
            >
              <span className="text-lg transition-transform group-hover:-translate-x-1">←</span> Назад в меню
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-xl font-black uppercase tracking-tighter italic text-white">
                Warstation VR
              </span>
            </div>
          </div>
        </nav>

        <section className="pt-44 pb-24 px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">

            <div className="relative group">
              <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm">
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white border border-white/10">
                    {game.age}
                  </span>
                  <span className="bg-[#ff004c] px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_15px_rgba(255,0,76,0.4)]">
                    Multiplayer
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.9] text-white">
                  {game.title}
                </h1>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#ff004c]">Данные Игры</h3>
                  <p className="text-xl text-white/50 leading-relaxed font-medium">
                    {game.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 py-10 border-y border-white/5">
                  <div>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Сложность</p>
                    <p className="text-lg font-black italic uppercase text-cyan-400">Средняя</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Тип системы</p>
                    <p className="text-lg font-black italic uppercase text-white">VR System</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {game.videoUrl && (
          <section className="max-w-6xl mx-auto px-6 pb-32">
             <div className="rounded-[50px] overflow-hidden bg-black aspect-video shadow-[0_0_100px_rgba(188,19,254,0.15)] border border-white/10">
               <iframe 
                 src={`${game.videoUrl}${game.videoUrl.includes('?') ? '&' : '?'}autoplay=0`} 
                 className="w-full h-full opacity-80 hover:opacity-100 transition-opacity" 
                 allow="autoplay; encrypted-media; fullscreen" 
                 allowFullScreen
               />
             </div>
          </section>
        )}

        <footer className="py-16 border-t border-white/5 bg-transparent">
           <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
                © 2026 Warstation VR
              </p>
            </div>
        </footer>

      </div>
    </main>
  );
}
