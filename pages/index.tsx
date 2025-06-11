import React, { useEffect, useState } from "react";

type ImageItem = {
  id: number;
  src: string;
  top: string;
  left: string;
  delay: string;
};

export default function Home() {
  const redirectToTwitter = () => {
    window.location.href = "/api/auth/twitter";
  };

  // Floating emojis
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
      const newImage: ImageItem = {
        id: nextId,
        src: `/profiles/${profileFilenames[Math.floor(Math.random() * profileFilenames.length)]}`,
        top: `${Math.random() * 80}%`,
        left: `${Math.random() * 80}%`,
        delay: '0s',
      };

      setImages(prev => [...prev, newImage]);
      setNextId(prev => prev + 1);

      // Remove after 8 seconds (4 fade in + 4 fade out)
      setTimeout(() => {
        setImages(prev => prev.filter(img => img.id !== newImage.id));
      }, 8000);
    };

    // Stagger image spawns
    const interval = setInterval(() => {
      spawnImage();
    }, 2000); // One every 2 seconds

    return () => clearInterval(interval);
  }, [nextId]);

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

      {/* Floating Profile Images */}
      {images.map((img) => (
        <img
          key={img.id}
          src={img.src}
          className="absolute w-16 h-16 object-cover rounded-md animate-fade-in-out opacity-80 pointer-events-none"
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
