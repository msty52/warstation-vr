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

  const cardStyle = {
    padding: isMobile ? '25px 20px' : '40px 60px', 
    borderRadius: isMobile ? '30px' : '40px',
    border: '2px solid rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: '20px',
    overflow: 'hidden'
  };

  const rowStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row' as any,
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    padding: '15px 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    gap: isMobile ? '8px' : '0'
  };

  const inputBaseStyle = {
    backgroundColor: '#1a1a1a',
    color: '#ffffff', 
    border: '1px solid #444',
    borderRadius: '12px',
    padding: '0 16px', // Отступы только по бокам, высоту задаем жестко
    outline: 'none',
    width: '100%',
    fontSize: '16px',
    height: '56px' // Фиксированная высота, чтобы поля не «плющились»
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans scroll-smooth">
      
      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="z-10 w-full">
          <img src="/logo.jpg" alt="WARSTATION VR" className="w-full max-w-[300px] md:max-w-[500px] mb-6 mx-auto" />
          <p className="text-sm md:text-xl text-[#00d2ff] tracking-[0.2em] md:tracking-[0.4em] uppercase mb-12 font-bold">
            Арена виртуальной реальности
          </p>
          <a href="#booking" className="bg-[#ff007a] text-white px-8 py-4 md:px-12 md:py-5 rounded-full font-black text-lg md:text-xl uppercase inline-block transition-transform hover:scale-105">
            Забронировать
          </a>
        </div>
      </section>

      {/* ПРАЙС-ЛИСТ */}
      <section className="py-16 md:py-24 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black italic text-center mb-12 uppercase">Наши Тарифы</h2>
        
        <div style={cardStyle}>
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <span className="text-2xl">🕒</span>
            <h3 className="text-lg md:text-2xl font-bold uppercase italic">Программа — 2ч 45мин</h3>
          </div>
          
          {[
            { d: "ПН-ЧТ", t: "10:00 - 13:00", p: "15.000 ₽", c: "#00d2ff" },
            { d: "ПН-ЧТ", t: "13:00 - 22:00", p: "20.000 ₽", c: "#00d2ff" },
            { d: "ПТ-ВС", t: "10:00 - 13:00", p: "20.000 ₽", c: "#ff007a" },
            { d: "ПТ-ВС", t: "13:00 - 22:00", p: "25.000 ₽", c: "#ff007a" },
          ].map((item, i) => (
            <div key={i} style={rowStyle}>
              <div className="flex items-center gap-4 md:gap-10">
                <span className="font-black text-sm md:text-lg" style={{ color: item.c, minWidth: '60px' }}>{item.d}</span>
                <span className="text-base md:text-xl opacity-80 font-mono">{item.t}</span>
              </div>
              <span className="text-xl md:text-2xl font-black">{item.p}</span>
            </div>
          ))}
        </div>

        <div style={cardStyle}>
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <span className="text-2xl">🎮</span>
            <h3 className="text-lg md:text-2xl font-bold uppercase italic">Игра компанией</h3>
          </div>
          
          <div style={rowStyle}>
            <span className="text-sm md:text-lg font-bold text-[#00d2ff] uppercase">ПН - ЧТ (ЗА ЧАС)</span>
            <span className="text-xl md:text-2xl font-black">6.000 ₽</span>
          </div>
          <div style={{ ...rowStyle, borderBottom: 'none' }}>
            <span className="text-sm md:text-lg font-bold text-[#ff007a] uppercase">ПТ - ВС (ЗА ЧАС)</span>
            <span className="text-xl md:text-2xl font-black">8.000 ₽</span>
          </div>
        </div>
      </section>

      {/* ФОРМА БРОНИРОВАНИЯ */}
      <section id="booking" className="py-16 md:py-24 px-4">
        <div className="max-w-2xl mx-auto bg-[#0a0a0a] rounded-[30px] md:rounded-[40px] border border-white/20 shadow-2xl" 
             style={{ padding: isMobile ? '30px 20px' : '50px' }}>
          <h2 className="text-2xl md:text-3xl font-black mb-8 text-center uppercase italic text-white">Запись на игру</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <input name="name" type="text" placeholder="Ваше имя" required 
              style={inputBaseStyle} className="focus:border-[#ff007a] placeholder:text-gray-500" />
            
            <input name="phone" type="tel" placeholder="Телефон" required 
              style={inputBaseStyle} className="focus:border-[#ff007a] placeholder:text-gray-500" />
            
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4 w-full`}>
              <input name="date" type="date" required 
                style={inputBaseStyle} className="focus:border-[#ff007a] [color-scheme:dark]" />
              
              <select name="guests" required defaultValue=""
                style={inputBaseStyle} className="focus:border-[#ff007a] bg-[#1a1a1a]">
                <option value="" disabled style={{color: '#888'}}>Кол-во человек</option>
                <option value="1-4" style={{backgroundColor: '#1a1a1a', color: '#fff'}}>1-4 чел</option>
                <option value="5-8" style={{backgroundColor: '#1a1a1a', color: '#fff'}}>5-8 чел</option>
                <option value="9+" style={{backgroundColor: '#1a1a1a', color: '#fff'}}>9+ чел</option>
              </select>
            </div>

            <select name="tarif" required defaultValue=""
              style={inputBaseStyle} className="focus:border-[#ff007a] bg-[#1a1a1a]">
              <option value="" disabled style={{color: '#888'}}>Выберите программу</option>
              <option value="Программа 2ч 45мин" style={{backgroundColor: '#1a1a1a', color: '#fff'}}>Программа (2ч 45мин)</option>
              <option value="Игра компанией" style={{backgroundColor: '#1a1a1a', color: '#fff'}}>Игра компанией (1 час)</option>
            </select>

            <button type="submit" className="bg-[#ff007a] h-[60px] w-full rounded-xl font-black text-lg md:text-xl uppercase hover:brightness-110 active:scale-95 transition-all text-white mt-2">
              ОФОРМИТЬ В ВК
            </button>
          </form>
          {status && <p className="mt-4 text-center text-[#00d2ff] font-bold">{status}</p>}
        </div>
      </section>

      <footer className="py-12 text-center opacity-30 text-[10px] md:text-xs uppercase tracking-[0.5em] md:tracking-[0.8em] px-4">
        Warstation VR • 2026
      </footer>
    </main>
  );
}
