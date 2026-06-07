"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lmgrgcureobfcmzpeqpl.supabase.co";
const supabaseAnonKey = "sb_publishable_Ud27HkI_CLthHaCLzURH9A_O0UlHku_";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Review {
  id: number;
  name: string;
  text: string;
  rating: number;
  created_at: string;
}

export default function ReviewsPage() {
  const router = useRouter();
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setReviews(data);
      } catch (error) {
        console.error("Ошибка при загрузке отзывов:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1) 
    : "0.0";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || rating === 0) {
      alert("Заполните все поля и поставьте оценку!");
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from("reviews")
        .insert([{ name, text, rating }])
        .select();

      if (error) throw error;

      if (data) {
        setReviews([data[0], ...reviews]);
        setName("");
        setText("");
        setRating(0);
        alert("Отзыв отправлен.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Не удалось отправить отзыв.");
    }
  };

  return (
    <main className="min-h-screen text-white relative overflow-x-hidden bg-[#04000e]">
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vh] bg-blue-700/40 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[10%] right-[-10%] w-[60vw] h-[60vh] bg-yellow-500/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[10%] w-[80vw] h-[70vh] bg-pink-600/30 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto p-6 md:p-12">
        <button onClick={() => router.push('/')} className="text-purple-400 mb-8 font-bold uppercase text-xs hover:text-white transition-colors">
          ← Назад на главную
        </button>
        
        <h1 className="text-4xl font-black uppercase italic text-center mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Отзывы</h1>
        
        <div className="flex flex-col items-center mb-12 bg-[#0b0518]/60 backdrop-blur-md p-8 rounded-3xl border border-white/10">
          <div className="text-6xl font-black text-yellow-400">{averageRating}</div>
          <p className="text-white/60 mt-2 font-bold uppercase text-xs">Средний рейтинг ({reviews.length})</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#0b0518]/60 backdrop-blur-md p-8 rounded-3xl border border-white/10 mb-16">
          <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl mb-4 text-white placeholder:text-white/30" />
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button type="button" key={star} className={`text-3xl transition-colors ${star <= (hover || rating) ? "text-yellow-400" : "text-white/20"}`} onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}>★</button>
            ))}
          </div>
          <textarea placeholder="Ваш отзыв..." value={text} onChange={(e) => setText(e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl mb-6 text-white h-32 resize-none placeholder:text-white/30" />
          <button type="submit" className="w-full py-4 bg-purple-600 rounded-xl font-black uppercase tracking-widest hover:bg-purple-500 transition-colors">Отправить</button>
        </form>

        <div className="grid gap-6">
          {isLoading ? <p className="text-center text-white/40">Загрузка...</p> : reviews.map((rev) => (
            <div key={rev.id} className="p-6 bg-[#0b0518]/40 backdrop-blur-sm rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-purple-400">{rev.name}</h3>
                <div className="text-yellow-400">{"★".repeat(rev.rating)}</div>
              </div>
              <p className="text-white/80 text-sm">{rev.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
