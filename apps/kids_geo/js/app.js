/**
 * Kids Geo Arcade - Main Application Controller & UI Binder
 * Features Arrest Victory/Failure Modals, Fixed Arrest Handler, 2.5s 3D Airplane Flight Animation,
 * and automatic witness dialogue reset upon arriving in a new city.
 */

class KidsGeoApp {
    constructor() {
        this.data = window.GeoData;
        this.carmenEngine = new window.CarmenEngine(this.data);
        this.globe3D = null;

        this.currentTab = 'carmen';
        this.audioCtx = null;
        this.isFlightInProgress = false;

        this.init();
    }

    init() {
        if (window.SuitePassport) {
            window.SuitePassport.renderPassportPill('passport-pill-container', '../../');
        }
        window.addEventListener('passport:profile-changed', () => {
            if (window.SuitePassport) window.SuitePassport.renderPassportPill('passport-pill-container', '../../');
        });

        // Initialize Real Earth 3D Globe
        if (window.Geo3DGlobe) {
            this.globe3D = new window.Geo3DGlobe('globe-3d-container', this.data, (city) => {
                console.log('City clicked on 3D Globe:', city);
            });
        }

        this.bindEvents();
        this.startCarmenGame();
        this.renderAtlas();
        this.switchTab('carmen');
    }

    // -------------------------------------------------------------------------
    // WEB AUDIO API SYNTHESIZER (100% Offline Retro Sound FX)
    // -------------------------------------------------------------------------
    getAudioContext() {
        if (!this.audioCtx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.audioCtx = new AudioCtx();
        }
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
        return this.audioCtx;
    }

    playSound(type) {
        try {
            const ctx = this.getAudioContext();
            if (!ctx) return;

            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === 'click') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (type === 'flight') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.linearRampToValueAtTime(450, now + 0.6);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.6);
                osc.start(now);
                osc.stop(now + 0.6);
            } else if (type === 'found') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(523.25, now);
                osc.frequency.setValueAtTime(659.25, now + 0.1);
                osc.frequency.setValueAtTime(783.99, now + 0.2);
                osc.frequency.setValueAtTime(1046.50, now + 0.3);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
            } else if (type === 'fanfare') {
                osc.type = 'square';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.setValueAtTime(554.37, now + 0.15);
                osc.frequency.setValueAtTime(659.25, now + 0.3);
                osc.frequency.setValueAtTime(880, now + 0.45);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.9);
                osc.start(now);
                osc.stop(now + 0.9);
            } else if (type === 'alarm') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.setValueAtTime(400, now + 0.1);
                osc.frequency.setValueAtTime(800, now + 0.2);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
                osc.start(now);
                osc.stop(now + 0.35);
            }
        } catch (e) {}
    }

    // -------------------------------------------------------------------------
    // EVENT BINDINGS
    // -------------------------------------------------------------------------
    bindEvents() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.playSound('click');
                const targetTab = e.currentTarget.dataset.tab;
                this.switchTab(targetTab);
            });
        });

        document.getElementById('carmen-new-case-btn')?.addEventListener('click', () => {
            this.playSound('click');
            const difficulty = document.getElementById('carmen-difficulty-select')?.value || 'medium';
            this.startCarmenGame(difficulty);
        });

        document.querySelectorAll('.carmen-investigate-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const source = e.currentTarget.dataset.source;
                this.handleCarmenInvestigate(source);
            });
        });

        document.getElementById('carmen-open-warrant-btn')?.addEventListener('click', () => {
            this.playSound('click');
            this.switchTab('warrant');
        });

        document.getElementById('carmen-apply-warrant-btn-inline')?.addEventListener('click', () => {
            this.playSound('click');
            this.applyWarrantFilter(true);
        });

        document.getElementById('carmen-track-warrant-btn')?.addEventListener('click', () => {
            this.playSound('click');
            this.switchTab('carmen');
        });

        document.getElementById('carmen-arrest-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleCarmenArrest();
        });

        document.getElementById('victory-next-case-btn')?.addEventListener('click', () => {
            this.playSound('click');
            document.getElementById('victory-modal').style.display = 'none';
            const difficulty = document.getElementById('carmen-difficulty-select')?.value || 'medium';
            this.startCarmenGame(difficulty);
        });

        document.getElementById('failure-close-btn')?.addEventListener('click', () => {
            this.playSound('click');
            document.getElementById('failure-modal').style.display = 'none';
        });
    }

    switchTab(tabId) {
        this.currentTab = tabId;
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        document.querySelectorAll('.game-tab-content').forEach(c => {
            c.style.display = c.id === `tab-${tabId}` ? 'block' : 'none';
        });

        if (tabId === 'carmen') this.renderCarmenUI();
        if (tabId === 'passport') this.renderPassportUI();
    }

    resetWitnessDialog() {
        const dialogBox = document.getElementById('witness-dialog-container');
        if (dialogBox) {
            dialogBox.style.display = 'none';
        }
        const speechText = document.getElementById('witness-speech-text');
        if (speechText) {
            speechText.textContent = '';
        }
    }

    // -------------------------------------------------------------------------
    // CARMEN SANDIEGO DETECTIVE GAME CONTROLLER
    // -------------------------------------------------------------------------
    startCarmenGame(difficulty = 'medium') {
        const c = this.carmenEngine.startNewCase(difficulty);

        this.resetWitnessDialog();
        this.resetWarrantComputer();

        const arrestBtn = document.getElementById('carmen-arrest-btn');
        if (arrestBtn) arrestBtn.classList.remove('btn-arrest-glowing');

        const banner = document.getElementById('warrant-guidance-banner');
        if (banner) banner.style.display = 'none';

        this.renderCarmenUI();

        if (this.globe3D) {
            this.globe3D.flyToCity(c.currentCity.id);
        }

        if (window.CarmenVisuals) {
            window.CarmenVisuals.drawSuspectMugshot('suspect-mugshot-canvas', null);
            window.CarmenVisuals.drawSuspectMugshot('warrant-preview-canvas', null);
        }

        this.logCarmenMessage(`🚨 ACME HQ ALERT: Stolen Artifact "${c.artifact}" taken from ${c.currentCity.name}! The suspect was last seen fleeing the scene.`);
    }

    resetWarrantComputer() {
        // Reset all warrant filter dropdowns to blank
        ['warrant-gender', 'warrant-hair', 'warrant-vehicle', 'warrant-food', 'warrant-hobby',
         'warrant-gender-inline', 'warrant-hair-inline', 'warrant-vehicle-inline', 'warrant-food-inline', 'warrant-hobby-inline'
        ].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });

        // Clear status messages
        ['warrant-status-msg', 'warrant-status-msg-inline'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = '';
                el.className = 'status-box';
            }
        });

        // Clear suspect mugshots
        if (window.CarmenVisuals) {
            window.CarmenVisuals.drawSuspectMugshot('suspect-mugshot-canvas', null);
            window.CarmenVisuals.drawSuspectMugshot('warrant-preview-canvas', null);
        }

        // Hide track warrant button
        const trackBtn = document.getElementById('carmen-track-warrant-btn');
        if (trackBtn) trackBtn.style.display = 'none';

        // Reset warrant issued label
        const warrantEl = document.getElementById('carmen-warrant-issued');
        if (warrantEl) {
            warrantEl.textContent = 'No Warrant Issued';
            warrantEl.style.color = 'var(--accent-pink)';
        }
    }

    handleCarmenInvestigate(source) {
        this.playSound('click');
        const res = this.carmenEngine.investigate(source);
        if (!res) return;

        if (window.CarmenVisuals) {
            window.CarmenVisuals.renderWitnessBubble(source, res.clueText);
        }

        this.renderCarmenUI();

        // Log the city/location clue first
        if (res.cityClueText) {
            const sourceLabels = { bank: '🏦 BANK', library: '📚 LIBRARY', airport: '✈️ AIRPORT', chef: '🍽️ CHEF' };
            const label = sourceLabels[source] || source.toUpperCase();
            this.logCarmenMessage(`🔎 [${label} — LOCATION CLUE] ${res.cityClueText}`);
        }
        // Log the suspect intel separately so the two types of info are never mixed up
        if (res.suspectClueText) {
            this.logCarmenMessage(`🕵️ [SUSPECT INTEL] ${res.suspectClueText}`);
        }
        // Fallback: if no structured clues (e.g. final city), log the combined text
        if (!res.cityClueText && !res.suspectClueText) {
            this.logCarmenMessage(`🔎 [${source.toUpperCase()}] ${res.clueText}`);
        }

        if (this.carmenEngine.currentCase.status === 'TIME_EXPIRED') {
            this.playSound('alarm');
            this.logCarmenMessage(`⏰ TIME EXPIRED! The thief escaped into the night. Case closed.`);
        }
    }

    handleCarmenFly(targetCityId) {
        if (this.isFlightInProgress) return;
        this.isFlightInProgress = true;

        const fromCity = this.carmenEngine.currentCase.currentCity;
        const res = this.carmenEngine.flyTo(targetCityId);
        if (!res) {
            this.isFlightInProgress = false;
            return;
        }

        // Clear witness dialogue from previous city immediately upon flying
        this.resetWitnessDialog();

        const flightOverlay = document.getElementById('flight-overlay-modal');
        const telemetryText = document.getElementById('flight-telemetry-text');
        if (flightOverlay && telemetryText) {
            telemetryText.innerHTML = `✈️ <strong>IN FLIGHT:</strong> ${fromCity.name.toUpperCase()} ➔ ${res.currentCity.name.toUpperCase()}<br><small>ALTITUDE: 35,000 FT • SPEED: 580 KTS • TIME EN ROUTE: ${res.hoursSpent} HOURS</small>`;
            flightOverlay.style.display = 'flex';
        }

        this.playSound('flight');

        if (this.globe3D) {
            this.globe3D.animateFlightTrajectory(fromCity.id, targetCityId, () => {
                this.isFlightInProgress = false;
                if (flightOverlay) flightOverlay.style.display = 'none';
                this.resetWitnessDialog(); // Extra safeguard after flight completes
                this.renderCarmenUI();
                this.logCarmenMessage(`✈️ Flew to ${res.currentCity.name} (${res.currentCity.country}) - Flight consumed ${res.hoursSpent} hours.`);

                if (this.carmenEngine.currentCase.status === 'TIME_EXPIRED') {
                    this.playSound('alarm');
                    this.logCarmenMessage(`⏰ TIME EXPIRED! Flight took too long and the suspect vanished.`);
                }
            });
        } else {
            setTimeout(() => {
                this.isFlightInProgress = false;
                if (flightOverlay) flightOverlay.style.display = 'none';
                this.resetWitnessDialog();
                this.renderCarmenUI();
            }, 2000);
        }
    }

    applyWarrantFilter(isInline = true) {
        const pfx = isInline ? '-inline' : '';
        const criteria = {
            gender: document.getElementById(`warrant-gender${pfx}`)?.value || '',
            hair: document.getElementById(`warrant-hair${pfx}`)?.value || '',
            vehicle: document.getElementById(`warrant-vehicle${pfx}`)?.value || '',
            food: document.getElementById(`warrant-food${pfx}`)?.value || '',
            hobby: document.getElementById(`warrant-hobby${pfx}`)?.value || ''
        };

        const res = this.carmenEngine.issueWarrant(criteria);
        const statusEl = document.getElementById(`warrant-status-msg${pfx}`);

        if (res.success) {
            this.playSound('found');

            if (statusEl) {
                statusEl.className = 'status-box success';
                statusEl.textContent = `✅ ARREST WARRANT ISSUED FOR: ${res.suspect.name.toUpperCase()}`;
            }

            if (window.CarmenVisuals) {
                window.CarmenVisuals.drawSuspectMugshot('suspect-mugshot-canvas', res.suspect);
                window.CarmenVisuals.drawSuspectMugshot('warrant-preview-canvas', res.suspect);
            }

            const nameEl = document.getElementById('suspect-dossier-name');
            if (nameEl) nameEl.textContent = res.suspect.name.toUpperCase();

            const arrestBtn = document.getElementById('carmen-arrest-btn');
            if (arrestBtn) arrestBtn.classList.add('btn-arrest-glowing');

            const banner = document.getElementById('warrant-guidance-banner');
            const guidanceText = document.getElementById('warrant-guidance-text');
            if (banner && guidanceText) {
                guidanceText.innerHTML = `✅ <strong>ARREST WARRANT ISSUED FOR ${res.suspect.name.toUpperCase()}!</strong><br>NEXT STEP: Interrogate witnesses &amp; fly to ${res.suspect.name}'s final hideout city on the 3D Globe, then click the glowing <strong>"🚨 Make Arrest!"</strong> button to capture them!`;
                banner.style.display = 'flex';
            }

            const trackBtn = document.getElementById('carmen-track-warrant-btn');
            if (trackBtn) trackBtn.style.display = 'block';

            this.logCarmenMessage(`📜 LEGAL WARRANT ISSUED for ${res.suspect.name.toUpperCase()}! Follow clues to their final hideout and click "🚨 Make Arrest!"`);
            this.renderCarmenUI();
        } else {
            this.playSound('alarm');
            if (statusEl) {
                statusEl.className = 'status-box warning';
                statusEl.textContent = `⚠️ INSUFFICIENT EVIDENCE: ${res.matchCount} suspects match these traits. Interrogate more witnesses to narrow it down!`;
            }
        }
    }

    handleCarmenArrest() {
        const res = this.carmenEngine.attemptArrest();
        if (!res) return;

        if (res.success) {
            this.playSound('fanfare');

            const victoryModal = document.getElementById('victory-modal');
            const victoryTitle = document.getElementById('victory-title');
            const victoryReport = document.getElementById('victory-report-text');

            if (victoryTitle) victoryTitle.textContent = `🏆 SUSPECT CAPTURED: ${res.suspect.name.toUpperCase()}`;
            if (victoryReport) {
                victoryReport.innerHTML = `
                    <p><strong>Stolen Artifact Recovered:</strong> ${res.artifact}</p>
                    <p><strong>Criminal Arrested:</strong> ${res.suspect.name} (${res.suspect.feature})</p>
                    <p><strong>Case Investigation Time Left:</strong> ${res.hoursRemaining} hours</p>
                    <p><strong>New ACME Rank:</strong> <span style="color:var(--accent-gold); font-weight:800;">${res.rank}</span></p>
                `;
            }

            if (window.CarmenVisuals) {
                window.CarmenVisuals.drawSuspectMugshot('victory-mugshot-canvas', res.suspect);
            }

            if (victoryModal) victoryModal.style.display = 'flex';

            if (window.SuitePassport) {
                window.SuitePassport.awardXP(150, `Solved Carmen Sandiego Case: ${res.artifact}`);
                window.SuitePassport.unlockBadge('geo_sleuth', 'Geo Master Detective', '🕵️');
            }
        } else {
            this.playSound('alarm');

            const failureModal = document.getElementById('failure-modal');
            const failureReason = document.getElementById('failure-reason-text');

            if (failureReason) {
                failureReason.innerHTML = `⚠️ <strong>ARREST FAILED:</strong> ${res.message}`;
            }

            if (failureModal) failureModal.style.display = 'flex';
            this.logCarmenMessage(`❌ ARREST FAILED: ${res.message}`);
        }

        this.renderCarmenUI();
    }

    logCarmenMessage(msg) {
        const logBox = document.getElementById('carmen-log-box');
        if (logBox) {
            const line = document.createElement('p');
            line.className = 'log-line';
            line.innerHTML = msg;
            logBox.prepend(line);
        }
    }

    renderCarmenUI() {
        const c = this.carmenEngine.currentCase;
        if (!c) return;

        const cityEl = document.getElementById('carmen-current-city');
        if (cityEl) cityEl.textContent = `${c.currentCity.flag} ${c.currentCity.name}, ${c.currentCity.country}`;

        const hoursEl = document.getElementById('carmen-hours-left');
        if (hoursEl) hoursEl.textContent = `${c.hoursLeft} hrs`;

        const rankEl = document.getElementById('carmen-rank');
        if (rankEl) rankEl.textContent = this.carmenEngine.ranks[this.carmenEngine.playerRankIndex];

        const warrantEl = document.getElementById('carmen-warrant-issued');
        if (warrantEl) {
            warrantEl.textContent = c.warrantIssuedFor ? `Warrant: ${c.warrantIssuedFor.name}` : 'No Warrant Issued';
            warrantEl.style.color = c.warrantIssuedFor ? 'var(--neon-green)' : 'var(--accent-pink)';
        }

        const destContainer = document.getElementById('carmen-flight-destinations');
        let destinations = [];
        if (destContainer) {
            destContainer.innerHTML = '';
            destinations = this.carmenEngine.getDestinationCities();
            destinations.forEach(dest => {
                const btn = document.createElement('button');
                btn.className = 'flight-btn';
                btn.innerHTML = `<span>✈️ Fly to ${dest.flag} <strong>${dest.name}</strong> (${dest.country})</span> <span>➔</span>`;
                btn.onclick = () => this.handleCarmenFly(dest.id);
                destContainer.appendChild(btn);
            });
        }

        // Highlight Current Departure City (Neon Green) & Flight Destinations (Neon Pink/Cyan) on 3D Globe
        if (this.globe3D && c.currentCity) {
            this.globe3D.updateCityPinHighlights(c.currentCity.id, destinations.map(d => d.id));
        }
    }

    renderAtlas() {
        const grid = document.getElementById('atlas-cards-grid');
        if (!grid) return;

        grid.innerHTML = this.data.cities.map(city => `
            <div class="atlas-card">
                <div class="atlas-card-header">
                    <span class="atlas-flag">${city.flag}</span>
                    <h3>${city.name}</h3>
                </div>
                <div class="atlas-details">
                    <p><strong>Country:</strong> ${city.country} (${city.continent})</p>
                    <p><strong>Currency:</strong> ${city.currency}</p>
                    <p><strong>Language:</strong> ${city.language} ("${city.greeting}")</p>
                    <p><strong>Landmark:</strong> ${city.landform}</p>
                    <p><strong>Famous Export:</strong> ${city.export}</p>
                    <p><strong>Local Food:</strong> ${city.food}</p>
                </div>
            </div>
        `).join('');
    }

    renderPassportUI() {
        const passportContainer = document.getElementById('geo-passport-summary');
        if (!passportContainer) return;

        const carmenSolved = this.carmenEngine.casesSolved;
        const carmenRank = this.carmenEngine.ranks[this.carmenEngine.playerRankIndex];

        passportContainer.innerHTML = `
            <div class="passport-card">
                <h3>🕵️ ACME Detective Badge</h3>
                <p><strong>Rank:</strong> ${carmenRank}</p>
                <p><strong>Cases Solved:</strong> ${carmenSolved}</p>
            </div>
        `;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.app = new KidsGeoApp();
});
