'use client';

import { useEffect, useState } from 'react';

interface Review {
  id: string;
  author: string;
  avatar: string | null;
  rating: number;
  text: string;
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки отзывов:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="reviews-section" className="py-12 relative scroll-mt-24">

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tight text-white text-center drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-6">
        ОТЗЫВЫ С ЯНДЕКС КАРТ
      </h2>

      <div className="flex justify-center mb-8">
        <div className="p-[1.5px] bg-gradient-to-r from-yellow-500/50 via-purple-500/50 to-pink-500/50 rounded-xl shadow-[0_0_20px_rgba(176,38,255,0.15)]">
          <iframe 
            src="https://yandex.ru/sprav/widget/rating-badge/67834229080?type=rating&theme=dark" 
            width="150" 
            height="50" 
            frameBorder="0"
            className="rounded-lg block"
            title="Yandex Rating Badge"
          ></iframe>
        </div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4">
        <div className="bg-[#130b24]/90 backdrop-blur-xl rounded-3xl border border-purple-500/20 shadow-[0_0_30px_rgba(0,0,0,0.6)] min-h-[350px] p-6 sm:p-8 relative z-10 flex items-center justify-center">
          
          {loading ? (
            <div className="text-purple-400 animate-pulse text-lg font-bold tracking-wide">
              Загрузка отзывов с Яндекс Карт...
            </div>
          ) : reviews.length > 0 ? (

            <div className="w-full flex overflow-x-auto gap-6 pb-4 pt-2 snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-600/50 hover:scrollbar-thumb-purple-500 transition-colors">
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="min-w-[290px] sm:min-w-[340px] max-w-[380px] shrink-0 snap-center p-[1px] rounded-2xl bg-gradient-to-b from-purple-500/30 via-purple-500/10 to-transparent group"
                >
                  <div className="bg-[#0b0514] rounded-2xl p-6 h-full flex flex-col transition-all duration-300 group-hover:bg-[#110820]">
                    <div className="flex items-center gap-4 mb-4">
                      {review.avatar ? (
                        <img 
                          src={review.avatar} 
                          alt={review.author} 
                          className="w-11 h-11 rounded-full border border-purple-500/50 object-cover" 
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-purple-900/50 border border-purple-500/50 flex items-center justify-center text-white font-bold text-base shrink-0">
                          {review.author.charAt(0)}
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <h4 className="text-white font-bold truncate">{review.author}</h4>
                        <div className="flex text-yellow-400 text-xs tracking-widest mt-1">
                          {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed flex-grow overflow-hidden text-ellipsis line-clamp-6 italic">
                      "{review.text}"
                    </p>
                    
                    <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[11px] text-purple-400/60 font-mono">
                      <span>Яндекс Карты</span>
                      <span>Проверено</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-center">
              Не удалось подтянуть отзывы. Вы можете посмотреть их напрямую на Яндекс Картах.
            </div>
          )}
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple-600/15 blur-[120px] -z-10 rounded-full pointer-events-none"></div>
      </div>
    </section>
  );
}
