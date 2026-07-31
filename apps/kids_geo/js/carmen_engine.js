/**
 * Carmen Sandiego Detective Engine ("Where in the World?")
 * Upgraded with difficulty scaling, 5 detective ranks, procedural storylines,
 * advanced 6-trait warrant matching, and detailed timer deduction math.
 */

window.CarmenEngine = class CarmenEngine {
    constructor(geoData) {
        this.data = geoData || window.GeoData;
        this.currentCase = null;
        this.ranks = ['Gumshoe', 'Junior Sleuth', 'Detective', 'Senior Inspector', 'Master Sleuth'];
        this.rankThresholds = [0, 2, 5, 9, 14];
        this.playerRankIndex = 0;
        this.casesSolved = 0;
        this.currentDifficulty = 'Easy';

        this.difficultyLevels = {
            Easy: {
                name: 'Easy',
                startingHours: 120,
                pathLength: 3,
                distractorsCount: 2,
                investigateHours: 2,
                warrantSearchHours: 1,
                wrongFlightPenaltyHours: 2,
                speedKmH: 1200,
                baseFlightHours: 4,
                description: 'Novice level: 120 hours, 3-city path, 2 distractors.'
            },
            Medium: {
                name: 'Medium',
                startingHours: 96,
                pathLength: 4,
                distractorsCount: 3,
                investigateHours: 3,
                warrantSearchHours: 1,
                wrongFlightPenaltyHours: 4,
                speedKmH: 1000,
                baseFlightHours: 4,
                description: 'Seasoned sleuth: 96 hours, 4-city path, 3 distractors.'
            },
            Hard: {
                name: 'Hard',
                startingHours: 72,
                pathLength: 5,
                distractorsCount: 4,
                investigateHours: 4,
                warrantSearchHours: 2,
                wrongFlightPenaltyHours: 6,
                speedKmH: 800,
                baseFlightHours: 5,
                description: 'Master agent: 72 hours, 5-city path, 4 distractors.'
            }
        };
    }

    normalizeDifficulty(level) {
        if (!level || typeof level !== 'string') return 'Medium';
        const lower = level.toLowerCase();
        if (lower === 'easy') return 'Easy';
        if (lower === 'medium') return 'Medium';
        if (lower === 'hard') return 'Hard';
        return 'Medium';
    }

    setDifficulty(level) {
        const normKey = this.normalizeDifficulty(level);
        this.currentDifficulty = normKey;
        return { success: true, difficulty: normKey, config: this.difficultyLevels[normKey] };
    }

    getDifficultyConfig(level) {
        const normKey = this.normalizeDifficulty(level || this.currentDifficulty);
        return this.difficultyLevels[normKey];
    }

    getRankInfo() {
        const currentTitle = this.ranks[this.playerRankIndex] || 'Gumshoe';
        const isMaxRank = this.playerRankIndex >= this.ranks.length - 1;
        const nextRankTitle = isMaxRank ? null : this.ranks[this.playerRankIndex + 1];
        const currentThreshold = this.rankThresholds[this.playerRankIndex] || 0;
        const nextThreshold = isMaxRank ? currentThreshold : (this.rankThresholds[this.playerRankIndex + 1] || currentThreshold);
        const casesNeeded = isMaxRank ? 0 : Math.max(0, nextThreshold - this.casesSolved);

        const casesInCurrentLevel = this.casesSolved - currentThreshold;
        const totalCasesInLevel = Math.max(1, nextThreshold - currentThreshold);
        const progressPercent = isMaxRank ? 100 : Math.min(100, Math.floor((casesInCurrentLevel / totalCasesInLevel) * 100));

        return {
            rankIndex: this.playerRankIndex,
            title: currentTitle,
            casesSolved: this.casesSolved,
            isMaxRank: isMaxRank,
            nextRankTitle: nextRankTitle,
            casesNeededForNextRank: casesNeeded,
            progressPercent: progressPercent
        };
    }

    getSuspectEyewear(suspect) {
        if (suspect.eyewear) return suspect.eyewear;
        const text = ((suspect.feature || '') + ' ' + (suspect.bio || '') + ' ' + (suspect.id || '')).toLowerCase();
        if (text.includes('monocle')) return 'Monocle';
        if (text.includes('goggles')) return 'Goggles';
        if (text.includes('glasses') || text.includes('sunglasses') || text.includes('crimson') || text.includes('carmen') || text.includes('viper')) return 'Sunglasses';
        return 'None';
    }

    generateStoryline(suspect, artifact, startingCity, difficultyKey) {
        const motives = [
            `to fund an underground auction for stolen high-tech relics`,
            `to add to a secret island museum collection`,
            `to ransom back to international heritage authorities`,
            `to decode a mysterious ancient treasure map`
        ];

        const heistMethods = [
            `under cover of a thick midnight fog`,
            `by bypassing thermal sensors disguised as art restorers`,
            `using a high-powered stealth drone`,
            `by disabling the main city grid for 60 seconds`
        ];

        const escapeRoutes = [
            `a high-speed chartered getaway vehicle`,
            `an unmarked supersonic jet`,
            `a covert underground rail network`,
            `a high-tech amphibious craft`
        ];

        const motive = motives[Math.floor(Math.random() * motives.length)];
        const heistMethod = heistMethods[Math.floor(Math.random() * heistMethods.length)];
        const escapeRoute = escapeRoutes[Math.floor(Math.random() * escapeRoutes.length)];

        const title = `The Case of the Missing ${artifact}`;
        const headline = `CRIME ALERT: ${artifact.toUpperCase()} STOLEN IN ${startingCity.name.toUpperCase()}!`;
        const briefing = `HQ DIRECTIVE [${difficultyKey.toUpperCase()} LEVEL]: ${suspect.name} has stolen "${artifact}" from ${startingCity.name} (${startingCity.country}) ${heistMethod} ${motive}. The suspect escaped via ${escapeRoute}. Interrogate witnesses near ${startingCity.landform} to trace the getaway trail!`;

        return {
            title,
            headline,
            briefing,
            motive,
            heistMethod,
            escapeRoute,
            stolenArtifact: artifact,
            startingCity: startingCity.name,
            difficulty: difficultyKey
        };
    }

    startNewCase(difficultyLevel) {
        const selectedDiff = difficultyLevel || this.currentDifficulty;
        const config = this.getDifficultyConfig(selectedDiff);
        this.currentDifficulty = config.name;

        const suspects = this.data.suspects;
        const cities = this.data.cities;
        const artifacts = this.data.stolenArtifacts;

        // Pick criminal & stolen artifact
        const suspect = suspects[Math.floor(Math.random() * suspects.length)];
        suspect.eyewear = suspect.eyewear || this.getSuspectEyewear(suspect);
        const artifact = artifacts[Math.floor(Math.random() * artifacts.length)];

        // Generate city path based on difficulty path length
        const shuffledCities = [...cities].sort(() => 0.5 - Math.random());
        const path = shuffledCities.slice(0, Math.min(config.pathLength, cities.length));

        // Generate procedural storyline
        const storyline = this.generateStoryline(suspect, artifact, path[0], config.name);

        this.currentCase = {
            id: 'case_' + Date.now(),
            difficulty: config.name,
            difficultyConfig: config,
            suspect: suspect,
            artifact: artifact,
            storyline: storyline,
            path: path,
            pathLength: path.length,
            currentIndex: 0,
            currentCity: path[0],
            startingHours: config.startingHours,
            hoursLeft: config.startingHours,
            warrantIssuedFor: null,
            warrantSearchCriteria: {
                gender: '',
                hair: '',
                vehicle: '',
                food: '',
                hobby: '',
                eyewear: ''
            },
            cluesCollected: [],
            status: 'IN_PROGRESS'
        };

        return this.currentCase;
    }

    getCaseSummary() {
        if (!this.currentCase) return null;
        const c = this.currentCase;
        return {
            id: c.id,
            difficulty: c.difficulty,
            suspectName: c.suspect.name,
            artifact: c.artifact,
            currentCity: c.currentCity,
            currentIndex: c.currentIndex,
            pathLength: c.path.length,
            hoursLeft: c.hoursLeft,
            timeRemaining: this.formatTimeRemaining(c.hoursLeft),
            status: c.status,
            warrantIssuedFor: c.warrantIssuedFor ? c.warrantIssuedFor.name : null,
            cluesCount: c.cluesCollected.length,
            storyline: c.storyline,
            isAtFinalCity: c.currentIndex === c.path.length - 1,
            progressPercent: Math.round((c.currentIndex / (c.path.length - 1)) * 100)
        };
    }

    getCurrentCity() {
        return this.currentCase ? this.currentCase.currentCity : null;
    }

    getDestinationCities() {
        if (!this.currentCase) return [];
        const currentId = this.currentCase.currentCity.id;
        const currentPathIndex = this.currentCase.currentIndex;
        const config = this.currentCase.difficultyConfig || this.getDifficultyConfig('Easy');

        const nextTrueCity = this.currentCase.path[currentPathIndex + 1];

        // Pick distractor cities based on difficulty level
        const distractorCount = config.distractorsCount || 2;
        const distractors = this.data.cities.filter(c =>
            c.id !== currentId && (!nextTrueCity || c.id !== nextTrueCity.id)
        ).sort(() => 0.5 - Math.random()).slice(0, distractorCount);

        const result = [...distractors];
        if (nextTrueCity) {
            result.push(nextTrueCity);
        }

        return result.sort(() => 0.5 - Math.random());
    }

    investigate(source) {
        if (!this.currentCase || this.currentCase.status !== 'IN_PROGRESS') return null;

        const config = this.currentCase.difficultyConfig || this.getDifficultyConfig('Easy');
        const timeCost = config.investigateHours || 2;

        // Deduct hours
        this.currentCase.hoursLeft -= timeCost;
        this.checkTimer();

        const currentCity = this.currentCase.currentCity;
        const pathIndex = this.currentCase.currentIndex;
        const nextCity = this.currentCase.path[pathIndex + 1];

        let cityClueText = "";
        let suspectClueText = "";
        let clueText = "";

        if (nextCity) {
            // Next city exists: give clue about next city geography AND suspect trait for this source
            cityClueText = nextCity.clues[source] || `They were asking about ${nextCity.country} and ${nextCity.landform}.`;
            suspectClueText = this.getSuspectTraitHint(this.currentCase.suspect, source);
            clueText = `${cityClueText} ${suspectClueText}`;
        } else {
            // Final city — criminal is lurking here!
            cityClueText = `A local witness saw someone matching an infamous thief lurking near ${currentCity.landform}!`;
            clueText = cityClueText;
        }

        const clueEntry = {
            source,
            cityClue: cityClueText,
            suspectClue: suspectClueText,
            text: clueText,
            timestampHoursLeft: this.currentCase.hoursLeft
        };

        this.currentCase.cluesCollected.push(clueEntry);

        return {
            success: true,
            source: source,
            clueText: clueText,
            cityClueText: cityClueText,
            suspectClueText: suspectClueText,
            hoursSpent: timeCost,
            hoursLeft: this.currentCase.hoursLeft,
            timeRemaining: this.formatTimeRemaining(this.currentCase.hoursLeft),
            timeExpired: this.currentCase.status === 'TIME_EXPIRED',
            caseStatus: this.currentCase.status
        };
    }

    getSuspectTraitHint(suspect, source) {
        const eyewear = suspect.eyewear || this.getSuspectEyewear(suspect);
        switch (source) {
            case 'bank':
                // Bank witness reveals: vehicle (getaway transport)
                return `[VEHICLE INTEL] The teller noticed they sped off in a ${suspect.vehicle}.`;
            case 'library':
                // Library witness reveals: hobby (reading interests)
                return `[HOBBY INTEL] A librarian said the person was researching ${suspect.hobby}.`;
            case 'airport':
                // Airport witness reveals: gender + hair + eyewear (physical appearance)
                return `[APPEARANCE INTEL] The gate agent described a ${suspect.gender || 'unknown gender'} individual with ${suspect.hair} hair and ${eyewear !== 'None' ? eyewear : 'no eyewear'}.`;
            case 'chef':
                // Chef witness reveals: food (dietary preference)
                return `[FOOD INTEL] The chef said the stranger only ordered ${suspect.food}.`;
            default:
                return `[GENERAL INTEL] They seemed interested in ${suspect.hobby}.`;
        }
    }

    flyTo(cityId) {
        if (!this.currentCase || this.currentCase.status !== 'IN_PROGRESS') return null;

        const targetCity = this.data.cities.find(c => c.id === cityId);
        if (!targetCity) return null;

        const config = this.currentCase.difficultyConfig || this.getDifficultyConfig('Easy');
        const speed = config.speedKmH || 1200;
        const baseHours = config.baseFlightHours || 4;

        const distKm = this.calculateDistance(this.currentCase.currentCity, targetCity);
        let distHours = Math.max(baseHours, Math.floor(distKm / speed) + baseHours);

        // Check if target city is the correct next city on path
        const nextCity = this.currentCase.path[this.currentCase.currentIndex + 1];
        let isCorrectPath = false;

        if (nextCity && nextCity.id === targetCity.id) {
            this.currentCase.currentIndex += 1;
            isCorrectPath = true;
        } else {
            // Distractor / wrong city penalty hours
            const penalty = config.wrongFlightPenaltyHours || 2;
            distHours += penalty;
        }

        this.currentCase.hoursLeft -= distHours;
        this.currentCase.currentCity = targetCity;

        this.checkTimer();

        return {
            success: true,
            currentCity: targetCity,
            isCorrectPath: isCorrectPath,
            distanceKm: distKm,
            hoursSpent: distHours,
            hoursLeft: this.currentCase.hoursLeft,
            timeRemaining: this.formatTimeRemaining(this.currentCase.hoursLeft),
            timeExpired: this.currentCase.status === 'TIME_EXPIRED',
            caseStatus: this.currentCase.status
        };
    }

    filterSuspects(criteria = {}) {
        const suspects = this.data.suspects;
        return suspects.filter(s => {
            const sEyewear = s.eyewear || this.getSuspectEyewear(s);
            if (criteria.gender && s.gender && s.gender.toLowerCase() !== criteria.gender.toLowerCase()) return false;
            if (criteria.hair && s.hair && s.hair.toLowerCase() !== criteria.hair.toLowerCase()) return false;
            if (criteria.vehicle && s.vehicle && s.vehicle.toLowerCase() !== criteria.vehicle.toLowerCase()) return false;
            if (criteria.food && s.food && s.food.toLowerCase() !== criteria.food.toLowerCase()) return false;
            if (criteria.hobby && s.hobby && s.hobby.toLowerCase() !== criteria.hobby.toLowerCase()) return false;
            if (criteria.eyewear && sEyewear && sEyewear.toLowerCase() !== criteria.eyewear.toLowerCase()) return false;
            return true;
        });
    }

    issueWarrant(criteria = {}) {
        if (!this.currentCase) return null;

        const config = this.currentCase.difficultyConfig || this.getDifficultyConfig('Easy');
        const searchHours = config.warrantSearchHours || 1;

        // Deduct warrant processing time
        this.currentCase.hoursLeft -= searchHours;
        this.checkTimer();

        // Update search criteria in case
        this.currentCase.warrantSearchCriteria = {
            gender: criteria.gender || '',
            hair: criteria.hair || '',
            vehicle: criteria.vehicle || '',
            food: criteria.food || '',
            hobby: criteria.hobby || '',
            eyewear: criteria.eyewear || ''
        };

        const matches = this.filterSuspects(criteria);

        if (matches.length === 1) {
            this.currentCase.warrantIssuedFor = matches[0];
            return {
                success: true,
                warrantIssued: true,
                suspect: matches[0],
                matchCount: 1,
                matchingSuspects: matches,
                hoursSpent: searchHours,
                hoursLeft: this.currentCase.hoursLeft,
                timeRemaining: this.formatTimeRemaining(this.currentCase.hoursLeft),
                message: `Warrant issued for ${matches[0].name}!`
            };
        } else {
            return {
                success: false,
                warrantIssued: false,
                matchCount: matches.length,
                matchingSuspects: matches,
                hoursSpent: searchHours,
                hoursLeft: this.currentCase.hoursLeft,
                timeRemaining: this.formatTimeRemaining(this.currentCase.hoursLeft),
                message: matches.length === 0
                    ? `No suspects match the specified criteria.`
                    : `${matches.length} suspects match criteria. Direct search needed to narrow down.`
            };
        }
    }

    attemptArrest() {
        if (!this.currentCase || this.currentCase.status !== 'IN_PROGRESS') return null;

        const isAtEnd = this.currentCase.currentIndex === this.currentCase.path.length - 1;
        const warrant = this.currentCase.warrantIssuedFor;
        const actualSuspect = this.currentCase.suspect;

        if (!warrant) {
            return {
                success: false,
                reason: 'NO_WARRANT',
                message: 'You need an arrest warrant from HQ before making an arrest!'
            };
        }

        if (warrant.id !== actualSuspect.id) {
            this.currentCase.status = 'WRONG_WARRANT';
            return {
                success: false,
                reason: 'WRONG_WARRANT',
                message: `Warrant was for ${warrant.name}, but the thief was actually ${actualSuspect.name}! Case dismissed.`
            };
        }

        if (!isAtEnd) {
            return {
                success: false,
                reason: 'NOT_AT_FINAL_LOCATION',
                message: 'The thief slipped past your trap! Track them down to their final hideout.'
            };
        }

        // VICTORY!
        this.currentCase.status = 'VICTORY';
        this.casesSolved += 1;

        const oldRankIndex = this.playerRankIndex;
        // Check promotion threshold
        const nextThreshold = this.rankThresholds[this.playerRankIndex + 1];
        if (nextThreshold !== undefined && this.casesSolved >= nextThreshold && this.playerRankIndex < this.ranks.length - 1) {
            this.playerRankIndex += 1;
        }

        const promoted = this.playerRankIndex > oldRankIndex;
        const rankInfo = this.getRankInfo();

        return {
            success: true,
            status: 'VICTORY',
            suspect: actualSuspect,
            artifact: this.currentCase.artifact,
            storyline: this.currentCase.storyline,
            rank: rankInfo.title,
            rankInfo: rankInfo,
            promoted: promoted,
            casesSolved: this.casesSolved,
            hoursRemaining: this.currentCase.hoursLeft,
            timeRemaining: this.formatTimeRemaining(this.currentCase.hoursLeft),
            message: `VICTORY! You arrested ${actualSuspect.name} and recovered ${this.currentCase.artifact}!${promoted ? ' Promoted to ' + rankInfo.title + '!' : ''}`
        };
    }

    rest(hours = 8) {
        if (!this.currentCase || this.currentCase.status !== 'IN_PROGRESS') return null;

        this.currentCase.hoursLeft -= hours;
        this.checkTimer();

        return {
            success: true,
            hoursRested: hours,
            hoursLeft: this.currentCase.hoursLeft,
            timeRemaining: this.formatTimeRemaining(this.currentCase.hoursLeft),
            timeExpired: this.currentCase.status === 'TIME_EXPIRED'
        };
    }

    checkTimer() {
        if (this.currentCase && this.currentCase.hoursLeft <= 0 && this.currentCase.status === 'IN_PROGRESS') {
            this.currentCase.hoursLeft = 0;
            this.currentCase.status = 'TIME_EXPIRED';
        }
    }

    formatTimeRemaining(hours) {
        const totalHours = Math.max(0, hours);
        const days = Math.floor(totalHours / 24);
        const remainingHours = totalHours % 24;
        return {
            totalHours: totalHours,
            days: days,
            hours: remainingHours,
            formatted: `${days}d ${remainingHours}h remaining`
        };
    }

    calculateDistance(c1, c2) {
        const R = 6371; // km
        const dLat = (c2.lat - c1.lat) * Math.PI / 180;
        const dLng = (c2.lng - c1.lng) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(c1.lat * Math.PI / 180) * Math.cos(c2.lat * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c);
    }

    getAvailableCriteriaOptions() {
        const suspects = this.data ? this.data.suspects : [];
        const getUnique = (key, extractor) => [...new Set(suspects.map(s => extractor ? extractor(s) : s[key]).filter(Boolean))].sort();
        return {
            genders: getUnique('gender'),
            hairs: getUnique('hair'),
            vehicles: getUnique('vehicle'),
            foods: getUnique('food'),
            hobbies: getUnique('hobby'),
            eyewears: getUnique(null, s => s.eyewear || this.getSuspectEyewear(s))
        };
    }
};
