'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import BackgroundBackdrop from '@/components/BackgroundBackdrop';
import TopNav from '@/components/TopNav';
import Stage1Greeting from '@/components/Stage1Greeting';
import Stage2Grumpy from '@/components/Stage2Grumpy';
import Stage3Envelope from '@/components/Stage3Envelope';
import Stage4Opening from '@/components/Stage4Opening';
import Stage5Letter from '@/components/Stage5Letter';
import Stage6Reasons from '@/components/Stage6Reasons';
import Stage7Memories from '@/components/Stage7Memories';
import Stage8Cake from '@/components/Stage8Cake';
import Stage9Gift from '@/components/Stage9Gift';
import Stage10MusicPlayer from '@/components/Stage10MusicPlayer';
import Stage11TicketPrinter from '@/components/Stage11TicketPrinter';
import CustomizeModal from '@/components/CustomizeModal';
import {
  playTone,
  playEnvelopeOpenSound,
  playPaperRustle,
  playCelebrationChime,
} from '@/lib/audio';

export default function BirthdayPage() {
  const [stage, setStage] = useState(1);
  const [herName, setHerName] = useState('Souji');
  const [yourName, setYourName] = useState('Naveen');
  const [letterText, setLetterText] = useState('');
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isSongPlaying, setIsSongPlaying] = useState(false);

  const memoriesAudioRef = useRef(null);

  // Automatically play uploaded romantic song when reaching Stage 7 ("Our Sweetest Moments")
  useEffect(() => {
    if (stage >= 7 && stage <= 9 && memoriesAudioRef.current) {
      memoriesAudioRef.current.volume = 0.85;
      const playPromise = memoriesAudioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsSongPlaying(true))
          .catch((err) => {
            console.log('Playback waiting for interaction:', err);
          });
      }
    } else if (stage === 10 && memoriesAudioRef.current) {
      // Pause Stage 7-9 background instrumental when entering Stage 10 Music Player
      memoriesAudioRef.current.pause();
      setIsSongPlaying(false);
    }
  }, [stage]);

  const toggleSong = () => {
    if (!memoriesAudioRef.current) return;
    if (isSongPlaying) {
      memoriesAudioRef.current.pause();
      setIsSongPlaying(false);
    } else {
      memoriesAudioRef.current.play()
        .then(() => setIsSongPlaying(true))
        .catch(() => {});
    }
  };

  const handleRestart = () => {
    if (memoriesAudioRef.current) {
      memoriesAudioRef.current.pause();
      memoriesAudioRef.current.currentTime = 0;
      setIsSongPlaying(false);
    }
    goToStage(1);
  };

  // Load persisted user customization on mount
  useEffect(() => {
    try {
      const savedHer = localStorage.getItem('bday_her_name');
      const savedYour = localStorage.getItem('bday_your_name');
      const savedLetter = localStorage.getItem('bday_letter_text');

      if (savedHer) {
        setHerName(savedHer.charAt(0).toUpperCase() + savedHer.slice(1));
      } else {
        setHerName('Souji');
      }

      if (savedYour) setYourName(savedYour);
      if (savedLetter) setLetterText(savedLetter);
    } catch (e) {}
  }, []);

  const triggerConfetti = (x = 0.5, y = 0.5) => {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { x, y },
        colors: ['#8d1326', '#ff758f', '#ffd166', '#ffffff', '#e63946'],
      });
    }
  };

  // Stage Switchers
  const goToStage = (targetStage) => {
    setStage(targetStage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playTone(480, 'sine', 0.15, 0.1);
  };

  const handleStage1Yes = () => {
    triggerConfetti(0.5, 0.6);
    playCelebrationChime();
    goToStage(3); // To Envelope
  };

  const handleStage1No = () => {
    goToStage(2); // To Grumpy Cat
  };

  const handleStage2Back = () => {
    playTone(320, 'triangle', 0.3, 0.15);
    goToStage(1);
  };

  const handleOpenEnvelope = () => {
    playEnvelopeOpenSound();
    triggerConfetti(0.5, 0.5);
    goToStage(4); // Flap open
  };

  const handleTapLetter = () => {
    playPaperRustle();
    triggerConfetti(0.5, 0.5);
    goToStage(5); // Full Letter
  };

  const handleSaveCustom = (customData) => {
    const formattedHer = customData.herName.charAt(0).toUpperCase() + customData.herName.slice(1);
    setHerName(formattedHer);
    setYourName(customData.yourName);
    setLetterText(customData.letterText);

    try {
      localStorage.setItem('bday_her_name', formattedHer);
      localStorage.setItem('bday_your_name', customData.yourName);
      localStorage.setItem('bday_letter_text', customData.letterText);
    } catch (e) {}
  };

  const handleResetCustom = () => {
    try {
      localStorage.removeItem('bday_her_name');
      localStorage.removeItem('bday_your_name');
      localStorage.removeItem('bday_letter_text');
      localStorage.removeItem('bday_custom_photos');
    } catch (e) {}
    setHerName('Souji');
    setYourName('Naveen');
    setLetterText('');
    setIsCustomizeOpen(false);
  };

  return (
    <>
      {/* Background with Glimmer, Lilies, Petals & Sparkles */}
      <BackgroundBackdrop />

      {/* Floating Top Navigation */}
      <TopNav
        openCustomizeModal={() => setIsCustomizeOpen(true)}
        stage={stage}
        isSongPlaying={isSongPlaying}
        toggleSong={toggleSong}
      />

      {/* Main Experience Card Wrapper */}
      <main className="card-stage-wrapper">
        {stage === 1 && (
          <Stage1Greeting onYes={handleStage1Yes} onNo={handleStage1No} />
        )}

        {stage === 2 && (
          <Stage2Grumpy onClickBack={handleStage2Back} />
        )}

        {stage === 3 && (
          <Stage3Envelope onOpen={handleOpenEnvelope} />
        )}

        {stage === 4 && (
          <Stage4Opening onTapLetter={handleTapLetter} />
        )}

        {stage === 5 && (
          <Stage5Letter
            herName={herName}
            yourName={yourName}
            letterText={letterText}
            onNext={() => goToStage(6)}
          />
        )}

        {stage === 6 && (
          <Stage6Reasons onNext={() => goToStage(7)} />
        )}

        {stage === 7 && (
          <Stage7Memories
            onNext={() => goToStage(8)}
            isSongPlaying={isSongPlaying}
            toggleSong={toggleSong}
          />
        )}

        {stage === 8 && (
          <Stage8Cake herName={herName} onNext={() => goToStage(9)} />
        )}

        {stage === 9 && (
          <Stage9Gift
            herName={herName}
            yourName={yourName}
            onNext={() => goToStage(10)}
          />
        )}

        {stage === 10 && (
          <Stage10MusicPlayer
            herName={herName}
            yourName={yourName}
            onNext={() => goToStage(11)}
            onRestart={handleRestart}
          />
        )}

        {stage === 11 && (
          <Stage11TicketPrinter
            herName={herName}
            yourName={yourName}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Personalize Modal */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        herName={herName}
        yourName={yourName}
        letterText={letterText}
        onSave={handleSaveCustom}
        onReset={handleResetCustom}
      />

      {/* Romantic Melody for Our Sweet Memories */}
      <audio ref={memoriesAudioRef} src="/memories-song.mp3" loop preload="auto" />
    </>
  );
}
