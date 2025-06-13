import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

export default function Success() {
  // Load Google Fonts dynamically
  useEffect(() => {
    const tangerine = document.createElement("link");
    tangerine.href = "https://fonts.googleapis.com/css2?family=Tangerine&display=swap";
    tangerine.rel = "stylesheet";

    const dynapuff = document.createElement("link");
    dynapuff.href = "https://fonts.googleapis.com/css2?family=DynaPuff&display=swap";
    dynapuff.rel = "stylesheet";

    document.head.appendChild(tangerine);
    document.head.appendChild(dynapuff);

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });

    return () => {
      document.head.removeChild(tangerine);
      document.head.removeChild(dynapuff);
    };
  }, []);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = () => {
      audio.play().catch((e) => {
        console.warn("Audio autoplay failed:", e);
      });
    };

    if (document.readyState === "complete") {
      playAudio();
    } else {
      window.addEventListener("load", playAudio);
    }

    return () => {
      window.removeEventListener("load", playAudio);
    };
  }, []);

  const [hearts, setHearts] = useState<
    { id: number; left: string; delay: string; size: string; emoji: string; color: string }[]
  >([]);

  useEffect(() => {
    const generateHearts = () => {
      const heartEmojis = ["💖", "💗", "💘", "💕", "💞"];
      const colors = ["text-pink-200", "text-pink-300", "text-pink-400"];
      const sizes = ["text-xl", "text-2xl", "text-3xl"];

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

  const handleRiskyClick = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    window.open("/page1", "_blank");
  };

  const handleSexyClick = () => {
    const tweetText = `YUMPFFF~!🔥😼💖i've liiike, TOTES devoted myself 2 @TimewasterKayla!! 🥰🎀💝

💖she's literally SUCH a 𝐇𝐀𝐖𝐓 brat~ I mean~ who could ever resist clicking 4 herr.. kayla-forever.vercel.app😻💕🌺

😇💖😵liiike~ come visit MOMMY 𝓂'𝓀𝒶𝓎~😈💋✨`;

    const tweetUrls = [
      "https://x.com/TimewasterKayla/status/1930383158836638206",
      "https://x.com/TimewasterKayla/status/1922935458125975601",
      "https://x.com/TimewasterKayla/status/1921511197485961498",
      "https://x.com/TimewasterKayla/status/1920264369444958536",
      "https://x.com/TimewasterKayla/status/1919549618679083259",
      "https://x.com/TimewasterKayla/status/1918922756433052110",
      "https://x.com/TimewasterKayla/status/1918141026843410791",
      "https://x.com/TimewasterKayla/status/1915596098636542153",
      "https://x.com/TimewasterKayla/status/1915298362376728781",
      "https://x.com/TimewasterKayla/status/1913826195986354275",
      "https://x.com/TimewasterKayla/status/1913825515192172553",
      "https://x.com/TimewasterKayla/status/1913824219487735923",
      "https://x.com/TimewasterKayla/status/1913822281169863159",
    ];

    const randomUrl = tweetUrls[Math.floor(Math.random() * tweetUrls.length)];

    const encodedText = encodeURIComponent(tweetText);
    const encodedUrl = encodeURIComponent(randomUrl);

    const deepLink = `twitter://post?message=${encodedText}%0A${encodedUrl}`;
    const webIntent = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      const timeout = setTimeout(() => {
        window.location.href = webIntent;
      }, 500);

      window.location.href = deepLink;
      window.addEventListener("blur", () => clearTimeout(timeout));
    } else {
      window.open(webIntent, "_blank");
    }
  };

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

      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-strong-tight font-dynapuff whitespace-nowrap">
        💖Profile Updated!💖
      </h1>

      <p className="text-lg md:text-2xl text-white drop-shadow-strong-tight">
        You look SOOOOO much fk'n CUTER NOW BABY!!😂
        <br />
        Here's some more CLICKY buttonz 2 play w/ DUMMY!🥰😍
        <br />
        <br />
        <span
          className="text-pink-500 italic animate-pulse-glow"
          style={{
            filter: "none",
            fontFamily: "'Tangerine', cursive",
            fontSize: "2.5rem",
            lineHeight: "1",
          }}
        >
          ~Kayla xoxo
        </span>
        <br />
      </p>

      {/* Buttons Row */}
      <div className="mt-6 flex justify-center gap-4 flex-wrap">
        <button
          onClick={handleSexyClick}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-200 font-semibold drop-shadow-md cursor-pointer animate-pulse-glow-pink whitespace-nowrap"
        >
          💄Sexy Button💄
        </button>
        <button
          onClick={handleRiskyClick}
          className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors duration-200 font-semibold drop-shadow-md cursor-pointer animate-pulse-glow-red whitespace-nowrap"
        >
          😈Risky Button😈
        </button>
      </div>

      {/* GIF Below Buttons */}
      <div className="mt-6 flex justify-center">
        <img
          src="/kayla.gif"
          alt="Kayla GIF"
          className="max-w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Autoplay audio */}
      <audio ref={audioRef} src="/prettylittlebaby.mp3" loop preload="auto" />
    </main>
  );
}


