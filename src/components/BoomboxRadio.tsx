import { useState, useRef, useEffect } from "react";

const SONGS = [
  {
    name: "Kwabena Kwabena - Royal Lady",
    url: "/music/royal_lady.mp3",
  },
  {
    name: "Perfect - Ed Sheeran",
    url: "/music/perfect.mp3",
  },
  {
    name: "Sarkodie - I can't let you go",
    url: "/music/wedding.mp3",
  },

  {
    name: "Darkovibes - Inna song",
    url: "/music/inna-song.mp3",
  },
];

const BoomboxRadio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [volume, setVolume] = useState(1);
  const [vuLeft, setVuLeft] = useState(0);
  const [vuRight, setVuRight] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animFrameRef = useRef<number>(0);


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = SONGS[currentSong].url;
    audio.load();

    if (isPlaying) {
      const play = () => {
        audio.play().catch(() => {});
        audio.removeEventListener("canplay", play);
      };
      audio.addEventListener("canplay", play);
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    let running = true;
    const animateVU = () => {
      if (isPlaying) {
        setVuLeft(30 + Math.random() * 60);
        setVuRight(30 + Math.random() * 60);
      } else {
        setVuLeft(0);
        setVuRight(0);
      }
      if (running)
        animFrameRef.current = requestAnimationFrame(() =>
          setTimeout(() => animateVU(), 150),
        );
    };
    animateVU();
    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSong((pre) => (pre + 1) % SONGS.length);
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + SONGS.length) % SONGS.length);
  };

  return (
    <div className={`boombox-container ${isPlaying ? "boombox-playing" : ""}`}>
      <audio ref={audioRef} src={SONGS[currentSong].url} onEnded={nextSong} />

      {/* Main boombox body */}
      <div className="boombox">
        {/* Handle */}
        <div className="boombox-handle">
          <div className="handle-bar" />
          <div className="-left-1.5 relative top-[0.36rem] h-2.5 w-1 bg-linear-0 bg-linear from-[#555] to-[#333]" />
          <div className="-left-45.5 relative top-[0.36rem] h-2.5 w-1 bg-linear-0 bg-linear from-[#555] to-[#333]" />
        </div>

        {/* Antenna */}
        <div className="boombox-antenna" />

        {/* Top section - frequency display */}
        <div className="boombox-top">
          <div className="freq-display">
            <div className="freq-label">FM STEREO</div>
            <div className="freq-band">
              <div
                className="freq-marker"
                style={{ left: `${30 + currentSong * 25}%` }}
              />
              <div className="freq-numbers">
                {[88, 92, 96, 100, 104, 108].map((f) => (
                  <span key={f}>{f}</span>
                ))}
              </div>
            </div>
            <div className="freq-label text-right">MHz</div>
          </div>
          {/* Knobs */}
          <div className="boombox-knobs">
            <div className="knob" onClick={prevSong} title="Previous">
              <div className="knob-line" />
            </div>
            <div className="knob" onClick={nextSong} title="Next">
              <div
                className="knob-line"
                style={{ transform: "rotate(90deg)" }}
              />
            </div>
          </div>
        </div>

        {/* Middle section */}
        <div className="boombox-middle">
          {/* Left speaker */}
          <div className={`speaker ${isPlaying ? "speaker-pulse" : ""}`}>
            <div className="speaker-outer">
              <div className="speaker-inner">
                <div className="speaker-cone">
                  <div className="speaker-dome" />
                </div>
              </div>
            </div>
          </div>

          {/* Cassette deck */}
          <div className="cassette-deck relative">
            <div className="bg-[#444] rounded-xl mb-1 p-2 border-black border-2 h-25 flex items-center justify-center">
              <div className="bg-[#555] h-full w-full p-2 flex items-center justify-center rounded-lg">
                <div className="cassette-window bg-black border-2 border-black/20 ">
                  <div
                    className={`cassette-reel relative left ${isPlaying ? "reel-spin" : ""}`}
                  >
                    <div className="reel-spoke" />
                    <div className="h-[80%] w-[80%] absolute bg-black z-10 rounded-full" />
                    <div
                      className="reel-spoke"
                      style={{ transform: "rotate(60deg)" }}
                    />
                    <div
                      className="reel-spoke"
                      style={{ transform: "rotate(120deg)" }}
                    />
                  </div>
                  <div className="cassette-tape" />
                  <div
                    className={`cassette-reel relative right ${isPlaying ? "reel-spin" : ""}`}
                  >
                    <div className="h-[80%] w-[80%] absolute bg-black z-10 rounded-full" />
                    <div className="reel-spoke" />
                    <div
                      className="reel-spoke"
                      style={{ transform: "rotate(60deg)" }}
                    />
                    <div
                      className="reel-spoke"
                      style={{ transform: "rotate(120deg)" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="cassette-label">
              <span className="song-name">{SONGS[currentSong].name}</span>
            </div>
            <div className="cassette-buttons">
              <button className="tape-btn" onClick={prevSong} title="Previous">
                ⏮
              </button>
              <button
                className={`tape-btn play-btn ${isPlaying ? "active" : ""}`}
                onClick={togglePlay}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button className="tape-btn" onClick={nextSong} title="Next">
                ⏭
              </button>
            </div>
          </div>

          {/* Right speaker */}
          <div className={`speaker ${isPlaying ? "speaker-pulse" : ""}`}>
            <div className="speaker-outer">
              <div className="speaker-inner">
                <div className="speaker-cone">
                  <div className="speaker-dome" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section - VU meters */}
        <div className="boombox-bottom">
          <div className="vu-meter">
            <div className="vu-label">VU</div>
            <div className="vu-bar-bg">
              <div className="vu-bar" style={{ width: `${vuLeft}%` }} />
            </div>
          </div>
          <div className="volume-control">
            <span className="vol-label">VOL</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="vol-slider"
            />
          </div>
          <div className="vu-meter">
            <div className="vu-label">VU</div>
            <div className="vu-bar-bg">
              <div className="vu-bar" style={{ width: `${vuRight}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Music notes animation */}
      {isPlaying && (
        <div className="music-notes">
          {["♪", "♫", "♬", "♩", "♪", "♫"].map((note, i) => (
            <span
              key={i}
              className="music-note"
              style={{
                left: `${10 + i * 16}%`,
                animationDelay: `${i * 0.4}s`,
                fontSize: `${18 + Math.random() * 14}px`,
              }}
            >
              {note}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BoomboxRadio;
