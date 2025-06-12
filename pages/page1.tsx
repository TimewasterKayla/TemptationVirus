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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // When the current video ends, go to the next
    const handleEnded = () => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoList.length);
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    // Update the video source and play it
    const video = videoRef.current;
    if (video) {
      video.src = videoList[currentVideoIndex];
      video.load();
      video.play().catch((err) => {
        // Prevent autoplay errors (e.g., if not user-interacted yet)
        console.warn("Autoplay failed", err);
      });
    }
  }, [currentVideoIndex]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center text-white">
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
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

