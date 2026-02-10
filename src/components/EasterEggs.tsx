import { useState, useEffect, useCallback } from "react";

const secrets = [
  { id: "shake", message: "You shook the love loose! 🫨💕", emoji: "📱" },
  {
    id: "doubleTap",
    message: "Double-tap like Instagram! But this love is REAL 📸❤️",
    emoji: "💗",
  },
  {
    id: "spinText",
    message: "You spin me right round baby right round! 🎵💫",
    emoji: "🌀",
  },
  {
    id: "nightOwl",
    message: "Late night Valentine's browsing? Romantic! 🌙💕",
    emoji: "🦉",
  },
  {
    id: "scrollHunter",
    message: "You scrolled to the BOTTOM?! Here's a secret kiss 💋",
    emoji: "👇",
  }
];

interface EasterEggsProps {
  noAttempts: number;
}

const EasterEggs = ({ noAttempts }: EasterEggsProps) => {
  const [found, setFound] = useState<Set<string>>(new Set());
  const [activeSecret, setActiveSecret] = useState<string | null>(null);

  const revealSecret = useCallback(
    (id: string) => {
      if (found.has(id)) return;
      setFound((prev) => new Set(prev).add(id));
      setActiveSecret(id);
      setTimeout(() => setActiveSecret(null), 3500);
    },
    [found],
  );

  // Device shake detection (mobile)
  useEffect(() => {
    let lastX = 0,
      lastY = 0,
      lastZ = 0;
    let shakeCount = 0;
    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc?.x || !acc?.y || !acc?.z) return;
      const delta =
        Math.abs(acc.x - lastX) +
        Math.abs(acc.y - lastY) +
        Math.abs(acc.z - lastZ);
      lastX = acc.x;
      lastY = acc.y;
      lastZ = acc.z;
      if (delta > 25) {
        shakeCount++;
        if (shakeCount > 3) {
          revealSecret("shake");
          shakeCount = 0;
        }
      }
    };
    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [revealSecret]);

  // Night owl - if browsing after midnight
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) {
      setTimeout(() => revealSecret("nightOwl"), 10000);
    }
  }, [revealSecret]);

  // Scroll to very bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      if (scrolledToBottom) revealSecret("scrollHunter");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [revealSecret]);


  const handleTap = () => {
    revealSecret("doubleTap");
  };

  const activeSecretData = secrets.find((s) => s.id === activeSecret);

  return (
    <>

      {/* Double-tap zone on the main heading area */}
      <div
        className="fixed top-1/4 left-1/2 -translate-x-1/2 w-64 h-56 z-40 cursor-pointer"
        onClick={handleTap}
      />

      {/* Spin text easter egg - hidden in corner */}
      <div
        className="fixed top-2 left-2 w-6 h-6 z-40 cursor-default opacity-0 hover:opacity-100 transition-opacity duration-1000"
        onClick={() => revealSecret("spinText")}
        title=" "
      >
        <span className="text-xs">🌀</span>
      </div>

      {/* Subtle egg counter - only shows when you've found at least 1 */}
      {found.size > 0 && (
        <div className="fixed top-4 right-4 z-50 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md border border-border/50 transition-all duration-500">
          <span className="text-xs font-bold text-primary">
            🥚 {found.size}/{secrets.length}
          </span>
          {noAttempts > 0 && (
            <span className="ml-2 text-xs text-muted-foreground">
              | 🏃 {noAttempts}
            </span>
          )}
        </div>
      )}

      {/* Secret reveal popup */}
      {activeSecretData && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] bg-card rounded-2xl p-6 shadow-2xl border-2 border-primary max-w-sm text-center animate-[heartbeat_0.8s_ease-in-out]">
          <p className="text-4xl mb-2">{activeSecretData.emoji}</p>
          <p className="text-foreground font-semibold text-sm">
            {activeSecretData.message}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Easter egg #{found.size} unlocked! 🎉
          </p>
        </div>
      )}

      {/* Messages based on No attempts */}
      {noAttempts >= 10 && (
        <div className="fixed bottom-20 right-4 z-50 bg-primary text-primary-foreground rounded-xl px-4 py-2 shadow-lg animate-[float_3s_ease-in-out_infinite] max-w-xs">
          <p className="text-sm font-bold">
            {noAttempts >= 20
              ? "BRO JUST PRESS YES ALREADY 😭😭😭"
              : noAttempts >= 15
                ? `You've tried ${noAttempts} times... the No button will NEVER work 🤣`
                : "Psst... the No button doesn't work. Just saying 👀"}
          </p>
        </div>
      )}

      {/* Hint that appears subtly after a while */}
      {found.size === 0 && (
        <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-30 opacity-0 hover:opacity-60 transition-opacity duration-1000">
          <p className="text-[10px] text-muted-foreground/40">
            try things you wouldn't normally try...
          </p>
        </div>
      )}
    </>
  );
};

export default EasterEggs;
