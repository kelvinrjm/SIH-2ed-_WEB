/**
 * SL: Geospatial Land Intelligence Platform
 * SIH26013 - Urban Land Record Management System
 * Module: Conflict Management & Case-Oriented Human-in-the-Loop Resolution
 */

window.SL_CONFLICTS = (function() {
  'use strict';

  let activeConflictId = null;

  function init() {
    renderConflictsList();
    bindEvents();
  }

  function bindEvents() {
    const filterSeverity = document.getElementById('conflict-filter-severity');
    const filterStatus = document.getElementById('conflict-filter-status');

    if (filterSeverity) filterSeverity.addEventListener('change', renderConflictsList);
    if (filterStatus) filterStatus.addEventListener('change', renderConflictsList);
  }

  function renderConflictsList() {
    const container = document.getElementById('conflicts-container');
    if (!container) return;

    const list = window.SL_STORAGE.getConflicts();
    const filterSeverity = document.getElementById('conflict-filter-severity')?.value || 'all';
    const filterStatus = document.getElementById('conflict-filter-status')?.value || 'all';

    let filtered = list;
    if (filterSeverity !== 'all') {
      filtered = filtered.filter(c => c.severity.toLowerCase() === filterSeverity.toLowerCase());
    }
    if (filterStatus !== 'all') {
      filtered = filtered.filter(c => c.status.toLowerCase() === filterStatus.toLowerCase());
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="sl-card" style="padding:2rem; text-align:center; color:var(--sl-text-muted);">
          No discrepancy cases matching the selected filters.
        </div>
      `;
      return;
    }

    // Formal Case Management Layout
    container.innerHTML = filtered.map(c => `
      <div class="sl-card" style="margin-bottom:1rem; border-left:3px solid ${c.severity === 'Critical' ? 'var(--sl-danger)' : (c.severity === 'High' ? 'var(--sl-warning)' : 'var(--sl-info)')};">
        <div class="sl-card-header">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span class="sl-badge sl-badge-${c.severity === 'Critical' ? 'danger' : (c.severity === 'High' ? 'warning' : 'info')}">${c.severity}</span>
              <strong style="font-family:var(--sl-font-mono); font-size:0.95rem; color:var(--sl-primary-dark);">${c.id}</strong>
              <span style="color:var(--sl-text-muted);">•</span>
              <span style="font-weight:700; color:var(--sl-text-main);">${c.parcelId} (${c.surveyNumber})</span>
            </div>
            <div style="font-size:0.775rem; color:var(--sl-text-muted); margin-top:0.2rem;">
              ${c.conflictType} • Flagged: ${c.createdAt} • Assigned Officer: ${c.assignedOfficer}
            </div>
          </div>
          <div style="text-align:right;">
            <span class="sl-badge sl-badge-${c.status === 'Resolved' ? 'verified' : 'danger'}">${c.status}</span>
            <div style="font-size:0.725rem; color:var(--sl-text-muted); margin-top:0.2rem;">Confidence: ${c.confidence}%</div>
          </div>
        </div>
        <div class="sl-card-body">
          <p style="font-size:0.85rem; color:var(--sl-text-main); margin-bottom:0.75rem;">
            ${c.description}
          </p>
          <div style="display:flex; flex-wrap:wrap; gap:0.35rem; margin-bottom:0.75rem;">
            ${c.datasetsInvolved.map(d => `<span class="sl-badge sl-badge-neutral">${d}</span>`).join('')}
          </div>
          <div style="background:var(--sl-surface-subtle); padding:0.65rem 0.85rem; border-radius:var(--sl-radius-xs); border:1px solid var(--sl-border); font-size:0.8rem;">
            <strong style="color:var(--sl-primary);">Automated Spatial Analysis:</strong> ${c.aiRecommendation}
          </div>
        </div>
        <div class="sl-card-footer">
          <button class="sl-btn sl-btn-outline sl-btn-sm" onclick="window.SL_PARCELS.viewOnMap('${c.parcelId}')">
            View on Map
          </button>
          <button class="sl-btn sl-btn-primary sl-btn-sm" onclick="window.SL_CONFLICTS.openComparisonModal('${c.id}')">
            Compare Sources &amp; Resolve
          </button>
        </div>
      </div>
    `).join('');
  }

  function openComparisonModal(conflictId) {
    const list = window.SL_STORAGE.getConflicts();
    const c = list.find(item => item.id === conflictId);
    if (!c) return;

    activeConflictId = conflictId;
    const modal = document.getElementById('modal-conflict-comparison');
    if (!modal) return;

    document.getElementById('comp-conflict-id').textContent = c.id;
    document.getElementById('comp-parcel-id').textContent = `${c.parcelId} (${c.surveyNumber})`;
    document.getElementById('comp-desc').textContent = c.description;

    document.getElementById('comp-val-cadastral').textContent = c.cadastralValue || '1,420 sq.m';
    document.getElementById('comp-val-municipal').textContent = c.municipalValue || '1,390 sq.m';
    document.getElementById('comp-val-gnss').textContent = c.gnssValue || '1,418.5 sq.m';
    document.getElementById('comp-val-drone').textContent = c.droneValue || '1,419.0 sq.m';

    document.getElementById('comp-ai-rec').textContent = c.aiRecommendation;
    document.getElementById('comp-evidence').textContent = c.spatialEvidence;

    modal.classList.add('active');
  }

  function closeComparisonModal() {
    const modal = document.getElementById('modal-conflict-comparison');
    if (modal) modal.classList.remove('active');
  }

  async function resolveConflict(resolutionChoice) {
    if (!activeConflictId) return;

    if (!confirm('CONFIRM OFFICIAL CONFLICT RESOLUTION:\nAre you sure you want to endorse this resolution? The official land record will be updated accordingly.')) {
      return;
    }

    let resMethod = 'Suggested Spatial Alignment';
    if (resolutionChoice === 'cadastral') resMethod = 'Revenue Cadastral FMB Extent';
    else if (resolutionChoice === 'municipal') resMethod = 'Municipal Property Tax Assessment';
    else if (resolutionChoice === 'gnss') resMethod = 'High-Precision GNSS / CORS Benchmark';
    else if (resolutionChoice === 'manual') resMethod = 'Officer Manual Demarcation';

    const res = await window.SL_API.resolveConflict(activeConflictId, resMethod);
    if (res.success) {
      closeComparisonModal();
      window.SL_APP.showToast(`Conflict case ${activeConflictId} resolved by Officer Decision.`, 'success');
      renderConflictsList();
      window.SL_OFFICER.renderPendingActionsQueue();
      window.SL_MAP.refreshLayers();
    }
  }

  return {
    init,
    renderConflictsList,
    openComparisonModal,
    closeComparisonModal,
    resolveConflict
  };
})();
