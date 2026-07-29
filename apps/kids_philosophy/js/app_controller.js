// Master Application Controller: Single-Topic Focused Architecture

let activeCategory = 'thinkers'; // 'thinkers', 'mental_models', 'experiments', 'fallacies'
let activeTopicId = 'socrates';
let activeTopicTab = 1;          // remembered across re-renders so a redraw doesn't dump you back to tab 1

// Unified Topic Catalog Registry
const TOPIC_CATALOG = {
    thinkers: [
        { id: 'socrates', title: 'Socrates', avatar: '🦉', category: 'thinkers', badge: 'socratic_master' },
        { id: 'hypatia', title: 'Hypatia of Alexandria', avatar: '📐', category: 'thinkers', badge: 'young_thinker' },
        { id: 'aristotle', title: 'Aristotle', avatar: '📜', category: 'thinkers', badge: 'young_thinker' },
        { id: 'aurelius', title: 'Marcus Aurelius', avatar: '🏛️', category: 'thinkers', badge: 'young_thinker' },
        { id: 'descartes', title: 'René Descartes', avatar: '💭', category: 'thinkers', badge: 'young_thinker' },
        { id: 'popper', title: 'Karl Popper', avatar: '🦢', category: 'thinkers', badge: 'first_principles' },
        { id: 'mill', title: 'John Stuart Mill', avatar: '🌿', category: 'thinkers', badge: 'young_thinker' },
        { id: 'confucius', title: 'Confucius', avatar: '☯️', category: 'thinkers', badge: 'young_thinker' },
        { id: 'lao_tzu', title: 'Lao Tzu', avatar: '🌊', category: 'thinkers', badge: 'young_thinker' },
        { id: 'kant', title: 'Immanuel Kant', avatar: '⚖️', category: 'thinkers', badge: 'young_thinker' },
        { id: 'lovelace', title: 'Ada Lovelace', avatar: '💻', category: 'thinkers', badge: 'young_thinker' },
        { id: 'buddha', title: 'Siddhartha Gautama (the Buddha)', avatar: '🪷', category: 'thinkers', badge: 'young_thinker' },
        { id: 'zhuangzi', title: 'Zhuangzi', avatar: '🦋', category: 'thinkers', badge: 'young_thinker' },
        { id: 'ibn_sina', title: 'Ibn Sina (Avicenna)', avatar: '🪄', category: 'thinkers', badge: 'young_thinker' },
        { id: 'zera_yacob', title: 'Zera Yacob', avatar: '🗻', category: 'thinkers', badge: 'young_thinker' },
        { id: 'wollstonecraft', title: 'Mary Wollstonecraft', avatar: '🪶', category: 'thinkers', badge: 'young_thinker' },
        { id: 'du_bois', title: 'W. E. B. Du Bois', avatar: '✒️', category: 'thinkers', badge: 'young_thinker' }
    ],
    mental_models: [
        { id: 'first_principles', title: 'First Principles Thinking', avatar: '⚡', category: 'mental_models', badge: 'first_principles' },
        { id: 'occams_razor', title: "Occam's Razor", avatar: '🗡️', category: 'mental_models', badge: 'occams_razor' },
        { id: 'black_swan', title: 'Black Swan Hunter', avatar: '🦢', category: 'mental_models', badge: 'first_principles' },
        { id: 'map_territory', title: 'Map vs. Territory', avatar: '🗺️', category: 'mental_models', badge: 'young_thinker' },
        { id: 'inversion', title: 'Inversion Thinking', avatar: '🔄', category: 'mental_models', badge: 'young_thinker' },
        { id: 'pareto', title: 'Pareto Principle (80/20)', avatar: '🎯', category: 'mental_models', badge: 'young_thinker' },
        { id: 'second_order', title: 'Second-Order Thinking', avatar: '⏳', category: 'mental_models', badge: 'young_thinker' },
        { id: 'sunk_cost', title: 'Sunk Cost Fallacy', avatar: '🛑', category: 'mental_models', badge: 'young_thinker' },
        { id: 'hanlons_razor', title: "Hanlon's Razor", avatar: '🤝', category: 'mental_models', badge: 'young_thinker' },
        { id: 'confirmation_bias', title: 'Confirmation Bias', avatar: '🔍', category: 'mental_models', badge: 'young_thinker' }
    ],
    experiments: [
        { id: 'platos_cave', title: "Plato's Cave", avatar: '🌌', category: 'experiments', badge: 'cave_explorer' },
        { id: 'ship_theseus', title: 'Ship of Theseus', avatar: '⛵', category: 'experiments', badge: 'young_thinker' },
        { id: 'trolley_problem', title: 'The Trolley Problem', avatar: '🚃', category: 'experiments', badge: 'young_thinker' },
        { id: 'experience_machine', title: 'The Experience Machine', avatar: '🔮', category: 'experiments', badge: 'young_thinker' }
    ],
    fallacies: [
        { id: 'monster_spotter', title: 'Fallacy Monster Spotter', avatar: '🕵️', category: 'fallacies', badge: 'fallacy_detective' }
    ]
};

function selectCategory(categoryKey) {
    activeCategory = categoryKey;
    const categoryTopics = TOPIC_CATALOG[categoryKey];
    if (categoryTopics && categoryTopics.length > 0) {
        activeTopicId = categoryTopics[0].id;
    }
    activeTopicTab = 1;
    renderTopicNavigation();
    renderActiveTopicStage();
}

function selectTopic(topicId, categoryKey) {
    if (categoryKey) activeCategory = categoryKey;
    activeTopicId = topicId;
    activeTopicTab = 1;
    renderTopicNavigation();
    renderActiveTopicStage();
    
    // Smooth scroll to stage
    const stage = document.getElementById('unifiedFocusStage');
    if (stage) {
        stage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function scrollCarousel(direction) {
    const itemsBar = document.getElementById('topicCarouselBar');
    if (!itemsBar) return;
    const scrollAmount = direction === 'left' ? -260 : 260;
    itemsBar.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

function renderTopicNavigation() {
    // 1. Update Category Nav Tabs with Item Counts
    document.querySelectorAll('.cat-nav-btn').forEach(btn => {
        const cat = btn.getAttribute('data-cat');
        const count = TOPIC_CATALOG[cat] ? TOPIC_CATALOG[cat].length : 0;
        if (cat === activeCategory) btn.classList.add('active');
        else btn.classList.remove('active');
        
        // Update label count if element exists
        const countSpan = btn.querySelector('.cat-count-badge');
        if (countSpan) countSpan.innerText = `(${count})`;
    });

    // 2. Render Topic Items Bar Carousel
    const itemsBar = document.getElementById('topicCarouselBar');
    if (!itemsBar) return;

    const items = TOPIC_CATALOG[activeCategory] || [];
    itemsBar.innerHTML = items.map(item => `
        <button class="topic-carousel-btn ${item.id === activeTopicId ? 'active' : ''}" onclick="selectTopic('${item.id}', '${item.category}')">
            <span style="font-size: 1.3rem;">${item.avatar}</span>
            <span style="font-weight: 700;">${item.title}</span>
        </button>
    `).join('');
}

function renderActiveTopicStage() {
    const stageContainer = document.getElementById('unifiedFocusStage');
    if (!stageContainer) return;

    try {
        // Dispatch to correct renderer module based on activeCategory / activeTopicId
        if (activeCategory === 'thinkers') {
            if (typeof renderSingleThinkerTopic === 'function') {
                stageContainer.innerHTML = renderSingleThinkerTopic(activeTopicId);
            }
        } else if (activeCategory === 'mental_models') {
            if (typeof renderSingleMentalModelTopic === 'function') {
                stageContainer.innerHTML = renderSingleMentalModelTopic(activeTopicId);
            }
        } else if (activeCategory === 'experiments') {
            if (typeof renderSingleExperimentTopic === 'function') {
                stageContainer.innerHTML = renderSingleExperimentTopic(activeTopicId);
            }
        } else if (activeCategory === 'fallacies') {
            if (typeof renderFallacyMonsterStage === 'function') {
                stageContainer.innerHTML = renderFallacyMonsterStage();
                if (typeof renderFallacyGame === 'function') renderFallacyGame();
            }
        }

        // After rendering HTML, initialize any saved feedback list for this topic
        if (typeof renderSavedFeedbackList === 'function') {
            renderSavedFeedbackList(activeTopicId);
        }

        window.__lastRenderError = null;

        // A redraw (story slide, scenario pill) must not silently send the child back to tab 1.
        if (activeTopicTab !== 1) switchTopicTab(activeTopicTab);
    } catch (err) {
        // Never leave the previous topic on screen pretending to be this one.
        console.error("Error rendering active topic stage:", err);
        window.__lastRenderError = String(err);
        stageContainer.innerHTML = `
            <div class="spotlight-card" style="text-align:center;" role="alert">
                <div style="font-size:3rem;" aria-hidden="true">🛠️</div>
                <h2 style="color: var(--gold-star);">This topic is taking a quick break!</h2>
                <p style="color: var(--text-main);">Pick another topic from the bar above and try again in a moment.</p>
            </div>`;
    }
}

function switchTopicTab(tabNum) {
    activeTopicTab = tabNum;

    document.querySelectorAll('#unifiedFocusStage .flow-content-block').forEach(b => {
        b.style.display = 'none';
        b.setAttribute('hidden', '');
    });
    document.querySelectorAll('#unifiedFocusStage [role="tab"], #unifiedFocusStage .viz-step-btn').forEach(b => {
        b.classList.remove('active');
        if (b.hasAttribute('role')) b.setAttribute('aria-selected', 'false');
    });

    const btn = document.getElementById(`topicTabBtn${tabNum}`);
    const content = document.getElementById(`topicTabContent${tabNum}`);

    if (btn) {
        btn.classList.add('active');
        if (btn.hasAttribute('role')) btn.setAttribute('aria-selected', 'true');
    }
    if (content) {
        content.style.display = 'block';
        content.removeAttribute('hidden');
    }
}

let appStageInitialized = false;
function bootAppStage() {
    if (appStageInitialized) return;   // DOMContentLoaded and load both fire; render once
    appStageInitialized = true;
    initAppStage();
}

function initAppStage() {
    renderTopicNavigation();
    renderActiveTopicStage();
}

document.addEventListener('DOMContentLoaded', bootAppStage);
window.addEventListener('load', bootAppStage);
