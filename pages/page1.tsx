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
  const [showText, setShowText] = useState(true);

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

    const show = setTimeout(() => setShowText(true), 1000); // 1s delay before showing
    const hide = setTimeout(() => setShowText(false), 6000); // hide after 5s

    const next = setTimeout(() => setTextIndex((prev) => prev + 1), 7000); // total 7s per line

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
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-4xl font-bold text-center px-6 transition-opacity duration-1000 ${
            showText ? "opacity-100" : "opacity-0"
          }`}
        >
          {textLines[textIndex]}
        </div>
      )}

      {/* Optional fallback content */}
      <div className="relative z-10 flex items-center justify-center h-full text-white pointer-events-none">
        {/* Empty or reserved for future UI */}
      </div>
    </div>
  );
}





