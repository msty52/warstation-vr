import { gamesData } from "@/data/games";
import GameClient from "./GameClient";

export function generateStaticParams() {
  return gamesData.map((game) => ({
    id: String(game.id),
  }));
}

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <GameClient id={resolvedParams.id} />;
}
