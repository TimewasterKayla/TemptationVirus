import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Success() {
  useEffect(() => {
    // Fire confetti burst
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);
  
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Profile Updated!</h1>
      <p className="text-center">You look SOOOOO much CUTER NOW BABY!!</p>
    </main>
  );
}
