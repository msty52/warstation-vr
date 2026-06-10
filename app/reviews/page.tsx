"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ReviewsPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function fetchReviews() {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) setReviews(data);
    if (error) console.error("Ошибка загрузки:", error);
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
      .from("reviews")
      .insert([{ name, message, date: new Date().toLocaleDateString("ru-RU") }]);

    if (error) {
      console.error("Ошибка отправки:", error);
      alert("Не удалось отправить отзыв. Проверьте консоль.");
    } else {
      alert("Отзыв успешно добавлен!");
      setName("");
      setMessage("");
      fetchReviews(); 
    }
    setIsSubmitting(false);
  }

  return (
    <main className="min-h-screen bg-[#04000e] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-center mb-10">Оставить отзыв</h1>
        
        <form onSubmit={handleSubmit} className="bg-[#0b0518] p-8 rounded-2xl border border-white/10 space-y-4">
          <input 
            required value={name} onChange={e => setName(e.target.value)}
            className="w-full bg-black/50 p-3 rounded-lg border border-white/10" placeholder="Ваше Имя" 
          />
          <textarea 
            required value={message} onChange={e => setMessage(e.target.value)}
            className="w-full bg-black/50 p-3 rounded-lg border border-white/10" rows={3} placeholder="Ваш отзыв" 
          />
          <button 
            disabled={isSubmitting} type="submit" 
            className="w-full py-3 bg-purple-600 rounded-lg font-bold uppercase"
          >
            {isSubmitting ? "Отправка..." : "Опубликовать"}
          </button>
        </form>

        <div className="mt-12 space-y-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-[#0b0518]/50 p-6 rounded-xl border border-white/5">
              <div className="flex justify-between text-sm text-white/40 mb-2">
                <span>{rev.name}</span>
                <span>{rev.date}</span>
              </div>
              <p className="text-lg">{rev.message}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
