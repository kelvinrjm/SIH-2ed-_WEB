/**
 * SL: Geospatial Land Intelligence Platform
 * SIH26013 - Automated Integration and Intelligent Harmonization of Multi-source Geospatial Data
 * Module: Authentication & 2FA Verification
 */

window.SL_AUTH = (function() {
  'use strict';

  let pendingOtpData = null;

  function init() {
    bindEvents();
    checkSession();
  }

  function checkSession() {
    const user = window.SL_STORAGE.getCurrentUser();
    if (user) {
      updateUserUI(user);
    }
  }

  function bindEvents() {
    // User Login Form
    const userLoginForm = document.getElementById('form-user-login');
    if (userLoginForm) {
      userLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const identifier = document.getElementById('user-login-identifier').value.trim();
        const password = document.getElementById('user-login-password').value;

        const res = await window.SL_API.loginUser(identifier, password);
        if (res.success) {
          updateUserUI(res.user);
          window.SL_APP.showToast('Citizen Login successful. Welcome back!', 'success');
          window.SL_NAV.navigateTo('user-dashboard');
        } else {
          window.SL_APP.showToast(res.message, 'error');
        }
      });
    }

    // User Register Form
    const userRegisterForm = document.getElementById('form-user-register');
    if (userRegisterForm) {
      userRegisterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pwd = document.getElementById('reg-password').value;
        const confirmPwd = document.getElementById('reg-confirm-password').value;

        if (pwd !== confirmPwd) {
          window.SL_APP.showToast('Passwords do not match. Please verify.', 'error');
          return;
        }

        const formData = {
          name: document.getElementById('reg-name').value.trim(),
          mobile: document.getElementById('reg-mobile').value.trim(),
          email: document.getElementById('reg-email').value.trim(),
          district: document.getElementById('reg-district').value,
          taluk: document.getElementById('reg-taluk').value,
          village: document.getElementById('reg-village').value
        };

        // Open OTP Verification Modal
        pendingOtpData = { type: 'user_register', data: formData };
        openOtpModal('Citizen Mobile Verification', `Enter the 6-digit OTP sent to ${formData.mobile} (Demo: 123456)`);
      });
    }

    // Officer Login Form
    const officerLoginForm = document.getElementById('form-officer-login');
    if (officerLoginForm) {
      officerLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const officialId = document.getElementById('officer-id').value.trim();
        const password = document.getElementById('officer-password').value;
        const department = document.getElementById('officer-department').value;

        if ((officialId === 'officer@sl.gov.in' || officialId.includes('officer')) && password === 'SL@1234') {
          // Open 2FA OTP modal for authorized officer
          pendingOtpData = {
            type: 'officer_login',
            data: { officialId, password, department }
          };
          openOtpModal('Officer 2FA Verification', 'Government Biometric / Mobile Token Required. Demo OTP: 123456');
        } else {
          window.SL_APP.showToast('Invalid Officer credentials. Demo: officer@sl.gov.in / SL@1234', 'error');
        }
      });
    }

    // OTP Modal Submission
    const otpVerifyBtn = document.getElementById('btn-verify-otp');
    if (otpVerifyBtn) {
      otpVerifyBtn.addEventListener('click', handleOtpVerification);
    }

    // Prefill buttons for quick demonstration
    const prefillUserBtn = document.getElementById('btn-prefill-user');
    if (prefillUserBtn) {
      prefillUserBtn.addEventListener('click', () => {
        document.getElementById('user-login-identifier').value = 'user@sl.demo';
        document.getElementById('user-login-password').value = 'user123';
        window.SL_APP.showToast('Demo User credentials filled.', 'info');
      });
    }

    const prefillOfficerBtn = document.getElementById('btn-prefill-officer');
    if (prefillOfficerBtn) {
      prefillOfficerBtn.addEventListener('click', () => {
        document.getElementById('officer-id').value = 'officer@sl.gov.in';
        document.getElementById('officer-password').value = 'SL@1234';
        window.SL_APP.showToast('Demo Officer credentials filled.', 'info');
      });
    }

    // Global Logout handlers
    document.querySelectorAll('.btn-logout').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        await window.SL_API.logout();
        window.SL_APP.showToast('You have been signed out.', 'info');
        window.SL_NAV.navigateTo('welcome');
      });
    });
  }

  function openOtpModal(title, subtitle) {
    const modal = document.getElementById('modal-otp');
    const modalTitle = document.getElementById('otp-modal-title');
    const modalSub = document.getElementById('otp-modal-subtitle');
    const otpInput = document.getElementById('otp-input-code');

    if (modalTitle) modalTitle.textContent = title;
    if (modalSub) modalSub.textContent = subtitle;
    if (otpInput) {
      otpInput.value = '123456'; // Pre-filled for demo convenience
      setTimeout(() => otpInput.focus(), 100);
    }

    if (modal) modal.classList.add('active');
  }

  function closeOtpModal() {
    const modal = document.getElementById('modal-otp');
    if (modal) modal.classList.remove('active');
  }

  async function handleOtpVerification() {
    const otpCode = document.getElementById('otp-input-code').value.trim();
    if (otpCode !== '123456') {
      window.SL_APP.showToast('Invalid OTP. Please enter demo OTP: 123456', 'error');
      return;
    }

    closeOtpModal();

    if (!pendingOtpData) return;

    if (pendingOtpData.type === 'user_register') {
      const res = await window.SL_API.registerUser(pendingOtpData.data);
      if (res.success) {
        updateUserUI(res.user);
        window.SL_APP.showToast('Account created & verified! Welcome to SLI.', 'success');
        window.SL_NAV.navigateTo('user-dashboard');
      }
    } else if (pendingOtpData.type === 'officer_login') {
      const d = pendingOtpData.data;
      const res = await window.SL_API.loginOfficer(d.officialId, d.password, d.department);
      if (res.success) {
        updateUserUI(res.officer);
        window.SL_APP.showToast('Officer 2FA Verified. Welcome to Command Center.', 'success');
        window.SL_NAV.navigateTo('officer-command');
        window.SL_NAV.switchOfficerSection('dashboard');
      }
    }

    pendingOtpData = null;
  }

  function updateUserUI(user) {
    document.querySelectorAll('.user-display-name').forEach(el => {
      el.textContent = user.name || user.email || 'Authorized User';
    });
    document.querySelectorAll('.user-display-role').forEach(el => {
      el.textContent = user.role === 'officer' ? (user.designation || 'GIS Officer') : 'Citizen User';
    });
    document.querySelectorAll('.user-display-dept').forEach(el => {
      el.textContent = user.department || 'Madurai Urban Division';
    });
  }

  return {
    init,
    openOtpModal,
    closeOtpModal,
    updateUserUI
  };
})();
