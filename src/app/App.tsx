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

  const handleYes = () => {
    setAnswer("yes");
    setShowConfetti(true);
  };

  const handleMaybeHover = () => {
    if (!maybeButtonRef.current) return;

    // Store button dimensions if not already stored
    if (buttonSize.width === 0) {
      setButtonSize({
        width: maybeButtonRef.current.offsetWidth,
        height: maybeButtonRef.current.offsetHeight,
      });
    }

    // Calculate boundaries accounting for button size
    const padding = 20;
    const maxX = Math.max(window.innerWidth - buttonSize.width - padding, 0);
    const maxY = Math.max(window.innerHeight - buttonSize.height - padding, 0);

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    setMaybePosition({ x: randomX, y: randomY });
  };

  const handleMaybe = () => {
    setAnswer("maybe");
  };

  const handleNoHover = () => {
    if (!noButtonRef.current) return;

    // Store button dimensions if not already stored
    if (noButtonSize.width === 0) {
      setNoButtonSize({
        width: noButtonRef.current.offsetWidth,
        height: noButtonRef.current.offsetHeight,
      });
    }

    // Calculate boundaries accounting for button size
    const padding = 20;
    const maxX = Math.max(window.innerWidth - noButtonSize.width - padding, 0);
    const maxY = Math.max(
      window.innerHeight - noButtonSize.height - padding,
      0,
    );

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    setNoPosition({ x: randomX, y: randomY });
  };

  const handleNo = () => {
    setAnswer("no");
  };

  useEffect(() => {
    if (answer === "yes") {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [answer]);

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
            <Popcorn className="text-yellow-300 mx-auto" size={48} />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-4 sm:mb-6 px-4"
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
            className="text-lg sm:text-2xl text-pink-200 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            I promise popcorn, laughs, and a great time 🍿✨
          </motion.p>
        </motion.div>

        {/* Movie Poster Section */}
        <motion.div
          className="max-w-md mx-auto mb-12 sm:mb-16 px-4"
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
                className="w-full h-auto rounded-xl shadow-2xl object-contain max-h-[500px]"
              />
              <motion.div
                className="absolute top-2 right-2"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Sparkles className="text-yellow-300" size={32} />
              </motion.div>
            </div>
          </div>
          <motion.p
            className="text-center mt-6 text-pink-100 italic text-base sm:text-lg px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            "This movie will be even better if you watch it with me." 💕
          </motion.p>
        </motion.div>

        {/* Cute Message Section */}
        <motion.div
          className="max-w-2xl mx-auto mb-12 sm:mb-16 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-pink-300/30 shadow-2xl">
            <p className="text-xl sm:text-2xl text-white leading-relaxed mb-4">
              Instead of watching this movie alone, I thought it would be
              perfect if we go together.
            </p>
            <div className="flex justify-center gap-2">
              <Heart fill="#ec4899" className="text-pink-500" size={24} />
              <Heart fill="#f472b6" className="text-pink-400" size={24} />
              <Heart fill="#fda4af" className="text-pink-300" size={24} />
            </div>
          </div>
        </motion.div>

        {/* Decision Buttons */}
        <AnimatePresence mode="wait">
          {!answer && (
            <motion.div
              className="max-w-md mx-auto mb-12 px-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 1.5 }}
            >
              <div className="flex flex-col gap-6">
                <motion.button
                  onClick={handleYes}
                  className="w-full py-6 text-2xl sm:text-3xl font-bold rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-2xl hover:shadow-pink-500/50 transition-all"
                  whileHover={{ scale: 0.95 }}
                  whileTap={{ scale: 0.95 }}
                >
                  💖 Yes, let's go!
                </motion.button>

                <motion.button
                  ref={maybeButtonRef}
                  // onMouseEnter={handleMaybeHover}
                  onClick={handleMaybe}
                  className="py-6 text-2xl sm:text-3xl font-bold rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-2xl hover:shadow-purple-500/50 transition-all"
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
                  onClick={handleNo}
                  className="py-6 text-2xl sm:text-3xl font-bold rounded-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-500 text-white shadow-2xl hover:shadow-green-500/50 transition-all cursor-pointer hover:scale-110"
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
              className="max-w-2xl mx-auto text-center px-4 mb-12"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-3xl p-8 sm:p-12 shadow-2xl">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="inline-block mb-4"
                >
                  <Sparkles className="text-yellow-300" size={64} />
                </motion.div>
                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
                  Yay! 🎉
                </h2>
                <p className="text-xl sm:text-2xl text-white mb-6">
                  Date confirmed! I'll plan the popcorn. 🍿
                </p>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart
                    fill="white"
                    className="text-white mx-auto"
                    size={48}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}

          {answer === "no" && (
            <motion.div
              className="max-w-2xl mx-auto text-center px-4 mb-12"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-500 rounded-3xl p-8 sm:p-12 shadow-2xl">
                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
                  Oh No... 😢
                </h2>
                <p className="text-xl sm:text-2xl text-green-100 mb-6">
                  That's okay! Maybe next time? 💔
                </p>
                <motion.button
                  onClick={() => setAnswer(null)}
                  className="mt-8 px-8 py-3 text-lg font-bold rounded-full bg-white text-green-600 shadow-xl hover:bg-green-50 transition-all"
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
              className="max-w-2xl mx-auto text-center px-4 mb-12"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-3xl p-8 sm:p-12 shadow-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Let me convince you... 😊
                </h2>
                <div className="space-y-4 text-left text-white text-lg sm:text-xl">
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
                  className="mt-8 w-full py-4 text-xl sm:text-2xl font-bold rounded-full bg-white text-pink-600 shadow-xl hover:bg-pink-50 transition-all"
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
                  className="mt-4 w-full py-3 text-lg sm:text-xl font-bold rounded-full bg-white/20 text-white border-2 border-white shadow-xl hover:bg-white/30 transition-all"
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
          className="text-center text-pink-200 text-sm sm:text-base pb-8"
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
