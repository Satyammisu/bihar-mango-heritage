/**
 * Bihar Smart Mango Knowledge Wall - UI Engine & Hybrid Audio Lifecycle Controller
 * Architecture: Normalized Master-Detail Dynamic UI Handler
 * Hardened for Live Government Exhibition Kiosk Environments
 */

let tssChartInstance = null;
let giChartInstance = null;

// Core Language, Audio, & Identity Tracking State Variables
let currentLanguage = "en";
let activeVarietyId = null;
let currentLanguageData = null;
let currentActiveAudioPlayback = null; // Tracks native HTML5 Audio instance to prevent overlap

// Central Kiosk Core Dictionary Models (Acts as local asset fallback)
const I18N_FALLBACK_DATA = {
  "en": {
    "lblMainTitle": "Bihar Smart Mango Knowledge Wall",
    "lblSubheading": "Nutritional & Quality Comparison Dashboard",
    "thVariety": "Variety",
    "thTSS": "TSS Range (°Brix)",
    "thGI": "Glycemic Index (GI)",
    "lblTSSChart": "🧪 Sugar Profile Analysis (TSS Midpoint Descending)",
    "lblGIChart": "🩸 Glycemic Index Spectrum (GI Value Descending)",
    "varieties": {
      "dudhiyamaldah": { "title": "Dudhiya Maldah" },
      "bombai": { "title": "Bombai" },
      "zardalu": { "title": "Jardalu" },
      "langra": { "title": "Langra" },
      "chausa": { "title": "Chausa" },
      "amrapali": { "title": "Amrapali" },
      "gulabkhas": { "title": "Gulabkhas" },
      "maldah": { "title": "Maldah" },
      "sipahiya": { "title": "Sipahiya" },
      "sukul": { "title": "Sukul" },
      "krishnabhog": { "title": "Krishna Bhog" },
      "kalkatiya": { "title": "Kalkatiya" }
    }
  },
  "hi": {
    "lblMainTitle": "बिहार स्मार्ट मैंगो नॉलेज वॉल",
    "lblSubheading": "पोषण और गुणवत्ता तुलनात्मक डैशबोर्ड",
    "thVariety": "किस्म",
    "thTSS": "कुल घुलनशील ठोस (TSS Range)",
    "thGI": "ग्लाइसेमिक इंडेक्स (GI)",
    "lblTSSChart": "🧪 शर्करा विश्लेषण (TSS मिडपॉइंट अवरोही क्रम)",
    "lblGIChart": "🩸 ग्लाइसेमिक इंडेक्स स्पेक्ट्रम (GI मान अवरोही क्रम)",
    "varieties": {
      "dudhiyamaldah": { "title": "दूधिया मालदह" },
      "bombai": { "title": "बम्बई" },
      "zardalu": { "title": "जर्दाालू" },
      "langra": { "title": "लंगड़ा" },
      "chausa": { "title": "चौसा" },
      "amrapali": { "title": "आम्रपाली" },
      "gulabkhas": { "title": "गुलाबखास" },
      "maldah": { "title": "मालदह" },
      "sipahiya": { "title": "सिपाहिया" },
      "sukul": { "title": "सुकुल" },
      "krishnabhog": { "title": "कृष्णभोग" },
      "kalkatiya": { "title": "कलकतिया" }
    }
  },
  "mai": {
    "lblMainTitle": "बिहार स्मार्ट आम ज्ञान दीवार",
    "lblSubheading": "पोषण आ गुणवत्ता तुलनात्मक डैशबोर्ड",
    "thVariety": "प्रकार",
    "thTSS": "टीएसएस रेंज (°Brix)",
    "thGI": "ग्लाइसेमिक इंडेक्स (GI)",
    "lblTSSChart": "🧪 चीनीक मात्रा विश्लेषण (अवरोही क्रम)",
    "lblGIChart": "🩸 ग्लाइसेमिक इंडेक्स स्पेक्ट्रम (अवरोही क्रम)",
    "varieties": {
      "dudhiyamaldah": { "title": "दूधिया मालदह" },
      "bombai": { "title": "बम्बई" },
      "zardalu": { "title": "जर्दाालू" },
      "langra": { "title": "लंगड़ा" },
      "chausa": { "title": "चौसा" },
      "amrapali": { "title": "आम्रपाली" },
      "gulabkhas": { "title": "गुलाबखास" },
      "maldah": { "title": "मालदह" },
      "sipahiya": { "title": "सिपाहिया" },
      "sukul": { "title": "सुकुल" },
      "krishnabhog": { "title": "कृष्णभोग" },
      "kalkatiya": { "title": "कलकतिया" }
    }
  },
  "bho": {
    "lblMainTitle": "बिहार स्मार्ट आम ज्ञान दीवार",
    "lblSubheading": "पोषण अउर गुणवत्ता तुलनात्मक डैशबोर्ड",
    "thVariety": "किसिम",
    "thTSS": "टीएसएस रेंज (°Brix)",
    "thGI": "ग्लाइसेमिक इंडेक्स (GI)",
    "lblTSSChart": "🧪 शर्करा जांच (अवरोही क्रम)",
    "lblGIChart": "🩸 ग्लाइसेमिक इंडेक्स जांच (अवरोही क्रम)",
    "varieties": {
      "dudhiyamaldah": { "title": "दूधिया मालदह" },
      "bombai": { "title": "बम्बई" },
      "zardalu": { "title": "जर्दाालू" },
      "langra": { "title": "लंगड़ा" },
      "chausa": { "title": "चौसा" },
      "amrapali": { "title": "आम्रपाली" },
      "gulabkhas": { "title": "गुलाबखास" },
      "maldah": { "title": "मालदह" },
      "sipahiya": { "title": "सिपाहिया" },
      "sukul": { "title": "सुकुल" },
      "krishnabhog": { "title": "कृष्णभोग" },
      "kalkatiya": { "title": "कलकतिया" }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Kiosk Framework DOM Anchored.");
  
  // 1. Initialize default language matrices
  setLanguage(currentLanguage);
  
  // 2. Attach layout and core interaction configurations
  setupLanguageSelectors();
  setupModalCloseTriggers();
  setupAudioInterfaceTriggers();

  // 3. Priming OS Web Speech Engine Stack & Handling Async Load Deficiencies
  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => {
      console.log("🔄 System Speech Synthesis Voices Loaded:", window.speechSynthesis.getVoices().length);
    };
    // Initial runtime wake-up kick
    window.speechSynthesis.getVoices();
  }

  // 4. Deep-Linking QR Code Scanner Check (?variety=zardalu)
  const urlParams = new URLSearchParams(window.location.search);
  const deepLinkVarietyId = urlParams.get("variety");

  if (deepLinkVarietyId && typeof openDetailedProfile === "function") {
    if (typeof MANGO_MASTER_DATA !== 'undefined' && MANGO_MASTER_DATA[deepLinkVarietyId]) {
      console.log(`📱 QR Scan Detected! Deep-linking directly to profile: [${deepLinkVarietyId}]`);
      setTimeout(() => {
        openDetailedProfile(deepLinkVarietyId);
      }, 100);
    } else {
      console.warn(`⚠️ QR Code query parameter matched no valid master records: [${deepLinkVarietyId}]`);
    }
  }
});

function setupLanguageSelectors() {
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedLang = btn.getAttribute("data-lang");
      if (selectedLang) {
        console.log(`🌐 Switching Language Context to: [${selectedLang}]`);
        setLanguage(selectedLang);
      }
    });
  });
}

function setLanguage(langCode) {
  currentLanguage = langCode;
  currentLanguageData = I18N_FALLBACK_DATA[langCode];

  // Dynamic DOM UI Text Updates
  document.getElementById("main-headline").innerText = currentLanguageData.lblMainTitle;
  document.getElementById("modal-subheading").innerText = currentLanguageData.lblSubheading;
  document.getElementById("th-variety").innerText = currentLanguageData.thVariety;
  document.getElementById("th-tss").innerText = currentLanguageData.thTSS;
  document.getElementById("th-gi").innerText = currentLanguageData.thGI;
  document.getElementById("lbl-tss-chart-title").innerText = currentLanguageData.lblTSSChart;
  document.getElementById("lbl-gi-chart-title").innerText = currentLanguageData.lblGIChart;

  // Build/Rebuild Data Grid Gallery elements
  buildGallery();
  
  // Live update visible modal metrics if language changes while profile view is active
  if (activeVarietyId) {
    const variety = MANGO_MASTER_DATA[activeVarietyId];
    if (variety) {
      document.getElementById("modal-title").innerText = currentLanguageData.varieties[activeVarietyId].title;
      const unifiedDataset = getComparisonData(activeVarietyId);
      populateComparisonTable(unifiedDataset);
    }
  }
}

function buildGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  grid.innerHTML = ""; 

  Object.keys(MANGO_MASTER_DATA).forEach(id => {
    const mango = MANGO_MASTER_DATA[id];
    const localizedTitle = currentLanguageData.varieties[id] ? currentLanguageData.varieties[id].title : mango.selfMetrics.name;
    
    grid.innerHTML += `
      <div class="mango-card" data-id="${id}">
        <img src="${mango.image}" alt="${localizedTitle}">
        <h3>${localizedTitle}</h3>
      </div>
    `;
  });

  setupVarietyCardListeners();
}

function setupVarietyCardListeners() {
  const cards = document.querySelectorAll(".mango-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-id");
      if (id) openDetailedProfile(id);
    });
  });
}

function setupModalCloseTriggers() {
  const modal = document.getElementById("variety-modal");
  const closeBtn = document.getElementById("close-modal-btn");
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      stopVarietyAudio();
      destroyActiveChartInstances();
      activeVarietyId = null;
    });
  }
}

function setupAudioInterfaceTriggers() {
  const audioBtn = document.getElementById("btn-modal-audio");
  const stopBtn = document.getElementById("btn-modal-stop");

  if (audioBtn) {
    audioBtn.addEventListener("click", () => {
      console.log("🎯 Audio Trigger Button Element Click Captured");
      playVarietyAudio();
    });
  }
  if (stopBtn) {
    stopBtn.addEventListener("click", () => {
      console.log("🛑 Stop Audio Trigger Button Element Click Captured");
      stopVarietyAudio();
    });
  }
}

/**
 * Consolidated Hybrid Audio Processing Routine
 * Checks for local directory file presence first, fallbacks to TTS safely if empty.
 */
function playVarietyAudio() {
  stopVarietyAudio(); // Drop concurrent runs instantly

  if (!activeVarietyId) {
    console.error("Audio Execution Halted: Missing Global Variety Identifier Selection State.");
    return;
  }

  const audioFilePath = `audio/${activeVarietyId}-${currentLanguage}.mp3`;
  const testAudioAsset = new Audio(audioFilePath);
  
  testAudioAsset.addEventListener('canplaythrough', () => {
    console.log(`🎵 High-Fidelity MP3 Found at [${audioFilePath}]. Launching Kiosk Speaker Stream...`);
    currentActiveAudioPlayback = testAudioAsset;
    testAudioAsset.play().catch(err => {
      console.warn("Audio Context Intercepted by Browser Security Policy, falling back to TTS engine.", err);
      executeTextToSpeechFallback();
    });
  }, { once: true });

  testAudioAsset.addEventListener('error', () => {
    console.log(`⚠️ MP3 Asset not ready or missing at [${audioFilePath}]. Pivoting to Native OS Speech Engine Fallback...`);
    executeTextToSpeechFallback();
  }, { once: true });
}

function executeTextToSpeechFallback() {
  if (!window.speechSynthesis) {
    alert("This system kiosk environment lacks standard web speech audio engine support.");
    return;
  }

  const title = document.getElementById("modal-title").innerText;
  let text = "";

  switch(currentLanguage) {
    case "hi":
      text = title + " बिहार की प्रसिद्ध आम की किस्म है।";
      break;
    case "mai":
      text = title + " बिहारक प्रसिद्ध आमक किस्म अछि।";
      break;
    case "bho":
      text = title + " बिहार के प्रसिद्ध आम के किसिम बा।";
      break;
    default:
      text = title + " is one of Bihar's famous mango varieties.";
  }

  const utterance = new SpeechSynthesisUtterance(text);
  const systemAvailableVoices = window.speechSynthesis.getVoices();

  if (text.match(/[\u0900-\u097F]/)) {
    const hindiVoice = systemAvailableVoices.find(voice => voice.lang.includes("hi") || voice.lang.includes("HI"));
    if (hindiVoice) utterance.voice = hindiVoice;
    utterance.lang = "hi-IN";
  } else {
    const englishVoice = systemAvailableVoices.find(voice => voice.lang.includes("en") || voice.lang.includes("EN"));
    if (englishVoice) utterance.voice = englishVoice;
    utterance.lang = "en-IN";
  }

  utterance.rate = 0.90; // Slower presentation delivery for open floor halls
  utterance.pitch = 1.0;
  
  window.speechSynthesis.speak(utterance);
}

function stopVarietyAudio() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  if (currentActiveAudioPlayback) {
    currentActiveAudioPlayback.pause();
    currentActiveAudioPlayback.currentTime = 0;
    currentActiveAudioPlayback = null;
  }
}

function destroyActiveChartInstances() {
  if (tssChartInstance) { tssChartInstance.destroy(); tssChartInstance = null; }
  if (giChartInstance) { giChartInstance.destroy(); giChartInstance = null; }
}

function openDetailedProfile(id) {
  activeVarietyId = id;
  const variety = MANGO_MASTER_DATA[id];
  if (!variety) return;

  destroyActiveChartInstances();

  const localizedTitle = currentLanguageData.varieties[id] ? currentLanguageData.varieties[id].title : variety.selfMetrics.name;
  document.getElementById("modal-title").innerText = localizedTitle;
  document.getElementById("modal-variety-img").src = variety.image;

  const qrImgElement = document.getElementById("modal-qr-img");
  if (qrImgElement) {
    qrImgElement.src = variety.qrCode;
    qrImgElement.style.display = "block";
    qrImgElement.onerror = () => {
      qrImgElement.src = `./qr/dudhiyamaldah-qr.png"; 
    };
  }

  const unifiedDataset = getComparisonData(id);
  
  populateComparisonTable(unifiedDataset);
  renderTSSChart(unifiedDataset, variety.selfMetrics.name);
  renderGIChart(unifiedDataset, variety.selfMetrics.name);

  const modal = document.getElementById("variety-modal");
  if (modal) modal.classList.remove("hidden");
}

function populateComparisonTable(dataMatrix) {
  const body = document.getElementById("comparison-body");
  if (!body) return;
  body.innerHTML = "";
  
  dataMatrix.forEach((item, index) => {
    const isTarget = (index === 0);
    let displayName = item.name;
    
    Object.keys(MANGO_MASTER_DATA).forEach(key => {
      if (MANGO_MASTER_DATA[key].selfMetrics.name === item.name && currentLanguageData.varieties[key]) {
        displayName = currentLanguageData.varieties[key].title;
      }
    });

    const textStyle = isTarget ? "font-weight: 700; color: #0F5132; background-color: #f1f8f5;" : "";
    body.innerHTML += `
      <tr style="${textStyle}">
        <td style="padding: 8px; border-bottom: 1px solid #dee2e6; text-align: left;">
          ${displayName} ${isTarget ? '⭐' : ''}
        </td>
        <td style="padding: 8px; border-bottom: 1px solid #dee2e6; text-align: center;">${item.tss}</td>
        <td style="padding: 8px; border-bottom: 1px solid #dee2e6; text-align: center;">${item.gi}</td>
      </tr>
    `;
  });
}

function renderTSSChart(rawDataset, activeBiharName) {
  const ctxTss = document.getElementById("tssChart");
  if (!ctxTss) return;

  const tssData = rawDataset.map(item => ({ name: item.name, value: item.tssMid }))
                            .sort((a, b) => b.value - a.value);

  tssChartInstance = new Chart(ctxTss.getContext("2d"), {
    type: 'bar',
    data: {
      labels: tssData.map(d => {
        let label = d.name;
        Object.keys(MANGO_MASTER_DATA).forEach(k => {
          if (MANGO_MASTER_DATA[k].selfMetrics.name === d.name && currentLanguageData.varieties[k]) {
            label = currentLanguageData.varieties[k].title;
          }
        });
        return label;
      }),
      datasets: [{
        label: 'Total Soluble Solids',
        data: tssData.map(d => d.value),
        backgroundColor: tssData.map(d => d.name === activeBiharName ? '#0F5132' : '#FFC107'),
        borderColor: tssData.map(d => d.name === activeBiharName ? '#0A3622' : '#FFC107'),
        borderWidth: tssData.map(d => d.name === activeBiharName ? 2 : 1),
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 25 } },
      animation: {
        onComplete: function () {
          const chartInstance = this;
          const ctx = chartInstance.ctx;
          ctx.font = "bold 13px sans-serif";
          ctx.fillStyle = "#212529";
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";

          this.data.datasets.forEach(function (dataset, i) {
            const meta = chartInstance.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
              const data = dataset.data[index];
              ctx.fillText(data.toFixed(1) + "°", bar.x, bar.y - 4);
            });
          });
        }
      }
    }
  });
}

function renderGIChart(rawDataset, activeBiharName) {
  const ctxGi = document.getElementById("giChart");
  if (!ctxGi) return;

  const giData = rawDataset.map(item => ({ name: item.name, value: item.gi }))
                           .sort((a, b) => b.value - a.value);

  giChartInstance = new Chart(ctxGi.getContext("2d"), {
    type: 'bar',
    data: {
      labels: giData.map(d => {
        let label = d.name;
        Object.keys(MANGO_MASTER_DATA).forEach(k => {
          if (MANGO_MASTER_DATA[k].selfMetrics.name === d.name && currentLanguageData.varieties[k]) {
            label = currentLanguageData.varieties[k].title;
          }
        });
        return label;
      }),
      datasets: [{
        label: 'Glycemic Index',
        data: giData.map(d => d.value),
        backgroundColor: giData.map(d => d.name === activeBiharName ? '#198754' : '#DEE2E6'),
        borderColor: giData.map(d => d.name === activeBiharName ? '#0A3622' : '#ADB5BD'),
        borderWidth: giData.map(d => d.name === activeBiharName ? 2 : 1),
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 65 } },
      animation: {
        onComplete: function () {
          const chartInstance = this;
          const ctx = chartInstance.ctx;
          ctx.font = "bold 13px sans-serif";
          ctx.fillStyle = "#212529";
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";

          this.data.datasets.forEach(function (dataset, i) {
            const meta = chartInstance.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
              const data = dataset.data[index];
              ctx.fillText(data + " GI", bar.x, bar.y - 4);
            });
          });
        }
      }
    }
  });
}
