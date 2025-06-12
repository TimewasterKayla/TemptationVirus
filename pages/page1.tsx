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
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isAActive, setIsAActive] = useState(true);

  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);

  const nextIndex = (currentVideoIndex + 1) % videoList.length;

  useEffect(() => {
    const activeRef = isAActive ? videoRefA : videoRefB;
    const nextRef = isAActive ? videoRefB : videoRefA;

    const handleEnded = () => {
      // Load next video in background ref
      if (nextRef.current) {
        nextRef.current.src = videoList[nextIndex];
        nextRef.current.load();
        nextRef.current.play().catch(() => {});
      }

      // After short delay, switch visibility
      setTimeout(() => {
        setCurrentVideoIndex(nextIndex);
        setIsAActive((prev) => !prev);
      }, 100); // short buffer to avoid flash
    };

    const activeVideo = activeRef.current;
    if (activeVideo) {
      activeVideo.src = videoList[currentVideoIndex];
      activeVideo.load();
      activeVideo.play().catch(() => {});
      activeVideo.addEventListener("ended", handleEnded);
    }

    return () => {
      if (activeVideo) {
        activeVideo.removeEventListener("ended", handleEnded);
      }
    };
  }, [currentVideoIndex, isAActive]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center text-white">
      {/* Video A */}
      <video
        ref={videoRefA}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isAActive ? "opacity-100 z-0" : "opacity-0 -z-10"
        }`}
        autoPlay
        muted
        playsInline
      />

      {/* Video B */}
      <video
        ref={videoRefB}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          !isAActive ? "opacity-100 z-0" : "opacity-0 -z-10"
        }`}
        autoPlay
        muted
        playsInline
      />

      {/* Overlay content */}
      <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg z-10">
        Welcome to Page 1!
      </h1>
    </div>
  );
}

