import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function Success() {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  // Generate floating heart configs
  const [hearts, setHearts] = useState<
    { id: number; left: string; delay: string; size: string; emoji: string; color: string }[]
  >([]);

  useEffect(() => {
    const generateHearts = () => {
      const heartEmojis = ['💖', '💗', '💘', '💕', '💞'];
      const colors = ['text-pink-200', 'text-pink-300', 'text-pink-400'];
      const sizes = ['text-xl', 'text-2xl', 'text-3xl'];

      return Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: `${Math.floor(Math.random() * 90)}%`,
        delay: `${Math.random() * 5}s`,
        size: sizes[Math.floor(Math.random() * sizes.length)],
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    setHearts(generateHearts());
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[url('/backgrounds/backgroundhearts.jpg')] bg-cover bg-center overflow-hidden">
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`absolute top-full animate-float-heart ${heart.color} ${heart.size}`}
          style={{
            left: heart.left,
            animationDelay: heart.delay,
          }}
        >
          {heart.emoji}
        </div>
      ))}

<h1 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-strong-tight">
  💖Profile Updated!💖
</h1>
<p className="text-lg md:text-2xl text-white drop-shadow-strong-tight">
  You look SOOOOO much CUTER NOW BABY!!
  <br />
  <br />
  <span className="text-pink-300 italic glow-white">~Kayla xoxo</span>
</p>
    </main>
  );
}


