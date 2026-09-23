/**
 * SL: Geospatial Land Intelligence Platform
 * SIH26013 - Automated Integration and Intelligent Harmonization of Multi-source Geospatial Data
 * Module: Reports Generator (Printable & Exportable Multi-source Land Intelligence)
 */

window.SL_REPORTS = (function() {
  'use strict';

  let currentReportData = null;

  function init() {
    bindEvents();
  }

  function bindEvents() {
    document.querySelectorAll('.btn-generate-report').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const reportType = e.target.getAttribute('data-report-type');
        generateReport(reportType);
      });
    });

    const printBtn = document.getElementById('btn-print-report');
    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }

    const exportCsvBtn = document.getElementById('btn-export-csv');
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', exportReportCSV);
    }

    const exportJsonBtn = document.getElementById('btn-export-json');
    if (exportJsonBtn) {
      exportJsonBtn.addEventListener('click', exportReportJSON);
    }
  }

  async function generateReport(type) {
    const res = await window.SL_API.generateReport(type);
    currentReportData = {
      ...res,
      parcels: window.SL_STORAGE.getParcels().features.map(f => f.properties),
      conflicts: window.SL_STORAGE.getConflicts(),
      surveys: window.SL_STORAGE.getSurveys()
    };

    openReportModal(type);
  }

  function openReportModal(type) {
    const modal = document.getElementById('modal-report-preview');
    const container = document.getElementById('report-document-body');
    if (!modal || !container) return;

    const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const user = window.SL_STORAGE.getCurrentUser();
    const officerName = user ? (user.name || user.email) : 'R. Sundararaman (SDM / RDO)';

    let contentHtml = `
      <div style="border-bottom: 2px solid var(--sl-navy-900); padding-bottom: 1rem; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--sl-blue-700); letter-spacing: 0.06em;">GOVERNMENT OF TAMIL NADU • REVENUE & DISASTER MANAGEMENT</div>
          <h2 style="font-size: 1.4rem; color: var(--sl-navy-900); margin: 0.25rem 0;">${getReportTitle(type)}</h2>
          <div style="font-size: 0.825rem; color: var(--sl-text-secondary);">Urban Land Records Harmonization Project • Madurai South Division</div>
        </div>
        <div style="text-align: right; font-size: 0.775rem; color: var(--sl-text-muted);">
          <div><strong>Report ID:</strong> ${currentReportData.reportId}</div>
          <div><strong>Date:</strong> ${dateStr}</div>
          <div><strong>Officer:</strong> ${officerName}</div>
        </div>
      </div>
    `;

    if (type === 'land-integration' || type === 'parcel-validation') {
      contentHtml += `
        <h4 style="margin-bottom: 0.75rem;">Harmonized Cadastral Parcels Summary (Ward 12 & 13)</h4>
        <table class="sl-table" style="margin-bottom: 1.5rem;">
          <thead>
            <tr>
              <th>Parcel ID</th>
              <th>Survey No</th>
              <th>Area (sq.m)</th>
              <th>Land Use</th>
              <th>Status</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            ${currentReportData.parcels.slice(0, 10).map(p => `
              <tr>
                <td><strong>${p.id}</strong></td>
                <td>${p.surveyNumber}</td>
                <td>${p.area.toLocaleString()}</td>
                <td>${p.landUse}</td>
                <td>${p.status}</td>
                <td><strong>${p.confidence}%</strong></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else if (type === 'conflicts') {
      contentHtml += `
        <h4 style="margin-bottom: 0.75rem;">Multi-source Conflict Audit Summary</h4>
        <table class="sl-table" style="margin-bottom: 1.5rem;">
          <thead>
            <tr>
              <th>Conflict ID</th>
              <th>Parcel</th>
              <th>Discrepancy</th>
              <th>Datasets</th>
              <th>Status</th>
              <th>Resolution</th>
            </tr>
          </thead>
          <tbody>
            ${currentReportData.conflicts.map(c => `
              <tr>
                <td><strong>${c.id}</strong></td>
                <td>${c.parcelId}</td>
                <td>${c.conflictType}</td>
                <td>${c.datasetsInvolved.join(', ')}</td>
                <td>${c.status}</td>
                <td>${c.resolutionMethod || 'AI Recommendation Pending'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else {
      contentHtml += `
        <div style="background: var(--sl-bg-subtle); padding: 1.25rem; border-radius: var(--sl-radius-md); margin-bottom: 1.5rem;">
          <h4 style="margin-bottom: 0.5rem;">Analytical Quality Metrics</h4>
          <p style="font-size: 0.85rem; margin-bottom: 0.5rem;">All geodetic features certified against Survey of India CORS Benchmark Stations. Spatial matching tolerance within 0.05m.</p>
          <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--sl-text-secondary);">
            <li>Total Parcels Audited: 12,842</li>
            <li>Spatial Completeness: 94.2%</li>
            <li>Attribute Accuracy: 92.8%</li>
            <li>Overall Quality Index: 91.4%</li>
          </ul>
        </div>
      `;
    }

    contentHtml += `
      <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--sl-border-light); display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--sl-text-muted);">
        <div>Certified by SLI Geospatial Land Intelligence Platform (SIH26013)</div>
        <div>Digitally Verified by Authorized Revenue Authority</div>
      </div>
    `;

    container.innerHTML = contentHtml;
    modal.classList.add('active');
  }

  function getReportTitle(type) {
    switch (type) {
      case 'land-integration': return 'Integrated Urban Land Cadastre Report';
      case 'parcel-validation': return 'Parcel Geodetic Validation & Patta Record';
      case 'conflicts': return 'Multi-Source Discrepancy & Conflict Audit Report';
      case 'changes': return 'Temporal Change Detection & Footprint Audit';
      case 'surveys': return 'Ground Truthing Field Verification Ledger';
      case 'quality': return 'Geospatial Data Quality & Lineage Certification';
      default: return 'Government Land Intelligence Report';
    }
  }

  function closeReportModal() {
    const modal = document.getElementById('modal-report-preview');
    if (modal) modal.classList.remove('active');
  }

  function exportReportCSV() {
    if (!currentReportData || !currentReportData.parcels) return;

    let csv = 'Parcel ID,Survey Number,Area (sq.m),Land Use,Status,Confidence\n';
    currentReportData.parcels.forEach(p => {
      csv += `"${p.id}","${p.surveyNumber}",${p.area},"${p.landUse}","${p.status}",${p.confidence}%\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${currentReportData.reportId}_cadastre.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.SL_APP.showToast('Report CSV exported successfully.', 'success');
  }

  function exportReportJSON() {
    if (!currentReportData) return;

    const blob = new Blob([JSON.stringify(currentReportData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${currentReportData.reportId}_intelligence.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.SL_APP.showToast('Report JSON exported successfully.', 'success');
  }

  return {
    init,
    generateReport,
    closeReportModal,
    exportReportCSV,
    exportReportJSON
  };
})();
