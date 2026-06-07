import React, { useState, useEffect, useRef } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import Envelope from './components/Envelope';
import GreetingCard from './components/GreetingCard';
import Scrapbook from './components/Scrapbook';
import NotesDeck from './components/NotesDeck';
import ThankYou from './components/ThankYou';
import RuledLetter from './components/RuledLetter';
import './App.css';

// Formatter helper for audio minutes and seconds
const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

function App() {
  const [stage, setStage] = useState(1);
  const [content, setContent] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicProgress, setMusicProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [durationTime, setDurationTime] = useState('0:59');

  // Unified audio instance ref playing continuously across cards
  const audioRef = useRef(new Audio('/Aashiyan%20Barfi%20128%20Kbps.mp3'));

  useEffect(() => {
    // 1. Fetch content configurations from Express endpoint
    fetch('/api/content')
      .then((res) => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then((data) => {
        setContent(data);
        // Sync custom track URL if defined in API
        if (data.track && data.track.src) {
          audioRef.current.src = `/${data.track.src}`;
        }
      })
      .catch((err) => {
        console.error('Failed to load backend letter configuration. Using fallback.', err);
        // Fallback static config in case backend is offline during start
        setContent({
          track: {
            name: "Ashiyan",
            tag: "A Track For You",
            src: "Aashiyan%20Barfi%20128%20Kbps.mp3",
            caption: "press play – this one always reminds me of you and our long drives."
          },
          notes: [
            { id: 1, color: "pink", header: "You Had My Back", quote: "you've covered for me, fought for me, and shown up for me more times than i can count. i noticed every single one." },
            { id: 2, color: "orange", header: "You Make Me Laugh", quote: "no one roasts me like you. no one cheers me up like you either. i'd pick our brand of nonsense any day." },
            { id: 3, color: "purple", header: "You Are My Safe Place", quote: "through every high and low, you've been my constant anchor. thank you for simply being you—my absolute favorite human." }
          ],
          memories: [
            { index: "01", img: "fan.png", caption: "the way you laugh at your own jokes — i hope you never stop." },
            { index: "02", img: "bread_cats.png", caption: "every dumb adventure with you turned out to be the best memory." },
            { index: "03", img: "idiots.png", caption: "thank you for being my first friend, and the loudest one." }
          ],
          letter: {
            tagHeader: "✦ A letter, just for you ✦",
            dear: "Dear bestie,",
            paragraphs: [
              "I'm not great at this — saying soft stuff to your face — so I made you a tiny page instead. a song, our pictures, and a few things I actually mean.",
              "thank you for being the loudest, most chaotic, most reliable person in my corner. for the late-night plans, the random calls, and every time you pretended not to notice I was a mess.",
              "I hope today feels like yours. I hope someone gets the order right, the wifi doesn't drop, and you laugh at least once for no reason. and I hope you know — even when I don't say it — I'm so glad you're my best friend."
            ],
            signature: "with love (and zero regrets),",
            tagFooter: "— YOUR DUMB FRIEND",
            outsideFooter: "WITH LOVE · YOUR DUMB FRIEND"
          }
        });
      });

    // 2. Wire audio state triggers
    const audio = audioRef.current;
    audio.loop = true;

    const handleLoadedMetadata = () => {
      setDurationTime(formatTime(audio.duration));
    };

    const handleTimeUpdate = () => {
      setCurrentTime(formatTime(audio.currentTime));
      const pct = (audio.currentTime / (audio.duration || 59)) * 100;
      setMusicProgress(pct);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.pause();
    };
  }, []);

  const playMusic = () => {
    audioRef.current.play()
      .then(() => {
        setMusicPlaying(true);
      })
      .catch((err) => {
        console.log('Autoplay blocked by browser. Awaiting user action.');
      });
  };

  const pauseMusic = () => {
    audioRef.current.pause();
    setMusicPlaying(false);
  };

  const toggleMusic = () => {
    if (musicPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const handleScrub = (ratio) => {
    const audio = audioRef.current;
    const target = ratio * (audio.duration || 59);
    audio.currentTime = target;
  };

  const handleReset = () => {
    pauseMusic();
    audioRef.current.currentTime = 0;
    setStage(1);
  };

  // Trigger autoplay on Stage 2 Greeting Card entry
  const handleEnvelopeComplete = () => {
    setStage(2);
    setTimeout(() => {
      playMusic();
    }, 500);
  };

  if (!content) {
    return <div style={{ color: '#5a7fa8', fontWeight: 600 }}>Loading Bestie Card... 🌸</div>;
  }

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      {/* Floating Canvas */}
      <ParticleCanvas />

      {/* Stage Router */}
      {stage === 1 && (
        <Envelope onComplete={handleEnvelopeComplete} />
      )}

      {stage === 2 && (
        <GreetingCard
          track={content.track}
          musicPlaying={musicPlaying}
          musicProgress={musicProgress}
          currentTime={currentTime}
          durationTime={durationTime}
          toggleMusic={toggleMusic}
          onScrub={handleScrub}
          onNext={() => setStage(3)}
        />
      )}

      {stage === 3 && (
        <Scrapbook
          memories={content.memories}
          onNext={() => setStage(1.5)}
        />
      )}

      {stage === 1.5 && (
        <NotesDeck
          notes={content.notes}
          onNext={() => setStage(1.7)}
        />
      )}

      {stage === 1.7 && (
        <ThankYou
          onNext={() => setStage(4)}
        />
      )}

      {stage === 4 && (
        <RuledLetter
          letter={content.letter}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;
