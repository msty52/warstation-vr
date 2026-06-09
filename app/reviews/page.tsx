"use client";
import { useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

interface PreviewFile {
  id: string;
  type: "image" | "video";
  url: string;
  file: File;
}

export default function ReviewsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<PreviewFile[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const filesArray = Array.from(e.target.files);
    const newPreviews: PreviewFile[] = filesArray.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      type: file.type.startsWith("video/") ? "video" : "image",
      url: URL.createObjectURL(file),
      file: file
    }));

    setAttachedFiles((prev) => [...prev, ...newPreviews]);
  };

  const removeFile = (id: string, url: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
    URL.revokeObjectURL(url); 
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ name, message, attachedFiles });
    alert("Отзыв успешно отправлен! (Имитация)");
    setName("");
    setMessage("");
    setAttachedFiles([]);
  };

  return (
    <main className="min-h-screen text-white font-sans relative selection:bg-purple-500/30 overflow-x-hidden bg-[#04000e]">

      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[100vw] sm:w-[70vw] h-[70vh] bg-purple-700/30 rounded-full blur-[100px] md:blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[100vw] sm:w-[60vw] h-[60vh] bg-fuchsia-500/20 rounded-full blur-[100px] md:blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 sm:py-16">

        <button 
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-purple-400 transition-colors mb-8 group cursor-pointer"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> На главную
        </button>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tight mb-8 sm:mb-12 text-center drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          Оставить отзыв
        </h1>

        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,video/*"
          multiple
          className="hidden"
        />

        <form onSubmit={handleSubmit} className="bg-[#0b0518]/60 backdrop-blur-md rounded-[24px] border border-white/5 p-6 sm:p-10 shadow-2xl space-y-6">

          <div className="space-y-2">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/50">Ваше Имя</label>
            <input 
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Джони Сильверхенд"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 focus:shadow-[0_0_15px_rgba(176,38,255,0.15)] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/50">Ваш отзыв</label>

            <div className="relative bg-black/40 border border-white/10 rounded-xl focus-within:border-purple-500/50 focus-within:shadow-[0_0_15px_rgba(176,38,255,0.15)] transition-all overflow-hidden">
              <textarea 
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Поделитесь своими впечатлениями от арены..."
                className="w-full bg-transparent px-4 py-3 text-sm focus:outline-none resize-none pb-12 sm:pb-3"
              />

              <div className="md:hidden absolute bottom-2 right-2 flex items-center">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="p-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-400 active:scale-95 transition-all"
                  title="Добавить фото или видео"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.414a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <button
              type="button"
              onClick={triggerFileInput}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-500/5 hover:bg-purple-500/10 rounded-xl transition-all border border-purple-500/20 group cursor-pointer"
            >
              <svg className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="text-purple-400 font-bold text-xs uppercase tracking-wider">Добавить фото / видео</span>
            </button>
          </div>

          {attachedFiles.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/30">Прикрепленные файлы ({attachedFiles.length})</div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {attachedFiles.map((file) => (
                  <div key={file.id} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/60 group">
                    {file.type === "image" ? (
                      <img src={file.url} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <video src={file.url} className="w-full h-full object-cover" muted />
                    )}

                    <button
                      type="button"
                      onClick={() => removeFile(file.id, file.url)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 hover:bg-red-600 border border-white/10 flex items-center justify-center text-[10px] transition-colors cursor-pointer z-10"
                    >
                      ✕
                    </button>

                    {file.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                        <div className="w-6 h-6 rounded-full bg-purple-600/80 flex items-center justify-center">
                          <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[6px] border-l-white border-b-[3px] border-b-transparent ml-0.5"></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black uppercase tracking-widest text-sm rounded-xl shadow-[0_0_30px_rgba(176,38,255,0.3)] hover:shadow-[0_0_40px_rgba(176,38,255,0.5)] transition-all duration-300 transform active:scale-[0.99] cursor-pointer"
          >
            Отправить отзыв
          </button>
        </form>

      </div>
    </main>
  );
}
