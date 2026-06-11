"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ReviewsPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [submitStatus, setSubmitStatus] = useState<string>(""); 
  
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setFilePreview(url);
    } else {
      setFilePreview(null);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitStatus) return;

    let uploadedFileUrl = null;

    try {
      if (file) {
        setSubmitStatus("Загрузка медиафайла (подождите)...");

        const fileExt = file.name.split('.').pop();
        const safeName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { data, error: uploadError } = await supabase.storage
          .from("reviews-media")
          .upload(safeName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("reviews-media")
          .getPublicUrl(safeName);
          
        uploadedFileUrl = publicUrlData.publicUrl;
      }

      setSubmitStatus("Публикация отзыва...");

      const { error: insertError } = await supabase
        .from("reviews")
        .insert([{ 
          name, 
          message, 
          file_url: uploadedFileUrl, 
          date: new Date().toLocaleDateString("ru-RU") 
        }]);

      if (insertError) throw insertError;

      setName("");
      setMessage("");
      setFile(null);
      setFilePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      await fetchReviews();
      alert("Отзыв успешно добавлен");

    } catch (error: any) {
      console.error("Детальная ошибка", error);
      alert(`Не удалось отправить ${error.message || ""}`);
    } finally {
      setSubmitStatus("");
    }
  }

  const isVideo = (url: string) => {
    if (!url) return false;
    return url.match(/\.(mp4|webm|ogg|mov)$/i) || url.includes("video");
  };

  return (

    <main className="min-h-screen w-full bg-[#04000e] text-white p-4 md:p-8 transition-all duration-300">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black text-center mb-8 uppercase tracking-wider text-purple-500 drop-shadow-lg">
          Отзывы игроков
        </h1>
        
        <form onSubmit={handleSubmit} className="bg-black/60 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-purple-500/20 shadow-2xl space-y-4">
          <input 
            required 
            type="text"
            value={name} 
            onChange={e => setName(e.target.value)}
            className="w-full bg-white/5 p-3 rounded-xl border border-white/10 focus:border-purple-500 focus:outline-none transition text-sm md:text-base text-white placeholder-white/40" 
            placeholder="Введите имя" 
            disabled={!!submitStatus}
          />
          
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,video/*" 
            className="hidden" 
          />

          <div className="relative flex flex-col bg-white/5 rounded-xl border border-white/10 focus-within:border-purple-500 transition overflow-hidden">
            <textarea 
              required 
              value={message} 
              onChange={e => setMessage(e.target.value)}
              className="w-full bg-transparent p-3 pr-12 rounded-xl resize-none focus:outline-none text-sm md:text-base min-h-[100px] text-white placeholder-white/40" 
              placeholder="" 
              rows={3}
              disabled={!!submitStatus}
            />
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={!!submitStatus}
              className="absolute right-3 bottom-3 md:hidden p-2 bg-purple-600/30 hover:bg-purple-600/60 rounded-full transition text-purple-300 disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={!!submitStatus}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition text-purple-300 border border-white/10 disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              Прикрепить фото или видео
            </button>
            {file && <span className="text-xs text-purple-300 max-w-[250px] truncate">Выбран {file.name}</span>}
          </div>

          {filePreview && (
            <div className="relative mt-2 inline-block">
              {isVideo(file?.name || "") ? (
                <video src={filePreview} className="max-h-40 rounded-lg shadow-lg border border-white/10" controls muted />
              ) : (
                <img src={filePreview} alt="Превью" className="max-h-40 rounded-lg object-cover shadow-lg border border-white/10" />
              )}
              <button 
                type="button" 
                onClick={() => { setFile(null); setFilePreview(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                disabled={!!submitStatus}
                className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition disabled:opacity-50"
              >
                ✕
              </button>
            </div>
          )}

          <button 
            disabled={!!submitStatus} 
            type="submit" 
            className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 disabled:text-white/70 rounded-xl font-bold uppercase tracking-wider transition text-sm shadow-[0_0_15px_rgba(147,51,234,0.3)] flex justify-center items-center gap-2"
          >
            {submitStatus ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {submitStatus}
              </>
            ) : "Опубликовать отзыв"}
          </button>
        </form>

        <div className="mt-12 space-y-5">
          {reviews.length === 0 ? (
            <p className="text-center text-white/40 py-8 text-sm">Отзывов еще нет</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="bg-black/40 backdrop-blur-md p-5 rounded-2xl border border-white/5 shadow-lg space-y-3">
                <div className="flex justify-between items-center text-xs md:text-sm text-white/40 border-b border-white/5 pb-2">
                  <span className="font-semibold text-purple-400">{rev.name}</span>
                  <span>{rev.date || "Неизвестно"}</span>
                </div>
                <p className="text-white/90 text-sm md:text-base leading-relaxed break-words">{rev.message}</p>
                
                {rev.file_url && (
                  <div className="pt-3">
                    {isVideo(rev.file_url) ? (
                      <video 
                        src={rev.file_url} 
                        controls 
                        preload="metadata"
                        className="max-w-full md:max-w-md max-h-72 rounded-xl border border-white/10 shadow-md" 
                      />
                    ) : (
                      <img 
                        src={rev.file_url} 
                        alt="Фото к отзыву" 
                        loading="lazy"
                        className="max-w-full md:max-w-md max-h-72 rounded-xl border border-white/10 shadow-md object-cover" 
                      />
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
