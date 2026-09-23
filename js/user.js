/**
 * SL: Geospatial Land Intelligence Platform
 * SIH26013 - Urban Land Record Management System
 * Module: Citizen User Portal (Simple, Document-Oriented, Informational)
 */

window.SL_USER = (function() {
  'use strict';

  function init() {
    renderUserDashboard();
    renderUserProperties();
    renderUserRequests();
    renderUserProfile();
    bindEvents();
  }

  function bindEvents() {
    // New Request Form
    const reqForm = document.getElementById('form-user-new-request');
    if (reqForm) {
      reqForm.addEventListener('submit', handleNewRequestSubmit);
    }

    // New Request Modal Open Button
    const newReqBtn = document.getElementById('btn-open-new-request');
    if (newReqBtn) {
      newReqBtn.addEventListener('click', openNewRequestModal);
    }

    // Citizen Bottom Navigation
    document.querySelectorAll('.mobile-bottom-nav.user-nav .mobile-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        window.SL_NAV.switchUserTab(tab);
      });
    });

    // Citizen Quick Action Buttons
    document.querySelectorAll('.citizen-quick-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-action-tab');
        if (targetTab) window.SL_NAV.switchUserTab(targetTab);
      });
    });
  }

  function renderUserDashboard() {
    const user = window.SL_STORAGE.getCurrentUser();
    const nameEl = document.getElementById('user-dashboard-greeting-name');
    if (nameEl && user) {
      nameEl.textContent = user.name || 'Citizen User';
    }

    const requests = window.SL_STORAGE.getRequests();
    const pendingCount = requests.filter(r => r.status !== 'Approved' && r.status !== 'Rejected').length;

    const statProps = document.getElementById('user-stat-properties');
    const statPending = document.getElementById('user-stat-pending');
    const statVerified = document.getElementById('user-stat-verified');

    if (statProps) statProps.textContent = '1';
    if (statPending) statPending.textContent = pendingCount;
    if (statVerified) statVerified.textContent = '1';
  }

  function renderUserProperties() {
    const container = document.getElementById('user-properties-container');
    if (!container) return;

    const user = window.SL_STORAGE.getCurrentUser();
    const parcelId = (user && user.primaryParcelId) ? user.primaryParcelId : 'TN-MDU-000124';
    const parcel = window.SL_STORAGE.getParcelById(parcelId);

    if (!parcel) {
      container.innerHTML = '<div style="color:var(--sl-text-muted); padding:1rem;">No registered land record found for this citizen account.</div>';
      return;
    }

    const p = parcel.properties;

    // Styled like an authentic Official Digital Land Record (Patta / ROR)
    container.innerHTML = `
      <div class="gov-patta-doc">
        <div class="gov-patta-header">
          <div>
            <div class="gov-patta-sub">GOVERNMENT OF TAMIL NADU • REVENUE DEPARTMENT</div>
            <div class="gov-patta-title">CERTIFIED DIGITAL LAND RECORD (PATTA / ROR)</div>
            <div style="font-size:0.8rem; color:var(--sl-text-muted); margin-top:0.2rem;">
              Division: Madurai South • Taluk: Madurai South • Ward: 12 (Anuppanadi)
            </div>
          </div>
          <div class="gov-stamp-badge">
            OFFICIAL VERIFIED
          </div>
        </div>

        <div class="record-grid">
          <div class="record-field">
            <span class="label">Parcel Identifier</span>
            <span class="value value-mono">${p.id}</span>
          </div>
          <div class="record-field">
            <span class="label">Official Survey Number</span>
            <span class="value value-mono">${p.surveyNumber} (Old: ${p.oldSurveyNumber || '124/3A'})</span>
          </div>
          <div class="record-field">
            <span class="label">Verified Land Extent</span>
            <span class="value">${p.area.toLocaleString()} sq. meters</span>
          </div>
          <div class="record-field">
            <span class="label">Authorized Land Use</span>
            <span class="value">${p.landUse}</span>
          </div>
          <div class="record-field">
            <span class="label">Registered Title Holder</span>
            <span class="value">${p.owner}</span>
          </div>
          <div class="record-field">
            <span class="label">Municipal Assessment Number</span>
            <span class="value value-mono">${p.taxAssessmentNo || 'TX-2026-8841'}</span>
          </div>
          <div class="record-field">
            <span class="label">Road Access &amp; Frontage</span>
            <span class="value">${p.roadAccess || '12m Public Road'}</span>
          </div>
          <div class="record-field">
            <span class="label">Record Confidence</span>
            <span class="value" style="color:var(--sl-success);">${p.confidence}% (Certified)</span>
          </div>
        </div>

        <div style="background:var(--sl-surface-subtle); border:1px solid var(--sl-border); padding:0.85rem 1rem; border-radius:var(--sl-radius-xs); margin-bottom:1.5rem; font-size:0.8rem; color:var(--sl-text-secondary); line-height:1.5;">
          <strong>Official Certification Notice:</strong> This digital extract is compiled from integrated multi-source administrative records (Revenue Cadastre, Drone Orthomosaic ORI, Municipal Property Tax, and GNSS CORS Benchmarks). Digitally authenticated under Urban Land Record Modernization (SIH26013).
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--sl-border); padding-top:1rem;">
          <button class="sl-btn sl-btn-outline" onclick="window.SL_NAV.switchUserTab('map')">
            Inspect on Map
          </button>
          <div style="display:flex; gap:0.5rem;">
            <button class="sl-btn sl-btn-outline" onclick="window.SL_REPORTS.generateReport('parcel-validation')">
              Download Certified Copy
            </button>
            <button class="sl-btn sl-btn-primary" onclick="window.SL_USER.openNewRequestModal()">
              Request Record Correction
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderUserRequests() {
    const container = document.getElementById('user-requests-container');
    if (!container) return;

    const list = window.SL_STORAGE.getRequests();

    if (list.length === 0) {
      container.innerHTML = '<div class="sl-card" style="padding:2rem; text-align:center; color:var(--sl-text-muted);">No requests filed. Click "Submit Request" to apply for boundary or record updates.</div>';
      return;
    }

    container.innerHTML = list.map(r => `
      <div class="sl-card" style="margin-bottom:1rem;">
        <div class="sl-card-header">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <strong style="font-family:var(--sl-font-mono); color:var(--sl-primary-dark); font-size:0.95rem;">${r.id}</strong>
              <span class="sl-badge sl-badge-${r.status === 'Approved' ? 'verified' : (r.status === 'Rejected' ? 'danger' : 'warning')}">${r.status}</span>
            </div>
            <div style="font-size:0.775rem; color:var(--sl-text-muted); margin-top:0.15rem;">
              ${r.type} • Target: <code>${r.parcelId}</code> (${r.surveyNumber}) • Filed: ${r.date}
            </div>
          </div>
        </div>
        <div class="sl-card-body">
          <p style="font-size:0.85rem; margin-bottom:1rem; color:var(--sl-text-main);">
            ${r.description}
          </p>

          <!-- Citizen Structured Timeline -->
          <div class="doc-timeline">
            ${['Submitted', 'Under Review', 'Field Verification', 'Approved'].map((step, idx) => {
              const hItem = r.history ? r.history.find(h => h.step === step) : null;
              const isCompleted = hItem && hItem.done;
              const isActive = r.status === step;

              return `
                <div class="doc-timeline-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}">
                  <div class="doc-timeline-circle">
                    ${isCompleted ? '✓' : (idx + 1)}
                  </div>
                  <div class="doc-timeline-label">${step}</div>
                  <div class="doc-timeline-date">${hItem && hItem.date !== 'Pending' ? hItem.date.substring(0, 10) : 'Pending'}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  function openNewRequestModal() {
    const modal = document.getElementById('modal-user-new-request');
    if (modal) modal.classList.add('active');
  }

  function closeNewRequestModal() {
    const modal = document.getElementById('modal-user-new-request');
    if (modal) modal.classList.remove('active');
  }

  async function handleNewRequestSubmit(e) {
    e.preventDefault();

    const type = document.getElementById('new-req-type').value;
    const parcelId = document.getElementById('new-req-parcel').value;
    const desc = document.getElementById('new-req-desc').value.trim();

    const user = window.SL_STORAGE.getCurrentUser();

    const res = await window.SL_API.submitRequest({
      type,
      parcelId,
      surveyNumber: 'S-124/3',
      description: desc,
      applicant: user ? user.name : 'Citizen User',
      mobile: user ? user.mobile : '+91 98402 12345',
      email: user ? user.email : 'user@sl.demo'
    });

    closeNewRequestModal();
    e.target.reset();

    window.SL_APP.showToast(`Request ${res.request.id} registered. Officer review assigned.`, 'success');
    renderUserRequests();
    renderUserDashboard();
  }

  function renderUserProfile() {
    const user = window.SL_STORAGE.getCurrentUser();
    if (!user) return;

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setVal('profile-name', user.name || 'Citizen User');
    setVal('profile-email', user.email || 'user@sl.demo');
    setVal('profile-mobile', user.mobile || '+91 98402 12345');
    setVal('profile-district', user.district || 'Madurai');
    setVal('profile-taluk', user.taluk || 'Madurai South');
    setVal('profile-village', user.village || 'Ward 12 (Anuppanadi)');
  }

  return {
    init,
    renderUserDashboard,
    renderUserProperties,
    renderUserRequests,
    renderUserProfile,
    openNewRequestModal,
    closeNewRequestModal
  };
})();
