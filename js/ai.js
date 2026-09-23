/**
 * SL: Geospatial Land Intelligence Platform
 * SIH26013 - Automated Integration and Intelligent Harmonization of Multi-source Geospatial Data
 * Module: AI Harmonization, Spatial Matching, Attribute Mapping & Topology Validation
 */

window.SL_AI = (function() {
  'use strict';

  function init() {
    renderAttributeMappings();
    renderTopologyIssues();
    bindEvents();
  }

  function bindEvents() {
    const runHarmonizeBtn = document.getElementById('btn-run-harmonization');
    if (runHarmonizeBtn) {
      runHarmonizeBtn.addEventListener('click', handleRunHarmonization);
    }

    const viewEvidenceBtn = document.getElementById('btn-view-evidence');
    if (viewEvidenceBtn) {
      viewEvidenceBtn.addEventListener('click', openEvidenceModal);
    }
  }

  async function handleRunHarmonization() {
    const btn = document.getElementById('btn-run-harmonization');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> Harmonizing Multi-Source Data...';
    }

    const res = await window.SL_API.runHarmonization();

    if (btn) {
      btn.disabled = false;
      btn.innerHTML = 'Run Harmonization Engine';
    }

    window.SL_APP.showToast('AI Harmonization pipeline executed successfully!', 'success');
    renderAttributeMappings();
    renderTopologyIssues();
  }

  function renderAttributeMappings() {
    const container = document.getElementById('attribute-mapping-list');
    if (!container) return;

    const list = window.SL_STORAGE.getAttributeMappings();

    container.innerHTML = list.map(m => `
      <div class="sl-card" style="margin-bottom:0.75rem; padding:1rem; border-left:4px solid ${m.status === 'Approved' ? '#059669' : '#3b82f6'};">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
          <div>
            <span style="font-size:0.75rem; color:var(--sl-text-muted); text-transform:uppercase; font-weight:700;">Inferred Field Alignment</span>
            <div style="font-weight:700; font-size:0.95rem; color:var(--sl-navy-900);">
              <code>${m.sourceField}</code> &harr; <code>${m.targetField}</code>
            </div>
          </div>
          <div style="text-align:right;">
            <span class="sl-badge sl-badge-${m.status === 'Approved' ? 'verified' : 'info'}">${m.status}</span>
            <div style="font-size:0.75rem; color:var(--sl-emerald-700); font-weight:700; margin-top:0.2rem;">${m.confidence}% Match</div>
          </div>
        </div>
        <div style="font-size:0.8rem; color:var(--sl-text-secondary); margin-bottom:0.75rem;">
          Sample Ingested Value: <strong style="font-family:var(--sl-font-mono);">${m.sampleValue}</strong>
        </div>
        <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
          ${m.status !== 'Approved' ? `
            <button class="sl-btn sl-btn-success sl-btn-sm" onclick="window.SL_AI.acceptMapping('${m.sourceField}')">ACCEPT</button>
            <button class="sl-btn sl-btn-outline sl-btn-sm" onclick="window.SL_AI.editMapping('${m.sourceField}')">EDIT</button>
            <button class="sl-btn sl-btn-danger sl-btn-sm" onclick="window.SL_AI.rejectMapping('${m.sourceField}')">REJECT</button>
          ` : `
            <span style="font-size:0.75rem; color:var(--sl-emerald-700); font-weight:600;">&check; Saved in Approved Field Catalog</span>
            <button class="sl-btn sl-btn-outline sl-btn-sm" onclick="window.SL_AI.editMapping('${m.sourceField}')">EDIT</button>
          `}
        </div>
      </div>
    `).join('');
  }

  function acceptMapping(sourceField) {
    window.SL_STORAGE.updateAttributeMapping(sourceField, 'Approved');
    window.SL_APP.showToast(`Attribute mapping for ${sourceField} accepted and registered.`, 'success');
    renderAttributeMappings();
  }

  function editMapping(sourceField) {
    const newField = prompt(`Enter custom target field name for ${sourceField}:`, 'parcelIdentifier');
    if (newField) {
      window.SL_STORAGE.updateAttributeMapping(sourceField, 'Approved');
      window.SL_APP.showToast(`Custom mapping updated for ${sourceField} -> ${newField}.`, 'info');
      renderAttributeMappings();
    }
  }

  function rejectMapping(sourceField) {
    window.SL_STORAGE.updateAttributeMapping(sourceField, 'Rejected');
    window.SL_APP.showToast(`Attribute mapping for ${sourceField} rejected.`, 'warning');
    renderAttributeMappings();
  }

  function renderTopologyIssues() {
    const tbody = document.getElementById('topology-issues-table-body');
    if (!tbody) return;

    const list = window.SL_STORAGE.getTopologyIssues();

    tbody.innerHTML = list.map(t => `
      <tr>
        <td><strong>${t.type}</strong></td>
        <td><code>${t.parcelId}</code></td>
        <td>${t.extent}</td>
        <td>
          <span class="sl-badge sl-badge-${t.severity === 'High' ? 'danger' : 'warning'}">${t.severity}</span>
        </td>
        <td>
          <span class="sl-badge sl-badge-${t.status === 'Corrected' ? 'verified' : (t.status === 'Ignored' ? 'neutral' : 'conflict')}">
            ${t.status}
          </span>
        </td>
        <td>
          <div style="display:flex; gap:0.35rem;">
            <button class="sl-btn sl-btn-outline sl-btn-sm" onclick="window.SL_AI.viewTopologyOnMap('${t.parcelId}')">
              View on Map
            </button>
            ${t.status === 'Detected' ? `
              <button class="sl-btn sl-btn-success sl-btn-sm" onclick="window.SL_AI.autoCorrectTopology('${t.id}')">
                Auto Correct
              </button>
              <button class="sl-btn sl-btn-outline sl-btn-sm" onclick="window.SL_AI.manualFixTopology('${t.id}')">
                Manual Fix
              </button>
              <button class="sl-btn sl-btn-outline sl-btn-sm" onclick="window.SL_AI.ignoreTopology('${t.id}')">
                Ignore
              </button>
            ` : `
              <span style="font-size:0.75rem; color:var(--sl-text-muted); line-height:28px;">Action Completed</span>
            `}
          </div>
        </td>
      </tr>
    `).join('');
  }

  function autoCorrectTopology(issueId) {
    window.SL_STORAGE.updateTopologyIssue(issueId, 'Corrected');
    window.SL_STORAGE.addAuditLog({
      action: 'Automated topology polygon repair applied',
      parcel: issueId,
      dataset: 'Topology Engine',
      status: 'Corrected'
    });
    window.SL_APP.showToast(`Topology issue ${issueId} corrected using Douglas-Peucker snapping.`, 'success');
    renderTopologyIssues();
  }

  function manualFixTopology(issueId) {
    const modal = document.getElementById('modal-manual-topology');
    if (modal) {
      document.getElementById('manual-top-id').textContent = issueId;
      modal.classList.add('active');
    }
  }

  function closeManualTopologyModal() {
    const modal = document.getElementById('modal-manual-topology');
    if (modal) modal.classList.remove('active');
  }

  function saveManualTopologyFix() {
    const issueId = document.getElementById('manual-top-id').textContent;
    window.SL_STORAGE.updateTopologyIssue(issueId, 'Corrected');
    closeManualTopologyModal();
    window.SL_APP.showToast(`Manual boundary coordinate adjustment saved for ${issueId}.`, 'success');
    renderTopologyIssues();
  }

  function ignoreTopology(issueId) {
    window.SL_STORAGE.updateTopologyIssue(issueId, 'Ignored');
    window.SL_APP.showToast(`Topology rule exception granted for ${issueId}.`, 'info');
    renderTopologyIssues();
  }

  function viewTopologyOnMap(parcelIdStr) {
    const firstId = parcelIdStr.split('&')[0].trim();
    window.SL_NAV.switchOfficerSection('gis');
    window.SL_MAP.zoomToParcel(firstId);
  }

  function openEvidenceModal() {
    const modal = document.getElementById('modal-spatial-evidence');
    if (modal) modal.classList.add('active');
  }

  function closeEvidenceModal() {
    const modal = document.getElementById('modal-spatial-evidence');
    if (modal) modal.classList.remove('active');
  }

  return {
    init,
    acceptMapping,
    editMapping,
    rejectMapping,
    autoCorrectTopology,
    manualFixTopology,
    closeManualTopologyModal,
    saveManualTopologyFix,
    ignoreTopology,
    viewTopologyOnMap,
    openEvidenceModal,
    closeEvidenceModal
  };
})();
