import { useState, useCallback, useEffect } from "react";
import FloatingHearts from "./components/FloatingHearts";
import RunawayButton from "./components/RunawayButton";
import EasterEggs from "./components/EasterEggs";
import SuccessScreen from "./components/SuccessScreen";
import BoomboxRadio from "./components/BoomboxRadio";

const yesGrowTexts = [
  "Yes 💖",
  "YES! 💕",
  "YESSS!! 😍",
  "YEEESSS!!! 🥰",
  "SAY YESSSSS 💍",
  "PLEASE YES 😭💖",
  "YESSSSSSSS 🔥❤️",
];

const App = () => {
  const [accepted, setAccepted] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const setClickCount = useState(0)[1];
  const [secretMode, setSecretMode] = useState(false);
  const name = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("name");
    return value;
  })[0];

  const handleNoAttempt = useCallback((count: number) => {
    setNoAttempts(count);
    // Yes button grows each time No is attempted
    setYesScale(1 + count * 0.008);
  }, []);

  const handleTitleClick = () => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 2) {
        setSecretMode(true);
        setTimeout(() => setSecretMode(false), 4000);
        return 0;
      }
      return next;
    });
  };

  if (accepted) return <SuccessScreen />;

  return (
    <div className="min-h-screen bg-valentine-gradient overflow-hidden relative">
      <FloatingHearts />
      <EasterEggs noAttempts={noAttempts} />

      {/* Secret mode overlay */}
      {secretMode && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-pink-200/80 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <p className="text-6xl"></p>
            <p className="text-2xl font-bold text-primary">You caught me 😩!</p>
            <p className="text-lg text-muted-foreground">
              Did you know who sent you this loves you ? ☕❤️
            </p>
            <img
              src="https://media1.tenor.com/m/wQSZzobnhu0AAAAd/say-yes-tina-templeton.gif"
              alt="cat love"
              className="w-48 h-48 object-cover rounded-xl mx-auto"
            />
          </div>
        </div>
      )}

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Main card */}
        <div className=" flex flex-col items-center gap-10">
          {/* Animated heart */}
          <div
            className="text-7xl cursor-pointer heart-shadow select-none"
            style={{ animation: "heartbeat 1.5s ease-in-out infinite" }}
            onClick={handleTitleClick}
            title="Click me..."
          >
            💝
          </div>

          <h1 className="text-3xl md:text-4xl font-script text-gradient-love leading-relaxed pb-5 px-4">
            Will you be my Valentine, {name}?
          </h1>
          {/* Boombox Radio */}
          <BoomboxRadio />
          <p className="text-muted-foreground text-center text-lg max-w-sm font-script">
            {noAttempts === 0
              ? "I made this just for you. Find easter eggs and say yes..🥹 .Use radio buttons to change songs while at it ❤️."
              : noAttempts < 5
                ? "The No button seems to be... malfunctioning 😏"
                : noAttempts < 10
                  ? "You've tried " + noAttempts + " times. Give up yet? 😂"
                  : noAttempts < 20
                    ? "JUST PRESS YES ALREADY 😭"
                    : "I can do this all day 🛡️❤️"}
          </p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <button
              onClick={() => setAccepted(true)}
              className="px-10 py-4 rounded-full bg-pink-300 text-primary-foreground font-bold text-lg
                shadow-lg hover:shadow-xl transition-all duration-300 border-0 cursor-pointer
                hover:brightness-110 font-script active:scale-95"
              style={{
                transform: `scale(${yesScale})`,
                transition: "transform 0.3s ease-out",
              }}
            >
              {yesGrowTexts[Math.min(noAttempts, yesGrowTexts.length - 1)]}
            </button>

            <RunawayButton onAttempt={handleNoAttempt} />
          </div>

          {noAttempts >= 3 && (
            <p className="text-xs text-muted-foreground italic animate-[fade-in_0.5s_ease-out]">
              Hint: There's only one correct answer here 💁‍♂️
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
