"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Review {
  name: string;
  message: string;
  date: string;
}

export default function ReviewsPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function fetchReviews() {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (Array.isArray(data)) {
        setReviews(data);
      }
    } catch (err) {
      console.error("Не удалось загрузить отзывы:", err);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          message, 
          date: new Date().toLocaleDateString('ru-RU') 
        }),
      });

      if (res.ok) {
        setName("");
        setMessage("");
        await fetchReviews(); 
        alert("Отзыв успешно отправлен!");
      } else {
        alert("Ошибка при сохранении отзыва в базе данных");
      }
    } catch (err) {
      console.error("Не удалось отправить отзыв:", err);
      alert("Критическая ошибка сети");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen text-white font-sans relative selection:bg-purple-500/30 overflow-x-hidden bg-[#04000e]">

      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[100vw] sm:w-[70vw] h-[70vh] bg-blue-700/40 rounded-full blur-[100px] md:blur-[120px] mix-blend-screen" />
        <div className="absolute top-[10%] right-[-10%] w-[100vw] sm:w-[60vw] h-[60vh] bg-yellow-500/20 rounded-full blur-[100px] md:blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[10%] w-[100vw] sm:w-[80vw] h-[70vh] bg-pink-600/30 rounded-full blur-[100px] md:blur-[120px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-full max-w-3xl px-4 py-16 sm:py-24">

          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white/60 hover:text-purple-400 hover:drop-shadow-[0_0_6px_#b026ff] transition-all cursor-pointer group"
            >
              <span className="transition-transform group-hover:-translate-x-1 duration-300">←</span> 
              Вернуться назад
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-center text-white mb-10 sm:mb-14 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            ОТЗЫВЫ
          </h1>

          <form onSubmit={handleSubmit} className="relative flex flex-col gap-5 mb-16 bg-[#0b0518]/60 backdrop-blur-md p-6 sm:p-8 rounded-[24px] border border-white/5 shadow-xl">
            <input 
              type="text"
              placeholder="Введите имя" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              disabled={isSubmitting}
              className="bg-[#04000e]/60 border border-white/5 p-4 rounded-xl text-white font-medium placeholder-white/30 focus:outline-none focus:border-purple-500/40 transition duration-300 disabled:opacity-50" 
            />
            <textarea 
              placeholder="ВАШ ОТЗЫВ О СИМУЛЯЦИИ..." 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              required 
              disabled={isSubmitting}
              className="bg-[#04000e]/60 border border-white/5 p-4 rounded-xl text-white font-medium placeholder-white/30 h-36 resize-none focus:outline-none focus:border-purple-500/40 transition duration-300 disabled:opacity-50" 
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 text-white p-4 mt-2 rounded-xl font-black tracking-widest uppercase transition-all duration-300 active:scale-[0.99] disabled:opacity-50 shadow-[0_0_20px_rgba(176,38,255,0.3)] hover:shadow-[0_0_30px_rgba(176,38,255,0.6)] cursor-pointer"
            >
              {isSubmitting ? "СИНХРОНИЗАЦИЯ..." : "ОПУБЛИКОВАТЬ ОТЗЫВ"}
            </button>
          </form>

          <div className="flex flex-col gap-5">
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-white/40 mb-2 px-1">
              НАШИ ОТЗЫВЫ ({reviews.length})
            </h2>

            {reviews.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-[24px] bg-[#0b0518]/20 backdrop-blur-sm">
                <p className="text-white/40 text-sm font-medium"></p>
              </div>
            ) : (
              reviews.map((r, i) => (
                <div key={i} className="p-6 border border-white/5 bg-[#0b0518]/40 backdrop-blur-sm rounded-[24px] hover:border-purple-500/20 transition duration-300 shadow-md group">
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors tracking-wide text-base sm:text-lg">
                      {r.name}
                    </h3>
                    <span className="text-[10px] font-mono text-white/40 bg-[#04000e]/50 px-2.5 py-1 rounded-md border border-white/5 shrink-0">
                      {r.date}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line break-words">
                    {r.message}
                  </p>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
