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
  } [], []);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1) 
    : "0.0";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || rating === 0) {
      alert("Пожалуйста, заполните все поля и поставьте оценку!");
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
        alert("Спасибо! Ваш отзыв успешно добавлен.");
      }
    } catch (error) {
      console.error("Ошибка при отправке отзыва:", error);
      alert("Не удалось отправить отзыв. Попробуйте еще раз.");
    }
  };

  return (
    <main className="min-h-screen text-white bg-[#04000e] relative p-6 md:p-12 selection:bg-purple-500/30">

      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vh] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <button 
          onClick={() => router.push('/')} 
          className="mb-8 text-purple-400 hover:text-white transition-all flex items-center gap-2 cursor-pointer font-bold uppercase tracking-wider text-xs"
        >
          ← Назад на главную
        </button>
      
        <h1 className="text-4xl md:text-5xl font-black uppercase italic text-center mb-6 drop-shadow-[0_0_20px_rgba(176,38,255,0.3)]">
          Отзывы игроков
        </h1>

        <div className="flex flex-col items-center mb-12 bg-[#0b0518]/60 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(176,38,255,0.05)]">
          <div className="text-6xl font-black text-yellow-400 drop-shadow-[0_0_15px_#eab308]">
            {averageRating}
          </div>
          <p className="text-white/60 mt-2 font-bold tracking-widest uppercase text-xs">
            Средний рейтинг по {reviews.length} отзывам
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#0b0518]/60 backdrop-blur-md p-8 rounded-3xl border border-white/10 mb-16 shadow-xl">
          <h2 className="text-xl font-bold uppercase italic mb-6 text-purple-400 tracking-wide">Оставить отзыв</h2>
          
          <input 
            type="text" 
            placeholder="Ваше имя" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-4 rounded-xl mb-4 text-white outline-none focus:border-purple-500 transition-all font-medium"
          />

          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={`text-3xl transition-all transform hover:scale-110 cursor-pointer ${
                  star <= (hover || rating) ? "text-yellow-400 drop-shadow-[0_0_10px_#eab308]" : "text-white/20"
                }`}
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
            className="w-full bg-black/40 border border-white/10 p-4 rounded-xl mb-6 text-white h-32 outline-none focus:border-purple-500 transition-all resize-none font-medium"
          />
          
          <button type="submit" className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] cursor-pointer">
            Отправить отзыв
          </button>
        </form>

        <div className="grid gap-6">
          {isLoading ? (
            <p className="text-center text-white/40 font-bold uppercase tracking-widest text-sm animate-pulse py-8">
              Загрузка отзывов...
            </p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-white/40 font-bold uppercase tracking-widest text-sm py-8">
              Отзывов пока нет. Будьте первым!
            </p>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-[#0b0518]/40 rounded-2xl border border-white/5 backdrop-blur-sm transition-all hover:border-purple-500/20">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-purple-400 uppercase tracking-wide text-sm">{rev.name}</h3>
                  <div className="text-yellow-400 tracking-tighter">
                    {"★".repeat(rev.rating)}
                    <span className="text-white/10">{"★".repeat(5 - rev.rating)}</span>
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed text-sm font-medium">{rev.text}</p>
                <span className="text-[10px] text-white/20 block mt-3 font-bold">
                  {new Date(rev.created_at).toLocaleDateString("ru-RU")}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
