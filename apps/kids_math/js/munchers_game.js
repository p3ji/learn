/**
 * Number Munchers arcade UI for MathForge Ottawa.
 *
 * DOM + game loop only — all board/rule logic lives in munchers_engine.js.
 * Controls: arrow keys / WASD to move, Space or Enter to munch, tap a cell on
 * touch devices (tapping the cell you are standing on munches it).
 */

(function(exports) {

  const ROWS = 5;
  const COLS = 6;
  const TROGGLE_EMOJI = ['👾', '👹', '🐙'];

  class MunchersGame {
    constructor(app) {
      this.app = app;
      this.active = false;
      this.timer = null;
      this.keyHandler = null;
      this.reset();
    }

    reset() {
      this.level = 1;
      this.score = 0;
      this.lives = 3;
      this.message = null;
      this.gameOver = false;
      this.won = false;
    }

    /* ---------------- lifecycle ---------------- */

    start(grade) {
      this.grade = grade;
      this.reset();
      this.active = true;
      this.loadLevel();
      this.bindKeys();
    }

    quit() {
      this.active = false;
      this.stopLoop();
      this.unbindKeys();
    }

    loadLevel() {
      this.rule = exports.MunchersEngine.ruleForLevel(this.grade, this.level);
      const correctCount = Math.max(4, 9 - Math.floor(this.level / 2));
      this.grid = exports.MunchersEngine.buildBoard(this.rule, ROWS, COLS, correctCount);
      this.player = { r: ROWS - 1, c: 0 };
      this.troggles = this.spawnTroggles();
      this.message = null;
      // Breathing room to read the goal before the Troggles start hunting.
      this.graceUntil = Date.now() + 2500;
      this.startLoop();
      this.draw();
    }

    spawnTroggles() {
      const count = Math.min(3, 1 + Math.floor(this.level / 2));
      const list = [];
      for (let i = 0; i < count; i++) {
        list.push({
          r: 0,
          c: Math.min(COLS - 1, 1 + i * 2),
          emoji: TROGGLE_EMOJI[i % TROGGLE_EMOJI.length]
        });
      }
      return list;
    }

    startLoop() {
      this.stopLoop();
      const speed = Math.max(520, 1200 - this.level * 70);
      this.timer = setInterval(() => this.tick(), speed);
    }

    stopLoop() {
      if (this.timer) { clearInterval(this.timer); this.timer = null; }
    }

    /* ---------------- input ---------------- */

    bindKeys() {
      if (this.keyHandler) return;
      this.keyHandler = (e) => {
        if (!this.active || this.gameOver) return;
        const map = {
          ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1],
          w: [-1, 0], s: [1, 0], a: [0, -1], d: [0, 1],
          W: [-1, 0], S: [1, 0], A: [0, -1], D: [0, 1]
        };
        if (map[e.key]) {
          e.preventDefault();
          this.move(map[e.key][0], map[e.key][1]);
        } else if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          this.munch();
        }
      };
      window.addEventListener('keydown', this.keyHandler);
    }

    unbindKeys() {
      if (this.keyHandler) {
        window.removeEventListener('keydown', this.keyHandler);
        this.keyHandler = null;
      }
    }

    move(dr, dc) {
      const r = Math.max(0, Math.min(ROWS - 1, this.player.r + dr));
      const c = Math.max(0, Math.min(COLS - 1, this.player.c + dc));
      this.player = { r, c };
      this.checkCollision();
      this.draw();
    }

    /** Tap handler: move to a cell, or munch it if already standing there. */
    tapCell(r, c) {
      if (!this.active || this.gameOver) return;
      if (this.player.r === r && this.player.c === c) {
        this.munch();
      } else {
        this.player = { r, c };
        this.checkCollision();
        this.draw();
      }
    }

    /* ---------------- gameplay ---------------- */

    munch() {
      const cell = this.grid[this.player.r][this.player.c];
      if (!cell || cell.eaten) return;

      if (cell.correct) {
        cell.eaten = true;
        this.score += 10;
        this.message = { good: true, text: `✅ ${cell.text} — yes! ${this.rule.title}.` };
        this.app.playAudio('success');
        if (window.SuitePassport) window.SuitePassport.addXP(5, 'kids_math');

        if (exports.MunchersEngine.countRemainingCorrect(this.grid) === 0) {
          this.completeLevel();
          return;
        }
      } else {
        this.loseLife(`❌ ${cell.text} doesn't belong — the goal is "${this.rule.title}".`);
        return;
      }
      this.draw();
    }

    completeLevel() {
      this.score += 50;
      this.stopLoop();
      if (this.level >= 8) {
        this.won = true;
        this.gameOver = true;
        this.persistScore();
        this.draw();
        return;
      }
      this.level++;
      this.message = { good: true, text: `🎉 Board cleared! Level ${this.level}.` };
      this.draw();
      setTimeout(() => { if (this.active) this.loadLevel(); }, 1200);
    }

    loseLife(reason) {
      this.lives--;
      this.app.playAudio('incorrect');
      this.message = { good: false, text: reason + ` ${this.lives} ${this.lives === 1 ? 'life' : 'lives'} left.` };
      if (this.lives <= 0) {
        this.gameOver = true;
        this.stopLoop();
        this.persistScore();
      } else {
        this.player = { r: ROWS - 1, c: 0 };
        this.troggles = this.spawnTroggles();
        this.graceUntil = Date.now() + 2000;
      }
      this.draw();
    }

    persistScore() {
      this.app.stats.score += this.score;
      localStorage.setItem('kids_math_stats', JSON.stringify(this.app.stats));
      if (window.SuitePassport) window.SuitePassport.addXP(Math.round(this.score / 2), 'kids_math');
    }

    /** One Troggle step: drift toward the player with some randomness. */
    tick() {
      if (!this.active || this.gameOver) return;
      if (Date.now() < this.graceUntil) return;
      this.troggles.forEach(t => {
        if (Math.random() < 0.5) {
          t.r = Math.max(0, Math.min(ROWS - 1, t.r + (Math.random() < 0.5 ? -1 : 1)));
          t.c = Math.max(0, Math.min(COLS - 1, t.c + (Math.random() < 0.5 ? -1 : 1)));
        } else {
          if (t.r !== this.player.r) t.r += t.r < this.player.r ? 1 : -1;
          else if (t.c !== this.player.c) t.c += t.c < this.player.c ? 1 : -1;
        }
      });
      if (!this.checkCollision()) this.draw();
    }

    checkCollision() {
      if (Date.now() < this.graceUntil) return false;
      const hit = this.troggles.some(t => t.r === this.player.r && t.c === this.player.c);
      if (hit && !this.gameOver) {
        this.loseLife('👾 A Troggle caught you!');
        return true;
      }
      return false;
    }

    /* ---------------- rendering ---------------- */

    draw() {
      const main = document.getElementById('main-app');
      if (main) main.innerHTML = this.render();
    }

    render() {
      if (this.gameOver) return this.renderGameOver();

      let cellsHtml = '';
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = this.grid[r][c];
          const isPlayer = this.player.r === r && this.player.c === c;
          const troggle = this.troggles.find(t => t.r === r && t.c === c);
          const classes = ['munch-cell'];
          if (cell.eaten) classes.push('is-eaten');
          if (isPlayer) classes.push('is-player');
          if (troggle) classes.push('is-troggle');
          cellsHtml += `
            <button type="button" class="${classes.join(' ')}"
              aria-label="Row ${r + 1} column ${c + 1}: ${cell.eaten ? 'eaten' : cell.text}${isPlayer ? ', your muncher' : ''}${troggle ? ', Troggle here' : ''}"
              onclick="app.munchers.tapCell(${r}, ${c})">
              <span class="munch-value">${cell.eaten ? '' : cell.text}</span>
              ${troggle ? `<span class="munch-sprite">${troggle.emoji}</span>` : ''}
              ${isPlayer ? '<span class="munch-sprite munch-hero">🐛</span>' : ''}
            </button>
          `;
        }
      }

      const msg = this.message
        ? `<div class="feedback-banner ${this.message.good ? 'feedback-correct' : 'feedback-incorrect'}">${this.message.text}</div>`
        : '';

      return `
        <div class="container" style="padding-top: 24px;">
          <a onclick="app.exitMunchers()" class="back-nav">← Exit Arcade</a>

          <div class="workspace-card">
            <div class="munch-hud">
              <div>
                <span class="topic-code-pill">${this.rule.strandCode} • Level ${this.level}</span>
                <h2 class="munch-goal">${this.rule.title}</h2>
                <p class="munch-prompt">${this.rule.prompt}</p>
              </div>
              <div class="munch-stats">
                <span class="stat-pill">⭐ ${this.score}</span>
                <span class="stat-pill">${'❤️'.repeat(Math.max(0, this.lives))}</span>
              </div>
            </div>

            ${msg}

            <div class="munch-grid">${cellsHtml}</div>

            <div class="munch-controls">
              <div class="munch-dpad">
                <button class="btn-secondary" onclick="app.munchers.move(-1,0)">▲</button>
                <div>
                  <button class="btn-secondary" onclick="app.munchers.move(0,-1)">◀</button>
                  <button class="btn-primary munch-eat" onclick="app.munchers.munch()">MUNCH</button>
                  <button class="btn-secondary" onclick="app.munchers.move(0,1)">▶</button>
                </div>
                <button class="btn-secondary" onclick="app.munchers.move(1,0)">▼</button>
              </div>
              <p class="munch-help">
                Arrow keys or WASD to move · Space to munch · tap a square on touch screens.
                Dodge the Troggles ${TROGGLE_EMOJI.join(' ')} — they cost a life.
              </p>
            </div>
          </div>
        </div>
      `;
    }

    renderGameOver() {
      return `
        <div class="container" style="padding-top: 40px;">
          <div class="workspace-card" style="text-align: center;">
            <h1 class="hero-title">${this.won ? '🏆 Arcade Cleared!' : '👾 Game Over'}</h1>
            <p style="font-size: 1.2rem; margin: 16px 0; color: var(--accent-gold);">
              Final score: ${this.score} · reached level ${this.level}
            </p>
            <p style="color: var(--text-muted); margin-bottom: 30px;">
              ${this.won
                ? 'You munched your way through all eight boards. Those points are banked in your Passport.'
                : 'The Troggles win this round. Points earned are still banked in your Passport — try again!'}
            </p>
            <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
              <button class="btn-primary" onclick="app.startMunchers()">Play Again</button>
              <button class="btn-secondary" onclick="app.exitMunchers()">Back to Topics</button>
            </div>
          </div>
        </div>
      `;
    }
  }

  exports.MunchersGame = MunchersGame;

})(typeof window !== 'undefined' ? window : global);
