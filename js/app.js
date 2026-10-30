/**
 * Main Application Logic for Meme Quiz
 */

class MemeQuizApp {
  constructor() {
    this.memes = getInitialMemes();
    this.filteredMemes = [...this.memes];
    this.currentIndex = 0;
    this.revealed = false;
    this.hintRevealed = false;
    this.currentCategory = 'all'; // 'all' | 'Movies' | 'Social Media'
    this.mode = localStorage.getItem('meme_quiz_mode') || 'host'; // 'host' | 'contestant'
    this.autoStart = localStorage.getItem('meme_quiz_autostart') !== 'false';
    
    // Scores
    this.scores = {
      solo: 0,
      answered: {} // memeId -> { answered: true, correct: boolean, selectedOption: string }
    };

    // Initialize Timer
    this.timer = new QuizTimer({
      duration: 60,
      onTick: (remaining, progress) => this.updateTimerDisplay(remaining, progress),
      onExpire: () => this.handleTimerExpire()
    });

    this.cacheElements();
    this.bindEvents();
    this.bindKeyboardShortcuts();
    this.initCategoryFilter();
    this.loadCurrentMeme();
    this.updateScoreboardUI();
  }

  cacheElements() {
    this.el = {
      // Top bar
      questionCounter: document.getElementById('question-counter'),
      totalCounter: document.getElementById('total-counter'),
      categoryBadge: document.getElementById('category-badge'),
      mediaTypeBadge: document.getElementById('media-type-badge'),
      modeToggle: document.getElementById('mode-toggle'),
      soundToggle: document.getElementById('sound-toggle'),
      fullscreenToggle: document.getElementById('fullscreen-toggle'),
      gridToggle: document.getElementById('grid-toggle'),
      addMemeBtn: document.getElementById('add-meme-btn'),
      resetAllBtn: document.getElementById('reset-quiz-btn'),

      // Timer
      timerText: document.getElementById('timer-text'),
      timerSvgCircle: document.getElementById('timer-svg-circle'),
      timerToggleBtn: document.getElementById('timer-toggle-btn'),
      timerResetBtn: document.getElementById('timer-reset-btn'),
      timerAdd10Btn: document.getElementById('timer-add10-btn'),
      timerSub10Btn: document.getElementById('timer-sub10-btn'),

      // Media container
      mediaWrapper: document.getElementById('media-wrapper'),

      // Hints
      hintSection: document.getElementById('hint-section'),
      hintBtn: document.getElementById('hint-btn'),
      hintText: document.getElementById('hint-text'),

      // Host / Reveal mode
      hostControls: document.getElementById('host-controls'),
      revealAnswerBtn: document.getElementById('reveal-answer-btn'),
      answerCard: document.getElementById('answer-card'),
      answerTitle: document.getElementById('answer-title'),

      // Contestant Mode
      contestantOptions: document.getElementById('contestant-options'),
      optionsGrid: document.getElementById('options-grid'),

      // Score / Nav
      prevBtn: document.getElementById('prev-btn'),
      nextBtn: document.getElementById('next-btn'),
      soloScore: document.getElementById('solo-score'),

      // Modals
      gridModal: document.getElementById('grid-modal'),
      gridModalClose: document.getElementById('grid-modal-close'),
      questionsGrid: document.getElementById('questions-grid'),
      addMemeModal: document.getElementById('add-meme-modal'),
      addMemeForm: document.getElementById('add-meme-form'),
      addMemeCancel: document.getElementById('add-meme-cancel'),
      customFileInput: document.getElementById('custom-media-file'),
      customFilePreview: document.getElementById('custom-file-preview'),
      shortcutsModal: document.getElementById('shortcuts-modal'),
      shortcutsModalClose: document.getElementById('shortcuts-modal-close'),
      helpBtn: document.getElementById('help-btn')
    };
  }

  bindEvents() {
    // Mode switcher
    this.el.modeToggle.value = this.mode;
    this.el.modeToggle.addEventListener('change', (e) => {
      this.mode = e.target.value;
      localStorage.setItem('meme_quiz_mode', this.mode);
      this.renderModeView();
      window.sound?.playClick();
    });

    // Audio toggle
    this.updateSoundToggleIcon();
    this.el.soundToggle.addEventListener('click', () => {
      window.sound?.toggleMute();
      this.updateSoundToggleIcon();
    });

    // Fullscreen toggle
    this.el.fullscreenToggle.addEventListener('click', () => {
      this.toggleFullscreen();
    });

    // Timer controls
    this.el.timerToggleBtn.addEventListener('click', () => {
      this.timer.toggle();
      this.updateTimerControlsState();
      window.sound?.playClick();
    });

    this.el.timerResetBtn.addEventListener('click', () => {
      this.timer.reset(60);
      this.updateTimerControlsState();
      window.sound?.playClick();
    });

    this.el.timerAdd10Btn.addEventListener('click', () => {
      this.timer.addTime(10);
      window.sound?.playClick();
    });

    this.el.timerSub10Btn.addEventListener('click', () => {
      this.timer.subtractTime(10);
      window.sound?.playClick();
    });

    // Navigation buttons
    this.el.prevBtn.addEventListener('click', () => this.previousMeme());
    this.el.nextBtn.addEventListener('click', () => this.nextMeme());

    // Hints
    if (this.el.hintBtn) {
      this.el.hintBtn.addEventListener('click', () => this.revealHint());
    }

    // Reveal answer (Host Mode)
    this.el.revealAnswerBtn.addEventListener('click', () => {
      this.revealAnswer(true);
    });

    // Grid Modal
    this.el.gridToggle.addEventListener('click', () => this.openGridModal());
    this.el.gridModalClose.addEventListener('click', () => this.closeGridModal());
    this.el.gridModal.addEventListener('click', (e) => {
      if (e.target === this.el.gridModal) this.closeGridModal();
    });

    // Help / Shortcuts Modal
    this.el.helpBtn.addEventListener('click', () => this.openShortcutsModal());
    this.el.shortcutsModalClose.addEventListener('click', () => this.closeShortcutsModal());
    this.el.shortcutsModal.addEventListener('click', (e) => {
      if (e.target === this.el.shortcutsModal) this.closeShortcutsModal();
    });

    // Add Meme Modal
    this.el.addMemeBtn.addEventListener('click', () => this.openAddMemeModal());
    this.el.addMemeCancel.addEventListener('click', () => this.closeAddMemeModal());
    this.el.addMemeModal.addEventListener('click', (e) => {
      if (e.target === this.el.addMemeModal) this.closeAddMemeModal();
    });

    this.el.customFileInput.addEventListener('change', (e) => this.handleCustomFileUpload(e));
    this.el.addMemeForm.addEventListener('submit', (e) => this.handleAddMemeSubmit(e));

    // Reset Quiz
    this.el.resetAllBtn.addEventListener('click', () => this.confirmResetQuiz());

    // Scoreboard interactions
    this.updateScoreboardUI();
  }

  updateScoreboardUI() {
    if (this.el.soloScore) {
      this.el.soloScore.textContent = this.scores.solo;
    }
  }

  initCategoryFilter() {
    const filterSelect = document.getElementById('category-filter');
    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        this.currentCategory = e.target.value;
        this.applyFilter();
      });
    }
  }

  applyFilter() {
    if (this.currentCategory === 'all') {
      this.filteredMemes = [...this.memes];
    } else {
      this.filteredMemes = this.memes.filter(m => m.category.toLowerCase().includes(this.currentCategory.toLowerCase()));
    }
    this.currentIndex = 0;
    this.loadCurrentMeme();
  }

  getCurrentMeme() {
    if (this.filteredMemes.length === 0) return null;
    return this.filteredMemes[this.currentIndex];
  }

  loadCurrentMeme() {
    const meme = this.getCurrentMeme();
    if (!meme) {
      this.el.mediaWrapper.innerHTML = `<div class="empty-state">No memes found for this filter.</div>`;
      return;
    }

    // Reset states
    this.revealed = false;
    this.hintRevealed = false;
    this.timer.reset(60);

    // Update Counters and Badges
    this.el.questionCounter.textContent = this.currentIndex + 1;
    this.el.totalCounter.textContent = this.filteredMemes.length;
    this.el.categoryBadge.textContent = meme.category;
    const isFilm = meme.category.toLowerCase().includes('movie') || meme.category.toLowerCase().includes('bollywood');
    this.el.categoryBadge.className = `badge badge-${isFilm ? 'bollywood' : 'social'}`;
    this.el.mediaTypeBadge.textContent = meme.mediaType.toUpperCase();

    // Render Media (Video or Image)
    this.renderMedia(meme);

    // Reset Hints UI
    this.resetHintsUI(meme);

    // Reset Answer UI
    this.el.answerCard.classList.add('hidden');
    this.el.revealAnswerBtn.classList.remove('hidden');

    // Contestant Multiple Choice UI
    this.renderOptions(meme);

    // Mode View
    this.renderModeView();

    // Navigation buttons state
    this.el.prevBtn.disabled = this.currentIndex === 0;
    this.el.nextBtn.disabled = this.currentIndex === this.filteredMemes.length - 1;

    // Check if previously answered
    const prevAnswer = this.scores.answered[meme.id];
    if (prevAnswer) {
      this.revealAnswer(false);
      if (this.mode === 'contestant' && prevAnswer.selectedOption) {
        this.highlightSelectedOption(prevAnswer.selectedOption, meme.correctAnswer);
      }
    } else if (this.autoStart) {
      this.timer.start();
    }

    this.updateTimerControlsState();
  }

  renderMedia(meme) {
    this.el.mediaWrapper.innerHTML = '';
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'media-spinner';
    loadingSpinner.innerHTML = '<div class="spinner"></div><p>Loading media...</p>';
    this.el.mediaWrapper.appendChild(loadingSpinner);

    if (meme.mediaType === 'video') {
      const video = document.createElement('video');
      video.className = 'quiz-media-video';
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.controls = true;
      video.src = meme.mediaUrl;

      video.onloadeddata = () => {
        loadingSpinner.remove();
      };

      video.onerror = () => {
        console.warn(`Video failed to load: ${meme.mediaUrl}, switching to backup/image placeholder`);
        this.renderFallbackImage(meme, loadingSpinner);
      };

      this.el.mediaWrapper.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.className = 'quiz-media-image';
      img.alt = meme.mediaAlt || meme.title;
      img.src = meme.mediaUrl;

      img.onload = () => {
        loadingSpinner.remove();
      };

      img.onerror = () => {
        if (meme.backupMediaUrl && img.src !== meme.backupMediaUrl) {
          img.src = meme.backupMediaUrl;
        } else {
          this.renderFallbackGraphic(meme, loadingSpinner);
        }
      };

      // Zoom viewer on click
      img.addEventListener('click', () => {
        this.openMediaViewer(img.src);
      });

      this.el.mediaWrapper.appendChild(img);
    }
  }

  renderFallbackImage(meme, spinner) {
    if (spinner) spinner.remove();
    if (!meme.backupMediaUrl) {
      this.renderFallbackGraphic(meme, null);
      return;
    }
    const img = document.createElement('img');
    img.className = 'quiz-media-image';
    img.alt = meme.mediaAlt || meme.title;
    img.src = meme.backupMediaUrl;
    img.onclick = () => this.openMediaViewer(img.src);
    img.onerror = () => this.renderFallbackGraphic(meme, null);
    this.el.mediaWrapper.innerHTML = '';
    this.el.mediaWrapper.appendChild(img);
  }

  renderFallbackGraphic(meme, spinner) {
    if (spinner) spinner.remove();
    this.el.mediaWrapper.innerHTML = `
      <div class="media-fallback-card">
        <div class="fallback-icon">🎬</div>
        <h3>${meme.category} Meme</h3>
        <p class="fallback-desc">"${meme.mediaAlt || meme.title}"</p>
        <span class="fallback-badge">Guess the Iconic Meme</span>
      </div>
    `;
  }

  openMediaViewer(src) {
    const viewer = document.createElement('div');
    viewer.className = 'media-lightbox';
    viewer.innerHTML = `
      <div class="lightbox-content">
        <img src="${src}" alt="Fullscreen meme" />
        <button class="lightbox-close" aria-label="Close">&times;</button>
      </div>
    `;
    viewer.querySelector('.lightbox-close').addEventListener('click', () => viewer.remove());
    viewer.addEventListener('click', (e) => {
      if (e.target === viewer) viewer.remove();
    });
    document.body.appendChild(viewer);
  }

  resetHintsUI(meme) {
    this.hintRevealed = false;
    if (this.el.hintBtn) {
      this.el.hintBtn.disabled = false;
      this.el.hintBtn.innerHTML = `<span>💡 Reveal Hint</span>`;
    }
    if (this.el.hintText) {
      this.el.hintText.textContent = '';
      this.el.hintText.classList.add('hidden');
    }
  }

  revealHint() {
    const meme = this.getCurrentMeme();
    if (!meme || this.hintRevealed) return;

    window.sound?.playHint();

    const hint = (Array.isArray(meme.hints) && meme.hints.length > 0)
      ? meme.hints[0]
      : (meme.hint || 'No hint available for this meme.');

    if (this.el.hintText) {
      this.el.hintText.textContent = hint;
      this.el.hintText.classList.remove('hidden');
    }
    if (this.el.hintBtn) {
      this.el.hintBtn.disabled = true;
      this.el.hintBtn.innerHTML = `<span>💡 Hint Revealed</span>`;
    }
    this.hintRevealed = true;
  }

  renderOptions(meme) {
    this.el.optionsGrid.innerHTML = '';
    if (!meme.options || meme.options.length === 0) return;

    meme.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `
        <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
        <span class="option-text">${opt}</span>
      `;
      btn.addEventListener('click', () => this.handleOptionSelect(opt, meme.correctAnswer, btn));
      this.el.optionsGrid.appendChild(btn);
    });
  }

  handleOptionSelect(selected, correct, selectedBtn) {
    if (this.revealed) return;

    const meme = this.getCurrentMeme();
    const isCorrect = (selected.trim().toLowerCase() === correct.trim().toLowerCase());

    this.scores.answered[meme.id] = {
      answered: true,
      correct: isCorrect,
      selectedOption: selected
    };

    if (isCorrect) {
      window.sound?.playCorrect();
      this.scores.solo += 10;
      this.updateScoreboardUI();
      selectedBtn.classList.add('correct');
    } else {
      window.sound?.playTimeUp();
      selectedBtn.classList.add('incorrect');
      // Highlight correct option
      const allBtns = this.el.optionsGrid.querySelectorAll('.option-btn');
      allBtns.forEach(b => {
        if (b.querySelector('.option-text').textContent.trim().toLowerCase() === correct.trim().toLowerCase()) {
          b.classList.add('correct');
        }
      });
    }

    // Disable all options
    const allBtns = this.el.optionsGrid.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);

    this.revealAnswer(false);
  }

  highlightSelectedOption(selected, correct) {
    const allBtns = this.el.optionsGrid.querySelectorAll('.option-btn');
    allBtns.forEach(b => {
      b.disabled = true;
      const text = b.querySelector('.option-text').textContent.trim().toLowerCase();
      if (text === correct.trim().toLowerCase()) {
        b.classList.add('correct');
      } else if (text === selected.trim().toLowerCase()) {
        b.classList.add('incorrect');
      }
    });
  }

  revealAnswer(playSound = true) {
    const meme = this.getCurrentMeme();
    if (!meme) return;

    this.revealed = true;
    this.timer.pause();
    this.updateTimerControlsState();

    if (playSound) {
      window.sound?.playCorrect();
    }

    // Populate answer card (only the correct answer title)
    if (this.el.answerTitle) {
      this.el.answerTitle.textContent = meme.title;
    }

    this.el.answerCard.classList.remove('hidden');
    this.el.revealAnswerBtn.classList.add('hidden');

    // Also mark as answered in state
    if (!this.scores.answered[meme.id]) {
      this.scores.answered[meme.id] = { answered: true, correct: true };
    }
  }

  handleTimerExpire() {
    this.updateTimerControlsState();
    // In host mode, alert or prompt to reveal
    if (!this.revealed) {
      this.el.revealAnswerBtn.classList.add('pulse-attention');
    }
  }

  updateTimerDisplay(remaining, progress) {
    this.el.timerText.textContent = this.timer.formatTime(remaining);

    // Circular SVG Dashoffset calculation
    const circumference = this.timer.circumference;
    const strokeDashoffset = circumference * (1 - progress);
    this.el.timerSvgCircle.style.strokeDashoffset = strokeDashoffset;

    // Dynamic Color shift based on remaining time
    const circle = this.el.timerSvgCircle;
    const timerContainer = document.getElementById('timer-container');

    circle.classList.remove('timer-warning', 'timer-urgent');
    timerContainer.classList.remove('timer-pulse');

    if (remaining <= 5 && remaining > 0) {
      circle.classList.add('timer-urgent');
      timerContainer.classList.add('timer-pulse');
    } else if (remaining <= 15) {
      circle.classList.add('timer-warning');
    }
  }

  updateTimerControlsState() {
    const isRunning = this.timer.isRunning;
    this.el.timerToggleBtn.innerHTML = isRunning 
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Start`;
    this.el.timerToggleBtn.className = `btn ${isRunning ? 'btn-pause' : 'btn-play'}`;
  }

  renderModeView() {
    if (this.mode === 'host') {
      this.el.hostControls.classList.remove('hidden');
      this.el.contestantOptions.classList.add('hidden');
      document.body.classList.add('mode-host');
      document.body.classList.remove('mode-contestant');
    } else {
      this.el.hostControls.classList.add('hidden');
      this.el.contestantOptions.classList.remove('hidden');
      document.body.classList.add('mode-contestant');
      document.body.classList.remove('mode-host');
    }
  }

  nextMeme() {
    if (this.currentIndex < this.filteredMemes.length - 1) {
      this.currentIndex++;
      this.loadCurrentMeme();
      window.sound?.playClick();
    }
  }

  previousMeme() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.loadCurrentMeme();
      window.sound?.playClick();
    }
  }

  jumpToMeme(index) {
    if (index >= 0 && index < this.filteredMemes.length) {
      this.currentIndex = index;
      this.loadCurrentMeme();
      this.closeGridModal();
      window.sound?.playClick();
    }
  }

  // Grid / Overview modal
  openGridModal() {
    this.el.questionsGrid.innerHTML = '';
    this.filteredMemes.forEach((meme, idx) => {
      const card = document.createElement('div');
      const isCurrent = idx === this.currentIndex;
      const isAnswered = Boolean(this.scores.answered[meme.id]);

      card.className = `grid-card ${isCurrent ? 'current' : ''} ${isAnswered ? 'answered' : ''}`;
      card.innerHTML = `
        <div class="grid-card-num">#${idx + 1}</div>
        <div class="grid-card-cat">${meme.category}</div>
        <div class="grid-card-title">${isAnswered ? meme.title : '??? (Unrevealed)'}</div>
        <div class="grid-card-badge">${meme.mediaType}</div>
      `;
      card.addEventListener('click', () => this.jumpToMeme(idx));
      this.el.questionsGrid.appendChild(card);
    });

    this.el.gridModal.classList.remove('hidden');
  }

  closeGridModal() {
    this.el.gridModal.classList.add('hidden');
  }

  // Help / Keyboard shortcuts modal
  openShortcutsModal() {
    this.el.shortcutsModal.classList.remove('hidden');
  }

  closeShortcutsModal() {
    this.el.shortcutsModal.classList.add('hidden');
  }

  // Add Custom Meme Modal
  openAddMemeModal() {
    this.el.addMemeModal.classList.remove('hidden');
  }

  closeAddMemeModal() {
    this.el.addMemeModal.classList.add('hidden');
    this.el.addMemeForm.reset();
    this.el.customFilePreview.innerHTML = '';
  }

  handleCustomFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target.result;
      const isVideo = file.type.startsWith('video');
      document.getElementById('custom-media-url').value = result;
      document.getElementById('custom-media-type').value = isVideo ? 'video' : 'image';

      this.el.customFilePreview.innerHTML = isVideo 
        ? `<video src="${result}" controls style="max-height:120px; border-radius:6px;"></video>`
        : `<img src="${result}" style="max-height:120px; border-radius:6px; object-fit:cover;" />`;
    };
    reader.readAsDataURL(file);
  }

  handleAddMemeSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('custom-title').value.trim();
    const category = document.getElementById('custom-category').value;
    const mediaType = document.getElementById('custom-media-type').value;
    const mediaUrl = document.getElementById('custom-media-url').value.trim();
    const hint = (document.getElementById('custom-hint')?.value || '').trim();
    const origin = document.getElementById('custom-origin').value.trim();
    const trivia = document.getElementById('custom-trivia').value.trim();
    const optA = document.getElementById('custom-opt-a').value.trim();
    const optB = document.getElementById('custom-opt-b').value.trim();
    const optC = document.getElementById('custom-opt-c').value.trim();
    const optD = document.getElementById('custom-opt-d').value.trim();

    if (!title || !mediaUrl) {
      alert('Please provide at least a title and a media URL / file.');
      return;
    }

    const newMeme = {
      id: Date.now(),
      title: title,
      category: category,
      mediaType: mediaType,
      mediaUrl: mediaUrl,
      mediaAlt: title,
      options: [optA || title, optB || "Wrong Choice 1", optC || "Wrong Choice 2", optD || "Wrong Choice 3"],
      correctAnswer: title,
      hints: [hint || "No hint provided."],
      origin: origin || "Custom Question",
      actorOrCreator: "Organizer",
      funFact: trivia || "Custom meme added for this quiz session!"
    };

    this.memes.push(newMeme);
    localStorage.setItem('meme_quiz_custom_data_indian', JSON.stringify(this.memes));
    this.applyFilter();
    this.closeAddMemeModal();
    window.sound?.playCorrect();
    alert(`Added "${title}" successfully! Jump to the end to view it.`);
  }

  confirmResetQuiz() {
    if (confirm("Reset current quiz progress and mark all memes as unrevealed? (Your custom memes will still be saved)")) {
      this.scores.solo = 0;
      this.scores.answered = {};
      this.updateScoreboardUI();
      this.currentIndex = 0;
      this.loadCurrentMeme();
      window.sound?.playClick();
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn('Fullscreen error:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  updateSoundToggleIcon() {
    const isMuted = window.sound?.isMuted();
    this.el.soundToggle.innerHTML = isMuted 
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
    this.el.soundToggle.title = isMuted ? "Unmute Sound FX" : "Mute Sound FX";
  }

  bindKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Don't trigger when typing in input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          this.timer.toggle();
          this.updateTimerControlsState();
          window.sound?.playClick();
          break;
        case 'KeyR':
          e.preventDefault();
          this.timer.reset(60);
          this.updateTimerControlsState();
          window.sound?.playClick();
          break;
        case 'ArrowRight':
        case 'KeyN':
          e.preventDefault();
          this.nextMeme();
          break;
        case 'ArrowLeft':
        case 'KeyP':
          e.preventDefault();
          this.previousMeme();
          break;
        case 'KeyA':
        case 'Enter':
          e.preventDefault();
          if (!this.revealed) {
            this.revealAnswer(true);
          }
          break;
        case 'KeyH':
          e.preventDefault();
          if (!this.hintRevealed) {
            this.revealHint();
          }
          break;
        case 'KeyF':
          e.preventDefault();
          this.toggleFullscreen();
          break;
        case 'KeyM':
          e.preventDefault();
          window.sound?.toggleMute();
          this.updateSoundToggleIcon();
          break;
        case 'Slash':
          if (e.shiftKey) { // '?' key
            e.preventDefault();
            this.openShortcutsModal();
          }
          break;
        case 'Escape':
          this.closeGridModal();
          this.closeAddMemeModal();
          this.closeShortcutsModal();
          break;
      }
    });
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new MemeQuizApp();
});
