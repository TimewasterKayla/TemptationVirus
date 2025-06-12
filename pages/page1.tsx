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

export default function Page1() {
  const [current, setCurrent] = useState(0);
  const [active, setActive] = useState(true); // which video is on top
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

          // Wait for fade in, then fade out old one
          setTimeout(() => {
            currentVideo.style.opacity = "0";
            setCurrent(nextIndex);
            setActive(!active);
          }, 400); // match your transition duration
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

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
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

      <div className="relative z-10 flex items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold drop-shadow-lg">Welcome to Page 1!</h1>
      </div>
    </div>
  );
}




