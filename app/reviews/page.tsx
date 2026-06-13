"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Review {
  name: string;
  message: string;
  rating: number; 
  date: string;
}

export default function ReviewsPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0); 
  const [hoverRating, setHoverRating] = useState(0); 
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function fetchReviews() {
    try {
      const res = await fetch('/api/reviews');
      if (!res.ok) throw new Error("Ошибка сервера");
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
        body: JSON.stringify({ name, message, rating }), 
      });

      if (res.ok) {
        setName("");
        setMessage("");
        setRating(0); 
        await fetchReviews(); 
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(`Ошибка сервера: ${errorData.error || '500'}`);
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка сети");
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

      <div className="relative z-10">

        <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-[#03000a]/85 backdrop-blur-md border-b border-purple-500/10 py-3 sm:py-4 shadow-[0_4px_30px_rgba(176,38,255,0.03)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
            <button 
              onClick={() => router.push('/')} 
              className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:text-purple-400 transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] cursor-pointer"
            >
              Warstation VR
            </button>
            
            <div className="flex flex-wrap justify-end gap-x-2.5 gap-y-1 sm:gap-8 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em]">
              <Link href="/#gallery-section" className="hover:text-purple-400 hover:drop-shadow-[0_0_6px_#b026ff] transition-all cursor-pointer">
                <span className="md:hidden">Локация</span>
                <span className="hidden md:inline">Локация и геймплей</span>
              </Link>
              <Link href="/#games-section" className="hover:text-purple-400 hover:drop-shadow-[0_0_6px_#b026ff] transition-all cursor-pointer">Игры</Link>
              <Link href="/#pricing-section" className="hover:text-purple-400 hover:drop-shadow-[0_0_6px_#b026ff] transition-all cursor-pointer">Тарифы</Link>
              <Link href="/reviews" className="text-purple-400 drop-shadow-[0_0_6px_#b026ff] hover:text-purple-400 transition-all cursor-pointer">Отзывы</Link>
              <Link href="/#about-heading-section" className="hover:text-purple-400 hover:drop-shadow-[0_0_6px_#b026ff] transition-all cursor-pointer">О нас</Link>
            </div>
          </div>
        </nav>

        <div className="flex flex-col items-center pt-32 sm:pt-40 pb-16">
          <div className="w-full max-w-3xl px-4">
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-center text-white mb-10 sm:mb-14 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              ОТЗЫВЫ
            </h1>

            <form onSubmit={handleSubmit} className="relative flex flex-col gap-5 mb-16 bg-[#0b0518]/60 backdrop-blur-md p-6 sm:p-8 rounded-[24px] border border-white/5 shadow-xl">

              <div className="flex flex-col gap-1.5 px-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Оцените это место</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      disabled={isSubmitting}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-2xl sm:text-3xl transition-all duration-150 cursor-pointer focus:outline-none hover:scale-110 active:scale-95 disabled:opacity-50"
                    >
                      <span 
                        style={{ 
                          color: star <= (hoverRating || rating) ? '#eab308' : '#27272a',
                          textShadow: star <= (hoverRating || rating) ? '0 0 10px rgba(234, 179, 8, 0.4)' : 'none'
                        }}
                      >
                        ★
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <input 
                type="text"
                placeholder="Ведите ваше имя" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                disabled={isSubmitting}
                className="bg-[#04000e]/60 border border-white/5 p-4 rounded-xl text-white font-medium placeholder-white/30 focus:outline-none focus:border-purple-500/40 transition duration-300 disabled:opacity-50" 
              />
              <textarea 
                placeholder="" 
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
                {isSubmitting ? "" : "ОПУБЛИКОВАТЬ ОТЗЫВ"}
              </button>
            </form>

            <div className="flex flex-col gap-5">
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-white/40 mb-2 px-1">
                Отзывов ({reviews.length})
              </h2>

              {reviews.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-white/10 rounded-[24px] bg-[#0b0518]/20 backdrop-blur-sm">
                  <p className="text-white/40 text-sm font-medium"></p>
                </div>
              ) : (
                reviews.map((r, i) => (
                  <div key={i} className="p-6 border border-white/5 bg-[#0b0518]/40 backdrop-blur-sm rounded-[24px] hover:border-purple-500/20 transition duration-300 shadow-md group">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors tracking-wide text-base sm:text-lg">
                          {r.name}
                        </h3>

                        <div className="flex gap-0.5 mt-1 mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span 
                              key={star} 
                              className="text-sm sm:text-base"
                              style={{ color: star <= r.rating ? '#eab308' : '#27272a' }}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-white/40 bg-[#04000e]/50 px-2.5 py-1 rounded-md border border-white/5 shrink-0">
                        {r.date}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line break-words明确">
                      {r.message}
                    </p>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
