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
        alert("Ошибка при сохранении отзыва в Neon");
      }
    } catch (err) {
      console.error("Не удалось отправить отзыв:", err);
      alert("Критическая ошибка сети");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 font-sans relative flex flex-col items-center">

      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-purple-900/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-3xl px-4 py-8 relative z-10">

        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-300 font-bold tracking-wider uppercase text-sm group"
          >
            <span className="text-purple-500 group-hover:-translate-x-1 transition-transform duration-300">
              ◄
            </span> 
            На главную
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-black tracking-widest text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-purple-400 uppercase mb-10">
          Бортовой журнал отзывов
        </h1>

        <form onSubmit={handleSubmit} className="relative flex flex-col gap-5 mb-16 bg-zinc-950/60 p-6 md:p-8 rounded-xl border border-zinc-800/80 backdrop-blur-md shadow-2xl">
          <input 
            type="text"
            placeholder="ИМЯ ПИЛОТА" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            disabled={isSubmitting}
            className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-lg text-white font-medium placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition duration-300 disabled:opacity-50" 
          />
          <textarea 
            placeholder="ВАШ ОТЗЫВ" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
            disabled={isSubmitting}
            className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-lg text-white font-medium placeholder-zinc-500 h-36 resize-none focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition duration-300 disabled:opacity-50" 
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-[#9900FF] hover:bg-[#8000de] text-white p-4 mt-2 rounded-lg font-black tracking-widest uppercase transition-all duration-300 active:scale-[0.99] disabled:opacity-50 shadow-[0_0_20px_rgba(153,0,255,0.3)] hover:shadow-[0_0_30px_rgba(153,0,255,0.7)]"
          >
            {isSubmitting ? "СИНХРОНИЗАЦИЯ..." : "ОПУБЛИКОВАТЬ ОТЗЫВ"}
          </button>
        </form>

        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-bold tracking-wide text-zinc-400 uppercase mb-2 px-1">
            Архив ({reviews.length})
          </h2>

          {reviews.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20 backdrop-blur-sm">
              <p className="text-zinc-500 font-medium">История пуста. Ваш отзыв будет первым!</p>
            </div>
          ) : (
            reviews.map((r, i) => (
              <div key={i} className="p-6 border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md rounded-xl hover:border-purple-900/50 transition duration-300 shadow-lg group">
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors tracking-wide text-lg">
                    {r.name}
                  </h3>
                  <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800 shrink-0">
                    {r.date}
                  </span>
                </div>
                <p className="text-zinc-400 leading-relaxed font-medium whitespace-pre-line break-words">
                  {r.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
