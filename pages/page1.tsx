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
  const [active, setActive] = useState(true); // which video element is currently visible
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const hasQueuedNext = useRef(false); // to prevent multiple triggers

  useEffect(() => {
    const currentVideo = active ? videoRef1.current : videoRef2.current;
    const nextVideo = active ? videoRef2.current : videoRef1.current;
    if (!currentVideo || !nextVideo) return;

    hasQueuedNext.current = false;
    currentVideo.src = videoList[current];
    currentVideo.play();
    currentVideo.style.opacity = "1";
    nextVideo.style.opacity = "0";

    const handleTimeUpdate = () => {
      if (
        !hasQueuedNext.current &&
        currentVideo.duration - currentVideo.currentTime <= 1
      ) {
        hasQueuedNext.current = true;

        const nextIndex = (current + 1) % videoList.length;
        nextVideo.src = videoList[nextIndex];
        nextVideo.load();
        nextVideo.play();

        // Start crossfade
        nextVideo.style.opacity = "1";
        currentVideo.style.opacity = "0";

        // After the fade, update state
        setTimeout(() => {
          setCurrent(nextIndex);
          setActive(!active);
        }, 500); // wait for crossfade duration
      }
    };

    currentVideo.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      currentVideo.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [current, active]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Two video elements that swap */}
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

      {/* Page content */}
      <div className="relative z-10 flex items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold drop-shadow-lg">Welcome to Page 1!</h1>
      </div>
    </div>
  );
}



