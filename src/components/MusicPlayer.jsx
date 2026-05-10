import React, { useState } from 'react';
import { Howl } from 'howler';
import { Volume2, VolumeX } from 'lucide-react';
import epic from "../Assets/music/epic1.mp3";
import { motion } from 'framer-motion';

// Module-level singleton — never recreated
let globalSound = null;

const getSound = () => {
  if (!globalSound) {
    globalSound = new Howl({
      src: [epic],
      loop: true,
      volume: 0.2,      // ← lower from 0.4 to 0.2
      html5: true,      // ← ADD this back — streams audio instead of
      //   fully decoding into Web Audio buffer
      //   prevents the "explosion" on loud files
    });
  }
  return globalSound;
};

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const sound = getSound();
    if (playing) {
      sound.pause();
    } else {
      sound.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="fixed bottom-2 left-[13.5rem] sm:bottom-8 sm:left-8 z-[100] flex items-center gap-4">
      <div className="flex items-end gap-[3px] h-4">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{ height: playing ? [4, 16, 8, 16, 4] : 4 }}
            transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
            className="w-[3px] bg-indigo-500 rounded-full"
          />
        ))}
      </div>

      <button
        onClick={togglePlay}
        className="group relative flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all shadow-2xl"
      >
        <div className="text-white/70 group-hover:text-white transition-colors">
          {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </div>
        <span className="text-[10px] font-mono text-nowrap uppercase tracking-[0.2em] text-white/50 group-hover:text-white">
          {playing ? "Sound On" : "Play Music?"}
        </span>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute -top-10 left-0 bg-indigo-600 text-[10px] px-3 py-1 rounded-md whitespace-nowrap pointer-events-none"
        >
          Lofi Beats / On
        </motion.div>
      </button>
    </div>
  );
};

export default MusicPlayer;