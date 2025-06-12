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
  const [textIndex, setTextIndex] = useState(-1); // start at -1 for initial delay
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

  // Text timing effect with initial 2s delay before first line
  useEffect(() => {
    if (textIndex >= textLines.length) return;

    if (textIndex === -1) {
      // initial 2s delay before first line
      const initialDelay = setTimeout(() => setTextIndex(0), 2000);
      return () => clearTimeout(initialDelay);
    }

    const show = setTimeout(() => setShowText(true), 0); // show immediately when index changes
    const hide = setTimeout(() => setShowText(false), 5000); // hide after 5s
    const next = setTimeout(() => setTextIndex((prev) => prev + 1), 6000); // total 6s per line

    return () => {
      clearTimeout(show);
      clearTimeout(hide);
      clearTimeout(next);
    };
  }, [textIndex]);

  const handleDoomClick = () => {
    // PayPal send money to @BimboKayla, $10 preset
    // PayPal.me link with amount: https://paypal.me/username/amount
    // Unfortunately paypal.me doesn't support usernames with @ symbol, so fallback to paypal.com send screen URL:
    const paypalUrl = "https://www.paypal.com/paypalme/BimboKayla/10";
    // If paypal.me doesn't work because of username, fallback to send money link:
    // https://www.paypal.com/sendmoney?recipient=... (but that is not a public documented URL)
    // So safest is paypal.me link

    window.location.href = paypalUrl;
  };

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
      {textIndex >= 0 && textIndex < textLines.length && (
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            text-white font-bold text-center px-6 transition-opacity duration-1000
            ${
              showText ? "opacity-100" : "opacity-0"
            }
            drop-shadow-[0_0_8px_hotpink]
            sparkle-text
            text-6xl md:text-[7rem] leading-tight
            `}
          style={{ whiteSpace: "pre-wrap" }}
        >
          {textLines[textIndex]}
        </div>
      )}

      {/* Doom Button after last text */}
      {textIndex >= textLines.length && (
        <button
          onClick={handleDoomClick}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            bg-purple-700 hover:bg-purple-900 transition-colors duration-300
            text-white font-extrabold text-5xl md:text-[8rem] px-12 py-6 rounded-lg drop-shadow-lg"
          aria-label="Doom Button"
          type="button"
        >
          ☠Doom Button☠
        </button>
      )}

      {/* Optional fallback content */}
      <div className="relative z-10 flex items-center justify-center h-full text-white pointer-events-none" />
      <style jsx>{`
        /* Sparkle animation for text */
        @keyframes sparkle {
          0%, 100% {
            text-shadow:
              0 0 2px hotpink,
              0 0 10px hotpink,
              0 0 20px #ff69b4,
              0 0 30px #ff69b4,
              0 0 40px #ff1493;
          }
          50% {
            text-shadow:
              0 0 3px #ff1493,
              0 0 15px hotpink,
              0 0 25px #ff69b4,
              0 0 35px #ff1493,
              0 0 45px #ff69b4;
          }
        }

        .sparkle-text {
          animation: sparkle 2s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}






