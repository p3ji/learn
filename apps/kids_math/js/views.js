/**
 * UI Renderer Views for OCDSB Kids Math App
 */

(function(exports) {

  function renderHeader(gradeKey, stats) {
    return `
      <div class="header-container container">
        <div class="logo-group">
          <a href="../../index.html" class="back-nav" title="Back to Learning Suite Portal">← Portal</a>
          <span class="logo-icon">🧮</span>
          <div>
            <div class="logo-title">MathForge <span class="logo-tag">OCDSB</span></div>
          </div>
        </div>

        <div class="grade-switcher">
          <button class="grade-btn ${gradeKey === 'grade3' ? 'active' : ''}" onclick="app.setGrade('grade3')">
            Grade 3 (Primary)
          </button>
          <button class="grade-btn ${gradeKey === 'grade8' ? 'active' : ''}" onclick="app.setGrade('grade8')">
            Grade 8 (Intermediate)
          </button>
        </div>

        <div class="user-stats-bar">
          <div id="passport-pill-container"></div>
          <div class="stat-pill" title="Total Problems Solved Correctly">
            <span>⭐ Score:</span> <span class="stat-value" id="user-score">${stats.score || 0}</span>
          </div>
          <div class="stat-pill" title="Current Problem Streak">
            <span>🔥 Streak:</span> <span class="stat-value" id="user-streak">${stats.streak || 0}</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderMainView(gradeKey, selectedStrandId) {
    const data = exports.KIDS_MATH_CURRICULUM[gradeKey];
    if (!data) return '<div class="container">Error loading curriculum.</div>';

    let strandsHtml = '';

    data.strands.forEach(strand => {
      if (selectedStrandId !== 'all' && strand.id !== selectedStrandId) return;

      let topicsHtml = '';
      strand.topics.forEach(topic => {
        topicsHtml += `
          <div class="topic-card">
            <div>
              <span class="topic-code-pill">${strand.name} • ${topic.code}</span>
              <h3 class="topic-card-title">${topic.title}</h3>
              <p class="topic-card-desc">${topic.summary}</p>
            </div>
            <div class="topic-actions">
              <button class="btn-learn" onclick="app.openLesson('${topic.id}')">📖 Learn & Khan</button>
              <button class="btn-practice" onclick="app.startPractice('${topic.id}')">🎯 Practice</button>
              <button class="btn-secondary" style="font-size: 0.8rem; padding: 4px 8px; margin-top: 4px;" onclick="app.requestTopicHelp('${topic.id}', '${topic.title.replace(/'/g, "\\'")}')">🙋 Not comfortable yet?</button>
              <button class="btn-secondary" style="font-size: 0.8rem; padding: 4px 8px; margin-top: 4px; ${window.SuitePassport && window.SuitePassport.isTopicMastered('kids_math', topic.title) ? 'background: rgba(245,158,11,0.25); border-color: #F59E0B; color: #F59E0B;' : ''}" onclick="if(window.SuitePassport) window.SuitePassport.toggleMasteredTopic('kids_math', '${topic.title.replace(/'/g, "\\'")}', this)">${window.SuitePassport && window.SuitePassport.isTopicMastered('kids_math', topic.title) ? '🌟 Mastered!' : '⭐ Mark Mastered'}</button>
            </div>
          </div>
        `;
      });

      strandsHtml += `
        <div class="strand-section">
          <div class="strand-section-header">
            <span class="strand-badge" style="background: ${strand.color}25; color: ${strand.color}; border: 1px solid ${strand.color}50;">
              ${strand.icon} ${strand.code}
            </span>
            <h2 class="strand-title">${strand.name}</h2>
          </div>
          <div class="topics-grid">
            ${topicsHtml}
          </div>
        </div>
      `;
    });

    return `
      <div class="container">
        <div class="hero-banner">
          <div>
            <h1 class="hero-title">${data.title}</h1>
            <p class="hero-subtitle">${data.description}</p>
          </div>
          <div>
            <button class="btn-primary" onclick="app.startDiagnosticQuiz()">
              ⚡ OCDSB Strand Diagnostic Quiz
            </button>
          </div>
        </div>

        <div class="strand-tabs">
          <button class="strand-tab ${selectedStrandId === 'all' ? 'active' : ''}" onclick="app.setStrandFilter('all')">
            🌟 All Strands
          </button>
          ${data.strands.map(s => `
            <button class="strand-tab ${selectedStrandId === s.id ? 'active' : ''}" onclick="app.setStrandFilter('${s.id}')">
              ${s.icon} ${s.name}
            </button>
          `).join('')}
        </div>

        <div class="strands-container">
          ${strandsHtml}
        </div>
      </div>
    `;
  }

  function renderLessonModal(topic) {
    return `
      <div class="modal-overlay" onclick="if(event.target === this) app.closeModal()">
        <div class="modal-content">
          <button class="modal-close" onclick="app.closeModal()">✕</button>
          <span class="topic-code-pill">Expectation Code: ${topic.code}</span>
          <h2 style="font-family: var(--font-heading); font-size: 1.6rem; margin: 8px 0 12px;">${topic.title}</h2>
          <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 20px;">${topic.summary}</p>

          <div class="cheat-sheet-card">
            <div class="cheat-title">💡 Core Rule & Concept</div>
            <p style="white-space: pre-line; margin-bottom: 14px;">${topic.cheatSheet.rule}</p>

            <div class="cheat-title">📝 Step-by-Step Example</div>
            <p style="white-space: pre-line; font-family: var(--font-code); color: var(--accent-cyan); background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; margin-bottom: 14px;">
              ${topic.cheatSheet.example}
            </p>

            <div class="cheat-title">⭐ Pro Tip</div>
            <p style="color: #FCD34D;">${topic.cheatSheet.tip}</p>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-top: 24px;">
            <a href="${topic.khanUrl}" target="_blank" rel="noopener noreferrer" class="khan-btn">
              <span>▶</span> Open Khan Academy Course Module
            </a>
            <button class="btn-primary" onclick="app.closeModal(); app.startPractice('${topic.id}')">
              Start Practice Exercises ➔
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderPracticeView(topic, questionObj, state) {
    const hintCount = state.hintLevel || 0;

    let hintsHtml = '';
    if (hintCount > 0 && questionObj.hints) {
      hintsHtml = `
        <div class="hint-box">
          <strong>💡 Hint (${hintCount}/${questionObj.hints.length}):</strong>
          <ul style="margin-left: 20px; margin-top: 6px;">
            ${questionObj.hints.slice(0, hintCount).map(h => `<li style="margin-bottom: 4px;">${h}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    let feedbackHtml = '';
    if (state.feedback) {
      if (state.feedback.isCorrect) {
        feedbackHtml = `
          <div class="feedback-banner feedback-correct">
            🎉 Correct! Excellent job! ${state.feedback.solution ? `<br><small>${state.feedback.solution}</small>` : ''}
          </div>
        `;
      } else {
        feedbackHtml = `
          <div class="feedback-banner feedback-incorrect">
            💡 Not quite right. Try again or check the hints!
          </div>
        `;
      }
    }

    return `
      <div class="container" style="padding-top: 24px;">
        <a onclick="app.showMainView()" class="back-nav">← Back to Topics Overview</a>

        <div class="workspace-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div>
              <span class="topic-code-pill">${topic.code}</span>
              <h2 style="font-family: var(--font-heading); font-size: 1.5rem;">${topic.title}</h2>
            </div>
            <a href="${topic.khanUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="font-size: 0.85rem; padding: 6px 12px;">
              🔗 Khan Academy
            </a>
          </div>

          <div class="question-box">
            <div class="question-text">${questionObj.question}</div>
            <div style="margin-top: 12px; font-size: 0.85rem; color: var(--text-muted); font-style: italic;">
              📝 Tip: Grab a piece of paper and pencil to help work through multi-step problems!
            </div>
          </div>

          ${feedbackHtml}

          <form onsubmit="app.submitAnswer(event)" class="answer-input-group">
            <input type="text" id="math-answer-input" class="math-input" placeholder="Type your answer..." autocomplete="off" ${state.feedback && state.feedback.isCorrect ? 'disabled' : 'autofocus'}>
            ${state.feedback && state.feedback.isCorrect ? `
              <button type="button" class="btn-primary" onclick="app.nextQuestion()">Next Question ➔</button>
            ` : `
              <button type="submit" class="btn-primary">Submit Answer</button>
            `}
          </form>

          ${hintsHtml}

          <div style="display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap;">
            ${(!state.feedback || !state.feedback.isCorrect) ? `
              <button type="button" class="btn-secondary" onclick="app.requestHint()">
                💡 Need a Hint (${hintCount}/${questionObj.hints.length})
              </button>
            ` : ''}
            <button type="button" class="btn-secondary" onclick="app.toggleScratchpad()">
              ✏️ ${state.showScratchpad ? 'Hide Scratchpad' : 'Show Canvas Scratchpad'}
            </button>
            <button type="button" class="btn-secondary" onclick="app.requestTopicHelp('${topic.id}', '${topic.title.replace(/'/g, "\\'")}')">
              🙋 Not comfortable yet?
            </button>
            <button type="button" class="btn-secondary" style="${window.SuitePassport && window.SuitePassport.isTopicMastered('kids_math', topic.title) ? 'background: rgba(245,158,11,0.25); border-color: #F59E0B; color: #F59E0B;' : ''}" onclick="if(window.SuitePassport) window.SuitePassport.toggleMasteredTopic('kids_math', '${topic.title.replace(/'/g, "\\'")}', this)">
              ${window.SuitePassport && window.SuitePassport.isTopicMastered('kids_math', topic.title) ? '🌟 Mastered!' : '⭐ Mark Mastered'}
            </button>
          </div>

          <div id="scratchpad-area" class="scratchpad-container" style="display: ${state.showScratchpad ? 'block' : 'none'};">
            <div class="scratchpad-toolbar">
              <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted);">Digital Scratchpad Canvas</span>
              <button class="btn-secondary" style="padding: 4px 10px; font-size: 0.8rem;" onclick="app.clearScratchpad()">Clear Canvas</button>
            </div>
            <canvas id="scratchpad-canvas" class="scratchpad-canvas"></canvas>
          </div>

        </div>
      </div>
    `;
  }

  function renderQuizView(quizState) {
    const q = quizState.questions[quizState.currentIndex];
    const isFinished = quizState.currentIndex >= quizState.questions.length;

    if (isFinished) {
      const percentage = Math.round((quizState.score / quizState.questions.length) * 100);
      return `
        <div class="container" style="padding-top: 40px;">
          <div class="workspace-card" style="text-align: center;">
            <h1 class="hero-title">📊 OCDSB Diagnostic Quiz Results</h1>
            <p style="font-size: 1.2rem; margin: 16px 0; color: var(--accent-gold);">
              Your Score: ${quizState.score} / ${quizState.questions.length} (${percentage}%)
            </p>
            <p style="color: var(--text-muted); margin-bottom: 30px;">
              ${percentage >= 80 ? '🌟 Outstanding work! You demonstrate strong mastery of OCDSB math expectations.' : '💪 Great effort! Keep practicing your target strands to build 100% confidence.'}
            </p>
            <button class="btn-primary" onclick="app.showMainView()">Return to Topics Dashboard</button>
          </div>
        </div>
      `;
    }

    return `
      <div class="container" style="padding-top: 24px;">
        <a onclick="app.showMainView()" class="back-nav">← Exit Quiz</a>

        <div class="workspace-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="font-family: var(--font-heading); font-size: 1.4rem;">OCDSB Diagnostic Quiz</h2>
            <span class="topic-code-pill">Question ${quizState.currentIndex + 1} of ${quizState.questions.length}</span>
          </div>

          <div style="background: var(--bg-primary); height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 24px;">
            <div style="background: linear-gradient(90deg, var(--accent-blue), var(--accent-cyan)); height: 100%; width: ${((quizState.currentIndex) / quizState.questions.length) * 100}%;"></div>
          </div>

          <div class="question-box">
            <span style="font-size: 0.8rem; font-weight: 800; color: var(--accent-gold);">${q.strandCode} • ${q.topicTitle}</span>
            <div class="question-text" style="margin-top: 8px;">${q.question}</div>
          </div>

          <form onsubmit="app.submitQuizAnswer(event)" class="answer-input-group">
            <input type="text" id="quiz-answer-input" class="math-input" placeholder="Type your answer..." autocomplete="off" autofocus>
            <button type="submit" class="btn-primary">Submit Answer ➔</button>
          </form>
        </div>
      </div>
    `;
  }

  exports.Views = {
    renderHeader: renderHeader,
    renderMainView: renderMainView,
    renderLessonModal: renderLessonModal,
    renderPracticeView: renderPracticeView,
    renderQuizView: renderQuizView
  };

})(typeof window !== 'undefined' ? window : global);
