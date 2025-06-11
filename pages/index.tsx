import React, { useEffect, useState } from "react";

type ImageItem = {
  id: number;
  src: string;
  top: string;
  left: string;
};

export default function Home() {
  const redirectToTwitter = () => {
    window.location.href = "/api/auth/twitter";
  };

  const [emojis, setEmojis] = useState<
    { id: number; left: string; delay: string; size: string; emoji: string; color: string }[]
  >([]);

  const [images, setImages] = useState<ImageItem[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const emojiSet = ["✨", "🌺", "🌼", "🔥", "💦", "💋"];
    const colors = ["text-pink-300", "text-yellow-300", "text-red-400", "text-blue-300"];
    const sizes = ["text-xl", "text-2xl", "text-3xl"];

    const generateEmojis = () => {
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

  useEffect(() => {
    const profileFilenames = [
      "image1.jpg", "image2.jpg", "image17.jpg", "image16.jpg", "image27.jpg", "image31.png", "image28.jpg", "image20.jpg"
    ];

    const spawnImage = () => {
      const MAX_TRIES = 20;
      let tries = 0;
      let newImage: ImageItem | null = null;

      while (tries < MAX_TRIES) {
        const topPercent = Math.random() * 90;
        const leftPercent = Math.random() * 90;

        // Skip central area (35% - 65%)
        if (
          topPercent >= 35 && topPercent <= 65 &&
          leftPercent >= 35 && leftPercent <= 65
        ) {
          tries++;
          continue;
        }

        // Avoid overlap (min 64px distance)
        const isOverlapping = images.some(img => {
          const deltaX = Math.abs(parseFloat(img.left) - leftPercent);
          const deltaY = Math.abs(parseFloat(img.top) - topPercent);
          return deltaX < 8 && deltaY < 8; // since 1% ~ 8px on 800px screen
        });

        if (!isOverlapping) {
          newImage = {
            id: nextId,
            src: `/profiles/${profileFilenames[Math.floor(Math.random() * profileFilenames.length)]}`,
            top: `${topPercent}%`,
            left: `${leftPercent}%`,
          };
          break;
        }

        tries++;
      }

      if (newImage) {
        setImages(prev => [...prev, newImage]);
        setNextId(prev => prev + 1);

        setTimeout(() => {
          setImages(prev => prev.filter(img => img.id !== newImage!.id));
        }, 8000); // 4s fade in + 4s fade out
      }
    };

    const interval = setInterval(() => {
      spawnImage();
    }, 2000); // Spawn every 2s

    return () => clearInterval(interval);
  }, [nextId, images]);

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

      {/* Floating Profile Images (now 2x size, 64x64px) */}
      {images.map((img) => (
        <img
          key={img.id}
          src={img.src}
          className="absolute w-32 h-32 object-cover rounded-md animate-fade-in-out opacity-80 pointer-events-none"
          style={{ top: img.top, left: img.left }}
          alt="Floating profile"
        />
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
