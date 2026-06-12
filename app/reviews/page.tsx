"use client";
import { useState, useEffect } from "react";

export default function ReviewsPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (Array.isArray(data)) {
        setReviews(data);
      }
    } catch (err) {
      console.error("Не удалось загрузить отзывы:", err);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message, date: new Date().toLocaleDateString() }),
      });
      setName("");
      setMessage("");
      fetchReviews();
    } catch (err) {
      console.error("Не удалось отправить отзыв:", err);
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
        <input 
          placeholder="Имя" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          className="border p-2 rounded text-black" 
        />
        <textarea 
          placeholder="Ваш отзыв..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          required 
          className="border p-2 rounded text-black h-32" 
        />
        <button type="submit" className="bg-purple-600 text-white p-2 rounded font-bold hover:bg-purple-700 transition">
          ОПУБЛИКОВАТЬ ОТЗЫВ
        </button>
      </form>

      <div className="flex flex-col gap-4">
        {reviews.map((r, i) => (
          <div key={i} className="p-4 border rounded shadow-sm bg-white text-black">
            <h3 className="font-bold text-lg">{r.name}</h3>
            <p className="my-2">{r.message}</p>
            <span className="text-sm text-gray-400">{r.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
