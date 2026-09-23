/**
 * SL: Geospatial Land Intelligence Platform
 * SIH26013 - Automated Integration and Intelligent Harmonization of Multi-source Geospatial Data
 * Module: Temporal Change Detection & Interactive Before/After Split Map Slider
 */

window.SL_CHANGES = (function() {
  'use strict';

  let beforeMap = null;
  let afterMap = null;
  let isDragging = false;

  function init() {
    renderChangesList();
    bindEvents();
  }

  function bindEvents() {
    // Timeline buttons
    document.querySelectorAll('.timeline-year-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.timeline-year-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const year = e.target.getAttribute('data-year');
        window.SL_APP.showToast(`Switched Temporal Baseline to Year ${year}`, 'info');
      });
    });
  }

  function renderChangesList() {
    const tbody = document.getElementById('changes-table-body');
    if (!tbody) return;

    const list = window.SL_STORAGE.getChanges();

    tbody.innerHTML = list.map(c => `
      <tr>
        <td><strong>${c.id}</strong></td>
        <td><code>${c.parcelId}</code></td>
        <td><span class="sl-badge sl-badge-info">${c.type}</span></td>
        <td>${c.description}</td>
        <td><strong style="color:#059669;">${c.areaDelta}</strong></td>
        <td><span class="sl-badge sl-badge-warning">${c.status}</span></td>
        <td>
          <div style="display:flex; gap:0.35rem;">
            <button class="sl-btn sl-btn-outline sl-btn-sm" onclick="window.SL_CHANGES.viewChangeOnMap('${c.parcelId}')">
              View
            </button>
            <button class="sl-btn sl-btn-success sl-btn-sm" onclick="window.SL_CHANGES.confirmChange('${c.id}')">
              Confirm
            </button>
            <button class="sl-btn sl-btn-danger sl-btn-sm" onclick="window.SL_CHANGES.rejectChange('${c.id}')">
              Reject
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function confirmChange(changeId) {
    window.SL_APP.showToast(`Change ${changeId} confirmed and incorporated into cadastral update log.`, 'success');
    window.SL_STORAGE.addAuditLog({
      action: `Temporal change ${changeId} confirmed`,
      parcel: 'Ward 12',
      dataset: 'Change Detection',
      status: 'Confirmed'
    });
  }

  function rejectChange(changeId) {
    window.SL_APP.showToast(`Change ${changeId} flagged as spurious artifact.`, 'warning');
  }

  function viewChangeOnMap(parcelId) {
    window.SL_NAV.switchOfficerSection('gis');
    window.SL_MAP.zoomToParcel(parcelId);
  }

  function initComparisonSlider() {
    const container = document.getElementById('ba-comparison-container');
    const divider = document.getElementById('ba-slider-divider');
    const beforeLayer = document.getElementById('ba-layer-before');

    if (!container || !divider || !beforeLayer) return;

    // Initialize the two maps if not yet initialized
    if (!beforeMap) {
      beforeMap = L.map('ba-map-before', {
        center: [9.9238, 78.1205],
        zoom: 17,
        zoomControl: false,
        attributionControl: false
      });
      // 2024 Street/Standard baseline map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(beforeMap);
    }

    if (!afterMap) {
      afterMap = L.map('ba-map-after', {
        center: [9.9238, 78.1205],
        zoom: 17,
        zoomControl: true,
        attributionControl: false
      });
      // 2026 High-Res Satellite / Drone Ortho
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19 }).addTo(afterMap);

      // Add 2026 Building Footprints to After Map
      L.geoJSON(window.SL_DEMO.buildingsGeoJSON, {
        style: { color: '#f59e0b', weight: 2, fillColor: '#fbbf24', fillOpacity: 0.6 }
      }).addTo(afterMap);
    }

    // Synchronize panning & zooming between before and after maps
    beforeMap.sync(afterMap);
    afterMap.sync(beforeMap);

    beforeMap.invalidateSize();
    afterMap.invalidateSize();

    // Mouse and Touch drag logic for divider
    function setDividerPos(x) {
      const rect = container.getBoundingClientRect();
      let offsetX = x - rect.left;
      if (offsetX < 20) offsetX = 20;
      if (offsetX > rect.width - 20) offsetX = rect.width - 20;

      const pct = (offsetX / rect.width) * 100;
      divider.style.left = `${pct}%`;
      beforeLayer.style.width = `${pct}%`;
    }

    divider.addEventListener('mousedown', () => { isDragging = true; });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setDividerPos(e.clientX);
    });

    divider.addEventListener('touchstart', () => { isDragging = true; });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches[0]) return;
      setDividerPos(e.touches[0].clientX);
    });
  }

  return {
    init,
    renderChangesList,
    initComparisonSlider,
    confirmChange,
    rejectChange,
    viewChangeOnMap
  };
})();

// Simple sync helper for Leaflet maps if leaflet.sync not bundled
L.Map.prototype.sync = function(otherMap) {
  this.on('move', () => {
    otherMap.setView(this.getCenter(), this.getZoom(), { animate: false });
  });
};
