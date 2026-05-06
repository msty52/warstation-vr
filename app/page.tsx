"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [status, setStatus] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkRes = () => setIsMobile(window.innerWidth < 768);
    checkRes();
    window.addEventListener("resize", checkRes);
    return () => window.removeEventListener("resize", checkRes);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setStatus("Перенаправление в ВК...");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const message = `ЗАЯВКА С САЙТА:\n👤 Клиент: ${data.name}\n📞 Телефон: ${data.phone}\n📅 Дата: ${data.date}\n👥 Гостей: ${data.guests}\n🎮 Тариф: ${data.tarif}`;
    window.location.href = `https://vk.com/im?sel=-210740739&msg=${encodeURIComponent(message)}`;
  };

  // Вынес базовый стиль в переменную для чистоты кода
  const inputClassName = "w-full h-[56px] bg-[#1a1a1a] text-white border border-[#444] rounded-xl px-4 outline-none focus:border-[#ff007a] transition-all appearance-none flex items-center";

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans scroll-smooth">
      
      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="z-10 w-full">
          <img src="/logo.jpg" alt="WARSTATION VR" className="w-full max-w-[300px] md:max-w-[500px] mb-6 mx-auto" />
          <p className="text-sm md:text-xl text-[#00d2ff] tracking-[0.2em] md:tracking-[0.4em] uppercase mb-12 font-bold">
            Арена виртуальной реальности
          </p>
          
          {/* ИСПРАВЛЕННАЯ КНОПКА: добавил !text-white и !no-underline */}
          <a 
            href="#booking" 
            className="inline-block bg-[#ff007a] !text-white px-10 py-5 rounded-full font-black text-lg md:text-xl uppercase transition-transform hover:scale-105 !no-underline shadow-lg shadow-[#ff007a]/20"
          >
            Забронировать
          </a>
        </div>
      </section>

      {/* ПРАЙС-ЛИСТ */}
      <section className="py-16 md:py-24 px-4 max-w-5xl mx-auto space-y-8">
        <h2 className="text-3xl md:text-5xl font-black italic text-center mb-12 uppercase">Наши Тарифы</h2>
        
        {/* Карточка 1 */}
        <div className="p-6 md:p-12 rounded-[30px] md:rounded-[40px] border-2 border-white/10 bg-white/5 overflow-hidden">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <span className="text-2xl">🕒</span>
            <h3 className="text-lg md:text-2xl font-bold uppercase italic">Программа — 2ч 45мин</h3>
          </div>
          <div className="space-y-4">
            {[
              { d: "ПН-ЧТ", t: "10:00 - 13:00", p: "15.000 ₽", c: "#00d2ff" },
              { d: "ПН-ЧТ", t: "13:00 - 22:00", p: "20.000 ₽", c: "#00d2ff" },
              { d: "ПТ-ВС", t: "10:00 - 13:00", p: "20.000 ₽", c: "#ff007a" },
              { d: "ПТ-ВС", t: "13:00 - 22:00", p: "25.000 ₽", c: "#ff007a" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row justify-between md:items-center py-3 border-b border-white/5 last:border-0 gap-2">
                <div className="flex items-center gap-4">
                  <span className="font-black text-sm md:text-lg min-w-[60px]" style={{ color: item.c }}>{item.d}</span>
                  <span className="text-base md:text-xl opacity-80 font-mono">{item.t}</span>
                </div>
                <span className="text-xl md:text-2xl font-black whitespace-nowrap">{item.p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Карточка 2 */}
        <div className="p-6 md:p-12 rounded-[30px] md:rounded-[40px] border-2 border-white/10 bg-white/5 overflow-hidden">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <span className="text-2xl">🎮</span>
            <h3 className="text-lg md:text-2xl font-bold uppercase italic">Игра компанией</h3>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between md:items-center py-3 border-b border-white/5 gap-2">
              <span className="text-sm md:text-lg font-bold text-[#00d2ff] uppercase">ПН - ЧТ (ЗА ЧАС)</span>
              <span className="text-xl md:text-2xl font-black">6.000 ₽</span>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:items-center py-3 gap-2">
              <span className="text-sm md:text-lg font-bold text-[#ff007a] uppercase">ПТ - ВС (ЗА ЧАС)</span>
              <span className="text-xl md:text-2xl font-black">8.000 ₽</span>
            </div>
          </div>
        </div>
      </section>

      {/* ФОРМА БРОНИРОВАНИЯ */}
      <section id="booking" className="py-16 md:py-24 px-4">
        <div className="max-w-2xl mx-auto bg-[#0a0a0a] rounded-[30px] md:rounded-[40px] border border-white/20 shadow-2xl p-6 md:p-12">
          <h2 className="text-2xl md:text-3xl font-black mb-8 text-center uppercase italic text-white">Запись на игру</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <input name="name" type="text" placeholder="Ваше имя" required className={inputClassName} />
            <input name="phone" type="tel" placeholder="Телефон" required className={inputClassName} />
            
            {/* Исправленная сетка: flex вместо grid для стабильности на ПК */}
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex-1">
                <input name="date" type="date" required className={inputClassName + " [color-scheme:dark]"} />
              </div>
              <div className="flex-1">
                <select name="guests" required defaultValue="" className={inputClassName + " bg-[#1a1a1a]"}>
                  <option value="" disabled className="text-gray-500">Кол-во человек</option>
                  <option value="1-4">1-4 чел</option>
                  <option value="5-8">5-8 чел</option>
                  <option value="9+">9+ чел</option>
                </select>
              </div>
            </div>

            <select name="tarif" required defaultValue="" className={inputClassName + " bg-[#1a1a1a]"}>
              <option value="" disabled className="text-gray-500">Выберите программу</option>
              <option value="Программа 2ч 45мин">Программа (2ч 45мин)</option>
              <option value="Игра компанией">Игра компанией (1 час)</option>
            </select>

            <button type="submit" className="bg-[#ff007a] h-[60px] w-full rounded-xl font-black text-lg md:text-xl uppercase hover:brightness-110 active:scale-95 transition-all text-white mt-2 shadow-lg shadow-[#ff007a]/20">
              ОФОРМИТЬ В ВК
            </button>
          </form>
          {status && <p className="mt-4 text-center text-[#00d2ff] font-bold animate-pulse">{status}</p>}
        </div>
      </section>

      <footer className="py-12 text-center opacity-30 text-[10px] md:text-xs uppercase tracking-[0.5em] md:tracking-[0.8em] px-4">
        Warstation VR • 2026
      </footer>
    </main>
  );
}
