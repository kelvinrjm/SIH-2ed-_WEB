/**
 * SL: Geospatial Land Intelligence Platform
 * SIH26013 - Urban Land Record Management System
 * Module: Land Parcels Register & Officer Selected Parcel Intelligence Panel
 */

window.SL_PARCELS = (function() {
  'use strict';

  let currentSelectedParcelId = 'TN-MDU-000124';

  function init() {
    renderOfficerParcelsTable();
    bindEvents();
  }

  function bindEvents() {
    const gisSearchInput = document.getElementById('gis-search-input');
    if (gisSearchInput) {
      gisSearchInput.addEventListener('input', (e) => {
        handleParcelSearch(e.target.value, 'gis-search-results');
      });
    }

    const globalSearchInput = document.getElementById('global-search-input');
    if (globalSearchInput) {
      globalSearchInput.addEventListener('input', (e) => {
        handleParcelSearch(e.target.value, 'global-search-results');
      });
    }

    const closeDrawerBtn = document.getElementById('btn-close-intel-drawer');
    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', closeParcelIntelligence);
    }

    const statusFilter = document.getElementById('parcel-filter-status');
    const landUseFilter = document.getElementById('parcel-filter-landuse');
    if (statusFilter) statusFilter.addEventListener('change', renderOfficerParcelsTable);
    if (landUseFilter) landUseFilter.addEventListener('change', renderOfficerParcelsTable);
  }

  function renderOfficerParcelsTable() {
    const tbody = document.getElementById('parcels-table-body');
    if (!tbody) return;

    const geo = window.SL_STORAGE.getParcels();
    if (!geo || !geo.features) return;

    const statusFilter = document.getElementById('parcel-filter-status')?.value || 'all';
    const landUseFilter = document.getElementById('parcel-filter-landuse')?.value || 'all';

    let list = geo.features.map(f => f.properties);

    if (statusFilter !== 'all') {
      list = list.filter(p => p.status === statusFilter);
    }
    if (landUseFilter !== 'all') {
      list = list.filter(p => p.landUse === landUseFilter);
    }

    tbody.innerHTML = list.map(p => `
      <tr>
        <td>
          <div style="font-weight:700; color:var(--sl-primary-dark); font-family:var(--sl-font-mono);">${p.id}</div>
          <div style="font-size:0.7rem; color:var(--sl-text-muted);">Old: ${p.oldSurveyNumber || '-'}</div>
        </td>
        <td><strong style="font-family:var(--sl-font-mono);">${p.surveyNumber}</strong></td>
        <td>${p.ward}, ${p.village}</td>
        <td>${p.area.toLocaleString()} sq.m</td>
        <td><span class="sl-badge sl-badge-neutral">${p.landUse}</span></td>
        <td>
          <span class="sl-badge sl-badge-${p.status === 'Officer Verified' ? 'verified' : (p.status === 'Conflict Detected' ? 'danger' : 'warning')}">
            ${p.status}
          </span>
        </td>
        <td>
          <span style="font-weight:700; color:${p.confidence >= 90 ? 'var(--sl-success)' : (p.confidence >= 80 ? 'var(--sl-warning)' : 'var(--sl-danger)')};">
            ${p.confidence}%
          </span>
        </td>
        <td>
          <div style="display:flex; gap:0.35rem;">
            <button class="sl-btn sl-btn-outline sl-btn-sm" onclick="window.SL_PARCELS.viewOnMap('${p.id}')">
              Map
            </button>
            <button class="sl-btn sl-btn-primary sl-btn-sm" onclick="window.SL_OFFICER.openOfficialEditModal('${p.id}')">
              Edit
            </button>
            <button class="sl-btn sl-btn-outline sl-btn-sm" onclick="window.SL_PARCELS.openParcelModal('${p.id}')">
              Record
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function handleParcelSearch(query, resultContainerId) {
    const container = document.getElementById(resultContainerId);
    if (!container) return;

    if (!query || query.trim().length < 2) {
      container.style.display = 'none';
      container.innerHTML = '';
      return;
    }

    const geo = window.SL_STORAGE.getParcels();
    const q = query.toLowerCase().trim();

    const matches = geo.features.filter(f => {
      const p = f.properties;
      return (
        p.id.toLowerCase().includes(q) ||
        p.surveyNumber.toLowerCase().includes(q) ||
        p.ward.toLowerCase().includes(q) ||
        (p.owner && p.owner.toLowerCase().includes(q))
      );
    }).slice(0, 5);

    if (matches.length === 0) {
      container.innerHTML = '<div style="padding:0.6rem 0.85rem; font-size:0.8rem; color:var(--sl-text-muted);">No matching land records.</div>';
      container.style.display = 'block';
      return;
    }

    container.innerHTML = matches.map(f => {
      const p = f.properties;
      return `
        <div class="search-result-item" onclick="window.SL_PARCELS.selectSearchResult('${p.id}', '${resultContainerId}')"
             style="padding:0.5rem 0.85rem; border-bottom:1px solid var(--sl-border); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:700; font-size:0.825rem; color:var(--sl-primary-dark); font-family:var(--sl-font-mono);">${p.id} • ${p.surveyNumber}</div>
            <div style="font-size:0.75rem; color:var(--sl-text-secondary);">${p.ward} • ${p.area} sq.m • ${p.landUse}</div>
          </div>
          <span class="sl-badge sl-badge-${p.status === 'Officer Verified' ? 'verified' : 'neutral'}">${p.confidence}%</span>
        </div>
      `;
    }).join('');

    container.style.display = 'block';
  }

  function selectSearchResult(parcelId, containerId) {
    const container = document.getElementById(containerId);
    if (container) container.style.display = 'none';

    window.SL_NAV.switchOfficerSection('gis');
    window.SL_MAP.zoomToParcel(parcelId);
  }

  function viewOnMap(parcelId) {
    window.SL_NAV.switchOfficerSection('gis');
    window.SL_MAP.zoomToParcel(parcelId);
  }

  function openParcelIntelligence(parcelId) {
    const feat = window.SL_STORAGE.getParcelById(parcelId);
    if (!feat) return;

    currentSelectedParcelId = parcelId;
    const p = feat.properties;
    const drawer = document.getElementById('parcel-intel-drawer');
    if (!drawer) return;

    // Populate Fields
    document.getElementById('intel-parcel-id').textContent = p.id;
    document.getElementById('intel-survey-no').textContent = p.surveyNumber;

    const badgeContainer = document.getElementById('intel-status-badge');
    if (badgeContainer) {
      badgeContainer.className = `sl-badge sl-badge-${p.status === 'Officer Verified' ? 'verified' : (p.status === 'Conflict Detected' ? 'danger' : 'warning')}`;
      badgeContainer.textContent = p.status;
    }

    document.getElementById('intel-val-area').textContent = `${p.area.toLocaleString()} sq.m`;
    document.getElementById('intel-val-landuse').textContent = p.landUse;
    document.getElementById('intel-val-owner').textContent = p.owner || 'Government / Patta Holder';
    document.getElementById('intel-val-road').textContent = p.roadAccess || 'Direct Road Access';
    document.getElementById('intel-val-ward').textContent = `${p.ward}, ${p.village}`;
    document.getElementById('intel-val-taxno').textContent = p.taxAssessmentNo || 'TX-PENDING';

    // Multi-source Area Discrepancy Breakdown
    document.getElementById('intel-area-cadastral').textContent = `${p.cadastralArea || p.area} sq.m`;
    document.getElementById('intel-area-municipal').textContent = `${p.municipalArea || p.area} sq.m`;
    document.getElementById('intel-area-gnss').textContent = `${p.gnssArea || p.area} sq.m`;

    // Data Lineage Chain
    const lineage = p.sourceLineage || {};
    document.getElementById('intel-lineage-boundary').textContent = lineage.boundary || 'Cadastral + GNSS Hybrid';
    document.getElementById('intel-lineage-area').textContent = lineage.area || 'GNSS CORS Fixed';
    document.getElementById('intel-lineage-landuse').textContent = lineage.landUse || 'Municipal Property Tax';
    document.getElementById('intel-lineage-building').textContent = lineage.building || 'Drone ORI 2026';
    document.getElementById('intel-lineage-verify').textContent = lineage.verification || 'Officer Verified';

    document.getElementById('intel-conf-score').textContent = `${p.confidence}%`;

    drawer.classList.add('active');
  }

  function closeParcelIntelligence() {
    const drawer = document.getElementById('parcel-intel-drawer');
    if (drawer) drawer.classList.remove('active');
  }

  function openParcelModal(parcelId) {
    const feat = window.SL_STORAGE.getParcelById(parcelId);
    if (!feat) return;

    const p = feat.properties;
    const modal = document.getElementById('modal-parcel-details');
    if (!modal) return;

    document.getElementById('modal-parcel-title').textContent = `Official Land Record: ${p.id} (${p.surveyNumber})`;
    document.getElementById('detail-prop-id').textContent = p.id;
    document.getElementById('detail-survey-no').textContent = p.surveyNumber;
    document.getElementById('detail-area').textContent = `${p.area} sq.m`;
    document.getElementById('detail-landuse').textContent = p.landUse;
    document.getElementById('detail-owner').textContent = p.owner;
    document.getElementById('detail-ward').textContent = `${p.ward}, ${p.village}, ${p.taluk}, ${p.district}`;
    document.getElementById('detail-confidence').textContent = `${p.confidence}%`;
    document.getElementById('detail-status').textContent = p.status;

    const historyTbody = document.getElementById('modal-parcel-history');
    if (historyTbody) {
      const hist = p.history || [
        { date: "2024-02-11", event: "Legacy Cadastral digitization (1:2000)" },
        { date: "2026-01-14", event: "High-Res Drone ORI Survey (5cm GSD)" },
        { date: "2026-03-05", event: "Multi-Source Harmonization & CORS Alignment" }
      ];
      historyTbody.innerHTML = hist.map(h => `
        <tr>
          <td style="font-family:var(--sl-font-mono); font-size:0.75rem; color:var(--sl-text-muted);">${h.date}</td>
          <td>${h.event}</td>
        </tr>
      `).join('');
    }

    modal.classList.add('active');
  }

  function closeParcelModal() {
    const modal = document.getElementById('modal-parcel-details');
    if (modal) modal.classList.remove('active');
  }

  return {
    init,
    renderOfficerParcelsTable,
    openParcelIntelligence,
    closeParcelIntelligence,
    openParcelModal,
    closeParcelModal,
    viewOnMap,
    selectSearchResult,
    currentSelectedParcelId: () => currentSelectedParcelId
  };
})();
