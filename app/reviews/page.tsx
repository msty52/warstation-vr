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
  image_url?: string;
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
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setReviews(data);
      setIsLoading(false);
    }
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || rating === 0) {
      alert("Заполните все поля и поставьте оценку!");
      return;
    }

    let imageUrl = null;

    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('reviews-media')
        .upload(fileName, file);

      if (uploadError) {
        alert("Ошибка загрузки фото");
        return;
      }
      imageUrl = supabase.storage.from('reviews-media').getPublicUrl(fileName).data.publicUrl;
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert([{ name, text, rating, image_url: imageUrl }])
      .select();

    if (error) {
      console.error(error);
      alert("Ошибка базы данных");
    } else if (data) {
      setReviews([data[0], ...reviews]);
      setName(""); setText(""); setRating(0); setFile(null);
      alert("Отзыв отправлен!");
    }
  };

  return (
    <main className="min-h-screen text-white relative overflow-x-hidden bg-[#04000e]">
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-blue-700 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vh] bg-purple-700 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto p-6 md:p-12">
        <button onClick={() => router.push('/')} className="text-purple-400 mb-8 font-bold text-xs uppercase hover:text-white">← Назад</button>
        
        <h1 className="text-4xl font-black uppercase italic text-center mb-10">Отзывы</h1>

        <form onSubmit={handleSubmit} className="bg-[#0b0518]/60 backdrop-blur-md p-8 rounded-3xl border border-white/10 mb-16">
          <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl mb-4 text-white" />
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <button type="button" key={s} className={`text-3xl ${s <= (hover || rating) ? "text-yellow-400" : "text-white/20"}`} onClick={() => setRating(s)} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)}>★</button>
            ))}
          </div>
          <textarea placeholder="Ваш отзыв..." value={text} onChange={(e) => setText(e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl mb-4 text-white h-24" />
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mb-4 block w-full text-sm text-white/50" />
          <button type="submit" className="w-full py-4 bg-purple-600 rounded-xl font-black uppercase">Отправить</button>
        </form>

        <div className="grid gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-6 bg-[#0b0518]/40 rounded-2xl border border-white/5">
              <h3 className="font-bold text-purple-400">{rev.name}</h3>
              <p className="text-white/80 my-2">{rev.text}</p>
              {rev.image_url && <img src={rev.image_url} alt="Review" className="rounded-xl mt-2 max-h-60" />}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
