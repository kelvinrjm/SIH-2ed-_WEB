/**
 * SL: Geospatial Land Intelligence Platform
 * SIH26013 - Automated Integration and Intelligent Harmonization of Multi-source Geospatial Data
 * Module: Navigation & Router
 */

window.SL_NAV = (function() {
  'use strict';

  let currentScreen = 'splash';
  let currentUserTab = 'home';
  let currentOfficerSection = 'dashboard';
  let screenHistory = [];
  let userTabHistory = [];

  function init() {
    // Check if user is already logged in
    const user = window.SL_STORAGE.getCurrentUser();
    
    // Check URL hash or default to splash
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(`screen-${hash}`)) {
      navigateTo(hash);
    } else {
      navigateTo('splash');
      // Auto-transition from splash to welcome after 1.8s
      setTimeout(() => {
        if (currentScreen === 'splash') {
          navigateTo('welcome');
        }
      }, 1800);
    }

    // Bind hash change listener
    window.addEventListener('hashchange', () => {
      const h = window.location.hash.replace('#', '');
      if (h && document.getElementById(`screen-${h}`)) {
        navigateTo(h, false);
      }
    });
  }

  function navigateTo(screenId, updateHash = true) {
    const targetScreen = document.getElementById(`screen-${screenId}`);
    if (!targetScreen) {
      console.warn('Screen not found:', screenId);
      return;
    }

    if (screenId !== currentScreen) {
      screenHistory.push(currentScreen);
      if (screenHistory.length > 20) {
        screenHistory.shift();
      }
    }

    // Role Route Protection
    const user = window.SL_STORAGE.getCurrentUser();
    if (screenId.startsWith('officer-') && screenId !== 'officer-login') {
      if (!user || user.role !== 'officer') {
        window.SL_APP.showToast('Unauthorized Access. Please sign in with Officer credentials.', 'error');
        navigateTo('officer-login');
        return;
      }
    }
    if (screenId.startsWith('user-') && screenId !== 'user-login' && screenId !== 'user-register') {
      if (!user) {
        window.SL_APP.showToast('Please sign in to access the Citizen Portal.', 'warning');
        navigateTo('user-login');
        return;
      }
    }

    // Deactivate all screens
    document.querySelectorAll('.sl-screen').forEach(el => {
      el.classList.remove('active');
    });

    // Activate target
    targetScreen.classList.add('active');
    currentScreen = screenId;

    if (updateHash) {
      window.location.hash = screenId;
    }

    // Screen specific triggers
    if (screenId === 'officer-command' || screenId === 'officer-workspace') {
      setTimeout(() => {
        if (window.SL_OFFICER && window.SL_OFFICER.initCharts) window.SL_OFFICER.initCharts();
        if (window.SL_MAP) window.SL_MAP.invalidateOfficerMap();
      }, 150);
    } else if (screenId === 'user-dashboard') {
      setTimeout(() => {
        if (window.SL_MAP) window.SL_MAP.invalidateUserMap();
      }, 150);
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }

  function goBack() {
    const previousScreen = screenHistory.pop();
    if (!previousScreen) {
      navigateTo('welcome');
      return;
    }

    const previousTarget = document.getElementById(`screen-${previousScreen}`);
    if (previousTarget) {
      navigateTo(previousScreen, true);
      return;
    }

    navigateTo('welcome');
  }

  function switchUserTab(tabName) {
    if (tabName !== currentUserTab) {
      userTabHistory.push(currentUserTab);
      if (userTabHistory.length > 10) userTabHistory.shift();
    }
    currentUserTab = tabName;
    document.querySelectorAll('.user-tab-content').forEach(el => {
      el.style.display = 'none';
    });
    const target = document.getElementById(`user-view-${tabName}`);
    if (target) target.style.display = 'block';

    // Update bottom nav active classes
    document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (tabName === 'map' && window.SL_MAP) {
      setTimeout(() => window.SL_MAP.invalidateUserMap(), 150);
    }
  }

  function goBackFromUserTab() {
    const previousTab = userTabHistory.pop();
    if (!previousTab) {
      goBack();
      return;
    }
    switchUserTab(previousTab);
  }

  function switchOfficerSection(sectionName) {
    currentOfficerSection = sectionName;
    document.querySelectorAll('.officer-section-view').forEach(el => {
      el.style.display = 'none';
    });
    const target = document.getElementById(`officer-sec-${sectionName}`);
    if (target) target.style.display = 'block';

    // Update desktop sidebar active classes
    document.querySelectorAll('.desktop-sidebar .sidebar-item').forEach(btn => {
      if (btn.getAttribute('data-sec') === sectionName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update mobile officer nav if applicable
    document.querySelectorAll('.mobile-bottom-nav.officer-nav .mobile-nav-item').forEach(btn => {
      if (btn.getAttribute('data-sec') === sectionName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Trigger section-specific initializations
    if (sectionName === 'dashboard' && window.SL_OFFICER && window.SL_OFFICER.initCharts) {
      setTimeout(() => window.SL_OFFICER.initCharts(), 100);
    }
    if (sectionName === 'gis' && window.SL_MAP) {
      setTimeout(() => window.SL_MAP.invalidateOfficerMap(), 150);
    }
    if (sectionName === 'changes' && window.SL_CHANGES) {
      setTimeout(() => window.SL_CHANGES.initComparisonSlider(), 150);
    }
  }

  return {
    init,
    navigateTo,
    goBack,
    goBackFromUserTab,
    switchUserTab,
    switchOfficerSection,
    getCurrentScreen: () => currentScreen,
    getCurrentUserTab: () => currentUserTab,
    getCurrentOfficerSection: () => currentOfficerSection
  };
})();
