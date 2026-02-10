import { useEffect } from "react";
import confetti from "canvas-confetti";

const celebrationMessages = [
  "I KNEW YOU'D SAY YES! 🥳💕",
  "Best decision of your life! 💍",
];

const SuccessScreen = () => {
  useEffect(() => {
    // Epic confetti burst
    const duration = 5000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#e11d48", "#f43f5e", "#fbbf24", "#ec4899", "#ff69b4"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#e11d48", "#f43f5e", "#fbbf24", "#ec4899", "#ff69b4"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    // Heart-shaped confetti
    const heartBurst = () => {
      confetti({
        particleCount: 100,
        spread: 160,
        origin: { y: 0.6 },
        shapes: ["circle"],
        colors: ["#e11d48", "#f43f5e", "#fbbf24", "#ec4899"],
        scalar: 1.5,
      });
    };
    setTimeout(heartBurst, 1000);
    setTimeout(heartBurst, 2500);
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-background/95 backdrop-blur-md">
      <div className="text-center space-y-8 p-8 max-w-lg">
        <div className="text-8xl animate-[heartbeat_1s_ease-in-out_infinite]">
          💖
        </div>
        <h1 className="text-5xl md:text-7xl font-script text-gradient-love leading-tight p-3">
          She said YES!
        </h1>

        <div className="space-y-4">
          {celebrationMessages.map((msg, i) => (
            <p
              key={i}
              className="text-xl font-script text-foreground font-semibold"
            >
              {msg}
            </p>
          ))}
        </div>

        <div className="mt-8 z-10">
          <img
            src="https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif"
            alt="celebration"
            className="w-64 h-48 object-cover rounded-2xl mx-auto shadow-2xl border-4 border-primary"
          />
          <p className="text-muted-foreground mt-4 font-script text-lg">
            Happy Valentine's Day, my love! 💕
          </p>
        </div>

        <div className="flex justify-center gap-4 text-4xl mt-6">
          {["🥰", "💕", "💐", "🍫", "💝", "🌹"].map((e, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                animation: `float ${2 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              {e}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
