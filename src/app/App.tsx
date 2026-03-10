import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Popcorn, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

export default function App() {
  const [answer, setAnswer] = useState<"yes" | "maybe" | "no" | null>(null);
  const [maybePosition, setMaybePosition] = useState({
    x: 0,
    y: 0,
  });
  const [noPosition, setNoPosition] = useState({
    x: 0,
    y: 0,
  });
  const [buttonSize, setButtonSize] = useState({ width: 0, height: 0 });
  const [noButtonSize, setNoButtonSize] = useState({ width: 0, height: 0 });
  const maybeButtonRef = useRef<HTMLButtonElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        ) || window.innerWidth < 768
      );
    }
    return false;
  });

  const handleYes = () => {
    setAnswer("yes");
    setShowConfetti(true);
  };

  const handleMaybeHover = () => {
    if (!maybeButtonRef.current) return;

    const width = maybeButtonRef.current.offsetWidth;
    const height = maybeButtonRef.current.offsetHeight;

    if (buttonSize.width === 0) {
      setButtonSize({ width, height });
    }

    const padding = 20;
    const maxX = window.innerWidth - width - padding;
    const maxY = window.innerHeight - height - padding;

    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(padding, Math.random() * maxY);

    setMaybePosition({ x: randomX, y: randomY });
  };

  const handleMaybe = () => {
    setAnswer("maybe");
  };

  const handleNoHover = () => {
    if (!noButtonRef.current) return;

    const width = noButtonRef.current.offsetWidth;
    const height = noButtonRef.current.offsetHeight;

    if (noButtonSize.width === 0) {
      setNoButtonSize({ width, height });
    }

    const padding = 20;
    const maxX = window.innerWidth - width - padding;
    const maxY = window.innerHeight - height - padding;

    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(padding, Math.random() * maxY);

    setNoPosition({ x: randomX, y: randomY });
  };

  const handleNoPointer = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleNoHover();
  };

  useEffect(() => {
    if (answer === "yes") {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [answer]);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      setIsMobile(isMobileDevice || window.innerWidth < 768);
    };

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden relative bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1608170825938-a8ea0305d46c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWElMjByb21hbnRpYyUyMG5pZ2h0fGVufDF8fHx8MTc3MzA1NzU5MHww&ixlib=rb-4.1.0&q=80&w=1080')`,
        }}
      />

      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              scale: 0.5 + Math.random() * 0.5,
            }}
            animate={{
              y: -100,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          >
            <Heart fill="currentColor" size={24} />
          </motion.div>
        ))}
      </div>

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  scale: 1,
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0,
                  rotate: Math.random() * 360,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
              >
                <Heart
                  fill={
                    i % 3 === 0
                      ? "#ec4899"
                      : i % 3 === 1
                        ? "#f472b6"
                        : "#fda4af"
                  }
                  color={
                    i % 3 === 0
                      ? "#ec4899"
                      : i % 3 === 1
                        ? "#f472b6"
                        : "#fda4af"
                  }
                  size={20}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 min-h-screen w-full px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <Popcorn className="text-yellow-300 mx-auto w-10 h-10 sm:w-12 sm:h-12" />
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-6 px-2 sm:px-4 leading-tight"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            Will You Watch
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300">
              Dhurander 2
            </span>
            <br />
            With Me?
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-pink-200 max-w-2xl mx-auto px-2 sm:px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            I promise popcorn, laughs, and a great time 🍿✨
          </motion.p>
        </motion.div>

        {/* Movie Poster Section */}
        <motion.div
          className="max-w-sm sm:max-w-md md:max-w-lg mx-auto mb-8 sm:mb-12 md:mb-16 px-2 sm:px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 rounded-2xl blur-2xl opacity-50"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
            <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-2xl border-2 border-pink-300/30">
              <ImageWithFallback
                src="/images/bunny/tenor.gif"
                alt="Cute bunny GIF"
                className="w-full h-auto rounded-xl shadow-2xl object-contain max-h-[300px] sm:max-h-[400px] md:max-h-[500px]"
              />
              <motion.div
                className="absolute top-1 right-1 sm:top-2 sm:right-2"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Sparkles className="text-yellow-300 w-6 h-6 sm:w-8 sm:h-8" />
              </motion.div>
            </div>
          </div>
          <motion.p
            className="text-center mt-4 sm:mt-6 text-pink-100 italic text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            "This movie will be even better if you watch it with me." 💕
          </motion.p>
        </motion.div>

        {/* Cute Message Section */}
        <motion.div
          className="max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16 text-center px-2 sm:px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-pink-300/30 shadow-2xl">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed mb-4">
              Instead of watching this movie alone, I thought it would be
              perfect if we go together.
            </p>
            <div className="flex justify-center gap-2">
              <Heart
                fill="#ec4899"
                className="text-pink-500 w-5 h-5 sm:w-6 sm:h-6"
              />
              <Heart
                fill="#f472b6"
                className="text-pink-400 w-5 h-5 sm:w-6 sm:h-6"
              />
              <Heart
                fill="#fda4af"
                className="text-pink-300 w-5 h-5 sm:w-6 sm:h-6"
              />
            </div>
          </div>
        </motion.div>

        {/* Decision Buttons */}
        <AnimatePresence mode="wait">
          {!answer && (
            <motion.div
              className="max-w-sm sm:max-w-md mx-auto mb-8 sm:mb-12 px-2 sm:px-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 1.5 }}
            >
              <div className="flex flex-col gap-4 sm:gap-6">
                <motion.button
                  onClick={handleYes}
                  className="w-full py-3 sm:py-4 md:py-6 text-base sm:text-xl md:text-2xl lg:text-3xl font-bold rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-2xl hover:shadow-pink-500/50 transition-all"
                  whileHover={{ scale: 0.95 }}
                  whileTap={{ scale: 0.95 }}
                >
                  💖 Yes, let's go!
                </motion.button>

                <motion.button
                  ref={maybeButtonRef}
                  // onMouseEnter={handleMaybeHover}
                  onClick={handleMaybe}
                  className="py-3 sm:py-4 md:py-6 text-base sm:text-xl md:text-2xl lg:text-3xl font-bold rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-2xl hover:shadow-purple-500/50 transition-all"
                  style={{
                    position: maybePosition.x !== 0 ? "fixed" : "relative",
                    left: maybePosition.x || "auto",
                    top: maybePosition.y || "auto",
                    width: maybePosition.x !== 0 ? buttonSize.width : "100%",
                    zIndex: maybePosition.x !== 0 ? 50 : "auto",
                  }}
                  whileHover={maybePosition.x === 0 ? { scale: 1.05 } : {}}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    x: maybePosition.x !== 0 ? [0, 0, 10, -10, 10, 0] : 0,
                    y: maybePosition.x !== 0 ? [0, -10, 10, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  😅 Maybe... convince me
                </motion.button>

                <motion.button
                  ref={noButtonRef}
                  onMouseEnter={handleNoHover}
                  onPointerDown={handleNoPointer}
                  className="py-3 sm:py-4 md:py-6 text-base sm:text-xl md:text-2xl lg:text-3xl font-bold rounded-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-500 text-white shadow-2xl hover:shadow-green-500/50 transition-all cursor-not-allowed select-none"
                  style={{
                    position: noPosition.x !== 0 ? "fixed" : "relative",
                    left: noPosition.x || "auto",
                    top: noPosition.y || "auto",
                    width: noPosition.x !== 0 ? noButtonSize.width : "100%",
                    zIndex: noPosition.x !== 0 ? 50 : "auto",
                  }}
                  whileHover={noPosition.x === 0 ? { scale: 1.15 } : {}}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    x: noPosition.x !== 0 ? [0, 0, 10, -10, 10, 0] : 0,
                    y: noPosition.x !== 0 ? [0, -10, 10, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  ❌ No
                </motion.button>
              </div>
            </motion.div>
          )}

          {answer === "yes" && (
            <motion.div
              className="max-w-xl sm:max-w-2xl mx-auto text-center px-2 sm:px-4 mb-8 sm:mb-12"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="inline-block mb-3 sm:mb-4"
                >
                  <Sparkles className="text-yellow-300 w-12 h-12 sm:w-16 sm:h-16" />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                  Yay! 🎉
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-4 sm:mb-6">
                  Date confirmed! I'll plan the popcorn. 🍿
                </p>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart
                    fill="white"
                    className="text-white mx-auto w-10 h-10 sm:w-12 sm:h-12"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}

          {answer === "no" && (
            <motion.div
              className="max-w-xl sm:max-w-2xl mx-auto text-center px-2 sm:px-4 mb-8 sm:mb-12"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                  Oh No... 😢
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-100 mb-4 sm:mb-6">
                  That's okay! Maybe next time? 💔
                </p>
                <motion.button
                  onClick={() => setAnswer(null)}
                  className="mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-bold rounded-full bg-white text-green-600 shadow-xl hover:bg-green-50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Go Back
                </motion.button>
              </div>
            </motion.div>
          )}

          {answer === "maybe" && (
            <motion.div
              className="max-w-xl sm:max-w-2xl mx-auto text-center px-2 sm:px-4 mb-8 sm:mb-12"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                  Let me convince you... 😊
                </h2>
                <div className="space-y-3 sm:space-y-4 text-left text-white text-sm sm:text-base md:text-lg lg:text-xl">
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    ✨ Unlimited popcorn (your favorite flavor!)
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    💕 The best seat in the theater
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    🥤 Your favorite drink
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    ❤️ Quality time with me!
                  </motion.p>
                </div>
                <motion.button
                  onClick={handleYes}
                  className="mt-6 sm:mt-8 w-full py-3 sm:py-4 text-sm sm:text-lg md:text-xl lg:text-2xl font-bold rounded-full bg-white text-pink-600 shadow-xl hover:bg-pink-50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  💖 Okay, I'm convinced! Let's go!
                </motion.button>
                <motion.button
                  onClick={() => setAnswer(null)}
                  className="mt-3 sm:mt-4 w-full py-2 sm:py-3 text-sm sm:text-base md:text-lg lg:text-xl font-bold rounded-full bg-white/20 text-white border-2 border-white shadow-xl hover:bg-white/30 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  ← Go Back
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          className="text-center text-pink-200 text-xs sm:text-sm md:text-base pb-6 sm:pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="italic">Made with love just for you 💝</p>
        </motion.footer>
      </div>
    </div>
  );
}
