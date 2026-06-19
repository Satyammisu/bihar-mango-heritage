/**
 * Bihar Smart Mango Knowledge Wall - UI Engine & Chart Lifecycle Controller
 */

let tssChartInstance = null;
let giChartInstance = null;

document.addEventListener("DOMContentLoaded", () => {
  setupVarietyCardListeners();
  setupModalCloseTriggers();
});

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
  const closeBtn = document.getElementById("modal-close-btn");
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      destroyActiveChartInstances();
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
        destroyActiveChartInstances();
      }
    });
  }
}

function destroyActiveChartInstances() {
  if (tssChartInstance) {
    tssChartInstance.destroy();
    tssChartInstance = null;
  }
  if (giChartInstance) {
    giChartInstance.destroy();
    giChartInstance = null;
  }
}

function openDetailedProfile(id) {
  const variety = MANGO_MASTER_DATA[id];
  if (!variety) return;

  // Clear previous instances before rendering fresh data
  destroyActiveChartInstances();

  // Set core UI elements inside the modal
  document.getElementById("modal-title").innerText = variety.selfMetrics.name;
  document.getElementById("modal-variety-img").src = variety.image;

  // QR Code asset assignment with local kiosk safe fallback
  const qrImgElement = document.getElementById("modal-qr-img");
  if (qrImgElement) {
    qrImgElement.src = variety.qrCode;
    qrImgElement.style.display = "block";
    qrImgElement.onerror = () => {
      console.warn(`Asset missing at path: ${variety.qrCode}. Falling back.`);
      qrImgElement.src = "./qr/dudhiyamaldah-qr.png"; 
    };
  }

  // Generate dynamic data matrices for components (1 Selected vs 4 Benchmarks)
  const unifiedDataset = getComparisonData(id);
  
  // Populates data rows and handles independent rendering engines
  populateComparisonTable(unifiedDataset);
  renderTSSChart(unifiedDataset, variety.selfMetrics.name);
  renderGIChart(unifiedDataset, variety.selfMetrics.name);

  // Reveal Modal View
  const modal = document.getElementById("variety-modal");
  if (modal) modal.classList.remove("hidden");
}

function populateComparisonTable(dataMatrix) {
  const body = document.getElementById("comparison-body");
  if (!body) return;
  body.innerHTML = "";
  
  dataMatrix.forEach((item, index) => {
    const isTarget = (index === 0);
    const textStyle = isTarget ? "font-weight: 700; color: #0F5132; background-color: #f1f8f5;" : "";
    body.innerHTML += `
      <tr style="${textStyle}">
        <td style="padding: 8px; border-bottom: 1px solid #dee2e6; text-align: left;">
          ${item.name} ${isTarget ? '⭐' : ''}
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

  // Re-ranks the active 5 items in clean descending order
  const tssData = rawDataset.map(item => ({ name: item.name, value: item.tssMid }))
                            .sort((a, b) => b.value - a.value);

  tssChartInstance = new Chart(ctxTss.getContext("2d"), {
    type: 'bar',
    data: {
      labels: tssData.map(d => d.name),
      datasets: [{
        label: 'Total Soluble Solids (TSS Midpoint °Brix)',
        data: tssData.map(d => d.value),
        // Highlights the specific target Bihar variety in dark green, benchmarks in amber
        backgroundColor: tssData.map(d => d.name === activeBiharName ? '#0F5132' : '#FFC107'),
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 25 } }
    }
  });
}

function renderGIChart(rawDataset, activeBiharName) {
  const ctxGi = document.getElementById("giChart");
  if (!ctxGi) return;

  // Re-ranks glycemic values in descending order
  const giData = rawDataset.map(item => ({ name: item.name, value: item.gi }))
                           .sort((a, b) => b.value - a.value);

  giChartInstance = new Chart(ctxGi.getContext("2d"), {
    type: 'bar',
    data: {
      labels: giData.map(d => d.name),
      datasets: [{
        label: 'Glycemic Index Score',
        data: giData.map(d => d.value),
        // Highlights the targeted Bihar selection in medical green, benchmarks in neutral gray
        backgroundColor: giData.map(d => d.name === activeBiharName ? '#198754' : '#DEE2E6'),
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 65 } }
    }
  });
}
