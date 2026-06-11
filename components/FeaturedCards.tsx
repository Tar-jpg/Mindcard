"use client";

import { useRouter } from "next/navigation";
import { CARDS, type Card } from "@/lib/cards";
import { useSession } from "@/lib/session";
import { CardTile } from "./CardTile";

export function FeaturedCards({ limit }: { limit?: number }) {
  const router = useRouter();
  const { selectCard } = useSession();
  const list = limit ? CARDS.slice(0, limit) : CARDS;

  const handle = (card: Card) => {
    selectCard(card.id);
    router.push("/check-in");
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((card, i) => (
        <CardTile key={card.id} card={card} index={i} onSelect={handle} />
      ))}
    </div>
  );
}
