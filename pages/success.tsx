import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Success() {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[url('/backgrounds/backgroundhearts.jpg')] bg-cover bg-center overflow-hidden">
      {/* Floating Hearts */}
      <div className="absolute top-0 left-1/4 animate-float-heart text-pink-300 text-2xl">💖</div>
      <div className="absolute top-10 right-1/4 animate-float-heart text-pink-400 text-xl delay-200">💗</div>
      <div className="absolute top-20 left-1/3 animate-float-heart text-pink-200 text-3xl delay-500">💘</div>

      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
        Profile Updated!
      </h1>
      <p className="text-lg md:text-2xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
        You look SOOOOO much CUTER NOW BABY!!
      </p>
    </main>
  );
}

