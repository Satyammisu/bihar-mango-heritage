
/**
 * Bihar Smart Mango Knowledge Wall - Kiosk Application Core Engine
 * Incorporates: Multi-Locale Translation Fetching, Dynamic Card Factories, & Native Speech Synthesis.
 */

let currentLanguageData = {};
let activeSpeechUtterance = null;
const DEFAULT_LANG = 'en';
const SUPPORTED_LOCALES = ['en', 'hi', 'bho', 'mai'];

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Kiosk Core with baseline English dictionaries
    switchLanguage(DEFAULT_LANG);
    
    // Explicit Binding for Kiosk Operational Input Events
    document.getElementById('close-modal-btn')?.addEventListener('click', closeDetailedProfile);
    document.getElementById('btn-kiosk-audio')?.addEventListener('click', () => triggerNarration('kiosk'));
    document.getElementById('btn-kiosk-stop')?.addEventListener('click', stopAllNarration);
    document.getElementById('btn-modal-audio')?.addEventListener('click', () => triggerNarration('modal'));
    document.getElementById('btn-modal-stop')?.addEventListener('click', stopAllNarration);
});

/**
 * Parses and maps translation dictionaries safely across network request layers
 */
async function switchLanguage(langCode) {
    if (!SUPPORTED_LOCALES.includes(langCode)) langCode = DEFAULT_LANG;

    try {
        stopAllNarration(); // Terminate any open speech synthesis lines on language switch
        const response = await fetch(`lang/${langCode}.json`);
        
        // Fail-safe interceptor for file load exceptions (e.g., 404 or missing files)
        if (!response.ok) {
            throw new Error(`HTTP network error! Status: ${response.status} reading lang/${langCode}.json`);
        }
        
        currentLanguageData = await response.json();
        
        // Select and update translated values into tagged data attribute DOM containers
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (currentLanguageData[key]) {
                if (currentLanguageData[key].includes('<br>')) {
                    element.innerHTML = currentLanguageData[key];
                } else {
                    element.textContent = currentLanguageData[key];
                }
            }
        });

        // Trigger interactive gallery card grid assembly loop
        buildInteractiveGallery();
        
    } catch (error) {
        console.error("Critical error parsing target locale translation dictionary:", error);
        // Secondary Fallback: Cascade back to English data sheets if language files drop
        if (langCode !== DEFAULT_LANG) {
            console.warn("Initiating recovery strategy to restore baseline English configurations...");
            switchLanguage(DEFAULT_LANG);
        }
    }
}

/**
 * Dynamic Card Layout Construction Module using validated asset paths
 */
function buildInteractiveGallery() {
    const gridContainer = document.getElementById('gallery-grid');
    if (!gridContainer) return;
    
    gridContainer.innerHTML = ""; // Clear existing grid cards to rebuild safely

    Object.keys(MANGO_MASTER_DATA).forEach(id => {
        const structuralData = MANGO_MASTER_DATA[id];
        const translationData = currentLanguageData.varieties?.[id];

        if (!structuralData || !translationData) return;

        const card = document.createElement('div');
        card.className = 'mango-card';
        card.setAttribute('role', 'button');
        card.onclick = () => openDetailedProfile(id);

        // Card Template Engine: Image targets map directly from master configuration variables
        card.innerHTML = `
            <div class="card-image-frame">
                <img src="${structuralData.image}" class="mango-thumb" alt="${translationData.title}" onerror="this.src='./images/placeholder.jpg'">
            </div>
            <div class="card-body">
                <h3 style="margin: 0 0 0.5rem 0; font-size: 1.4rem;">${translationData.title}</h3>
                <span style="font-size: 0.9rem; color: #666; display:block; margin-bottom:0.5rem;">${translationData.localName}</span>
                <p style="margin: 0 0 1rem 0; font-size: 0.9rem; line-height: 1.4; color: #495057;">${translationData.tagline}</p>
                <button style="background:var(--primary-green); color:white; border:none; padding:0.5rem 1rem; border-radius:4px; cursor:pointer; font-weight:bold; width:100%;">
                    ${currentLanguageData.btnExplore || 'Explore →'}
                </button>
            </div>
        `;
        
        gridContainer.appendChild(card);
    });
}

// Global active indicator tracking node for modal overview voice lookups
let activeVarietyIdInModal = null;

/**
 * Variety Detailed Modal Interface Controller
 */
function openDetailedProfile(id) {
    const structuralData = MANGO_MASTER_DATA[id];
    const translationData = currentLanguageData.varieties?.[id];
    
    if (!structuralData || !translationData) return;
    
    stopAllNarration(); 
    activeVarietyIdInModal = id; 

    // Match image element sources directly from static structural variables
    document.getElementById('modal-variety-img').src = structuralData.image;
    document.getElementById('modal-qr-img').src = structuralData.qrCode;
    
    // Pass translation metadata strings smoothly
    document.getElementById('modal-title').textContent = translationData.title;
    document.getElementById('modal-local-name').textContent = translationData.localName;
    document.getElementById('modal-tagline').textContent = translationData.tagline;
    document.getElementById('modal-subtag').textContent = translationData.subTag;
    document.getElementById('modal-origin').textContent = translationData.origin;
    document.getElementById('modal-harvest').textContent = translationData.harvestVal;
    document.getElementById('modal-growth').textContent = translationData.growthVal;
    
    const modal = document.getElementById('variety-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Lock scrolling on the kiosk screen background
    }
}

function closeDetailedProfile() {
    stopAllNarration();
    activeVarietyIdInModal = null;
    const modal = document.getElementById('variety-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Unlock screen scrolling parameters
    }
}

/**
 * Native Kiosk Audio Speech Synthesis Engine Management
 */
function triggerNarration(contextType) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Force clear parallel channels to avoid speech layering

    let textToSpeak = "";

    if (contextType === 'kiosk') {
        textToSpeak = currentLanguageData.lblKioskNarration || "";
    } else if (contextType === 'modal' && activeVarietyIdInModal) {
        textToSpeak = currentLanguageData.varieties?.[activeVarietyIdInModal]?.narration || "";
    }

    if (!textToSpeak) return;

    activeSpeechUtterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Automatically match voice accents based on string characters
    if (currentLanguageData.lblMainTitle.includes("दबार") || textToSpeak.match(/[\u0900-\u097F]/)) {
        activeSpeechUtterance.lang = 'hi-IN'; // Uses Hindi engine voice parameters for local dialects
    } else {
        activeSpeechUtterance.lang = 'en-IN'; // Uses regional Indian English voice profile
    }

    activeSpeechUtterance.rate = 0.95; // Slightly slower speed optimized for high-traffic public installations
    window.speechSynthesis.speak(activeSpeechUtterance);
}

/**
 * Universal Audio Stop Action Loop
 */
function stopAllNarration() {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
}
