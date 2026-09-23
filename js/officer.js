/**
 * SL: Geospatial Land Intelligence Platform
 * SIH26013 - Urban Land Record Management System
 * Module: Officer Command Center, Dashboard Charts, Pending Actions & Official Record Editing
 */

window.SL_OFFICER = (function() {
  'use strict';

  let currentEditingParcelId = null;
  let chartQuality = null;
  let chartChanges = null;

  function init() {
    renderOfficerClock();
    renderPendingActionsQueue();
    renderAuditLogs();
    renderDataExchange();
    initCharts();
    bindEvents();
    // Update live clock every minute
    setInterval(renderOfficerClock, 60000);
  }

  function renderOfficerClock() {
    const clockEl = document.getElementById('officer-live-clock');
    if (clockEl) {
      const now = new Date();
      clockEl.textContent = now.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }) + ' ' + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    }
  }

  function bindEvents() {
    // Desktop Sidebar Navigation
    document.querySelectorAll('.desktop-sidebar .sidebar-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const sec = btn.getAttribute('data-sec');
        if (sec) window.SL_NAV.switchOfficerSection(sec);
      });
    });

    // Mobile Officer Bottom Nav
    document.querySelectorAll('.mobile-bottom-nav.officer-nav .mobile-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const sec = btn.getAttribute('data-sec');
        if (sec) window.SL_NAV.switchOfficerSection(sec);
      });
    });

    // Official Record Edit Form
    const editForm = document.getElementById('form-official-record-edit');
    if (editForm) {
      editForm.addEventListener('submit', handleOfficialRecordEditSubmit);
    }
  }

  function initCharts() {
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js library not loaded yet');
      return;
    }

    // 1. Geospatial Data Quality Index (Radar Chart)
    const qualityCtx = document.getElementById('chart-data-quality');
    if (qualityCtx) {
      if (chartQuality) {
        chartQuality.destroy();
      }

      chartQuality = new Chart(qualityCtx, {
        type: 'radar',
        data: {
          labels: [
            'Spatial Accuracy',
            'Attribute Quality',
            'Geometry Validity',
            'Source Consistency',
            'Survey Accuracy'
          ],
          datasets: [{
            label: 'Harmonized Score (%)',
            data: [94, 92, 98, 93, 95],
            backgroundColor: 'rgba(21, 90, 138, 0.2)',
            borderColor: '#155A8A',
            pointBackgroundColor: '#155A8A',
            pointBorderColor: '#FFFFFF',
            pointHoverBackgroundColor: '#FFFFFF',
            pointHoverBorderColor: '#155A8A',
            borderWidth: 2,
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: '#0B2942',
              titleFont: { size: 12, weight: 'bold' },
              bodyFont: { size: 12 },
              padding: 8,
              cornerRadius: 4,
              callbacks: {
                label: function(context) {
                  return ` ${context.dataset.label}: ${context.raw}%`;
                }
              }
            }
          },
          scales: {
            r: {
              angleLines: {
                color: '#D7E0E7'
              },
              grid: {
                color: '#E5ECF0'
              },
              pointLabels: {
                font: {
                  family: 'Inter, sans-serif',
                  size: 11,
                  weight: '600'
                },
                color: '#172B3A'
              },
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 100,
                stepSize: 20,
                showLabelBackdrop: false,
                font: { size: 9, family: 'JetBrains Mono, monospace' },
                color: '#5E7180'
              }
            }
          }
        }
      });
    }

    // 2. Temporal Change Detection Distribution (Grouped Bar Chart)
    const changesCtx = document.getElementById('chart-changes-distribution');
    if (changesCtx) {
      if (chartChanges) {
        chartChanges.destroy();
      }

      chartChanges = new Chart(changesCtx, {
        type: 'bar',
        data: {
          labels: ['2024 Baseline', '2025 Updates', '2026 Drone ORI'],
          datasets: [
            {
              label: 'New Structures',
              data: [45, 82, 118],
              backgroundColor: '#155A8A',
              borderRadius: 4
            },
            {
              label: 'Boundary Modifications',
              data: [38, 54, 62],
              backgroundColor: '#C58A1B',
              borderRadius: 4
            },
            {
              label: 'Demolitions / Cleared',
              data: [37, 49, 37],
              backgroundColor: '#5E7180',
              borderRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              align: 'end',
              labels: {
                boxWidth: 12,
                boxHeight: 12,
                usePointStyle: true,
                pointStyle: 'rectRounded',
                font: { family: 'Inter, sans-serif', size: 11, weight: '600' },
                color: '#172B3A',
                padding: 14
              }
            },
            tooltip: {
              backgroundColor: '#0B2942',
              titleFont: { size: 12, weight: 'bold' },
              bodyFont: { size: 12 },
              padding: 8,
              cornerRadius: 4
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: { family: 'Inter, sans-serif', size: 11, weight: '600' },
                color: '#172B3A'
              }
            },
            y: {
              grid: {
                color: '#E5ECF0'
              },
              ticks: {
                beginAtZero: true,
                font: { family: 'JetBrains Mono, monospace', size: 10 },
                color: '#5E7180',
                stepSize: 30
              }
            }
          }
        }
      });
    }
  }

  function renderPendingActionsQueue() {
    const tbody = document.getElementById('pending-actions-table-body');
    if (!tbody) return;

    // Pragmatic, prioritized work list for government officers
    const pendingActions = [
      { priority: 'critical', priorityLabel: 'Critical', parcelId: 'TN-MDU-000126', issue: 'Boundary & Area discrepancy: Cadastral (1,420 sq.m) vs Municipal (1,390 sq.m)', date: '2026-03-22', type: 'conflict', targetId: 'CONF-2026-001' },
      { priority: 'critical', priorityLabel: 'Critical', parcelId: 'TN-MDU-000132', issue: 'Cadastral boundary overlaps parcel S-126/4 by 3.2m in digitized FMB', date: '2026-03-21', type: 'conflict', targetId: 'CONF-2026-002' },
      { priority: 'high', priorityLabel: 'High', parcelId: 'TN-MDU-000128', issue: 'Unapproved construction: 2-storey commercial RCC structure detected on vacant plot', date: '2026-03-20', type: 'survey', targetId: 'GT-2026-010' },
      { priority: 'high', priorityLabel: 'High', parcelId: 'TN-MDU-000133', issue: 'Peri-urban plotted layout gravel roads formed on agricultural patta', date: '2026-03-20', type: 'survey', targetId: 'GT-2026-012' },
      { priority: 'medium', priorityLabel: 'Medium', parcelId: 'TN-MDU-000124', issue: 'Citizen correction request REQ-2026-0042 awaiting SDM endorsement', date: '2026-03-19', type: 'parcel', targetId: 'TN-MDU-000124' },
      { priority: 'medium', priorityLabel: 'Medium', parcelId: 'DS-2026-002', issue: 'Drone Orthomosaic (ORI) dataset awaiting final geodetic topology signoff', date: '2026-03-18', type: 'dataset', targetId: 'DS-2026-002' },
      { priority: 'low', priorityLabel: 'Low', parcelId: 'TN-MDU-000130', issue: 'Subdivision identifier S-126/1A alias harmonization review', date: '2026-03-17', type: 'conflict', targetId: 'CONF-2026-006' }
    ];

    tbody.innerHTML = pendingActions.map(item => `
      <tr>
        <td>
          <span class="priority-indicator priority-${item.priority}"></span>
          <span class="sl-badge sl-badge-${item.priority === 'critical' ? 'danger' : (item.priority === 'high' ? 'warning' : 'info')}">
            ${item.priorityLabel}
          </span>
        </td>
        <td><strong style="font-family:var(--sl-font-mono); font-size:0.85rem; color:var(--sl-primary-dark);">${item.parcelId}</strong></td>
        <td>${item.issue}</td>
        <td style="font-size:0.775rem; color:var(--sl-text-muted); font-family:var(--sl-font-mono);">${item.date}</td>
        <td>
          <button class="sl-btn sl-btn-primary sl-btn-sm" onclick="window.SL_OFFICER.handleActionReview('${item.type}', '${item.targetId}', '${item.parcelId}')">
            REVIEW &rarr;
          </button>
        </td>
      </tr>
    `).join('');
  }

  function handleActionReview(type, targetId, parcelId) {
    if (type === 'conflict') {
      window.SL_NAV.switchOfficerSection('conflicts');
      window.SL_CONFLICTS.openComparisonModal(targetId);
    } else if (type === 'survey') {
      window.SL_NAV.switchOfficerSection('surveys');
    } else if (type === 'dataset') {
      window.SL_NAV.switchOfficerSection('datasets');
    } else {
      window.SL_NAV.switchOfficerSection('gis');
      window.SL_MAP.zoomToParcel(parcelId);
    }
  }

  // Official Record Edit Modal Flow
  function openOfficialEditModal(parcelId) {
    const p = window.SL_STORAGE.getParcelById(parcelId);
    if (!p) return;

    currentEditingParcelId = parcelId;
    const props = p.properties;
    const modal = document.getElementById('modal-official-record-edit');
    if (!modal) return;

    document.getElementById('edit-target-id').textContent = props.id;
    document.getElementById('edit-survey-no').value = props.surveyNumber;
    document.getElementById('edit-area').value = props.area;
    document.getElementById('edit-land-use').value = props.landUse;
    document.getElementById('edit-owner').value = props.owner;
    document.getElementById('edit-status').value = props.status;
    document.getElementById('edit-remarks').value = props.verificationNotes || 'Verified against GNSS CORS survey peg benchmarks.';

    modal.classList.add('active');
  }

  function closeOfficialEditModal() {
    const modal = document.getElementById('modal-official-record-edit');
    if (modal) modal.classList.remove('active');
  }

  function handleOfficialRecordEditSubmit(e) {
    e.preventDefault();

    if (!confirm('CONFIRM RECORD MODIFICATION:\nAre you sure you want to update this official government land record?\nAn administrative audit event will be recorded.')) {
      return;
    }

    const updatedProps = {
      surveyNumber: document.getElementById('edit-survey-no').value.trim(),
      area: parseFloat(document.getElementById('edit-area').value),
      landUse: document.getElementById('edit-land-use').value,
      owner: document.getElementById('edit-owner').value.trim(),
      status: document.getElementById('edit-status').value,
      verificationNotes: document.getElementById('edit-remarks').value.trim(),
      lastModified: new Date().toISOString().substring(0, 10)
    };

    window.SL_STORAGE.updateParcel(currentEditingParcelId, updatedProps);
    window.SL_STORAGE.addAuditLog({
      action: 'Official Record Edited by Officer',
      parcel: currentEditingParcelId,
      dataset: 'Cadastral Ledger',
      status: updatedProps.status
    });

    closeOfficialEditModal();
    window.SL_APP.showToast(`Official record for ${currentEditingParcelId} updated and certified.`, 'success');

    // Refresh UI
    window.SL_PARCELS.renderOfficerParcelsTable();
    window.SL_PARCELS.openParcelIntelligence(currentEditingParcelId);
    renderAuditLogs();
    window.SL_MAP.refreshLayers();
  }

  function renderAuditLogs() {
    const tbody = document.getElementById('audit-logs-table-body');
    if (!tbody) return;

    const list = window.SL_STORAGE.getAuditLogs();

    tbody.innerHTML = list.map(a => `
      <tr>
        <td style="font-family:var(--sl-font-mono); font-size:0.75rem; color:var(--sl-text-muted);">${a.timestamp}</td>
        <td>
          <div style="font-weight:700; color:var(--sl-primary-dark); font-size:0.825rem;">${a.user}</div>
          <div style="font-size:0.7rem; color:var(--sl-text-muted);">${a.role}</div>
        </td>
        <td><strong>${a.action}</strong></td>
        <td><code style="font-size:0.8rem;">${a.parcel}</code></td>
        <td>${a.dataset}</td>
        <td><span class="sl-badge sl-badge-verified">${a.status}</span></td>
      </tr>
    `).join('');
  }

  function renderDataExchange() {
    const tbody = document.getElementById('data-exchange-table-body');
    if (!tbody) return;

    const exchanges = [
      { dept: 'Revenue Department', dataset: 'Cadastral FMB Layer (Ward 12)', format: 'Shapefile ZIP', status: 'Shared / Active', date: '2026-03-20' },
      { dept: 'Municipal Administration', dataset: 'Property Tax GIS Vector Polygons', format: 'GeoJSON', status: 'Shared / Active', date: '2026-03-21' },
      { dept: 'Survey Department', dataset: '5cm Drone ORI Orthomosaics', format: 'GeoTIFF', status: 'Shared / Active', date: '2026-03-22' },
      { dept: 'Urban Planning (DTCP)', dataset: 'Master Plan 2035 Statutory Zoning', format: 'KML / KMZ', status: 'Under Review', date: '2026-03-22' }
    ];

    tbody.innerHTML = exchanges.map(x => `
      <tr>
        <td><strong>${x.dept}</strong></td>
        <td>${x.dataset}</td>
        <td><code>${x.format}</code></td>
        <td>${x.date}</td>
        <td><span class="sl-badge sl-badge-${x.status.includes('Active') ? 'verified' : 'warning'}">${x.status}</span></td>
        <td>
          <button class="sl-btn sl-btn-outline sl-btn-sm" onclick="window.SL_APP.showToast('Authorized data export initiated.', 'info')">
            Export Package
          </button>
        </td>
      </tr>
    `).join('');
  }

  return {
    init,
    initCharts,
    renderPendingActionsQueue,
    renderAuditLogs,
    renderDataExchange,
    handleActionReview,
    openOfficialEditModal,
    closeOfficialEditModal
  };
})();
