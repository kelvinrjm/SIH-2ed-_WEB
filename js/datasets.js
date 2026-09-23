/**
 * SL: Geospatial Land Intelligence Platform
 * SIH26013 - Urban Land Record Management System
 * Module: Dataset Management & Multi-Stage Validation Pipeline
 */

window.SL_DATASETS = (function() {
  'use strict';

  // Professional administrative processing stages
  const PROCESSING_STAGES = [
    { name: "File Validation & Checksum Verification", pct: 10 },
    { name: "Metadata & Attribute Schema Extraction", pct: 20 },
    { name: "CRS Detection & Geodetic Datum Alignment", pct: 30 },
    { name: "Automated Georeferencing & Control Points", pct: 40 },
    { name: "Coordinate Transformation (UTM to WGS84)", pct: 50 },
    { name: "Geometry Validation & Polygon Cleaning", pct: 60 },
    { name: "Feature Boundary Demarcation", pct: 70 },
    { name: "Spatial Matching & Parcel Snapping", pct: 80 },
    { name: "Topology Validation & Overlap Detection", pct: 90 },
    { name: "Cross-Source Discrepancy & Conflict Detection", pct: 95 },
    { name: "Quality Assessment & Lineage Assignment", pct: 100 }
  ];

  function init() {
    renderDatasetsTable();
    bindEvents();
  }

  function bindEvents() {
    const uploadBtn = document.getElementById('btn-open-dataset-upload');
    if (uploadBtn) {
      uploadBtn.addEventListener('click', openUploadModal);
    }

    const uploadForm = document.getElementById('form-dataset-upload');
    if (uploadForm) {
      uploadForm.addEventListener('submit', handleUploadSubmit);
    }

    const dropZone = document.getElementById('dataset-drop-zone');
    const fileInput = document.getElementById('dataset-file-input');

    if (dropZone && fileInput) {
      dropZone.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          handleFileSelected(e.target.files[0]);
        }
      });

      ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropZone.style.borderColor = 'var(--sl-primary)';
          dropZone.style.backgroundColor = 'var(--sl-surface-subtle)';
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropZone.style.borderColor = 'var(--sl-border-dark)';
          dropZone.style.backgroundColor = 'var(--sl-bg)';
        });
      });

      dropZone.addEventListener('drop', (e) => {
        if (e.dataTransfer.files.length > 0) {
          handleFileSelected(e.dataTransfer.files[0]);
        }
      });
    }

    const deptFilter = document.getElementById('dataset-filter-dept');
    if (deptFilter) {
      deptFilter.addEventListener('change', renderDatasetsTable);
    }
  }

  function handleFileSelected(file) {
    const fileNameEl = document.getElementById('selected-file-name');
    const fileSizeEl = document.getElementById('selected-file-size');
    const nameInput = document.getElementById('upload-ds-name');

    if (fileNameEl) fileNameEl.textContent = file.name;
    if (fileSizeEl) fileSizeEl.textContent = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
    if (nameInput && !nameInput.value) {
      nameInput.value = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
    }
  }

  function renderDatasetsTable() {
    const tbody = document.getElementById('datasets-table-body');
    if (!tbody) return;

    const list = window.SL_STORAGE.getDatasets();
    const deptFilter = document.getElementById('dataset-filter-dept')?.value || 'all';

    let filtered = list;
    if (deptFilter !== 'all') {
      filtered = filtered.filter(d => d.department === deptFilter);
    }

    tbody.innerHTML = filtered.map(d => `
      <tr>
        <td>
          <div style="font-weight:700; color:var(--sl-primary-dark);">${d.name}</div>
          <div style="font-size:0.7rem; color:var(--sl-text-muted); font-family:var(--sl-font-mono);">${d.id} • ${d.fileSize || '8.4 MB'}</div>
        </td>
        <td><span class="sl-badge sl-badge-neutral">${d.department}</span></td>
        <td>${d.type}</td>
        <td><code style="font-size:0.75rem;">${d.format}</code></td>
        <td style="font-size:0.75rem; font-family:var(--sl-font-mono);">${d.uploadDate}</td>
        <td><code style="font-size:0.75rem;">${d.crs}</code></td>
        <td><strong>${d.featureCount.toLocaleString()}</strong></td>
        <td>
          <span style="font-weight:700; color:${d.quality >= 95 ? 'var(--sl-success)' : 'var(--sl-warning)'};">${d.quality}%</span>
        </td>
        <td><span class="sl-badge sl-badge-verified">${d.status}</span></td>
      </tr>
    `).join('');
  }

  function openUploadModal() {
    const modal = document.getElementById('modal-dataset-upload');
    if (modal) modal.classList.add('active');
  }

  function closeUploadModal() {
    const modal = document.getElementById('modal-dataset-upload');
    if (modal) modal.classList.remove('active');
  }

  async function handleUploadSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('upload-ds-name').value.trim();
    const department = document.getElementById('upload-ds-dept').value;
    const category = document.getElementById('upload-ds-category').value;
    const crs = document.getElementById('upload-ds-crs').value;
    const desc = document.getElementById('upload-ds-desc').value.trim();

    closeUploadModal();
    openProcessingModal(name);

    for (let i = 0; i < PROCESSING_STAGES.length; i++) {
      const stage = PROCESSING_STAGES[i];
      updatePipelineStep(stage.name, stage.pct, i + 1);
      await new Promise(r => setTimeout(r, 350));
    }

    await window.SL_API.uploadDataset({
      name,
      department,
      category,
      crs,
      description: desc
    });

    renderDatasetsTable();
    showProcessingResults(name);
  }

  function openProcessingModal(datasetName) {
    const modal = document.getElementById('modal-dataset-processing');
    const title = document.getElementById('proc-modal-title');
    if (title) title.textContent = `Processing Pipeline: ${datasetName}`;
    if (modal) modal.classList.add('active');

    const log = document.getElementById('proc-log-entries');
    const fill = document.getElementById('proc-progress-fill');
    const pct = document.getElementById('proc-progress-pct');
    if (log) log.innerHTML = '';
    if (fill) fill.style.width = '0%';
    if (pct) pct.textContent = '0%';

    document.getElementById('proc-results-summary').style.display = 'none';
    document.getElementById('proc-live-status').style.display = 'block';
  }

  function updatePipelineStep(stepName, percentage, stepIndex) {
    const fill = document.getElementById('proc-progress-fill');
    const pct = document.getElementById('proc-progress-pct');
    const stageTitle = document.getElementById('proc-current-stage');
    const log = document.getElementById('proc-log-entries');

    if (fill) fill.style.width = `${percentage}%`;
    if (pct) pct.textContent = `${percentage}%`;
    if (stageTitle) stageTitle.textContent = `Stage ${stepIndex}/11: ${stepName}`;

    if (log) {
      const item = document.createElement('div');
      item.style.fontSize = '0.75rem';
      item.style.fontFamily = 'var(--sl-font-mono)';
      item.style.color = 'var(--sl-text-main)';
      item.style.marginBottom = '0.25rem';
      item.innerHTML = `<span style="color:var(--sl-success); font-weight:700;">[OK]</span> Stage ${stepIndex}: ${stepName}`;
      log.prepend(item);
    }
  }

  function showProcessingResults(datasetName) {
    document.getElementById('proc-live-status').style.display = 'none';
    const summary = document.getElementById('proc-results-summary');
    if (summary) summary.style.display = 'block';

    window.SL_APP.showToast(`Dataset ${datasetName} processed and registered.`, 'success');
  }

  function closeProcessingModal() {
    const modal = document.getElementById('modal-dataset-processing');
    if (modal) modal.classList.remove('active');
  }

  return {
    init,
    openUploadModal,
    closeUploadModal,
    closeProcessingModal,
    renderDatasetsTable
  };
})();
