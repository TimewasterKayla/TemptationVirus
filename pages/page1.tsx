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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAActive, setIsAActive] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);

  const getActiveRef = () => (isAActive ? videoRefA : videoRefB);
  const getNextRef = () => (isAActive ? videoRefB : videoRefA);

  useEffect(() => {
    const activeRef = getActiveRef();
    const handleEnded = () => {
      const nextIndex = (currentIndex + 1) % videoList.length;
      const nextRef = getNextRef().current;
      if (!nextRef) return;

      nextRef.src = videoList[nextIndex];
      nextRef.load();

      const handleReady = () => {
        nextRef.removeEventListener("canplay", handleReady);
        nextRef.play().catch(() => {});
        setIsTransitioning(true);

        setTimeout(() => {
          setCurrentIndex(nextIndex);
          setIsAActive((prev) => !prev);
          setIsTransitioning(false);
        }, 500); // match fade duration
      };

      nextRef.addEventListener("canplay", handleReady);
    };

    const video = activeRef.current;
    if (video) {
      video.src = videoList[currentIndex];
      video.load();
      video.play().catch(() => {});
      video.addEventListener("ended", handleEnded);
    }

    return () => {
      if (video) video.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex, isAActive]);

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center text-white">
      {/* Video A */}
      <video
        ref={videoRefA}
        muted
        playsInline
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
          isAActive ? "opacity-100 z-10" : "opacity-0 z-0"
        } ${isTransitioning ? "pointer-events-none" : ""}`}
      />
      {/* Video B */}
      <video
        ref={videoRefB}
        muted
        playsInline
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
          !isAActive ? "opacity-100 z-10" : "opacity-0 z-0"
        } ${isTransitioning ? "pointer-events-none" : ""}`}
      />

      {/* Overlay content */}
      <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg z-20 pointer-events-none">
        Welcome to Page 1!
      </h1>
    </div>
  );
}


