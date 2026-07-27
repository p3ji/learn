// App Controller & Progress Management

let currentDataset = 'ai_trust';

function switchDataset(datasetKey) {
    currentDataset = datasetKey;
    document.getElementById('btnAiTrust').classList.toggle('active', datasetKey === 'ai_trust');
    document.getElementById('btnGss').classList.toggle('active', datasetKey === 'gss');

    const sandboxInput = document.getElementById('sandboxQuery');
    if (datasetKey === 'ai_trust') {
        sandboxInput.value = "Compare Logistic Regression, Random Forest, and Google TabFM Zero-Shot for predicting high trust in AI among survey respondents.";
    } else {
        sandboxInput.value = "Evaluate supervised ML models for predicting High Institutional Trust in GSS survey respondents.";
    }
}

function toggleModuleCheck(moduleNum) {
    const check = document.getElementById(`check-nb${moduleNum}`);
    const card = document.getElementById(`card-nb${moduleNum}`);
    
    if (check.checked) {
        card.style.borderColor = 'var(--gold-primary)';
        localStorage.setItem(`nb_check_${moduleNum}`, 'true');
    } else {
        card.style.borderColor = 'var(--card-border)';
        localStorage.setItem(`nb_check_${moduleNum}`, 'false');
    }

    updateOverallProgress();
}

function updateOverallProgress() {
    let checkedCount = 0;
    const totalModules = 6;

    for (let i = 1; i <= totalModules; i++) {
        if (localStorage.getItem(`nb_check_${i}`) === 'true') {
            checkedCount++;
            const check = document.getElementById(`check-nb${i}`);
            const card = document.getElementById(`card-nb${i}`);
            if (check) check.checked = true;
            if (card) card.style.borderColor = 'var(--gold-primary)';
        }
    }

    // Base 15% readiness for initializing prep hub + 14% per completed notebook module
    const percentage = Math.min(100, Math.round(15 + (checkedCount / totalModules) * 85));
    document.getElementById('progressFill').style.width = `${percentage}%`;
    document.getElementById('progressPercent').innerText = `${percentage}%`;
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    updateOverallProgress();

    document.querySelectorAll('.nav-item').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            document.querySelectorAll('.nav-item').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
