/**
 * Bihar Smart Mango Knowledge Wall - Kiosk Application Core Engine
 * Logic: Merges micro standalone records with central baselines at runtime via getComparisonData().
 * Visuals: Intercepts canvas creation to apply custom color vectors based on health indicators.
 */

let currentLanguageData = {};
let activeSpeechUtterance = null;
let currentChartInstance = null;
const DEFAULT_LANG = 'en';
const SUPPORTED_LOCALES = ['en', 'hi', 'bho', 'mai'];

document.addEventListener("DOMContentLoaded", () => {
    switchLanguage(DEFAULT_LANG);
    document.getElementById('close-modal-btn')?.addEventListener('click', closeDetailedProfile);
    document.getElementById('btn-kiosk-audio')?.addEventListener('click', () => triggerNarration('kiosk'));
    document.getElementById('btn-kiosk-stop')?.addEventListener('click', stopAllNarration);
    document.getElementById('btn-modal-audio')?.addEventListener('click', () => triggerNarration('modal'));
    document.getElementById('btn-modal-stop')?.addEventListener('click', stopAllNarration);
});

async function switchLanguage(langCode) {
    if (!SUPPORTED_LOCALES.includes(langCode)) langCode = DEFAULT_LANG;
    try {
        stopAllNarration(); 
        const response = await fetch(`lang/${langCode}.json`);
        if (!response.ok) throw new Error(`HTTP error reading lang/${langCode}.json`);
        currentLanguageData = await response.json();
        
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (currentLanguageData[key]) {
                element.innerHTML = currentLanguageData[key].includes('<br>') ? currentLanguageData[key] : currentLanguageData[key];
            }
        });
        buildInteractiveGallery();
    } catch (error) {
        console.error("Language loader failed:", error);
        if (langCode !== DEFAULT_LANG) switchLanguage(DEFAULT_LANG);
    }
}

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
        card.onclick = () => openDetailedProfile(id);
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

let activeVarietyIdInModal = null;

/**
 * Enterprise Production Helper: Dynamically hooks target variety to benchmarks
 */
function getComparisonData(varietyId) {
    const variety = MANGO_MASTER_DATA[varietyId];
    if (!variety) return [];
    return [variety.selfMetrics, ...BENCHMARK_VARIETIES];
}

function openDetailedProfile(id) {
    const structuralData = MANGO_MASTER_DATA[id];
    const translationData = currentLanguageData.varieties?.[id];
    if (!structuralData || !translationData) return;
    
    stopAllNarration(); 
    activeVarietyIdInModal = id; 

    document.getElementById('modal-variety-img').src = structuralData.image;
    document.getElementById('modal-qr-img').src = structuralData.qrCode;
    document.getElementById('modal-title').textContent = translationData.title;
    document.getElementById('modal-local-name').textContent = translationData.localName;
    document.getElementById('modal-tagline').textContent = translationData.tagline;
    document.getElementById('modal-subtag').textContent = translationData.subTag;
    document.getElementById('modal-origin').textContent = translationData.origin;
    document.getElementById('modal-harvest').textContent = translationData.harvestVal;
    document.getElementById('modal-growth').textContent = translationData.growthVal;
    
    const unifiedDataset = getComparisonData(id);
    populateComparisonTable(unifiedDataset);
    renderNutritionChart(unifiedDataset);

    const modal = document.getElementById('variety-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeDetailedProfile() {
    stopAllNarration();
    activeVarietyIdInModal = null;
    const modal = document.getElementById('variety-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; 
    }
}

function populateComparisonTable(dataMatrix) {
    const body = document.getElementById("comparison-body");
    if (!body) return;
    body.innerHTML = "";
    dataMatrix.forEach((item, index) => {
        const textWeightStyle = (index === 0) ? "font-weight: 700; color: #0F5132; background-color: #f1f8f5;" : "";
        body.innerHTML += `
            <tr style="${textWeightStyle}">
                <td style="font-weight: 600; text-align: left;">${item.name} ${index === 0 ? '⭐' : ''}</td>
                <td>${item.tss}</td>
                <td>${item.gi}</td>
            </tr>
        `;
    });
}

function renderNutritionChart(dataMatrix) {
    const ctx = document.getElementById('nutritionChart');
    if (!ctx) return;
    if (currentChartInstance) currentChartInstance.destroy();

    const tssLabel = currentLanguageData.thTss || 'TSS (°Brix)';
    const giLabel = currentLanguageData.thGi || 'Glycemic Index';

    const assignedColors = dataMatrix.map(item => {
        if (item.gi <= 50) return '#198754';      
        if (item.gi <= 55) return '#ffc107';      
        return '#dc3545';                         
    });

    currentChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dataMatrix.map(x => x.name),
            datasets: [
                {
                    label: tssLabel,
                    data: dataMatrix.map(x => x.tssMid),
                    backgroundColor: '#0F5132',
                    borderWidth: 0
                },
                {
                    label: giLabel,
                    data: dataMatrix.map(x => x.gi),
                    backgroundColor: assignedColors, 
                    borderWidth: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } },
            scales: { y: { beginAtZero: true, max: 60 } }
        }
    });
}

function triggerNarration(contextType) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); 
    let textToSpeak = "";
    if (contextType === 'kiosk') {
        textToSpeak = currentLanguageData.lblKioskNarration || "";
    } else if (contextType === 'modal' && activeVarietyIdInModal) {
        textToSpeak = currentLanguageData.varieties?.[activeVarietyIdInModal]?.narration || "";
    }
    if (!textToSpeak) return;

    activeSpeechUtterance = new SpeechSynthesisUtterance(textToSpeak);
    activeSpeechUtterance.lang = (currentLanguageData.lblMainTitle.includes("दबार") || textToSpeak.match(/[\u0900-\u097F]/)) ? 'hi-IN' : 'en-IN';
    activeSpeechUtterance.rate = 0.95; 
    window.speechSynthesis.speak(activeSpeechUtterance);
}

function stopAllNarration() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
}
