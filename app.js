/**
 * Bihar Smart Mango Knowledge Wall - Kiosk Application Core Engine
 * Manages translation file fetching, secure UI building, and modal mapping.
 */

let currentLanguageData = {};
const DEFAULT_LANG = 'en';

document.addEventListener("DOMContentLoaded", () => {
    // Boot the system up with default English localization matrices
    switchLanguage(DEFAULT_LANG);
    
    const closeBtn = document.getElementById('close-modal-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDetailedProfile);
    }
});

/**
 * Parses and maps UI dictionary keys from current locale payload safely
 */
async function switchLanguage(langCode) {
    try {
        const response = await fetch(`lang/${langCode}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status} reading lang/${langCode}.json`);
        }
        
        currentLanguageData = await response.json();
        
        // Target dynamic UI elements cleanly without triggering a total container rebuild
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

        // Regenerate the interactive cards grid layout
        buildInteractiveGallery();
        
    } catch (error) {
        console.error("Critical error loading translation matrix:", error);
        if (langCode !== DEFAULT_LANG) {
            console.warn("Deploying safety fallback back to baseline English...");
            switchLanguage(DEFAULT_LANG);
        }
    }
}

/**
 * Dynamically builds structural nodes and maps image components securely
 */
function buildInteractiveGallery() {
    const gridContainer = document.getElementById('gallery-grid');
    if (!gridContainer) return;
    
    gridContainer.innerHTML = ""; 

    Object.keys(MANGO_MASTER_DATA).forEach(id => {
        const structuralData = MANGO_MASTER_DATA[id];
        const translationData = currentLanguageData.varieties?.[id];

        if (!structuralData || !translationData) {
            console.warn(`Data sync mismatch or omission observed for token key: ${id}`);
            return;
        }

        const card = document.createElement('div');
        card.className = 'mango-card';
        card.setAttribute('role', 'button');
        card.onclick = () => openDetailedProfile(id);

        // SECURE INJECTION: Image source calls rely directly on defined metadata variables
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
 * Handles modal deployment mapping data straight from static reference structures
 */
function openDetailedProfile(id) {
    const structuralData = MANGO_MASTER_DATA[id];
    const translationData = currentLanguageData.varieties?.[id];
    
    if (!structuralData || !translationData) return;
    
    // Explicit binding to avoid any 'undefined' image bugs
    document.getElementById('modal-variety-img').src = structuralData.image;
    document.getElementById('modal-qr-img').src = structuralData.qrCode;
    
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
        document.body.style.overflow = 'hidden'; 
    }
}

function closeDetailedProfile() {
    const modal = document.getElementById('variety-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; 
    }
}
