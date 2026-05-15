"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CyberCard({ game }: any) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-6 transition-all duration-500 hover:border-[#bc13fe]/50 hover:shadow-[0_0_30px_rgba(188,19,254,0.1)] group">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-black italic uppercase text-white group-hover:text-[#bc13fe] transition-colors tracking-tighter">
            {game.name || game.title}
          </h3>
          <span className="text-white/40 font-bold text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-lg italic">
            {game.age}
          </span>
        </div>

        <p className="text-white/40 text-sm mb-6 h-12 line-clamp-2 leading-relaxed">
          {game.shortDesc || game.description}
        </p>

        <div className="relative aspect-video rounded-[30px] overflow-hidden mb-6 border border-white/5 bg-black/40">
          <img 
            src={game.image} 
            alt={game.name} 
            className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <button 
              onClick={() => setIsOpen(true)} 
              className="w-14 h-14 bg-[#bc13fe] rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(188,19,254,0.5)] hover:scale-110 active:scale-95 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>

        <Link 
          href={`/games/${game.id}`} 
          className="inline-flex items-center justify-center w-full py-4 bg-white/5 hover:bg-[#bc13fe]/10 border border-white/10 hover:border-[#bc13fe]/50 rounded-[20px] text-[#bc13fe] font-bold transition-all group/btn"
        >
          Подробнее 
          <span className="ml-2 text-lg transition-transform group-hover/btn:translate-x-1">→</span>
        </Link>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsOpen(false)}></div>
          
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(188,19,254,0.2)]">
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-6 right-6 z-20 w-12 h-12 bg-black/50 hover:bg-[#ff007a] backdrop-blur-md rounded-full text-white flex items-center justify-center transition-colors border border-white/10"
            >
              ✕
            </button>
            
            {game.videoUrl ? (
              <iframe 
                src={`${game.videoUrl}${game.videoUrl.includes('?') ? '&' : '?'}autoplay=1`} 
                className="w-full h-full" 
                allow="autoplay; encrypted-media; fullscreen" 
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/10 uppercase font-black text-2xl tracking-widest">
                Видео недоступно
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
