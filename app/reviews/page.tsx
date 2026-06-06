"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState([
    { id: 1, name: "Алексей М.", text: "Отличная арена, всё супер!", rating: 5 },
  ]);

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0); 
  const [hover, setHover] = useState(0);  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text || rating === 0) {
      alert("Пожалуйста, заполните имя, отзыв и поставьте оценку!");
      return;
    }
    
    const newReview = { id: Date.now(), name, text, rating };
    setReviews([newReview, ...reviews]);
    setName("");
    setText("");
    setRating(0);
    alert("Спасибо за ваш отзыв!");
  };

  return (
    <main className="min-h-screen text-white bg-[#04000e] relative p-6 md:p-12">
      <button onClick={() => router.push('/')} className="mb-8 text-purple-400 hover:text-white transition-all">← Назад на главную</button>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black uppercase italic text-center mb-12">Отзывы игроков</h1>

        <form onSubmit={handleSubmit} className="bg-[#0b0518]/60 backdrop-blur-md p-8 rounded-3xl border border-white/10 mb-16">
          <input 
            type="text" 
            placeholder="Ваше имя" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-4 rounded-xl mb-4 text-white outline-none focus:border-purple-500"
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
            placeholder="Ваш отзыв..." 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-4 rounded-xl mb-4 text-white h-32 outline-none focus:border-purple-500"
          />
          <button type="submit" className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold uppercase tracking-widest transition-all">
            Отправить
          </button>
        </form>

        <div className="grid gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-purple-400">{rev.name}</h3>
                <div className="text-yellow-400">
                  {"★".repeat(rev.rating)}<span className="text-white/20">{"★".repeat(5 - rev.rating)}</span>
                </div>
              </div>
              <p className="text-white/80">{rev.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
