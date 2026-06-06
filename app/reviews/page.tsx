"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewsPage() {
  const router = useRouter();

  const [reviews, setReviews] = useState([
    { id: 1, name: "Алексей М.", text: "Отмечали день рождения сына. Дети в восторге!", rating: 5 },
  ]);

  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;

    const newReview = { id: Date.now(), name, text, rating: 5 };
    setReviews([newReview, ...reviews]);
    setName("");
    setText("");
    alert("Спасибо! Ваш отзыв отправлен на модерацию.");
  };

  return (
    <main className="min-h-screen text-white bg-[#04000e] relative p-6 md:p-12">
      <button onClick={() => router.push('/')} className="mb-8 text-purple-400 hover:text-white transition-all">← Назад на главную</button>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black uppercase italic text-center mb-12">Оставьте свой отзыв</h1>

        <form onSubmit={handleSubmit} className="bg-[#0b0518]/60 backdrop-blur-md p-8 rounded-3xl border border-white/10 mb-16">
          <input 
            type="text" 
            placeholder="Ваше имя" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-4 rounded-xl mb-4 text-white focus:border-purple-500 outline-none"
          />
          <textarea 
            placeholder="Что вам понравилось?" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-4 rounded-xl mb-4 text-white h-32 focus:border-purple-500 outline-none"
          />
          <button type="submit" className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold uppercase tracking-widest transition-all">
            Отправить отзыв
          </button>
        </form>

        <div className="grid gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-6 bg-white/5 rounded-2xl border border-white/5">
              <h3 className="font-bold text-purple-400">{rev.name}</h3>
              <p className="text-white/80 mt-2">{rev.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
