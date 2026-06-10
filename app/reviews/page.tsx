"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; 

export default function ReviewsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setReviews(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let fileUrl = "";
      if (selectedFile) {
        const fileName = `${Date.now()}_${selectedFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("reviews-media")
          .upload(fileName, selectedFile);
        
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("reviews-media").getPublicUrl(fileName);
        fileUrl = data.publicUrl;
      }

      await supabase.from("reviews").insert([{
        name,
        message,
        date: new Date().toLocaleDateString("ru-RU"),
        files: fileUrl ? [{ url: fileUrl, type: "image" }] : []
      }]);

      setName(""); setMessage(""); setSelectedFile(null);
      loadReviews();
    } catch (err) {
      console.error(err);
      alert("Ошибка при отправке");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen text-white font-sans relative bg-[#04000e]">

       <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => router.push("/")} className="text-white/60 hover:text-purple-400 mb-8">← На главную</button>
        
        <h1 className="text-4xl font-black uppercase italic mb-12 text-center">Оставить отзыв</h1>

        <form onSubmit={handleSubmit} className="bg-[#0b0518]/60 p-6 sm:p-10 rounded-[24px] border border-white/5 space-y-6 mb-16">
          <input required value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя" className="w-full bg-black/40 border border-white/10 rounded-xl p-3" />
          <textarea required rows={4} value={message} onChange={e => setMessage(e.target.value)} placeholder="Ваш отзыв" className="w-full bg-black/40 border border-white/10 rounded-xl p-3" />
          
          <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="text-white/50" />

          <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-purple-600 rounded-xl font-black hover:bg-purple-500 transition-all">
            {isSubmitting ? "Отправка..." : "Опубликовать"}
          </button>
        </form>

        <div className="space-y-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-[#0b0518]/40 border border-white/5 rounded-2xl p-6">
              <h3 className="font-bold">{rev.name}</h3>
              <p className="text-white/80 mt-2">{rev.message}</p>
              {rev.files && rev.files[0] && <img src={rev.files[0].url} className="mt-4 w-48 rounded-lg" />}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
