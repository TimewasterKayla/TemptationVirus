import React from "react";

export default function Home() {
  const redirectToTwitter = () => {
    window.location.href = "/api/auth/twitter";
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[url('/backgrounds/backgroundhearts.jpg')] bg-cover bg-center overflow-hidden">
      {/* Floating Emojis */}
      <div className="absolute top-0 left-1/4 animate-float-heart text-yellow-300 text-2xl">✨</div>
      <div className="absolute top-10 right-1/3 animate-float-heart text-pink-400 text-3xl [animation-delay:1s]">🌺</div>
      <div className="absolute top-20 left-1/5 animate-float-heart text-yellow-400 text-xl [animation-delay:2s]">🌼</div>
      <div className="absolute top-0 right-1/5 animate-float-heart text-red-500 text-2xl [animation-delay:3s]">🔥</div>
      <div className="absolute top-10 left-1/3 animate-float-heart text-blue-300 text-2xl [animation-delay:4s]">💦</div>
      <div className="absolute top-20 right-1/4 animate-float-heart text-pink-500 text-3xl [animation-delay:5s]">💋</div>

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


