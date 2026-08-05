/**
 * Main Application Logic & Controller for OCDSB Kids Math App
 */

class KidsMathApp {
  constructor() {
    this.currentGrade = localStorage.getItem('kids_math_grade') || 'grade3';
    this.selectedStrand = 'all';
    this.viewMode = 'main'; // 'main', 'practice', 'quiz'

    // User statistics
    this.stats = JSON.parse(localStorage.getItem('kids_math_stats') || '{"score": 0, "streak": 0}');

    // Practice session state
    this.currentTopicId = null;
    this.currentTopicObj = null;
    this.currentQuestion = null;
    this.practiceState = {
      hintLevel: 0,
      feedback: null,
      showScratchpad: false
    };

    // Quiz state
    this.quizState = {
      questions: [],
      currentIndex: 0,
      score: 0
    };

    // Audio context initialization for web audio chimes
    this.audioCtx = null;

    // Canvas drawing state
    this.isDrawing = false;
    this.canvasCtx = null;

    // Compounding Island Game
    this.compoundingGame = new window.CompoundingGame(this);
  }

  init() {
    this.applyTheme();
    window.addEventListener('passport:profile-changed', () => this.render());
    this.render();
  }

  startCompoundingGame() {
    if (this.munchers) this.munchers.quit();
    this.viewMode = 'compounding';
    this.compoundingGame.setMode('story');
    this.render();
  }

  applyTheme() {
    if (this.currentGrade === 'grade8') {
      document.body.classList.add('grade8-mode');
    } else {
      document.body.classList.remove('grade8-mode');
    }
  }

  playAudio(type = 'success') {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, this.audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, this.audioCtx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, this.audioCtx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.35);
      } else {
        osc.frequency.setValueAtTime(220, this.audioCtx.currentTime); // A3
        osc.frequency.setValueAtTime(196, this.audioCtx.currentTime + 0.15); // G3
        gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.3);
      }
    } catch (e) {
      // Audio fallback silent
    }
  }

  setGrade(gradeKey) {
    if (this.munchers) this.munchers.quit();
    this.currentGrade = gradeKey;
    localStorage.setItem('kids_math_grade', gradeKey);
    this.selectedStrand = 'all';
    this.viewMode = 'main';
    this.applyTheme();
    this.render();
  }

  setStrandFilter(strandId) {
    this.selectedStrand = strandId;
    this.render();
  }

  showMainView() {
    this.viewMode = 'main';
    this.render();
  }

  openLesson(topicId) {
    let targetTopic = null;
    const gradeData = window.KIDS_MATH_CURRICULUM[this.currentGrade];
    gradeData.strands.forEach(s => {
      s.topics.forEach(t => {
        if (t.id === topicId) targetTopic = t;
      });
    });

    if (targetTopic) {
      const container = document.getElementById('modal-container');
      container.innerHTML = window.Views.renderLessonModal(targetTopic);
    }
  }

  requestTopicHelp(topicId, topicTitle) {
    if (window.SuitePassport) {
      window.SuitePassport.openFeedbackModal({
        appId: 'kids_math',
        appName: 'MathForge Ottawa',
        topicTitle: topicTitle
      });
    } else {
      alert(`Topic marked as Needs Practice: ${topicTitle}`);
    }
  }

  closeModal() {
    const container = document.getElementById('modal-container');
    container.innerHTML = '';
  }

  startPractice(topicId) {
    this.closeModal();
    this.currentTopicId = topicId;
    
    let targetTopic = null;
    const gradeData = window.KIDS_MATH_CURRICULUM[this.currentGrade];
    gradeData.strands.forEach(s => {
      s.topics.forEach(t => {
        if (t.id === topicId) targetTopic = t;
      });
    });

    this.currentTopicObj = targetTopic;
    this.currentQuestion = window.MathEngine.generateQuestion(topicId);
    this.practiceState = {
      hintLevel: 0,
      feedback: null,
      showScratchpad: false
    };

    this.viewMode = 'practice';
    this.render();
  }

  submitAnswer(e) {
    e.preventDefault();
    if (this.practiceState.feedback) return; // Prevent re-submitting already evaluated question

    const input = document.getElementById('math-answer-input');
    if (!input || !input.value.trim()) return;

    const userAns = input.value.trim();
    const isCorrect = window.MathEngine.verifyAnswer(userAns, this.currentQuestion.answer);

    if (isCorrect) {
      this.playAudio('success');
      this.stats.score += 10;
      this.stats.streak += 1;
      localStorage.setItem('kids_math_stats', JSON.stringify(this.stats));

      if (window.SuitePassport) {
        const questionKey = `q_${this.selectedTopic ? this.selectedTopic.id : 'math'}_${this.currentQuestion.question}`;
        window.SuitePassport.addXP(10, 'kids_math', questionKey);
      }

      this.practiceState.feedback = {
        isCorrect: true,
        solution: this.currentQuestion.solution
      };
    } else {
      this.playAudio('incorrect');
      this.stats.streak = 0;
      localStorage.setItem('kids_math_stats', JSON.stringify(this.stats));

      this.practiceState.feedback = {
        isCorrect: false
      };
    }

    this.render();
  }

  nextQuestion() {
    this.currentQuestion = window.MathEngine.generateQuestion(this.currentTopicId);
    this.practiceState = {
      hintLevel: 0,
      feedback: null,
      showScratchpad: this.practiceState.showScratchpad
    };
    this.render();
  }

  requestHint() {
    if (this.currentQuestion && this.currentQuestion.hints) {
      if (this.practiceState.hintLevel < this.currentQuestion.hints.length) {
        this.practiceState.hintLevel++;
        this.render();
      }
    }
  }

  toggleScratchpad() {
    this.practiceState.showScratchpad = !this.practiceState.showScratchpad;
    this.render();
    if (this.practiceState.showScratchpad) {
      setTimeout(() => this.initCanvas(), 100);
    }
  }

  initCanvas() {
    const canvas = document.getElementById('scratchpad-canvas');
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    this.canvasCtx = canvas.getContext('2d');
    this.canvasCtx.strokeStyle = '#06B6D4';
    this.canvasCtx.lineWidth = 3;
    this.canvasCtx.lineCap = 'round';

    const startDraw = (e) => {
      this.isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      this.canvasCtx.beginPath();
      this.canvasCtx.moveTo(clientX - rect.left, clientY - rect.top);
    };

    const draw = (e) => {
      if (!this.isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      this.canvasCtx.lineTo(clientX - rect.left, clientY - rect.top);
      this.canvasCtx.stroke();
    };

    const stopDraw = () => {
      this.isDrawing = false;
    };

    canvas.onmousedown = startDraw;
    canvas.onmousemove = draw;
    canvas.onmouseup = stopDraw;

    canvas.ontouchstart = startDraw;
    canvas.ontouchmove = draw;
    canvas.ontouchend = stopDraw;
  }

  clearScratchpad() {
    const canvas = document.getElementById('scratchpad-canvas');
    if (canvas && this.canvasCtx) {
      this.canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  startMunchers() {
    this.closeModal();
    if (!this.munchers) this.munchers = new window.MunchersGame(this);
    this.viewMode = 'munchers';
    this.munchers.start(this.currentGrade);
    this.render();
  }

  exitMunchers() {
    if (this.munchers) this.munchers.quit();
    this.showMainView();
  }

  startDiagnosticQuiz() {
    this.quizState = {
      questions: window.MathEngine.generateQuiz(this.currentGrade, 8),
      currentIndex: 0,
      score: 0
    };
    this.viewMode = 'quiz';
    this.render();
  }

  submitQuizAnswer(e) {
    e.preventDefault();
    const input = document.getElementById('quiz-answer-input');
    if (!input || !input.value.trim()) return;

    const currentQ = this.quizState.questions[this.quizState.currentIndex];
    const isCorrect = window.MathEngine.verifyAnswer(input.value.trim(), currentQ.answer);

    if (isCorrect) {
      this.playAudio('success');
      this.quizState.score++;
      this.stats.score += 15;
      localStorage.setItem('kids_math_stats', JSON.stringify(this.stats));
    } else {
      this.playAudio('incorrect');
    }

    this.quizState.currentIndex++;
    this.render();
  }

  render() {
    const header = document.getElementById('header-app');
    const main = document.getElementById('main-app');

    if (header) {
      header.innerHTML = window.Views.renderHeader(this.currentGrade, this.stats);
      if (window.SuitePassport) {
        window.SuitePassport.renderPassportPill('passport-pill-container', '../../');
      }
    }

    if (main) {
      if (this.viewMode === 'main') {
        main.innerHTML = window.Views.renderMainView(this.currentGrade, this.selectedStrand);
      } else if (this.viewMode === 'practice') {
        main.innerHTML = window.Views.renderPracticeView(this.currentTopicObj, this.currentQuestion, this.practiceState);
        if (this.practiceState.showScratchpad) {
          setTimeout(() => this.initCanvas(), 100);
        }
      } else if (this.viewMode === 'quiz') {
        main.innerHTML = window.Views.renderQuizView(this.quizState);
      } else if (this.viewMode === 'munchers') {
        main.innerHTML = this.munchers.render();
      } else if (this.viewMode === 'compounding') {
        main.innerHTML = this.compoundingGame.render();
      }
    }
  }
}

// Global instance
window.app = new KidsMathApp();
window.addEventListener('DOMContentLoaded', () => window.app.init());
