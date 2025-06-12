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
  const [lastFilenames, setLastFilenames] = useState<string[]>([]); // Track last 5 filenames

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
    const spawnImage = async () => {
      const MAX_TRIES = 20;
      let tries = 0;
      let newImage: ImageItem | null = null;

      // Get a random image from the API
      let filename: string | null = null;
      try {
        const res = await fetch("/api/profile-images");
        const data = await res.json();
        filename = data.filename;

        // Avoid last 5 filenames
        let attempts = 0;
        while (lastFilenames.includes(filename) && attempts < 10) {
          const retryRes = await fetch("/api/profile-images");
          const retryData = await retryRes.json();
          filename = retryData.filename;
          attempts++;
        }
      } catch {
        console.error("Failed to fetch image from API");
        return;
      }

      while (tries < MAX_TRIES) {
        const topPercent = Math.random() * 90;
        const leftPercent = Math.random() * 90;

        if (
          topPercent >= 35 && topPercent <= 65 &&
          leftPercent >= 35 && leftPercent <= 65
        ) {
          tries++;
          continue;
        }

        const isOverlapping = images.some(img => {
          const existingLeftPx = (parseFloat(img.left) / 100) * window.innerWidth;
          const existingTopPx = (parseFloat(img.top) / 100) * window.innerHeight;
          const newLeftPx = (leftPercent / 100) * window.innerWidth;
          const newTopPx = (topPercent / 100) * window.innerHeight;

          const dx = existingLeftPx - newLeftPx;
          const dy = existingTopPx - newTopPx;
          const distance = Math.sqrt(dx * dx + dy * dy);

          return distance < 128;
        });

        if (!isOverlapping) {
          newImage = {
            id: nextId,
            src: `/profiles/${filename}`,
            top: `${topPercent}%`,
            left: `${leftPercent}%`,
          };
          break;
        }

        tries++;
      }

      if (newImage && filename) {
        setImages(prev => [...prev, newImage]);
        setNextId(prev => prev + 1);

        // Update last filenames, keeping only the last 5
        setLastFilenames(prev => {
          const updated = [filename!, ...prev];
          return updated.slice(0, 5);
        });

        setTimeout(() => {
          setImages(prev => prev.filter(img => img.id !== newImage!.id));
        }, 8000);
      }
    };

    const interval = setInterval(() => {
      spawnImage();
    }, 2000);

    return () => clearInterval(interval);
  }, [nextId, images, lastFilenames]);

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

      {/* Floating Profile Images (2x size) */}
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
        className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors duration-200 font-semibold drop-shadow-md cursor-pointer animate-pulse-glow-pink"
        onClick={redirectToTwitter}
      >
        🎀Click Meee🎀
      </button>
    </main>
  );
}

