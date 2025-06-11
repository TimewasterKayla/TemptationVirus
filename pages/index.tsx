import React, { useEffect, useState } from "react";

export default function Home() {
  const redirectToTwitter = () => {
    window.location.href = "/api/auth/twitter";
  };

  // Floating emojis config
  const [emojis, setEmojis] = useState<
    { id: number; left: string; delay: string; size: string; emoji: string; color: string }[]
  >([]);

  // Floating profile images config
  const [images, setImages] = useState<
    { id: number; src: string; top: string; left: string; delay: string }[]
  >([]);

  useEffect(() => {
    const generateEmojis = () => {
      const emojiSet = ["✨", "🌺", "🌼", "🔥", "💦", "💋"];
      const colors = ["text-pink-300", "text-yellow-300", "text-red-400", "text-blue-300"];
      const sizes = ["text-xl", "text-2xl", "text-3xl"];

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

    const generateImages = () => {
      return Array.from({ length: 4 }, (_, i) => ({
        id: i,
        src: `/profiles/${profileFilenames[Math.floor(Math.random() * profileFilenames.length)]}`,
        top: `${Math.random() * 80}%`,
        left: `${Math.random() * 80}%`,
        delay: `${Math.random() * 4}s`,
      }));
    };

    setImages(generateImages());

    const interval = setInterval(() => {
      setImages(generateImages());
    }, 8000); // 4s fade in + 4s fade out

    return () => clearInterval(interval);
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

      {/* Floating Profile Images */}
      {images.map((img) => (
        <img
          key={img.id}
          src={img.src}
          className="absolute w-16 h-16 object-cover rounded-md animate-fade-in-out opacity-80 pointer-events-none"
          style={{ top: img.top, left: img.left, animationDelay: img.delay }}
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
