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
        You look SOOOOO much fk'n CUTER NOW BABY!!<br />😂Here's some more CLICKY buttonz 2 play w/ DUMMY!🥰😍
        <br />
        <br />
        <span
          className="text-pink-500 italic animate-pulse-glow"
          style={{
            filter: 'none',
          }}
        >
          ~Kayla xoxo
        </span>
        <br />
      </p>
      
      {/* Buttons Row Below GIF */}
      <div className="mt-6 flex justify-center gap-4">
        <a
          href="https://twitter.com/intent/post?text=YUMPFFF~!%F0%9F%94%A5%F0%9F%98%BC%F0%9F%92%96i've%20liiike%2C%20TOTES%20devoted%20myself%202%20%40TimewasterKayla!!%20%F0%9F%A5%B0%F0%9F%8E%80%F0%9F%92%9D%0A%0A%F0%9F%92%96she's%20literally%20SUCH%20a%20%F0%9D%90%87%F0%9D%90%80%F0%9D%90%96%F0%9D%90%93%20brat~%20like~%20who%20could%20ever%20resist%20dropping%20to%20their%20knees%204%20a%20girlie%20like%20her%20omgg%F0%9F%98%BB%F0%9F%92%95%F0%9F%8C%BA%0A%0A%F0%9F%98%87%F0%9F%92%96%F0%9F%98%B5liiike~%20come%20visit%20MOMMY%20%F0%9D%93%82'%F0%9D%93%80%F0%9D%92%B6%F0%9D%93%8E%3F~%F0%9F%98%88%F0%9F%92%8B%E2%9C%A8%20&url=https%3A%2F%2Fx.com%2FTimewasterKayla%2Fstatus%2F1913822281169863159"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-200 font-semibold drop-shadow-md cursor-pointer animate-pulse-glow-pink whitespace-nowrap"
        >
          💄Sexy Button💄
        </a>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors duration-200 font-semibold drop-shadow-md cursor-pointer animate-pulse-glow-red whitespace-nowrap"
          onClick={() => (window.location.href = "/page1")}
        >
          😈Risky Button😈
        </button>
      </div>
      {/* GIF Below Buttons */}
      <div className="mt-6 flex justify-center">
        <img src="/kayla.gif" alt="Kayla GIF" className="max-w-full h-auto rounded-lg shadow-lg" />
      </div>
    </main>
  );
}




