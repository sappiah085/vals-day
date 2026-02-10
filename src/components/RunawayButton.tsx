import { useState, useRef, useCallback } from "react";

const sassy = [
  "Nope! 🙅‍♀️",
  "Try again! 😏",
  "Can't catch me! 🏃‍♀️",
  "Lol nice try 😂",
  "Not today! 💅",
  "You sure?? 🤔",
  "Think again! 🧠",
  "WRONG ANSWER 🚫",
  "Nah fam 😤",
  "Are you blind?? 👀",
  "Press the other one! ➡️",
  "I'm too fast 🏎️",
  "Error 404: No not found 😜",
  "Bro really tried 💀",
  "SIKE! 🤣",
];

const memes = [
  "https://media.giphy.com/media/3o7TKwmnDgQb5jemjK/giphy.gif",
  "https://media.giphy.com/media/l1J9u3TZfpmeDLkD6/giphy.gif",
  "https://media.giphy.com/media/3oEjHAUOqG3lSS0f1C/giphy.gif",
];

interface RunawayButtonProps {
  onAttempt: (count: number) => void;
}

const RunawayButton = ({ onAttempt }: RunawayButtonProps) => {
  const [text, setText] = useState("No 😢");
  const [attempts, setAttempts] = useState(0);
  const [showMeme, setShowMeme] = useState<string | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const moveButton = useCallback(() => {
    if (!btnRef.current) return;
    const viewW = window.innerWidth;
    const viewH = window.innerHeight;
    const btnW = btnRef.current.offsetWidth;
    const btnH = btnRef.current.offsetHeight;

    const maxX = viewW - btnW - 20;
    const maxY = viewH - btnH - 20;

    const newX = Math.max(20, Math.random() * maxX);
    const newY = Math.max(20, Math.random() * maxY);

    btnRef.current.style.position = "fixed";
    btnRef.current.style.left = `${newX}px`;
    btnRef.current.style.top = `${newY}px`;
    btnRef.current.style.transition = "all 0.15s ease-out";
    btnRef.current.style.zIndex = "9999";
  }, []);

  const handleInteraction = useCallback(() => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    onAttempt(newAttempts);

    setText(sassy[Math.floor(Math.random() * sassy.length)]);
    moveButton();

    // Show meme every 5 attempts
    if (newAttempts % 5 === 0) {
      const meme = memes[Math.floor(Math.random() * memes.length)];
      setShowMeme(meme);
      setTimeout(() => setShowMeme(null), 3000);
    }

    // Shake the whole page every 3 attempts
    if (newAttempts % 3 === 0) {
      document.body.style.animation = "shake 0.5s ease-in-out";
      setTimeout(() => {
        document.body.style.animation = "";
      }, 500);
    }
  }, [attempts, moveButton, onAttempt]);

  return (
    <div>
      <button
        ref={btnRef}
        onMouseEnter={() => {
          handleInteraction();
        }}
        className="px-8 py-4  z-10000 rounded-full bg-pink-200 font-bold text-lg
          cursor-pointer select-none transition-all duration-150 hover:bg-muted
          shadow-lg"
      >
        {text}
      </button>

      {showMeme && (
        <div className="fixed inset-0 flex items-center justify-center z-10000 pointer-events-none">
          <div className="bg-card rounded-2xl p-4 shadow-2xl border-4 border-primary animate-[heartbeat_0.6s_ease-in-out_infinite]">
            <img
              src={showMeme}
              alt="meme"
              className="w-64 h-64 object-cover rounded-xl"
            />
            <p className="text-center text-primary mt-2 text-lg">
              Come on say yes 🫢 !!!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RunawayButton;
