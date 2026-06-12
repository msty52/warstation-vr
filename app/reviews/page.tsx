"use client";

import { useState, useEffect } from "react";

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
      console.error("Не удалось загрузить отзыв", err);
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
        alert("");
      } else {
        alert("Ошибка при сохранении отзыва в Neon");
      }
    } catch (err) {
      console.error("Не удалось отправить отзыв", err);
      alert("Критическая ошибка сети");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 p-8 max-w-2xl mx-auto font-sans relative">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-purple-900/10 blur-3xl pointer-events-none" />

      <h1 className="text-2xl font-black tracking-widest text-center text-white uppercase mb-8">
        ОТЗЫВЫ
      </h1>

      <form onSubmit={handleSubmit} className="relative flex flex-col gap-4 mb-12 bg-zinc-950/50 p-6 rounded-xl border border-zinc-900 backdrop-blur-sm">
        <input 
          type="text"
          placeholder="Ведите имя" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          disabled={isSubmitting}
          className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition disabled:opacity-50" 
        />
        <textarea 
          placeholder="Ваш отзыв о симуляции..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          required 
          disabled={isSubmitting}
          className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-lg text-white placeholder-zinc-500 h-32 resize-none focus:outline-none focus:border-purple-500 transition disabled:opacity-50" 
        />
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-[#9900FF] hover:bg-[#8000de] text-white p-3.5 rounded-lg font-black tracking-wider uppercase transition active:scale-[0.99] disabled:opacity-50 shadow-[0_0_15px_rgba(153,0,255,0.3)] hover:shadow-[0_0_25px_rgba(153,0,255,0.6)]"
        >
          {isSubmitting ? "" : "ОПУБЛИКОВАТЬ ОТЗЫВ"}
        </button>
      </form>

      <div className="flex flex-col gap-4">
        {reviews.length === 0 ? (
          <p className="text-center text-zinc-600 font-medium py-4">История отзывов пуста</p>
        ) : (
          reviews.map((r, i) => (
            <div key={i} className="p-5 border border-zinc-900 bg-zinc-950/40 rounded-xl hover:border-purple-900/40 transition duration-300">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-purple-400 tracking-wide text-lg">{r.name}</h3>
                <span className="text-xs font-mono text-zinc-600 bg-zinc-900/50 px-2 py-0.5 rounded border border-zinc-800/60">
                  {r.date}
                </span>
              </div>
              <p className="text-zinc-300 leading-relaxed font-medium whitespace-pre-line">{r.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
