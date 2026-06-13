let currentLanguageData = {};
const DEFAULT_LANG = 'en';

document.addEventListener("DOMContentLoaded", () => {
    // Render setup using standard default English translation sets on load
    switchLanguage(DEFAULT_LANG);
    
    const closeBtn = document.getElementById('close-modal-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDetailedProfile);
    }
});

/**
 * Handles dictionary mapping and interface translations safely
 */
async function switchLanguage(langCode) {
    try {
        const response = await fetch(`lang/${langCode}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status} finding lang/${langCode}.json`);
        }
        
        currentLanguageData = await response.json();
        
        // Loop and isolate text string assignments safely using data attribute selectors
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

        // Trigger dynamic gallery card factory rebuild
        buildInteractiveGallery();
        
    } catch (error) {
        console.error("Critical error mapping locale updates:", error);
        if (langCode !== DEFAULT_LANG) {
            console.warn("Attempting safety fallback strategy back to English baseline...");
            switchLanguage(DEFAULT_LANG);
        }
    }
}

/**
 * Builds cards dynamically combining static image variables and translation records
 */
function buildInteractiveGallery() {
    const gridContainer = document.getElementById('gallery-grid');
    if (!gridContainer) return;
    
    gridContainer.innerHTML = ""; 

    Object.keys(MANGO_MASTER_DATA).forEach(id => {
        const structuralData = MANGO_MASTER_DATA[id];
        const translationData = currentLanguageData.varieties?.[id];

        if (!structuralData || !translationData) return;

        const card = document.createElement('div');
        card.className = 'mango-card';
        card.setAttribute('role', 'button');
        card.onclick = () => openDetailedProfile(id);

        // SECURE PROPERTY INJECTION: Sourced from structuralData.image variable
        card.innerHTML = `
            <div class="card-image-frame">
                <img src="${structuralData.image}" class="mango-thumb" alt="${translationData.title}">
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
 * Maps and reveals selected variety metrics safely within detail modals
 */
function openDetailedProfile(id) {
    const structuralData = MANGO_MASTER_DATA[id];
    const translationData = currentLanguageData.varieties?.[id];
    
    if (!structuralData || !translationData) return;
    
    // Explicit binding to avoid any 'undefined' path bugs
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
