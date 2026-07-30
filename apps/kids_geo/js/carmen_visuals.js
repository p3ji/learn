/**
 * Carmen Visuals Module - ACME Detective Command Center UI
 * Procedural HTML5 Canvas suspect mugshot avatars (fedoras, sunglasses, hair, suit coats),
 * visual witness speech bubbles with procedural witness portraits,
 * animated flight HUD radar elements, and ACME Crime Net CRT console styling.
 */

(function(global) {
    'use strict';

    class CarmenVisuals {
        constructor() {
            this.activeHUDs = new Map();
        }

        // =========================================================================
        // 1. PROCEDURAL HTML5 CANVAS SUSPECT MUGSHOT AVATARS
        // =========================================================================

        /**
         * Draws a procedural 2D Canvas mugshot avatar for a suspect object or options.
         * @param {HTMLCanvasElement|string} canvasOrId - Canvas element or element ID
         * @param {Object|null} suspect - Suspect object with gender, hair, vehicle, food, hobby, feature, etc.
         * @param {Object} [options] - Custom rendering options (width, height, CRT tint, etc.)
         */
        drawSuspectMugshot(canvasOrId, suspect, options = {}) {
            if (typeof document === 'undefined') return null;

            const canvas = typeof canvasOrId === 'string' ? document.getElementById(canvasOrId) : canvasOrId;
            if (!canvas || typeof canvas.getContext !== 'function') return null;

            const ctx = canvas.getContext('2d');
            const width = options.width || canvas.width || 200;
            const height = options.height || canvas.height || 240;

            canvas.width = width;
            canvas.height = height;

            // Clear background
            ctx.clearRect(0, 0, width, height);

            const isKnown = Boolean(suspect && suspect.id && suspect.id !== 'unknown');
            const suspectData = suspect || {
                id: 'unknown',
                name: 'UNKNOWN SUSPECT',
                gender: 'Unknown',
                hair: 'Unknown',
                feature: 'No warrant issued'
            };

            // A. Draw Police Mugshot Grid & Backdrop
            this._drawMugshotBackdrop(ctx, width, height, suspectData);

            if (!isKnown) {
                // Draw Mystery Silhouette
                this._drawMysterySilhouette(ctx, width, height);
            } else {
                // B. Draw Body & Clothing (Suit coat, collar, lapels, tie)
                this._drawMugshotBody(ctx, width, height, suspectData);

                // C. Draw Neck, Face Oval & Features
                this._drawMugshotFace(ctx, width, height, suspectData);

                // D. Draw Hair Style
                this._drawMugshotHair(ctx, width, height, suspectData);

                // E. Draw Hat / Headwear (Fedora, Sailor hat, etc.)
                this._drawMugshotHat(ctx, width, height, suspectData);

                // F. Draw Eyewear & Accessories (Sunglasses, Goggles, Monocle, Jewelry)
                this._drawMugshotAccessories(ctx, width, height, suspectData);
            }

            // G. Draw Serial Number Plaque & Border Overlay
            this._drawMugshotPlaque(ctx, width, height, suspectData);

            // H. Draw CRT Scanlines / Vignette Effect
            this._drawCRTScanlines(ctx, width, height);

            return canvas;
        }

        /**
         * Creates a Data URL of a procedural suspect mugshot canvas.
         */
        createSuspectAvatarURL(suspect, width = 200, height = 240) {
            if (typeof document === 'undefined') return '';
            const canvas = document.createElement('canvas');
            this.drawSuspectMugshot(canvas, suspect, { width, height });
            return canvas.toDataURL('image/png');
        }

        _drawMugshotBackdrop(ctx, w, h, s) {
            // Dark retro police line-up background
            const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
            bgGrad.addColorStop(0, '#0f172a');
            bgGrad.addColorStop(1, '#020617');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, w, h);

            // Height measurement line-up grid
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
            ctx.lineWidth = 1;

            const gridStart = Math.floor(h * 0.15);
            const gridEnd = Math.floor(h * 0.75);
            const lineCount = 7;
            const lineSpacing = (gridEnd - gridStart) / lineCount;

            const heightLabels = ["6'6\"", "6'3\"", "6'0\"", "5'9\"", "5'6\"", "5'3\"", "5'0\""];

            for (let i = 0; i <= lineCount; i++) {
                const y = gridStart + i * lineSpacing;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();

                // Draw height text marker on left & right
                if (heightLabels[i]) {
                    ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
                    ctx.font = '9px "Fira Code", monospace';
                    ctx.fillText(heightLabels[i], 6, y - 3);
                    ctx.fillText(heightLabels[i], w - 28, y - 3);
                }
            }

            // Vertical centerline
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
            ctx.beginPath();
            ctx.moveTo(w / 2, 0);
            ctx.lineTo(w / 2, h);
            ctx.stroke();
        }

        _drawMysterySilhouette(ctx, w, h) {
            const centerX = w / 2;
            const headCenterY = h * 0.42;
            const faceRadiusX = w * 0.21;
            const faceRadiusY = h * 0.22;

            // Dark mystery shadow shape
            ctx.fillStyle = '#0f172a';
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2;

            // Shoulders
            ctx.beginPath();
            ctx.moveTo(centerX - w * 0.4, h);
            ctx.quadraticCurveTo(centerX - w * 0.35, h * 0.68, centerX - w * 0.16, h * 0.7);
            ctx.lineTo(centerX + w * 0.16, h * 0.7);
            ctx.quadraticCurveTo(centerX + w * 0.35, h * 0.68, centerX + w * 0.4, h);
            ctx.closePath();
            ctx.fill();

            // Head Oval
            ctx.beginPath();
            ctx.ellipse(centerX, headCenterY, faceRadiusX, faceRadiusY, 0, 0, Math.PI * 2);
            ctx.fill();

            // Fedora Silhouette
            ctx.fillStyle = '#1e293b';
            ctx.beginPath();
            ctx.ellipse(centerX, headCenterY - 14, w * 0.36, 12, -0.05, 0, Math.PI * 2);
            ctx.fill();

            // Glowing Question Mark
            ctx.fillStyle = '#f59e0b';
            ctx.font = 'bold 36px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('?', centerX, headCenterY);
        }

        _drawMugshotBody(ctx, w, h, s) {
            const centerX = w / 2;
            const shoulderY = h * 0.68;
            const bottomY = h;

            // Determine coat color & suit style based on suspect traits
            let coatColor = '#1e293b';
            let lapelColor = '#0f172a';
            let shirtColor = '#f8fafc';
            let tieColor = '#ef4444';

            if (s.id === 'carmen_s' || s.hair === 'Red') {
                coatColor = '#991b1b'; // Crimson trench coat
                lapelColor = '#7f1d1d';
                shirtColor = '#1e293b';
                tieColor = '#f59e0b';
            } else if (s.id === 'baron_von_vulture' || s.hobby === 'Chess') {
                coatColor = '#27272a'; // Leather jacket
                lapelColor = '#18181b';
                shirtColor = '#d4d4d8';
                tieColor = '#991b1b';
            } else if (s.id === 'lady_emerald' || s.hair === 'Blonde') {
                coatColor = '#064e3b'; // Emerald dark coat
                lapelColor = '#022c22';
                shirtColor = '#ecfdf5';
                tieColor = '#10b981';
            } else if (s.id === 'dr_quantum' || s.hair === 'Silver') {
                coatColor = '#1e1b4b'; // Tech coat
                lapelColor = '#312e81';
                shirtColor = '#06b6d4';
                tieColor = '#38bdf8';
            } else if (s.id === 'scarlet_viper' || s.vehicle === 'Motorcycle') {
                coatColor = '#450a0a'; // Leather motorcycle jacket
                lapelColor = '#292524';
                shirtColor = '#1c1917';
                tieColor = '#dc2626';
            } else if (s.id === 'captain_barnaby' || s.hobby === 'Sailing') {
                coatColor = '#1e3a8a'; // Royal Navy coat
                lapelColor = '#172554';
                shirtColor = '#ffffff';
                tieColor = '#f59e0b';
            }

            // Draw Shoulders & Jacket Body
            ctx.fillStyle = coatColor;
            ctx.beginPath();
            ctx.moveTo(centerX - w * 0.45, bottomY);
            ctx.quadraticCurveTo(centerX - w * 0.35, shoulderY, centerX - w * 0.16, shoulderY + 12);
            ctx.lineTo(centerX + w * 0.16, shoulderY + 12);
            ctx.quadraticCurveTo(centerX + w * 0.35, shoulderY, centerX + w * 0.45, bottomY);
            ctx.closePath();
            ctx.fill();

            // Inner Shirt V-Shape
            ctx.fillStyle = shirtColor;
            ctx.beginPath();
            ctx.moveTo(centerX - w * 0.12, shoulderY + 10);
            ctx.lineTo(centerX, shoulderY + 45);
            ctx.lineTo(centerX + w * 0.12, shoulderY + 10);
            ctx.closePath();
            ctx.fill();

            // Necktie
            ctx.fillStyle = tieColor;
            ctx.beginPath();
            ctx.moveTo(centerX - 6, shoulderY + 18);
            ctx.lineTo(centerX + 6, shoulderY + 18);
            ctx.lineTo(centerX + 8, shoulderY + 52);
            ctx.lineTo(centerX, shoulderY + 60);
            ctx.lineTo(centerX - 8, shoulderY + 52);
            ctx.closePath();
            ctx.fill();

            // Coat Lapels
            ctx.fillStyle = lapelColor;
            // Left Lapel
            ctx.beginPath();
            ctx.moveTo(centerX - w * 0.22, shoulderY + 4);
            ctx.lineTo(centerX - w * 0.08, shoulderY + 14);
            ctx.lineTo(centerX - 4, shoulderY + 48);
            ctx.lineTo(centerX - w * 0.18, shoulderY + 42);
            ctx.closePath();
            ctx.fill();

            // Right Lapel
            ctx.beginPath();
            ctx.moveTo(centerX + w * 0.22, shoulderY + 4);
            ctx.lineTo(centerX + w * 0.08, shoulderY + 14);
            ctx.lineTo(centerX + 4, shoulderY + 48);
            ctx.lineTo(centerX + w * 0.18, shoulderY + 42);
            ctx.closePath();
            ctx.fill();
        }

        _drawMugshotFace(ctx, w, h, s) {
            const centerX = w / 2;
            const headCenterY = h * 0.42;
            const faceRadiusX = w * 0.21;
            const faceRadiusY = h * 0.22;

            let skinTone = '#f8fafc';
            let shadowTone = '#e2e8f0';

            if (s.gender === 'Female') {
                skinTone = '#fed7aa';
                shadowTone = '#fdba74';
            } else {
                skinTone = '#ffedd5';
                shadowTone = '#fed7aa';
            }

            if (s.id === 'scarlet_viper') {
                skinTone = '#fcd34d';
                shadowTone = '#f59e0b';
            } else if (s.id === 'baron_von_vulture') {
                skinTone = '#e2e8f0';
                shadowTone = '#cbd5e1';
            }

            // Neck
            ctx.fillStyle = shadowTone;
            ctx.fillRect(centerX - w * 0.09, headCenterY + faceRadiusY * 0.5, w * 0.18, h * 0.15);

            // Face Oval
            ctx.fillStyle = skinTone;
            ctx.beginPath();
            ctx.ellipse(centerX, headCenterY, faceRadiusX, faceRadiusY, 0, 0, Math.PI * 2);
            ctx.fill();

            // Jawline Contour Shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
            ctx.beginPath();
            ctx.ellipse(centerX, headCenterY + faceRadiusY * 0.2, faceRadiusX * 0.95, faceRadiusY * 0.8, 0, 0, Math.PI);
            ctx.fill();

            // Ears
            ctx.fillStyle = skinTone;
            ctx.beginPath();
            ctx.ellipse(centerX - faceRadiusX, headCenterY, 6, 12, 0, 0, Math.PI * 2);
            ctx.ellipse(centerX + faceRadiusX, headCenterY, 6, 12, 0, 0, Math.PI * 2);
            ctx.fill();

            // Eyes & Eyebrows
            const eyeY = headCenterY - 6;
            const eyeSpacing = faceRadiusX * 0.48;

            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(centerX - eyeSpacing - 12, eyeY - 14);
            ctx.quadraticCurveTo(centerX - eyeSpacing, eyeY - 18, centerX - eyeSpacing + 10, eyeY - 12);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(centerX + eyeSpacing - 10, eyeY - 12);
            ctx.quadraticCurveTo(centerX + eyeSpacing, eyeY - 18, centerX + eyeSpacing + 12, eyeY - 14);
            ctx.stroke();

            const drawEyes = !(s.id === 'dr_quantum' || s.id === 'lady_emerald' || s.vehicle === 'Convertible');

            if (drawEyes) {
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.ellipse(centerX - eyeSpacing, eyeY, 8, 5, 0, 0, Math.PI * 2);
                ctx.ellipse(centerX + eyeSpacing, eyeY, 8, 5, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = s.hair === 'Red' ? '#0284c7' : '#0f172a';
                ctx.beginPath();
                ctx.arc(centerX - eyeSpacing, eyeY, 4, 0, Math.PI * 2);
                ctx.arc(centerX + eyeSpacing, eyeY, 4, 0, Math.PI * 2);
                ctx.fill();
            }

            // Nose
            ctx.strokeStyle = shadowTone;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(centerX, headCenterY - 4);
            ctx.lineTo(centerX - 3, headCenterY + 12);
            ctx.lineTo(centerX + 4, headCenterY + 12);
            ctx.stroke();

            // Mouth
            ctx.strokeStyle = s.gender === 'Female' ? '#991b1b' : '#334155';
            ctx.lineWidth = s.gender === 'Female' ? 3 : 2;
            const mouthY = headCenterY + faceRadiusY * 0.52;

            ctx.beginPath();
            if (s.id === 'carmen_s' || s.id === 'scarlet_viper') {
                ctx.moveTo(centerX - 12, mouthY);
                ctx.quadraticCurveTo(centerX, mouthY + 4, centerX + 14, mouthY - 4);
            } else if (s.id === 'baron_von_vulture') {
                ctx.moveTo(centerX - 14, mouthY + 2);
                ctx.quadraticCurveTo(centerX, mouthY - 3, centerX + 14, mouthY + 2);
            } else {
                ctx.moveTo(centerX - 12, mouthY - 2);
                ctx.quadraticCurveTo(centerX, mouthY + 6, centerX + 12, mouthY - 2);
            }
            ctx.stroke();
        }

        _drawMugshotHair(ctx, w, h, s) {
            const centerX = w / 2;
            const headCenterY = h * 0.42;
            const faceRadiusX = w * 0.21;
            const faceRadiusY = h * 0.22;

            let hairColor = '#ef4444';
            if (s.hair === 'Black') hairColor = '#1e293b';
            if (s.hair === 'Blonde') hairColor = '#fbbf24';
            if (s.hair === 'Silver') hairColor = '#94a3b8';
            if (s.hair === 'Brown') hairColor = '#78350f';
            if (s.hair === 'Red') hairColor = '#dc2626';

            ctx.fillStyle = hairColor;

            if (s.hair === 'Red' || s.id === 'carmen_s') {
                ctx.beginPath();
                ctx.moveTo(centerX - faceRadiusX - 10, headCenterY - 10);
                ctx.quadraticCurveTo(centerX - faceRadiusX - 25, headCenterY + 40, centerX - faceRadiusX - 8, headCenterY + faceRadiusY + 30);
                ctx.quadraticCurveTo(centerX - faceRadiusX + 5, headCenterY + 20, centerX - faceRadiusX + 2, headCenterY - 10);
                ctx.closePath();
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(centerX + faceRadiusX + 10, headCenterY - 10);
                ctx.quadraticCurveTo(centerX + faceRadiusX + 25, headCenterY + 40, centerX + faceRadiusX + 8, headCenterY + faceRadiusY + 30);
                ctx.quadraticCurveTo(centerX + faceRadiusX - 5, headCenterY + 20, centerX + faceRadiusX - 2, headCenterY - 10);
                ctx.closePath();
                ctx.fill();
            } else if (s.hair === 'Blonde' || s.gender === 'Female') {
                ctx.beginPath();
                ctx.arc(centerX, headCenterY - 10, faceRadiusX + 8, Math.PI, Math.PI * 2);
                ctx.lineTo(centerX + faceRadiusX + 10, headCenterY + faceRadiusY + 15);
                ctx.lineTo(centerX - faceRadiusX - 10, headCenterY + faceRadiusY + 15);
                ctx.closePath();
                ctx.fill();
            } else if (s.hair === 'Silver' || s.id === 'dr_quantum') {
                for (let angle = Math.PI * 0.8; angle <= Math.PI * 2.2; angle += 0.25) {
                    const spikeLen = 22 + Math.random() * 8;
                    const x1 = centerX + Math.cos(angle) * (faceRadiusX + 4);
                    const y1 = headCenterY - 10 + Math.sin(angle) * (faceRadiusY + 4);
                    const x2 = centerX + Math.cos(angle) * (faceRadiusX + spikeLen);
                    const y2 = headCenterY - 10 + Math.sin(angle) * (faceRadiusY + spikeLen);

                    ctx.beginPath();
                    ctx.moveTo(x1 - 6, y1);
                    ctx.lineTo(x2, y2);
                    ctx.lineTo(x1 + 6, y1);
                    ctx.closePath();
                    ctx.fill();
                }
            } else {
                ctx.beginPath();
                ctx.arc(centerX, headCenterY - 8, faceRadiusX + 6, Math.PI * 0.85, Math.PI * 2.15);
                ctx.quadraticCurveTo(centerX, headCenterY - faceRadiusY - 12, centerX - faceRadiusX - 6, headCenterY - 8);
                ctx.closePath();
                ctx.fill();
            }
        }

        _drawMugshotHat(ctx, w, h, s) {
            const centerX = w / 2;
            const headCenterY = h * 0.42;
            const hatY = headCenterY - h * 0.16;

            if (s.id === 'carmen_s' || s.feature?.toLowerCase().includes('fedora') || s.hair === 'Red') {
                const hatColor = '#991b1b';
                const bandColor = '#f59e0b';

                ctx.fillStyle = hatColor;
                ctx.beginPath();
                ctx.ellipse(centerX, hatY + 14, w * 0.38, 14, -0.06, 0, Math.PI * 2);
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(centerX - w * 0.22, hatY + 12);
                ctx.quadraticCurveTo(centerX - w * 0.2, hatY - 24, centerX - w * 0.08, hatY - 28);
                ctx.quadraticCurveTo(centerX, hatY - 20, centerX + w * 0.08, hatY - 28);
                ctx.quadraticCurveTo(centerX + w * 0.2, hatY - 24, centerX + w * 0.22, hatY + 12);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = bandColor;
                ctx.beginPath();
                ctx.moveTo(centerX - w * 0.22, hatY + 12);
                ctx.lineTo(centerX + w * 0.22, hatY + 12);
                ctx.lineTo(centerX + w * 0.21, hatY + 4);
                ctx.lineTo(centerX - w * 0.21, hatY + 4);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.beginPath();
                ctx.ellipse(centerX, hatY + 18, w * 0.32, 10, 0, 0, Math.PI);
                ctx.fill();
            } else if (s.id === 'captain_barnaby' || s.feature?.toLowerCase().includes('captain')) {
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.ellipse(centerX, hatY - 4, w * 0.28, 18, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#0f172a';
                ctx.beginPath();
                ctx.ellipse(centerX, hatY + 14, w * 0.26, 8, 0, 0, Math.PI);
                ctx.fill();

                ctx.fillStyle = '#f59e0b';
                ctx.font = '16px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('⚓', centerX, hatY + 6);
            }
        }

        _drawMugshotAccessories(ctx, w, h, s) {
            const centerX = w / 2;
            const headCenterY = h * 0.42;
            const eyeY = headCenterY - 6;

            if (s.id === 'dr_quantum' || s.feature?.toLowerCase().includes('goggles')) {
                const gogY = eyeY - 2;

                ctx.fillStyle = '#0f172a';
                ctx.strokeStyle = '#06b6d4';
                ctx.lineWidth = 3;

                ctx.beginPath();
                if (typeof ctx.roundRect === 'function') {
                    ctx.roundRect(centerX - w * 0.26, gogY - 14, w * 0.52, 28, 8);
                } else {
                    ctx.rect(centerX - w * 0.26, gogY - 14, w * 0.52, 28);
                }
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = 'rgba(6, 182, 212, 0.75)';
                ctx.beginPath();
                ctx.ellipse(centerX - 16, gogY, 14, 10, 0, 0, Math.PI * 2);
                ctx.ellipse(centerX + 16, gogY, 14, 10, 0, 0, Math.PI * 2);
                ctx.fill();
            } else if (s.id === 'baron_von_vulture' || s.feature?.toLowerCase().includes('monocle')) {
                const monoX = centerX + 18;
                const monoY = eyeY;

                ctx.strokeStyle = '#f59e0b';
                ctx.lineWidth = 2.5;
                ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';

                ctx.beginPath();
                ctx.arc(monoX, monoY, 11, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(monoX + 11, monoY);
                ctx.quadraticCurveTo(monoX + 22, monoY + 25, centerX + 15, headCenterY + 45);
                ctx.stroke();
            } else if (s.id === 'lady_emerald' || s.vehicle === 'Convertible') {
                ctx.fillStyle = '#090d16';
                ctx.strokeStyle = '#38bdf8';
                ctx.lineWidth = 2;

                ctx.beginPath();
                ctx.moveTo(centerX - w * 0.24, eyeY - 8);
                ctx.lineTo(centerX + w * 0.24, eyeY - 8);
                ctx.lineTo(centerX + w * 0.22, eyeY + 12);
                ctx.lineTo(centerX + 4, eyeY + 12);
                ctx.lineTo(centerX, eyeY - 2);
                ctx.lineTo(centerX - 4, eyeY + 12);
                ctx.lineTo(centerX - w * 0.22, eyeY + 12);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }
        }

        _drawMugshotPlaque(ctx, w, h, s) {
            const plaqueH = 34;
            const plaqueY = h - plaqueH - 6;
            const plaqueW = w - 24;
            const plaqueX = 12;

            ctx.fillStyle = '#020617';
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 2;

            ctx.beginPath();
            if (typeof ctx.roundRect === 'function') {
                ctx.roundRect(plaqueX, plaqueY, plaqueW, plaqueH, 6);
            } else {
                ctx.rect(plaqueX, plaqueY, plaqueW, plaqueH);
            }
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#f59e0b';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`ACME CRIME NET // DOSSIER`, w / 2, plaqueY + 13);

            ctx.fillStyle = '#f8fafc';
            ctx.font = 'bold 11px "Fira Code", monospace';
            const suspectName = (s.name || 'UNKNOWN SUSPECT').toUpperCase();
            ctx.fillText(suspectName, w / 2, plaqueY + 27);
        }

        _drawCRTScanlines(ctx, w, h) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
            for (let y = 0; y < h; y += 3) {
                ctx.fillRect(0, y, w, 1);
            }

            const vigGrad = ctx.createRadialGradient(w / 2, h / 2, w * 0.35, w / 2, h / 2, w * 0.7);
            vigGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
            vigGrad.addColorStop(1, 'rgba(2, 6, 23, 0.6)');
            ctx.fillStyle = vigGrad;
            ctx.fillRect(0, 0, w, h);
        }

        // =========================================================================
        // 2. VISUAL WITNESS DIALOG SPEECH BUBBLES
        // =========================================================================

        /**
         * Renders a procedural witness portrait onto a canvas element.
         */
        drawWitnessAvatar(canvasOrId, source) {
            if (typeof document === 'undefined') return null;

            const canvas = typeof canvasOrId === 'string' ? document.getElementById(canvasOrId) : canvasOrId;
            if (!canvas || typeof canvas.getContext !== 'function') return null;

            const ctx = canvas.getContext('2d');
            const w = canvas.width || 72;
            const h = canvas.height || 72;

            canvas.width = w;
            canvas.height = h;

            ctx.clearRect(0, 0, w, h);

            ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
            ctx.beginPath();
            ctx.arc(w / 2, h / 2, w / 2 - 2, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2;
            ctx.stroke();

            const cX = w / 2;
            const cY = h / 2;

            if (source === 'bank') {
                ctx.fillStyle = '#0284c7';
                ctx.beginPath();
                ctx.ellipse(cX, cY + 18, 22, 14, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#fed7aa';
                ctx.beginPath();
                ctx.arc(cX, cY - 2, 16, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(cX - 14, cY - 8, 28, 6);
            } else if (source === 'library') {
                ctx.fillStyle = '#7c2d12';
                ctx.beginPath();
                ctx.ellipse(cX, cY + 18, 22, 14, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#ffedd5';
                ctx.beginPath();
                ctx.arc(cX, cY - 2, 16, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = '#f59e0b';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(cX - 7, cY - 4, 5, 0, Math.PI * 2);
                ctx.arc(cX + 7, cY - 4, 5, 0, Math.PI * 2);
                ctx.moveTo(cX - 2, cY - 4);
                ctx.lineTo(cX + 2, cY - 4);
                ctx.stroke();
            } else if (source === 'airport') {
                ctx.fillStyle = '#1e3a8a';
                ctx.beginPath();
                ctx.ellipse(cX, cY + 18, 22, 14, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#fed7aa';
                ctx.beginPath();
                ctx.arc(cX, cY - 2, 15, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#172554';
                ctx.fillRect(cX - 16, cY - 18, 32, 10);
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(cX - 14, cY - 10, 28, 4);

                ctx.fillStyle = '#f59e0b';
                ctx.font = '10px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('✈️', cX, cY - 11);
            } else if (source === 'chef') {
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.ellipse(cX, cY + 18, 22, 14, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#ffedd5';
                ctx.beginPath();
                ctx.arc(cX, cY - 2, 15, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(cX, cY - 20, 14, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillRect(cX - 12, cY - 16, 24, 10);

                ctx.fillStyle = '#78350f';
                ctx.beginPath();
                ctx.ellipse(cX - 4, cY + 4, 5, 2, -0.2, 0, Math.PI * 2);
                ctx.ellipse(cX + 4, cY + 4, 5, 2, 0.2, 0, Math.PI * 2);
                ctx.fill();
            }

            return canvas;
        }

        /**
         * Renders a visual witness speech bubble. Flexible signature supports:
         * (containerElement, source, clueText, onTypeComplete) or (source, clueText)
         */
        renderWitnessBubble(targetElement, source, clueText, onTypeComplete) {
            if (typeof document === 'undefined') return;

            let container, src, text, cb;
            if (typeof targetElement === 'string' && (targetElement === 'bank' || targetElement === 'library' || targetElement === 'airport' || targetElement === 'chef')) {
                container = document.getElementById('witness-dialog-container');
                src = targetElement;
                text = source;
                cb = clueText;
            } else {
                container = typeof targetElement === 'string' ? document.getElementById(targetElement) : targetElement;
                src = source;
                text = clueText;
                cb = onTypeComplete;
            }

            if (!container) return;

            container.style.display = 'flex';

            const witnessTitles = {
                bank: '🏦 BANK TELLER',
                library: '📚 LIBRARY CURATOR',
                airport: '✈️ AIRPORT CUSTOMS OFFICER',
                chef: '🍳 LOCAL CHEF'
            };

            const title = witnessTitles[src] || `🔍 WITNESS (${(src || 'UNKNOWN').toUpperCase()})`;

            const box = document.createElement('div');
            box.className = 'witness-dialog-box';
            box.style.cssText = `
                display: flex;
                align-items: flex-start;
                gap: 16px;
                background: rgba(15, 23, 42, 0.95);
                border: 1px solid var(--accent-cyan, #06b6d4);
                border-radius: 16px;
                padding: 16px;
                margin-top: 14px;
                box-shadow: 0 8px 32px rgba(6, 182, 212, 0.2);
                width: 100%;
            `;

            const avatarCanvas = document.createElement('canvas');
            avatarCanvas.width = 64;
            avatarCanvas.height = 64;
            avatarCanvas.style.cssText = 'border-radius:50%; flex-shrink:0; background:rgba(0,0,0,0.5); border:2px solid var(--accent-blue, #38bdf8);';
            this.drawWitnessAvatar(avatarCanvas, src);

            const bubble = document.createElement('div');
            bubble.className = 'witness-bubble';
            bubble.style.cssText = `
                position: relative;
                background: rgba(2, 6, 23, 0.9);
                border: 1px solid rgba(56, 189, 248, 0.4);
                border-radius: 14px;
                padding: 14px 18px;
                flex: 1;
                font-family: var(--font-body, sans-serif);
            `;

            const header = document.createElement('div');
            header.style.cssText = 'font-family:var(--font-mono, monospace); font-weight:800; font-size:0.8rem; color:var(--accent-gold, #f59e0b); margin-bottom:6px; letter-spacing:0.5px;';
            header.textContent = title;

            const textEl = document.createElement('div');
            textEl.style.cssText = 'font-size:0.95rem; line-height:1.5; color:#f8fafc;';

            bubble.appendChild(header);
            bubble.appendChild(textEl);
            box.appendChild(avatarCanvas);
            box.appendChild(bubble);

            container.innerHTML = '';
            container.appendChild(box);

            let charIdx = 0;
            const speed = 18;
            textEl.textContent = '';

            const timer = setInterval(() => {
                if (charIdx < (text || '').length) {
                    textEl.textContent += text.charAt(charIdx);
                    charIdx++;
                } else {
                    clearInterval(timer);
                    if (typeof cb === 'function') cb();
                }
            }, speed);
        }

        // =========================================================================
        // 3. ANIMATED FLIGHT HUD RADAR ELEMENTS
        // =========================================================================

        /**
         * Creates an interactive animated HTML5 Canvas flight HUD radar sweep.
         */
        createFlightHUD(containerElement, flightData = {}) {
            if (typeof document === 'undefined') return null;

            const container = typeof containerElement === 'string' ? document.getElementById(containerElement) : containerElement;
            if (!container) return null;

            const hudId = 'flight-hud-' + Math.random().toString(36).substring(2, 9);
            container.innerHTML = `
                <div id="${hudId}" style="position:relative; width:100%; height:260px; background:#020617; border-radius:18px; border:2px solid var(--accent-blue, #38bdf8); overflow:hidden; box-shadow:0 0 30px rgba(56,189,248,0.25);">
                    <canvas id="${hudId}-canvas" style="width:100%; height:100%; display:block;"></canvas>
                    <div style="position:absolute; top:12px; left:16px; font-family:'Fira Code', monospace; font-size:0.78rem; color:#38bdf8; font-weight:700; pointer-events:none;">
                        ✈️ ACME AIR-RADAR HUD // SYSTEM LOCKED
                    </div>
                    <div id="${hudId}-telemetry" style="position:absolute; bottom:12px; right:16px; font-family:'Fira Code', monospace; font-size:0.75rem; color:#f59e0b; text-align:right; font-weight:600; pointer-events:none;">
                        ALT: 34,000 FT | SPD: 540 KTS
                    </div>
                </div>
            `;

            const canvas = document.getElementById(`${hudId}-canvas`);
            if (!canvas) return null;

            const ctx = canvas.getContext('2d');
            let animationFrameId = null;
            let sweepAngle = 0;

            const fromCity = flightData.fromCity || { name: 'ORIGIN', lat: 0, lng: 0 };
            const toCity = flightData.toCity || { name: 'DESTINATION', lat: 40, lng: 40 };

            const resize = () => {
                canvas.width = container.clientWidth || 320;
                canvas.height = 260;
            };
            resize();

            const render = () => {
                const w = canvas.width;
                const h = canvas.height;
                const cX = w / 2;
                const cY = h / 2;
                const radarRadius = Math.min(w, h) * 0.42;

                ctx.clearRect(0, 0, w, h);

                const bgGrad = ctx.createRadialGradient(cX, cY, 10, cX, cY, radarRadius * 1.2);
                bgGrad.addColorStop(0, '#061826');
                bgGrad.addColorStop(1, '#020617');
                ctx.fillStyle = bgGrad;
                ctx.fillRect(0, 0, w, h);

                ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
                ctx.lineWidth = 1.5;

                [0.3, 0.6, 0.9].forEach(rRatio => {
                    ctx.beginPath();
                    ctx.arc(cX, cY, radarRadius * rRatio, 0, Math.PI * 2);
                    ctx.stroke();
                });

                ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
                ctx.beginPath();
                ctx.moveTo(cX - radarRadius, cY);
                ctx.lineTo(cX + radarRadius, cY);
                ctx.moveTo(cX, cY - radarRadius);
                ctx.lineTo(cX, cY + radarRadius);
                ctx.stroke();

                ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
                ctx.font = 'bold 10px "Fira Code", monospace';
                ctx.textAlign = 'center';
                ctx.fillText('N', cX, cY - radarRadius - 6);
                ctx.fillText('S', cX, cY + radarRadius + 14);
                ctx.fillText('E', cX + radarRadius + 10, cY + 3);
                ctx.fillText('W', cX - radarRadius - 10, cY + 3);

                const origX = cX - radarRadius * 0.5;
                const origY = cY + radarRadius * 0.3;
                const destX = cX + radarRadius * 0.5;
                const destY = cY - radarRadius * 0.4;

                ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
                ctx.setLineDash([4, 4]);
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(origX, origY);
                ctx.quadraticCurveTo(cX, cY - radarRadius * 0.2, destX, destY);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.fillStyle = '#10b981';
                ctx.beginPath();
                ctx.arc(origX, origY, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.font = '9px "Fira Code", monospace';
                ctx.fillText((fromCity.name || 'ORIGIN').toUpperCase(), origX, origY + 16);

                const pulseScale = 1 + Math.sin(Date.now() * 0.008) * 0.2;
                ctx.strokeStyle = '#f59e0b';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(destX, destY, 10 * pulseScale, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = '#ef4444';
                ctx.beginPath();
                ctx.arc(destX, destY, 5, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#f59e0b';
                ctx.fillText(`TARGET: ${(toCity.name || 'DESTINATION').toUpperCase()}`, destX, destY - 14);

                sweepAngle = (sweepAngle + 0.03) % (Math.PI * 2);

                ctx.strokeStyle = '#38bdf8';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(cX, cY);
                ctx.lineTo(cX + Math.cos(sweepAngle) * radarRadius * 0.9, cY + Math.sin(sweepAngle) * radarRadius * 0.9);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(cX, cY, radarRadius, 0, Math.PI * 2);
                ctx.stroke();

                if (typeof requestAnimationFrame !== 'undefined') {
                    animationFrameId = requestAnimationFrame(render);
                }
            };

            render();

            const hudController = {
                destroy: () => {
                    if (animationFrameId && typeof cancelAnimationFrame !== 'undefined') {
                        cancelAnimationFrame(animationFrameId);
                    }
                    container.innerHTML = '';
                }
            };

            this.activeHUDs.set(hudId, hudController);
            return hudController;
        }

        // =========================================================================
        // 4. ACME CRIME NET CONSOLE STYLING & CRT TERMINAL EFFECTS
        // =========================================================================

        /**
         * Applies authentic retro CRT terminal styling and scanlines overlay to an element.
         */
        applyConsoleStyling(logElement) {
            if (typeof document === 'undefined') return;

            const el = typeof logElement === 'string' ? document.getElementById(logElement) : logElement;
            if (!el) return;

            el.classList.add('acme-crt-console');
            el.style.cssText += `
                background: #020617 !important;
                border: 1px solid rgba(56, 189, 248, 0.4) !important;
                box-shadow: inset 0 0 20px rgba(6, 182, 212, 0.2), 0 4px 20px rgba(0,0,0,0.8) !important;
                position: relative !important;
                color: #38bdf8 !important;
                text-shadow: 0 0 4px rgba(56, 189, 248, 0.6) !important;
                font-family: 'Fira Code', monospace !important;
            `;

            if (!el.querySelector('.acme-console-header')) {
                const header = document.createElement('div');
                header.className = 'acme-console-header';
                header.style.cssText = `
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(15, 23, 42, 0.95);
                    border-bottom: 1px solid rgba(56, 189, 248, 0.3);
                    padding: 6px 12px;
                    margin: -16px -16px 12px -16px;
                    font-size: 0.75rem;
                    color: var(--accent-gold, #f59e0b);
                    font-weight: 700;
                    border-top-left-radius: 12px;
                    border-top-right-radius: 12px;
                `;
                header.innerHTML = `
                    <span>📟 ACME DETECTIVE CRIME NET v4.2</span>
                    <span style="display:flex; align-items:center; gap:6px;">
                        <span style="width:8px; height:8px; background:#10b981; border-radius:50%; box-shadow:0 0 8px #10b981;"></span> SECURE FEED
                    </span>
                `;
                el.prepend(header);
            }
        }
    }

    const instance = new CarmenVisuals();
    instance.CarmenVisuals = CarmenVisuals;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = instance;
    }
    if (global) {
        global.CarmenVisuals = instance;
    }
})(typeof window !== 'undefined' ? window : global);
