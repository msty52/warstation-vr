"use client";
import { useState, useEffect } from "react";

export default function ReviewsPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => { fetchReviews(); }, []);

  async function fetchReviews() {
    const res = await fetch('/api/reviews');
    const data = await res.json();
    setReviews(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message, date: new Date().toLocaleDateString() }),
    });
    setName(""); setMessage("");
    fetchReviews();
  }

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
        <input placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} required className="border p-2" />
        <textarea placeholder="Ваш отзыв..." value={message} onChange={(e) => setMessage(e.target.value)} required className="border p-2" />
        <button type="submit" className="bg-purple-600 text-white p-2">ОПУБЛИКОВАТЬ</button>
      </form>

      <div className="flex flex-col gap-4">
        {reviews.map((r, i) => (
          <div key={i} className="p-4 border rounded">
            <h3 className="font-bold">{r.name}</h3>
            <p>{r.message}</p>
            <span className="text-sm text-gray-500">{r.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
