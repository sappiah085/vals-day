import { useState } from "react";

interface Heart {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  emoji: string;
}

const emojis = ["❤️", "💕", "💖", "💗", "💘", "💝", "🌹", "✨", "💐", "🥰"];

const FloatingHearts = () => {
  const hearts = useState<Heart[]>(() =>
    Array.from({ length: 95 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 24,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    })),
  )[0];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute opacity-60"
          style={{
            left: `${h.left}%`,
            top: "-5%",
            fontSize: h.size,
            animation: `rain-hearts ${h.duration}s linear ${h.delay}s infinite`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
