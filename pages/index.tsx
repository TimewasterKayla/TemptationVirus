import React, { useEffect, useState } from "react";

export default function Home() {
  const redirectToTwitter = () => {
    window.location.href = "/api/auth/twitter";
  };

  // Generate floating emoji configs
  const [emojis, setEmojis] = useState<
    { id: number; left: string; delay: string; size: string; emoji: string; color: string }[]
  >([]);

  useEffect(() => {
    const generateEmojis = () => {
      const emojiSet = ['✨', '🌺', '🌼', '🔥', '💦', '💋'];
      const colors = ['text-pink-300', 'text-yellow-300', 'text-red-400', 'text-blue-300'];
      const sizes = ['text-xl', 'text-2xl', 'text-3xl'];

      return Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: `${Math.floor(Math.random() * 90)}%`,
        delay: `${Math.random() * 5}s`,
        size: sizes[Math.floor(Math.random() * sizes.length)],
        emoji: emojiSet[Math.floor(Math.random() * emojiSet.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    setEmojis(generateEmojis());
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[url('/backgrounds/backgroundhearts.jpg')] bg-cover bg-center overflow-hidden">
      {/* Floating Emojis */}
      {emojis.map((item) => (
        <div
          key={item.id}
          className={`absolute top-full animate-float-heart ${item.color} ${item.size}`}
          style={{
            left: item.left,
            animationDelay: item.delay,
          }}
        >
          {item.emoji}
        </div>
      ))}

      <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-strong-tight">
        💖Suspicious Button💖
      </h1>
      <button
        className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors duration-200 font-semibold drop-shadow-md"
        onClick={redirectToTwitter}
      >
        🎀Click Meee🎀
      </button>
    </main>
  );
}
