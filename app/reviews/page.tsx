"use client";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; 

interface PreviewFile {
  id: string;
  type: "image" | "video";
  url: string;
}

interface Review {
  id: string;
  name: string;
  message: string;
  date: string;
  files: PreviewFile[];
}

export default function ReviewsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<PreviewFile[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadReviews() {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (data) setReviews(data);
    }
    loadReviews();
  }, []);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from("reviews-media")
      .upload(fileName, file);

    if (!uploadError) {
      const { data } = supabase.storage.from("reviews-media").getPublicUrl(fileName);
      setAttachedFiles([{
        id: fileName,
        type: file.type.startsWith("video/") ? "video" : "image",
        url: data.publicUrl
      }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from("reviews").insert([{
      name,
      message,
      date: new Date().toLocaleDateString("ru-RU"),
      files: attachedFiles
    }]);

    if (!error) {
      alert("Отзыв опубликован!");
      setName(""); setMessage(""); setAttachedFiles([]);
      window.location.reload(); 
    }
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-[#04000e] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => router.push("/")} className="text-white/60 hover:text-white mb-8">← На главную</button>
        <h1 className="text-5xl font-black italic text-center mb-12">Оставить отзыв</h1>

        <form onSubmit={handleSubmit} className="bg-[#0b0518]/60 p-10 rounded-3xl border border-white/10 space-y-6">
          <input required value={name} onChange={e => setName(e.target.value)} className="w-full bg-black/40 p-4 rounded-xl border border-white/10" placeholder="Ваше Имя" />
          <textarea required value={message} onChange={e => setMessage(e.target.value)} className="w-full bg-black/40 p-4 rounded-xl border border-white/10" rows={4} placeholder="Ваш отзыв" />
          
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          <button type="button" onClick={() => fileInputRef.current?.click()} className="text-purple-400 font-bold">Прикрепить фото</button>

          <button disabled={isSubmitting} type="submit" className="w-full py-4 bg-purple-600 rounded-xl font-black uppercase">
            {isSubmitting ? "Отправка..." : "Опубликовать"}
          </button>
        </form>

        <div className="mt-12 grid gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-[#0b0518]/40 p-6 rounded-2xl border border-white/5">
              <h3 className="font-bold">{rev.name} <span className="text-xs text-white/40">{rev.date}</span></h3>
              <p className="mt-2 text-white/80">{rev.message}</p>
              {rev.files?.[0] && <img src={rev.files[0].url} className="mt-4 rounded-lg w-48" />}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
