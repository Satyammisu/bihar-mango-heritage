/**
 * Bihar Smart Mango Knowledge Wall - UI Engine & Chart Lifecycle Controller
 */

let tssChartInstance = null;
let giChartInstance = null;

document.addEventListener("DOMContentLoaded", () => {
  buildGallery();
  setupModalCloseTriggers();
});

// Programmatically populates all varieties from the mangoes.js master model
function buildGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  
  grid.innerHTML = ""; 

  Object.keys(MANGO_MASTER_DATA).forEach(id => {
    const mango = MANGO_MASTER_DATA[id];
    grid.innerHTML += `
      <div class="mango-card" data-id="${id}">
        <img src="${mango.image}" alt="${mango.selfMetrics.name}">
        <h3>${mango.selfMetrics.name}</h3>
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
  if (!variety) {
    console.error("Invalid Target Selection Mapping Identifier");
    return;
  }

  destroyActiveChartInstances();

  document.getElementById("modal-title").innerText = variety.selfMetrics.name;
  document.getElementById("modal-variety-img").src = variety.image;

  const qrImgElement = document.getElementById("modal-qr-img");
  if (qrImgElement) {
    qrImgElement.src = variety.qrCode;
    qrImgElement.style.display = "block";
    qrImgElement.onerror = () => {
      console.warn(`Asset missing at target deployment path: ${variety.qrCode}`);
      qrImgElement.src = "./qr/dudhiyamaldah-qr.png"; 
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

  const tssData = rawDataset.map(item => ({ name: item.name, value: item.tssMid }))
                            .sort((a, b) => b.value - a.value);

  tssChartInstance = new Chart(ctxTss.getContext("2d"), {
    type: 'bar',
    data: {
      labels: tssData.map(d => d.name),
      datasets: [{
        label: 'Total Soluble Solids (TSS Midpoint °Brix)',
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
      scales: { 
        y: { beginAtZero: true, max: 25, ticks: { display: true } } 
      },
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
      labels: giData.map(d => d.name),
      datasets: [{
        label: 'Glycemic Index Score',
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
      scales: { 
        y: { beginAtZero: true, max: 65, ticks: { display: true } } 
      },
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
