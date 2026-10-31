/**
 * Guess The Meme Challenge - Main Application
 * Plays the audio file in assets (assets/audio/nocopyright-meme.mp3) on clicking Start.
 */

document.addEventListener('DOMContentLoaded', () => {
  const poster = document.getElementById('competition-poster');
  const landing = document.getElementById('landing-screen');
  const startBtn = document.getElementById('start-challenge-btn');
  const audioEl = document.getElementById('meme-audio') || new Audio('assets/audio/nocopyright-meme.mp3');

  // =========================================================================
  // 1. Play Asset Audio Completely and Redirect to Challenge on Finish
  // =========================================================================
  function playAssetAudioAndRedirect() {
    if (!startBtn || startBtn.classList.contains('redirecting')) return;
    startBtn.classList.add('playing');
    startBtn.classList.add('redirecting');
    createButtonRipple(startBtn);

    let hasRedirected = false;
    function redirectToChallenge() {
      if (hasRedirected) return;
      hasRedirected = true;
      window.location.href = 'challenge.html';
    }

    // Play periodic wave ripples while audio is playing
    const rippleInterval = setInterval(() => {
      if (!hasRedirected && startBtn) {
        createButtonRipple(startBtn);
      } else {
        clearInterval(rippleInterval);
      }
    }, 750);

    // Play the full audio in assets and wait for it to complete
    audioEl.currentTime = 0;
    audioEl.addEventListener('ended', redirectToChallenge, { once: true });

    const playPromise = audioEl.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Audio playback error:', err);
        // If audio playback is blocked, redirect after brief animation
        setTimeout(redirectToChallenge, 600);
      });
    }

    // Safety fallback: if ended event does not fire (e.g. background tab), redirect after audio finishes
    setTimeout(redirectToChallenge, 3200);
  }

  function createButtonRipple(button) {
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple-wave';
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 900);
  }

  if (startBtn) {
    startBtn.addEventListener('click', playAssetAudioAndRedirect);
  }

  // =========================================================================
  // Mic Test Button - Plays mic_test.mpeg completely
  // =========================================================================
  const micBtn = document.getElementById('mic-test-btn');
  const micAudio = document.getElementById('mic-test-audio') || new Audio('assets/audio/mic_test.mpeg');

  if (micBtn && micAudio) {
    micAudio.addEventListener('ended', () => {
      micBtn.classList.remove('playing');
      micAudio.currentTime = 0;
    });

    micBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!micAudio.paused) {
        micAudio.pause();
        micAudio.currentTime = 0;
        micBtn.classList.remove('playing');
      } else {
        // Pause start sound if playing
        if (audioEl && !audioEl.paused) audioEl.pause();

        micAudio.currentTime = 0;
        micAudio.play().then(() => {
          micBtn.classList.add('playing');
        }).catch((err) => {
          console.warn('Mic test audio play error:', err);
        });
      }
    });
  }

  // Keyboard accessibility: Space or Enter triggers the start button
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      playAssetAudioAndRedirect();
    }
  });

  // =========================================================================
  // 2. Interactive 3D Perspective Tilt on Mouse Move
  // =========================================================================
  if (poster && landing) {
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    landing.addEventListener('mousemove', (e) => {
      const rect = landing.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) * 2 - 1; // -1 to 1
      const normY = (y / rect.height) * 2 - 1; // -1 to 1

      targetRotY = normX * 6.5;
      targetRotX = -normY * 6.5;

      const glareX = ((x / rect.width) * 100).toFixed(1);
      const glareY = ((y / rect.height) * 100).toFixed(1);
      poster.style.setProperty('--glare-x', `${glareX}%`);
      poster.style.setProperty('--glare-y', `${glareY}%`);
    });

    landing.addEventListener('mouseleave', () => {
      targetRotX = 0;
      targetRotY = 0;
    });

    function animateTilt() {
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;
      poster.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;
      requestAnimationFrame(animateTilt);
    }
    animateTilt();
  }

  // =========================================================================
  // 3. Floating Golden Embers Particle Canvas
  // =========================================================================
  const canvas = document.getElementById('landing-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 48;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        alpha: Math.random() * 0.7 + 0.25,
        speedY: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        pulseSpeed: Math.random() * 0.025 + 0.008,
        pulseVal: Math.random() * Math.PI
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.pulseVal += p.pulseSpeed;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulseVal));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${currentAlpha.toFixed(2)})`;
        ctx.shadowColor = 'rgba(251, 191, 36, 0.8)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }
});
