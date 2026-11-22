/**
 * ============================================================================
 * ROMANTIC BIRTHDAY EXPERIENCE - INTERACTIVE ENGINE
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- State & Storage Keys ---
  const STORAGE_KEY_HER_NAME = 'bday_her_name';
  const STORAGE_KEY_YOUR_NAME = 'bday_your_name';
  const STORAGE_KEY_LETTER = 'bday_letter_text';
  const STORAGE_KEY_PHOTOS = 'bday_custom_photos';

  let currentStage = 1;
  let audioContext = null;

  // --- DOM Elements ---
  const stages = {
    1: document.getElementById('stage-1'),
    2: document.getElementById('stage-2'),
    3: document.getElementById('stage-3'),
    4: document.getElementById('stage-4'),
    5: document.getElementById('stage-5'),
    6: document.getElementById('stage-6'),
    7: document.getElementById('stage-7'),
    8: document.getElementById('stage-8'),
    9: document.getElementById('stage-9'),
    10: document.getElementById('stage-10'),
    11: document.getElementById('stage-11')
  };

  // Nav controls
  const openCustomizeBtn = document.getElementById('openCustomizeBtn');
  const customizeModal = document.getElementById('customizeModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const btnSaveCustom = document.getElementById('btnSaveCustom');
  const btnResetDefault = document.getElementById('btnResetDefault');
  const inputHerName = document.getElementById('inputHerName');
  const inputYourName = document.getElementById('inputYourName');
  const inputLetterText = document.getElementById('inputLetterText');

  // Stage 1 Elements
  const btnYes = document.getElementById('btnYes');
  const btnNo = document.getElementById('btnNo');

  // Stage 2 Elements
  const btnClickBack = document.getElementById('btnClickBack');

  // Stage 3 Elements
  const sealedEnvelope = document.getElementById('sealedEnvelope');
  const waxSealBtn = document.getElementById('waxSealBtn');
  const btnOpenEnvelope = document.getElementById('btnOpenEnvelope');

  // Stage 4 Elements
  const letterPeekSlip = document.getElementById('letterPeekSlip');
  const btnTapLetter = document.getElementById('btnTapLetter');

  // Stage 5 Elements
  const btnLetterNext = document.getElementById('btnLetterNext');
  const letterSalutation = document.getElementById('letterSalutation');
  const letterSignature = document.getElementById('letterSignature');
  const letterBodyContent = document.getElementById('letterBodyContent');

  // Stage 6 Elements
  const reasonCards = document.querySelectorAll('.reason-card');
  const btnToGallery = document.getElementById('btnToGallery');

  // Stage 7 Elements
  const btnToCake = document.getElementById('btnToCake');
  const customPhotoInput = document.getElementById('customPhotoInput');

  // Stage 8 Elements
  const btnBlowCandles = document.getElementById('btnBlowCandles');
  const btnToGift = document.getElementById('btnToGift');
  const wishRevealBox = document.getElementById('wishRevealBox');
  const cakeInstruction = document.getElementById('cakeInstruction');

  // Stage 9 Elements
  const giftBoxTrigger = document.getElementById('giftBoxTrigger');
  const giftLid = document.getElementById('giftLid');
  const couponsContainer = document.getElementById('couponsContainer');
  const btnRestart = document.getElementById('btnRestart');

  // Memories Song Elements
  const memoriesAudio = document.getElementById('memoriesAudio');
  const topNavSongBtn = document.getElementById('topNavSongBtn');
  const topNavSongText = document.getElementById('topNavSongText');
  const btnToggleMemoriesSong = document.getElementById('btnToggleMemoriesSong');
  const songPillIcon = document.getElementById('songPillIcon');
  const songPillText = document.getElementById('songPillText');
  let isSongPlaying = false;

  function updateSongUI(playing) {
    isSongPlaying = playing;
    if (topNavSongBtn) {
      if (currentStage >= 7) {
        topNavSongBtn.style.display = 'inline-flex';
      }
      if (playing) {
        topNavSongBtn.classList.add('music-playing');
        if (topNavSongText) topNavSongText.textContent = 'Our Song 🎶';
      } else {
        topNavSongBtn.classList.remove('music-playing');
        if (topNavSongText) topNavSongText.textContent = 'Play Song ▶️';
      }
    }
    if (btnToggleMemoriesSong) {
      if (playing) {
        btnToggleMemoriesSong.classList.add('playing');
        if (songPillIcon) songPillIcon.textContent = '🎶';
        if (songPillText) songPillText.textContent = 'Now Playing: Our Song 💕';
      } else {
        btnToggleMemoriesSong.classList.remove('playing');
        if (songPillIcon) songPillIcon.textContent = '▶️';
        if (songPillText) songPillText.textContent = 'Click to Play Song 🎵';
      }
    }
  }

  function playMemoriesSong() {
    if (memoriesAudio) {
      memoriesAudio.volume = 0.85;
      memoriesAudio.play().then(() => {
        updateSongUI(true);
      }).catch(err => {
        console.log('Playback waiting for interaction:', err);
      });
    }
  }

  function pauseMemoriesSong() {
    if (memoriesAudio) {
      memoriesAudio.pause();
      updateSongUI(false);
    }
  }

  function toggleMemoriesSong() {
    if (isSongPlaying) {
      pauseMemoriesSong();
    } else {
      playMemoriesSong();
    }
  }

  if (topNavSongBtn) topNavSongBtn.addEventListener('click', toggleMemoriesSong);
  if (btnToggleMemoriesSong) btnToggleMemoriesSong.addEventListener('click', toggleMemoriesSong);

  // ==========================================================================
  // STAGE TRANSITIONS
  // ==========================================================================
  function switchStage(stageNum) {
    if (!stages[stageNum]) return;

    // Fade out current stage
    if (stages[currentStage]) {
      stages[currentStage].classList.remove('active-stage');
    }

    currentStage = stageNum;

    // Scroll smoothly to top of card
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Show new stage
    setTimeout(() => {
      stages[currentStage].classList.add('active-stage');
      playTone(480, 'sine', 0.15, 0.1);

      // Play instrumental song when reaching Our Sweetest Moments (Stage 7 to 9)
      if (stageNum >= 7 && stageNum <= 9 && memoriesAudio && memoriesAudio.paused) {
        playMemoriesSong();
      }
      if (stageNum === 10) {
        if (memoriesAudio) memoriesAudio.pause();
        if (playerAudio && playerAudio.paused) {
          playerAudio.volume = 0.95;
          playerAudio.play().catch(() => {});
        }
      }
      if (topNavSongBtn) {
        topNavSongBtn.style.display = stageNum >= 7 ? 'inline-flex' : 'none';
      }
      if (stageNum === 1) {
        if (memoriesAudio) {
          memoriesAudio.pause();
          memoriesAudio.currentTime = 0;
        }
        if (playerAudio) {
          playerAudio.pause();
          playerAudio.currentTime = 0;
        }
        updateSongUI(false);
      }
    }, 150);
  }

  // ==========================================================================
  // STAGE 1 INTERACTIONS
  // ==========================================================================
  btnYes.addEventListener('click', () => {
    triggerConfetti(0.5, 0.6);
    playCelebrationChime();
    switchStage(3); // Go to Sealed Envelope
  });

  // Playful 'No' button behavior: moves slightly on hover, leads to Grumpy Cat on click
  let noAttempts = 0;
  btnNo.addEventListener('mouseenter', () => {
    if (noAttempts < 2) {
      const randomX = (Math.random() - 0.5) * 50;
      const randomY = (Math.random() - 0.5) * 30;
      btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
      noAttempts++;
    }
  });

  btnNo.addEventListener('click', () => {
    btnNo.style.transform = 'none';
    switchStage(2); // Go to "HOW DARE YOU" screen
  });

  // ==========================================================================
  // STAGE 2 INTERACTIONS ("HOW DARE YOU!!!")
  // ==========================================================================
  btnClickBack.addEventListener('click', () => {
    playTone(320, 'triangle', 0.3, 0.15);
    switchStage(1); // Return to choice
  });

  // ==========================================================================
  // STAGE 3 INTERACTIONS (SEALED ENVELOPE)
  // ==========================================================================
  function openEnvelopeSequence() {
    playEnvelopeOpenSound();
    triggerHeartBurst();
    switchStage(4); // Move to opening flap & peek
  }

  if (waxSealBtn) waxSealBtn.addEventListener('click', openEnvelopeSequence);
  if (sealedEnvelope) sealedEnvelope.addEventListener('click', openEnvelopeSequence);
  if (btnOpenEnvelope) btnOpenEnvelope.addEventListener('click', openEnvelopeSequence);

  // ==========================================================================
  // STAGE 4 INTERACTIONS (TAP THE LETTER)
  // ==========================================================================
  function unfoldLetter() {
    playPaperRustle();
    triggerConfetti(0.5, 0.5);
    switchStage(5); // Show full love letter
  }

  if (letterPeekSlip) letterPeekSlip.addEventListener('click', unfoldLetter);
  if (btnTapLetter) btnTapLetter.addEventListener('click', unfoldLetter);

  // ==========================================================================
  // STAGE 5 INTERACTIONS (LOVE LETTER)
  // ==========================================================================
  btnLetterNext.addEventListener('click', () => {
    triggerHeartBurst();
    switchStage(6); // Why I Adore You
  });

  // ==========================================================================
  // STAGE 6 INTERACTIONS (REASONS FLIP CARDS)
  // ==========================================================================
  reasonCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
      playTone(520, 'triangle', 0.15, 0.08);
    });
    // Keyboard accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('is-flipped');
      }
    });
  });

  btnToGallery.addEventListener('click', () => {
    switchStage(7); // Our Memories Gallery
  });

  // ==========================================================================
  // STAGE 7 INTERACTIONS (POLAROID PHOTO UPLOAD & DISPLAY)
  // ==========================================================================
  btnToCake.addEventListener('click', () => {
    switchStage(8); // Birthday Cake
  });

  if (customPhotoInput) {
    customPhotoInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (!files.length) return;

      files.slice(0, 3).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imgElem = document.getElementById(`photo${index + 1}`);
          if (imgElem) {
            imgElem.src = event.target.result;
            // Save to localStorage
            savePhotoToStorage(index + 1, event.target.result);
          }
        };
        reader.readAsDataURL(file);
      });
      triggerConfetti(0.5, 0.7);
    });
  }

  function savePhotoToStorage(index, dataUrl) {
    try {
      let saved = JSON.parse(localStorage.getItem(STORAGE_KEY_PHOTOS) || '{}');
      saved[index] = dataUrl;
      localStorage.setItem(STORAGE_KEY_PHOTOS, JSON.stringify(saved));
    } catch (err) {
      console.warn('Storage limit reached for photos in localStorage:', err);
    }
  }

  function loadStoredPhotos() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY_PHOTOS) || '{}');
      Object.keys(saved).forEach(key => {
        if (saved[key] && typeof saved[key] === 'string' && saved[key].startsWith('data:image/')) {
          const imgElem = document.getElementById(`photo${key}`);
          if (imgElem) imgElem.src = saved[key];
        }
      });
    } catch (e) {
      console.warn('Could not load custom photos:', e);
    }
  }
  loadStoredPhotos();

  // ==========================================================================
  // STAGE 8 INTERACTIONS (BIRTHDAY CAKE & WISH)
  // ==========================================================================
  let candlesBlown = false;
  btnBlowCandles.addEventListener('click', () => {
    if (candlesBlown) return;
    candlesBlown = true;

    // Blow sound
    playBlowSound();

    // Extinguish flames
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
      flame.classList.add('flame-extinguished');
    });

    // Massive fireworks & confetti celebration
    setTimeout(() => {
      triggerGrandCelebration();
      playCelebrationFanfare();
      btnBlowCandles.classList.add('hidden');
      btnToGift.classList.remove('hidden');
      wishRevealBox.classList.remove('hidden');
      cakeInstruction.textContent = "Your wish is now soaring to the stars! ✨";
    }, 400);
  });

  btnToGift.addEventListener('click', () => {
    switchStage(9); // Gift box
  });

  // ==========================================================================
  // STAGE 9 INTERACTIONS (GIFT BOX & REPLAY)
  // ==========================================================================
  let giftOpened = false;
  giftBoxTrigger.addEventListener('click', () => {
    if (giftOpened) return;
    giftOpened = true;

    playGiftOpenSound();
    giftLid.classList.add('lid-opened');
    triggerGrandCelebration();

    setTimeout(() => {
      couponsContainer.classList.remove('hidden');
      couponsContainer.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  });

  // Stage 9 -> Stage 10 Transition
  const btnToMusicPlayer = document.getElementById('btnToMusicPlayer');
  if (btnToMusicPlayer) {
    btnToMusicPlayer.addEventListener('click', () => {
      triggerConfetti(0.5, 0.6);
      playCelebrationChime();
      switchStage(10);
    });
  }

  // ==========================================================================
  // STAGE 10: ROMANTIC MUSIC & VIDEO PLAYER LOGIC
  // ==========================================================================
  const playerAudio = document.getElementById('playerAudio');
  const playerVideo = document.getElementById('playerVideo');
  const videoPausedOverlay = document.getElementById('videoPausedOverlay');
  const playerSongTitle = document.getElementById('playerSongTitle');
  const playerArtistName = document.getElementById('playerArtistName');
  const playerAlbumWrap = document.getElementById('playerAlbumWrap');
  const playerAlbumImg = document.getElementById('playerAlbumImg');
  const playerPhotoCaption = document.getElementById('playerPhotoCaption');
  const playerScrubberTrack = document.getElementById('playerScrubberTrack');
  const playerScrubberFill = document.getElementById('playerScrubberFill');
  const playerScrubberThumb = document.getElementById('playerScrubberThumb');
  const playerTimeCurrent = document.getElementById('playerTimeCurrent');
  const playerTimeDuration = document.getElementById('playerTimeDuration');
  const btnPlayerShuffle = document.getElementById('btnPlayerShuffle');
  const btnPlayerPrev = document.getElementById('btnPlayerPrev');
  const btnPlayerPlay = document.getElementById('btnPlayerPlay');
  const svgPlayPauseIcon = document.getElementById('svgPlayPauseIcon');
  const btnPlayerNext = document.getElementById('btnPlayerNext');
  const btnPlayerLoop = document.getElementById('btnPlayerLoop');

  let isLoopEnabled = false;

  function formatTimeMinSec(sec) {
    if (isNaN(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updatePlayerProgress() {
    const media = playerVideo || playerAudio;
    if (!media) return;
    const cur = media.currentTime || 0;
    const dur = media.duration && !isNaN(media.duration) ? media.duration : 0;
    const pct = dur > 0 ? Math.min(100, (cur / dur) * 100) : 0;

    if (playerTimeCurrent) playerTimeCurrent.textContent = formatTimeMinSec(cur);
    if (playerTimeDuration) playerTimeDuration.textContent = formatTimeMinSec(dur);
    if (playerScrubberFill) playerScrubberFill.style.width = `${pct}%`;
    if (playerScrubberThumb) playerScrubberThumb.style.left = `${pct}%`;

    if (svgPlayPauseIcon) {
      if (!media.paused) {
        svgPlayPauseIcon.innerHTML = '<rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect>';
      } else {
        svgPlayPauseIcon.innerHTML = '<polygon points="6 4 20 12 6 20 6 4"></polygon>';
      }
    }
    if (videoPausedOverlay) {
      videoPausedOverlay.style.opacity = media.paused ? '1' : '0';
    }
  }

  const activeMedia = playerVideo || playerAudio;
  if (activeMedia) {
    activeMedia.addEventListener('timeupdate', updatePlayerProgress);
    activeMedia.addEventListener('loadedmetadata', updatePlayerProgress);
    activeMedia.addEventListener('play', updatePlayerProgress);
    activeMedia.addEventListener('pause', updatePlayerProgress);
  }

  if (playerAlbumWrap && playerVideo) {
    playerAlbumWrap.addEventListener('click', () => {
      if (playerVideo.paused) {
        playerVideo.play().catch(() => {});
      } else {
        playerVideo.pause();
      }
    });
  }

  if (btnPlayerPlay) {
    btnPlayerPlay.addEventListener('click', (e) => {
      e.stopPropagation();
      const media = playerVideo || playerAudio;
      if (!media) return;
      if (media.paused) {
        media.play().catch(() => {});
      } else {
        media.pause();
      }
    });
  }

  if (playerScrubberTrack) {
    playerScrubberTrack.addEventListener('click', (e) => {
      const media = playerVideo || playerAudio;
      if (!media) return;
      const rect = playerScrubberTrack.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const dur = media.duration && !isNaN(media.duration) ? media.duration : 0;
      media.currentTime = pct * dur;
    });
  }

  if (btnPlayerPrev) {
    btnPlayerPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      const media = playerVideo || playerAudio;
      if (media) {
        if (media.currentTime > 3) media.currentTime = 0;
        else media.currentTime = Math.max(0, media.currentTime - 10);
      }
    });
  }

  if (btnPlayerNext) {
    btnPlayerNext.addEventListener('click', (e) => {
      e.stopPropagation();
      const media = playerVideo || playerAudio;
      if (media) {
        media.currentTime = Math.min((media.duration || 100), media.currentTime + 10);
      }
    });
  }

  if (btnPlayerShuffle) {
    btnPlayerShuffle.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerConfetti(0.5, 0.6);
    });
  }

  if (btnPlayerLoop) {
    btnPlayerLoop.addEventListener('click', (e) => {
      e.stopPropagation();
      isLoopEnabled = !isLoopEnabled;
      const media = playerVideo || playerAudio;
      if (media) media.loop = isLoopEnabled;
      btnPlayerLoop.classList.toggle('active-loop', isLoopEnabled);
    });
  }

  // Stage 10 -> Stage 11 Transition (One More Surprise: Ticket Printer)
  const btnToOneMoreSurprise = document.getElementById('btnToOneMoreSurprise');
  const btnReprintTicket = document.getElementById('btnReprintTicket');
  const ticketSheetWrapper = document.getElementById('ticketSheetWrapper');
  const printerLed = document.getElementById('printerLed');
  const printerStatusText = document.getElementById('printerStatusText');

  function triggerTicketPrinting() {
    if (ticketSheetWrapper) {
      ticketSheetWrapper.classList.remove('sheet-printing', 'sheet-printed');
      void ticketSheetWrapper.offsetWidth; // force reflow
      ticketSheetWrapper.classList.add('sheet-printing');
    }
    if (printerLed) {
      printerLed.className = 'printer-led led-active';
    }
    if (printerStatusText) {
      printerStatusText.textContent = 'PRINTING VIRTUAL-Q COUPON...';
    }

    setTimeout(() => {
      if (ticketSheetWrapper) {
        ticketSheetWrapper.classList.remove('sheet-printing');
        ticketSheetWrapper.classList.add('sheet-printed');
      }
      if (printerLed) {
        printerLed.className = 'printer-led led-done';
      }
      if (printerStatusText) {
        printerStatusText.textContent = '✅ TICKET ISSUED & VERIFIED';
      }
      playCelebrationChime();
      triggerConfetti(0.5, 0.5);
    }, 2400);
  }

  const ayyappaAudio = document.getElementById('ayyappaAudio');

  if (btnToOneMoreSurprise) {
    btnToOneMoreSurprise.addEventListener('click', () => {
      if (playerVideo) playerVideo.pause();
      if (playerAudio) playerAudio.pause();
      triggerConfetti(0.5, 0.6);
      playCelebrationChime();
      switchStage(11);
      triggerTicketPrinting();
      if (ayyappaAudio) {
        ayyappaAudio.volume = 0.9;
        ayyappaAudio.play().catch(e => console.log('Autoplay error:', e));
      }
    });
  }

  if (btnReprintTicket) {
    btnReprintTicket.addEventListener('click', () => {
      triggerTicketPrinting();
    });
  }

  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
    // Reset state & return to stage 1
    candlesBlown = false;
    giftOpened = false;
    if (ayyappaAudio) {
      ayyappaAudio.pause();
      ayyappaAudio.currentTime = 0;
    }
    if (giftLid) giftLid.classList.remove('lid-opened');
    if (couponsContainer) couponsContainer.classList.add('hidden');
    if (btnBlowCandles) btnBlowCandles.classList.remove('hidden');
    if (btnToGift) btnToGift.classList.add('hidden');
    if (wishRevealBox) wishRevealBox.classList.add('hidden');
    
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => flame.classList.remove('flame-extinguished'));

    switchStage(1);
  });

  // ==========================================================================
  // FLOATING PETALS GENERATOR
  // ==========================================================================
  const petalsContainer = document.getElementById('petalsContainer');

  function createPetal() {
    if (!petalsContainer) return;
    const petal = document.createElement('div');
    petal.classList.add('falling-petal');

    const size = Math.random() * 14 + 10;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 7 + 7;
    const delay = Math.random() * 4;

    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;
    petal.style.left = `${startX}px`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;

    petalsContainer.appendChild(petal);

    setTimeout(() => {
      if (petal.parentNode) petal.parentNode.removeChild(petal);
    }, (duration + delay) * 1000);
  }

  // Populate initial petals
  for (let i = 0; i < 22; i++) {
    createPetal();
  }
  setInterval(createPetal, 900);

  // Floating Golden Water Sparkles
  function createSparkle() {
    if (!petalsContainer) return;
    const sparkle = document.createElement('div');
    sparkle.classList.add('floating-sparkle');

    const size = Math.random() * 8 + 4;
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const duration = Math.random() * 4 + 3;

    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${startX}px`;
    sparkle.style.top = `${startY}px`;
    sparkle.style.animationDuration = `${duration}s`;

    petalsContainer.appendChild(sparkle);

    setTimeout(() => {
      if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
    }, duration * 1000);
  }

  for (let s = 0; s < 18; s++) {
    createSparkle();
  }
  setInterval(createSparkle, 600);

  // ==========================================================================
  // WEB AUDIO API - SOUND EFFECTS
  // ==========================================================================
  function initAudioContext() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioContext = new AudioCtx();
    }
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }

  function playTone(freq, type = 'sine', duration = 0.5, volume = 0.1) {
    try {
      initAudioContext();
      if (!audioContext) return;

      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);

      gain.gain.setValueAtTime(volume, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {
      // Audio catch
    }
  }

  // Sound Effects
  function playEnvelopeOpenSound() {
    playTone(330, 'triangle', 0.2, 0.15);
    setTimeout(() => playTone(440, 'triangle', 0.2, 0.15), 80);
    setTimeout(() => playTone(554, 'sine', 0.3, 0.2), 160);
  }

  function playPaperRustle() {
    playTone(600, 'sine', 0.15, 0.08);
    setTimeout(() => playTone(720, 'sine', 0.2, 0.1), 70);
  }

  function playBlowSound() {
    playTone(180, 'sine', 0.4, 0.12);
  }

  function playCelebrationChime() {
    const notes = [523, 659, 784, 1046];
    notes.forEach((f, i) => {
      setTimeout(() => playTone(f, 'sine', 0.4, 0.1), i * 90);
    });
  }

  function playCelebrationFanfare() {
    const notes = [523, 659, 784, 1046, 1318];
    notes.forEach((f, i) => {
      setTimeout(() => playTone(f, 'sine', 0.6, 0.12), i * 110);
    });
  }

  function playGiftOpenSound() {
    playTone(400, 'triangle', 0.2, 0.15);
    setTimeout(() => playTone(600, 'triangle', 0.25, 0.18), 100);
    setTimeout(() => playTone(800, 'sine', 0.4, 0.2), 200);
  }

  // ==========================================================================
  // CONFETTI & HEARTS BURST ENGINE
  // ==========================================================================
  function triggerConfetti(originX = 0.5, originY = 0.5) {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { x: originX, y: originY },
        colors: ['#8d1326', '#ff758f', '#ffd166', '#ffffff', '#e63946']
      });
    }
  }

  function triggerHeartBurst() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 35,
        spread: 80,
        origin: { x: 0.5, y: 0.6 },
        shapes: ['circle'],
        colors: ['#ff4d6d', '#8d1326', '#ffccd5']
      });
    }
  }

  function triggerGrandCelebration() {
    if (typeof confetti !== 'function') return;

    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#ffd700', '#ff4d6d', '#8d1326', '#ffffff', '#c9184a']
    };

    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }

  // ==========================================================================
  // CUSTOMIZER / PERSONALIZATION MODAL
  // ==========================================================================
  openCustomizeBtn.addEventListener('click', () => {
    // Populate form with current values
    inputHerName.value = localStorage.getItem(STORAGE_KEY_HER_NAME) || '';
    inputYourName.value = localStorage.getItem(STORAGE_KEY_YOUR_NAME) || '';
    inputLetterText.value = localStorage.getItem(STORAGE_KEY_LETTER) || '';
    customizeModal.classList.remove('hidden');
  });

  closeModalBtn.addEventListener('click', () => {
    customizeModal.classList.add('hidden');
  });

  customizeModal.addEventListener('click', (e) => {
    if (e.target === customizeModal) {
      customizeModal.classList.add('hidden');
    }
  });

  btnSaveCustom.addEventListener('click', () => {
    const herName = inputHerName.value.trim();
    const yourName = inputYourName.value.trim();
    const letterText = inputLetterText.value.trim();

    if (herName) {
      // Capitalize first letter if lower case
      const formattedHer = herName.charAt(0).toUpperCase() + herName.slice(1);
      localStorage.setItem(STORAGE_KEY_HER_NAME, formattedHer);
      applyHerNameToAll(formattedHer);
    }

    if (yourName) {
      localStorage.setItem(STORAGE_KEY_YOUR_NAME, yourName);
      letterSignature.textContent = `${yourName} ❤️`;
      const musicPlayerYour = document.getElementById('musicPlayerYourName');
      if (musicPlayerYour) musicPlayerYour.textContent = yourName;
    }

    if (letterText) {
      localStorage.setItem(STORAGE_KEY_LETTER, letterText);
      renderCustomLetter(letterText);
    }

    customizeModal.classList.add('hidden');
    triggerConfetti(0.5, 0.5);
  });

  btnResetDefault.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY_HER_NAME);
    localStorage.removeItem(STORAGE_KEY_YOUR_NAME);
    localStorage.removeItem(STORAGE_KEY_LETTER);
    localStorage.removeItem(STORAGE_KEY_PHOTOS);
    location.reload();
  });

  function renderCustomLetter(text) {
    const paragraphs = text.split('\n').filter(p => p.trim() !== '');
    letterBodyContent.innerHTML = paragraphs.map(p => `<p>${escapeHTML(p)}</p>`).join('');
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  function applyHerNameToAll(name) {
    if (!name) return;
    const formatted = name.charAt(0).toUpperCase() + name.slice(1);
    if (letterSalutation) {
      letterSalutation.innerHTML = `Happy birthday to my favorite person, ${formatted} <span class="heart-pulse">❤️</span>`;
    }
    const stampDate = document.getElementById('letterStampDate');
    if (stampDate) stampDate.textContent = `FOR ${formatted.toUpperCase()}`;
    const wishCongrats = document.querySelector('.wish-congrats');
    if (wishCongrats) wishCongrats.textContent = `🎉 HAPPY BIRTHDAY, ${formatted.toUpperCase()}! 🎉`;
    const couponsTitle = document.querySelector('.coupons-title');
    if (couponsTitle) couponsTitle.textContent = `🎟️ ${formatted}'s Birthday Love Coupons 🎟️`;
    const musicPlayerHer = document.getElementById('musicPlayerHerName');
    if (musicPlayerHer) musicPlayerHer.textContent = formatted;
  }

  // Load custom values on startup
  function loadPersistedSettings() {
    let savedHer = localStorage.getItem(STORAGE_KEY_HER_NAME) || 'Souji';
    if (savedHer.toLowerCase() === 'souji') savedHer = 'Souji';
    applyHerNameToAll(savedHer);

    const savedYour = localStorage.getItem(STORAGE_KEY_YOUR_NAME);
    const savedLetter = localStorage.getItem(STORAGE_KEY_LETTER);

    if (savedYour && letterSignature) {
      letterSignature.textContent = `${savedYour} ❤️`;
    }
    const musicPlayerYour = document.getElementById('musicPlayerYourName');
    if (savedYour && musicPlayerYour) {
      musicPlayerYour.textContent = savedYour;
    }
    if (savedLetter && letterBodyContent) {
      renderCustomLetter(savedLetter);
    }
  }
  loadPersistedSettings();

});
