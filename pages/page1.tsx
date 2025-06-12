// pages/page1.tsx

import { useEffect, useRef, useState } from "react";

const videoList = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
  "/videos/video4.mp4",
  "/videos/video5.mp4",
  "/videos/video6.mp4",
];

const textLines = [
  "Mommy is here for you😈💕💦🍑",
  "Clicking that button felt SEXYYYYYY😍💋🎀✨",
  "Sliiiiiiide that hand between ur legs BABY💄💫🔥",
  "Look at allllll my HAWT GIRLIESSS NGGHHH💓🙈💦💄🎀",
  "Another BUTTON is going 2 appear omfggggg🌟🌷🌻👄",
  "it's the SEXIEST one yetttttttt aaaaaaa🔥🎀💄💦",
  "once u cliiiiiick~ n' do as it sayssss🥵😇🍑",
  "you'll be brought back heree....🔥🎀👄💦",
  "4 ur HHHHOOOTTT REWARDDDD 💞😼💝🥰",
  "would i ever lead u astray....?👄👄👄",
  "just...... click.....💄✨💓⚠🚨💕🍑",
];

export default function Page1() {
  const [current, setCurrent] = useState(0);
  const [active, setActive] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [showText, setShowText] = useState(false);

  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const hasQueuedNext = useRef(false);

  useEffect(() => {
    const currentVideo = active ? videoRef1.current : videoRef2.current;
    const nextVideo = active ? videoRef2.current : videoRef1.current;
    if (!currentVideo || !nextVideo) return;

    hasQueuedNext.current = false;
    currentVideo.src = videoList[current];
    currentVideo.play();
    currentVideo.style.opacity = "1";

    const handleTimeUpdate = () => {
      const remaining = currentVideo.duration - currentVideo.currentTime;
      if (!hasQueuedNext.current && remaining <= 1) {
        hasQueuedNext.current = true;

        const nextIndex = (current + 1) % videoList.length;
        nextVideo.src = videoList[nextIndex];
        nextVideo.load();

        const onNextCanPlay = () => {
          nextVideo.play();
          nextVideo.style.opacity = "1";

          setTimeout(() => {
            currentVideo.style.opacity = "0";
            setCurrent(nextIndex);
            setActive(!active);
          }, 400);

          nextVideo.removeEventListener("canplay", onNextCanPlay);
        };

        nextVideo.addEventListener("canplay", onNextCanPlay);
      }
    };

    currentVideo.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      currentVideo.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [current, active]);

  useEffect(() => {
    if (textIndex >= textLines.length) return;

    const delayBeforeShow = 1000;

    const show = setTimeout(() => setShowText(true), delayBeforeShow);
    const hide = setTimeout(() => setShowText(false), delayBeforeShow + 5000);
    const next = setTimeout(() => setTextIndex((prev) => prev + 1), delayBeforeShow + 6000);

    return () => {
      clearTimeout(show);
      clearTimeout(hide);
      clearTimeout(next);
    };
  }, [textIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background videos */}
      <video
        ref={videoRef1}
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
      />
      <video
        ref={videoRef2}
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
      />

      {/* Centered Floating Text */}
      {textIndex < textLines.length && (
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold text-center px-6 transition-opacity duration-1000 drop-shadow-[0_0_15px_hotpink] sparkle-text max-w-[90vw] whitespace-normal break-words ${
            showText ? "opacity-100" : "opacity-0"
          }`}
          key={textIndex}
        >
          {textLines[textIndex]}
        </div>
      )}

      {/* Purple Doom Button after last line */}
      {textIndex >= textLines.length && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <a
            href="https://www.paypal.com/paypalme/BimboKayla/10"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-lg drop-shadow-lg transition-colors duration-300 cursor-pointer select-none animate-pulse-glow-purple"
          >
            ☠Doom Button☠
          </a>
        </div>
      )}

      <style jsx>{`
        @keyframes sparkle {
          0%,
          100% {
            text-shadow:
              0 0 2px hotpink,
              0 0 4px hotpink,
              0 0 6px hotpink,
              0 0 8px #ff69b4,
              0 0 10px #ff69b4;
          }
          50% {
            text-shadow:
              0 0 6px hotpink,
              0 0 10px hotpink,
              0 0 14px hotpink,
              0 0 18px #ff69b4,
              0 0 22px #ff69b4;
          }
        }
        .sparkle-text {
          animation: sparkle 2.5s ease-in-out infinite;
        }

        @media (min-width: 768px) {
          .sparkle-text {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </div>
  );
}








