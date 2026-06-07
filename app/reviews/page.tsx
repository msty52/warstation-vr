"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewsPage() {
  const router = useRouter();

  const [reviews, setReviews] = useState([
    { id: 1, name: "Алексей М.", text: "Отмечали день рождения сына, дети в полном восторге! Очень крутые шлемы и локация.", rating: 5 },
    { id: 2, name: "Мария", text: "Интересные игры, персонал всё объяснил. Обязательно придем еще.", rating: 4 },
  ]);

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1) 
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text || rating === 0) {
      alert("Пожалуйста, заполните все поля и поставьте оценку!");
      return;
    }
    
    const newReview = { id: Date.now(), name, text, rating };
    setReviews([newReview, ...reviews]);
    setName("");
    setText("");
    setRating(0);
    alert("Спасибо! Ваш отзыв отправлен на модерацию.");
  };

  return (
    <main className="min-h-screen text-white bg-[#04000e] relative p-6 md:p-12 selection:bg-purple-500/30">
      <button 
        onClick={() => router.push('/')} 
        className="mb-8 text-purple-400 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
      >
        ← Назад на главную
      </button>
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black uppercase italic text-center mb-6">Отзывы игроков</h1>

        <div className="flex flex-col items-center mb-12 bg-[#0b0518]/60 backdrop-blur-md p-8 rounded-3xl border border-white/10">
          <div className="text-6xl font-black text-yellow-400 drop-shadow-[0_0_15px_#eab308]">
            {averageRating}
          </div>
          <p className="text-white/60 mt-2 font-bold tracking-widest uppercase text-sm">
            Средний рейтинг по {reviews.length} отзывам
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#0b0518]/60 backdrop-blur-md p-8 rounded-3xl border border-white/10 mb-16 shadow-xl">
          <h2 className="text-xl font-bold uppercase mb-6 text-purple-400">Оставить отзыв</h2>
          <input 
            type="text" 
            placeholder="Ваше имя" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-4 rounded-xl mb-4 text-white outline-none focus:border-purple-500 transition-all"
          />

          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={`text-3xl transition-all ${star <= (hover || rating) ? "text-yellow-400 drop-shadow-[0_0_10px_#eab308]" : "text-white/20"}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </button>
            ))}
          </div>

          <textarea 
            placeholder="Что вам понравилось? Поделитесь впечатлениями..." 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-4 rounded-xl mb-6 text-white h-32 outline-none focus:border-purple-500 transition-all"
          />
          
          <button type="submit" className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)]">
            Отправить отзыв
          </button>
        </form>

        <div className="grid gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-6 bg-[#0b0518]/40 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-purple-400 uppercase tracking-wide">{rev.name}</h3>
                <div className="text-yellow-400">
                  {"★".repeat(rev.rating)}<span className="text-white/10">{"★".repeat(5 - rev.rating)}</span>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed">{rev.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
