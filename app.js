/**
 * Bihar Smart Mango Knowledge Wall - Kiosk Application Core Engine
 * Architecture: Decoupled Data (Structural Metadata vs. Dynamic Text Matrix)
 */

// Global state to store the currently loaded language JSON data
let currentLanguageData = {};
// Default fallback language
const DEFAULT_LANG = 'en';

// Execute automatically when the webpage finish loading
document.addEventListener("DOMContentLoaded", () => {
    // Initialize the kiosk with English text on first boot
    switchLanguage(DEFAULT_LANG);
    
    // Bind setup for the modal close action
    const closeBtn = document.getElementById('close-modal-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDetailedProfile);
    }
});

/**
 * 1. THE LANGUAGE SWITCHER
 * Fetches the translation matrix and updates all static layout texts safely.
 */
async function switchLanguage(langCode) {
    try {
        // Fetch language token files from your local distribution folder
        const response = await fetch(`lang/${langCode}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} while reading lang/${langCode}.json`);
        }
        
        currentLanguageData = await response.json();
        
        // Loop over every HTML element that has a 'data-i18n' tag
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (currentLanguageData[key]) {
                // Handle rich HTML content with line breaks (<br>) safely, use text content for others
                if (currentLanguageData[key].includes('<br>')) {
                    element.innerHTML = currentLanguageData[key];
                } else {
                    element.textContent = currentLanguageData[key];
                }
            }
        });

        // Rebuild the 11 mango grid items using the newly selected language text mapping
        buildInteractiveGallery();
        
    } catch (error) {
        console.error("Critical error pulling target locale matrix:", error);
        // Fallback safety layer: If a custom dialect fails, attempt to fall back to English safely
        if (langCode !== DEFAULT_LANG) {
            console.warn("Attempting safety fallback to default English localization...");
            switchLanguage(DEFAULT_LANG);
        }
    }
}

/**
 * 2. THE CARD FACTORY
 * Assembles the interactive visual gallery using images from mangoes.js and text from JSON.
 */
function buildInteractiveGallery() {
    const gridContainer = document.getElementById('gallery-grid');
    if (!gridContainer) return;
    
    // Clear out any old elements safely before generating the fresh language cards
    gridContainer.innerHTML = ""; 

    // Loop through our 11 varieties registered inside MANGO_MASTER_DATA (from mangoes.js)
    Object.keys(MANGO_MASTER_DATA).forEach(id => {
        const structuralData = MANGO_MASTER_DATA[id];
        const translationData = currentLanguageData.varieties?.[id];

        // Skip rendering if data mismatch occurs to prevent visual runtime breakages
        if (!structuralData || !translationData) {
            console.warn(`Data mismatch or missing entries detected for identity profile token: ${id}`);
            return;
        }

        // Build individual card nodes dynamically
        const card = document.createElement('div');
        card.className = 'mango-card';
        card.setAttribute('role', 'button');
        
        // Trigger popup profile upon tapping anywhere on this card element container
        card.onclick = () => openDetailedProfile(id);

        // Inject the layout frame. Image routes are securely tied directly to structural metadata paths.
        card.innerHTML = `
            <div class="card-image-frame">
                <img src="${structuralData.image}" class="mango-thumb" alt="${translationData.title}" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="card-body">
                <h3>${translationData.title}</h3>
                <span class="local-script">${translationData.localName}</span>
                <p class="tagline-summary">${translationData.tagline}</p>
                <button class="action-btn">${currentLanguageData.btnExplore || 'Explore →'}</button>
            </div>
        `;
        
        gridContainer.appendChild(card);
    });
}

/**
 * 3. THE DETAIL INSPECTOR (MODAL POPUP)
 * populates and opens the detailed dashboard popup module for a single variety.
 */
function openDetailedProfile(id) {
    const structuralData = MANGO_MASTER_DATA[id];
    const translationData = currentLanguageData.varieties?.[id];
    
    if (!structuralData || !translationData) return;
    
    // Bind paths seamlessly from our secure master metadata config (Never turns gray/undefined)
    document.getElementById('modal-variety-img').src = structuralData.image;
    document.getElementById('modal-qr-img').src = structuralData.qrCode;
    
    // Bind textual values safely from our active localized language JSON matrix
    document.getElementById('modal-title').textContent = translationData.title;
    document.getElementById('modal-local-name').textContent = translationData.localName;
    document.getElementById('modal-tagline').textContent = translationData.tagline;
    document.getElementById('modal-subtag').textContent = translationData.subTag;
    document.getElementById('modal-origin').textContent = translationData.origin;
    document.getElementById('modal-harvest').textContent = translationData.harvestVal;
    document.getElementById('modal-growth').textContent = translationData.growthVal;
    
    // Show the modal view by stripping out the CSS hiding rules
    const modal = document.getElementById('variety-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Lock background scrolling behind popup view
    }
}

/**
 * Closes the active detailed profile popup modal module.
 */
function closeDetailedProfile() {
    const modal = document.getElementById('variety-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Unlock background scrolling safety layer
    }
}