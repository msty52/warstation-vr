"use client";

import { useRouter } from "next/navigation";
import { gamesData } from "@/data/games";
import { useEffect, useState } from "react";

export default function GameClient({ id }: { id: string }) {
  const router = useRouter();
  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const foundGame = gamesData.find((g) => String(g.id) === String(id));
      setGame(foundGame);
    }
  }, [id]);

  if (!game) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <button 
        onClick={() => router.back()} 
        className="mb-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
      >
        Назад
      </button>
      <h1 className="text-3xl font-bold mb-4">{game.title}</h1>
      <p className="text-zinc-400">{game.description}</p>
    </div>
  );
}
