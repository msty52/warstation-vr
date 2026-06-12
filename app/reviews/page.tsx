"use client";

import { useState, useEffect } from "react";
import { sql } from "@/lib/db"; 
import { supabase } from "@/lib/supabase"; 

export default function ReviewsPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  // Загрузка отзывов из Neon
  async function fetchReviews() {
    try {
      const response = await fetch('/api/reviews'); 
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let uploadedFileUrl = null;

    try {

      if (file) {
        const { data, error } = await supabase.storage
          .from("reviews-media")
          .upload(`${Date.now()}_${file.name}`, file);
        
        if (error) throw error;
        
        const { data: urlData } = supabase.storage
          .from("reviews-media")
          .getPublicUrl(data.path);
        
        uploadedFileUrl = urlData.publicUrl;
      }

      await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({ name, message, date: new Date().toLocaleDateString(), file_url: uploadedFileUrl }),
      });

      alert("Отзыв успешно добавлен!");
      setName("");
      setMessage("");
      setFile(null);
      fetchReviews();
    } catch (err) {
      console.error(err);
      alert("Ошибка при отправке");
    }
  }

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea placeholder="Ваш отзыв..." value={message} onChange={(e) => setMessage(e.target.value)} required />
        <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
        <button type="submit" className="bg-purple-600 text-white p-2">ОПУБЛИКОВАТЬ ОТЗЫВ</button>
      </form>
    </div>
  );
}
