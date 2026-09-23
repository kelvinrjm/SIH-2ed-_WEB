/**
 * SL: Geospatial Land Intelligence Platform
 * SIH26013 - Automated Integration and Intelligent Harmonization of Multi-source Geospatial Data
 * Module: Main Application Coordinator, Language Switcher & Toast System
 */

window.SL_APP = (function() {
  'use strict';

  // Multi-Language Strings Catalog
  const I18N = {
    en: {
      brandTagline: 'Geospatial Integration for Urban Land Governance',
      dashboard: 'Dashboard',
      gisWorkspace: 'GIS Workspace',
      datasets: 'Datasets',
      harmonization: 'Harmonization',
      parcels: 'Land Parcels',
      conflicts: 'Conflicts',
      changes: 'Change Detection',
      surveys: 'Ground Truthing',
      reports: 'Reports',
      settings: 'Settings',
      myProperties: 'My Properties',
      submitRequest: 'Submit Request',
      trackRequest: 'Track Request',
      citizenPortal: 'Citizen Portal',
      officerPortal: 'Officer Portal',
      signOut: 'Sign Out',
      back: 'Back',
      home: 'Home',
      map: 'Map',
      myLand: 'My Land',
      requests: 'Requests',
      profile: 'Profile',
      searchParcel: 'Search Parcel ID, Survey Number, Owner or Ward...',
      gisAssistant: 'GIS Assistant',
      dashboardTitle: 'GIS Command Center',
      officerDashboardSub: 'Automated Integration & Intelligent Harmonization of Multi-source Geospatial Data (SIH26013)',
      openGisWorkspace: 'Open GIS Workspace',
      languageLabel: 'Interface Language',
      languageHint: 'Select the interface language',
      allRights: 'All administrative actions logged with geodetic timestamp & IP audit trace.',
      switchPortal: 'Switch Portal',
      createAccount: 'Create Account',
      signIn: 'Sign In',
      citizenSignIn: 'Citizen Sign In',
      officerLoginTitle: 'Officer Portal',
      demoUserCredentials: 'Fill Demo Citizen Credentials (user@sl.demo)',
      demoOfficerCredentials: 'Fill Demo Officer Credentials (officer@sl.gov.in / SL@1234)',
      openUserPortal: 'ENTER USER PORTAL',
      openOfficerPortal: 'ENTER OFFICER PORTAL',
      continueAsCitizen: 'CONTINUE AS CITIZEN USER',
      continueAsOfficer: 'CONTINUE AS GOVERNMENT OFFICER'
    },
    ta: {
      brandTagline: 'நகர்ப்புற நில நிர்வாகத்திற்கான புவிசார் ஒருங்கிணைப்பு தளம்',
      dashboard: 'முதன்மை பலகை',
      gisWorkspace: 'ஜிஐஎஸ் பணியிடம்',
      datasets: 'தரவுத்தொகுப்புகள்',
      harmonization: 'தரவு இணக்கம்',
      parcels: 'நிலப் புலங்கள்',
      conflicts: 'முரண்பாடுகள்',
      changes: 'மாற்றங்கள் கண்டறிதல்',
      surveys: 'களச் சரிபார்ப்பு',
      reports: 'அறிக்கைகள்',
      settings: 'அமைப்புகள்',
      myProperties: 'எனது நிலங்கள்',
      submitRequest: 'கோரிக்கை சமர்ப்பிக்க',
      trackRequest: 'கோரிக்கையை கண்காணிக்க',
      citizenPortal: 'குடிமக்கள் போர்டல்',
      officerPortal: 'அதிகாரி போர்டல்',
      signOut: 'வெளியேறு',
      back: 'பின்னே',
      home: 'முகப்பு',
      map: 'நிலப்படம்',
      myLand: 'எனது நிலம்',
      requests: 'கோரிக்கைகள்',
      profile: 'சுயவிவரம்',
      searchParcel: 'பர்சல் ஐடி, ஆய்வு எண், உரிமையாளர் அல்லது வார்டை தேடுங்கள்...',
      gisAssistant: 'ஜிஐஎஸ் உதவியாளர்',
      dashboardTitle: 'ஜிஐஎஸ் கட்டளை மையம்',
      officerDashboardSub: 'பல ஆதார புவிசார் தரவுகளின் தானியங்கி ஒருங்கிணைப்பு மற்றும் புத்திசாலித்தனமான இணக்கம் (SIH26013)',
      openGisWorkspace: 'ஜிஐஎஸ் பணியிடத்தை திற',
      languageLabel: 'இடைமுக மொழி',
      languageHint: 'இடைமுக மொழியைத் தேர்ந்தெடுக்கவும்',
      allRights: 'அனைத்து நிர்வாக நடவடிக்கைகளும் புவியியல் நேரம் மற்றும் ஐபி ஆய்வு தடத்துடன் பதிவு செய்யப்படுகின்றன.',
      switchPortal: 'போர்டலை மாற்று',
      createAccount: 'கணக்கை உருவாக்கு',
      signIn: 'உள்நுழை',
      citizenSignIn: 'குடிமக்கள் உள்நுழைவு',
      officerLoginTitle: 'அதிகாரி போர்டல்',
      demoUserCredentials: 'டெமோ குடிமக்கள் சான்றுகளை நிரப்புக (user@sl.demo)',
      demoOfficerCredentials: 'டெமோ அதிகாரி சான்றுகளை நிரப்புக (officer@sl.gov.in / SL@1234)',
      openUserPortal: 'குடிமக்கள் போர்டலை திற',
      openOfficerPortal: 'அதிகாரி போர்டலை திற',
      continueAsCitizen: 'குடிமகனாக தொடரவும்',
      continueAsOfficer: 'அதிகாரியாக தொடரவும்'
    },
    hi: {
      brandTagline: 'शहरी भूमि शासन के लिए भू-स्थानिक एकीकरण मंच',
      dashboard: 'डैशबोर्ड',
      gisWorkspace: 'जीआईएस कार्यक्षेत्र',
      datasets: 'डेटासेट',
      harmonization: 'सामंजस्य प्रणाली',
      parcels: 'भूमि पार्सल',
      conflicts: 'विवाद',
      changes: 'परिवर्तन का पता लगाना',
      surveys: 'धरातलीय सत्यापन',
      reports: 'रिपोर्ट',
      settings: 'सेटिंग्स',
      myProperties: 'मेरी संपत्ति',
      submitRequest: 'अनुरोध भेजें',
      trackRequest: 'अनुरोध ट्रैक करें',
      citizenPortal: 'नागरिक पोर्टल',
      officerPortal: 'अधिकारी पोर्टल',
      signOut: 'साइन आउट',
      back: 'पीछे',
      home: 'होम',
      map: 'मानचित्र',
      myLand: 'मेरी भूमि',
      requests: 'अनुरोध',
      profile: 'प्रोफ़ाइल',
      searchParcel: 'पार्सल आईडी, सर्वे नंबर, मालिक या वार्ड खोजें...',
      gisAssistant: 'जीआईएस सहायक',
      dashboardTitle: 'जीआईएस कमांड सेंटर',
      officerDashboardSub: 'कई स्रोतों से भू-स्थानिक डेटा का स्वचालित एकीकरण और स्मार्ट हर्मोनाइज़ेशन (SIH26013)',
      openGisWorkspace: 'जीआईएस कार्यक्षेत्र खोलें',
      languageLabel: 'इंटरफ़ेस भाषा',
      languageHint: 'इंटरफ़ेस भाषा चुनें',
      allRights: 'सभी प्रशासनिक क्रियाएँ भू-स्थानिक समय और आईपी ऑडिट ट्रेस के साथ लॉग की जाती हैं।',
      switchPortal: 'पोर्टल बदलें',
      createAccount: 'अकाउंट बनाएं',
      signIn: 'साइन इन',
      citizenSignIn: 'नागरिक साइन इन',
      officerLoginTitle: 'अधिकारी पोर्टल',
      demoUserCredentials: 'डेमो नागरिक क्रेडेंशियल भरें (user@sl.demo)',
      demoOfficerCredentials: 'डेमो अधिकारी क्रेडेंशियल भरें (officer@sl.gov.in / SL@1234)',
      openUserPortal: 'नागरिक पोर्टल खोलें',
      openOfficerPortal: 'अधिकारी पोर्टल खोलें',
      continueAsCitizen: 'नागरिक के रूप में जारी रखें',
      continueAsOfficer: 'अधिकारी के रूप में जारी रखें'
    }
  };

  function init() {
    console.log('Initializing SL: Geospatial Land Intelligence Platform (SIH26013)...');

    // Initialize all sub-modules
    if (window.SL_NAV) window.SL_NAV.init();
    if (window.SL_AUTH) window.SL_AUTH.init();
    if (window.SL_MAP) window.SL_MAP.init();
    if (window.SL_PARCELS) window.SL_PARCELS.init();
    if (window.SL_DATASETS) window.SL_DATASETS.init();
    if (window.SL_AI) window.SL_AI.init();
    if (window.SL_CONFLICTS) window.SL_CONFLICTS.init();
    if (window.SL_CHANGES) window.SL_CHANGES.init();
    if (window.SL_SURVEYS) window.SL_SURVEYS.init();
    if (window.SL_REPORTS) window.SL_REPORTS.init();
    if (window.SL_NOTIFICATIONS) window.SL_NOTIFICATIONS.init();
    if (window.SL_USER) window.SL_USER.init();
    if (window.SL_OFFICER) window.SL_OFFICER.init();

    bindGlobalModals();
    bindLanguageSwitcher();
    bindSettings();
    applyLanguage(window.SL_STORAGE.getLanguage());

    updateGovClock();
    setInterval(updateGovClock, 1000);

    console.log('SLI Platform initialized successfully. Ready for SIH Demonstration.');
  }

  function updateGovClock() {
    const el = document.getElementById('gov-live-clock');
    if (el) {
      const now = new Date();
      el.textContent = now.toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
      }) + ' ' + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('sl-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `sl-toast toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') iconSvg = '&check;';
    else if (type === 'error') iconSvg = '&times;';
    else if (type === 'warning') iconSvg = '!';
    else iconSvg = 'i';

    toast.innerHTML = `
      <div style="width:22px; height:22px; border-radius:50%; background:currentColor; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:800; font-size:0.75rem; flex-shrink:0;">
        ${iconSvg}
      </div>
      <div class="sl-toast-content">
        <div class="sl-toast-title">${type.toUpperCase()}</div>
        <div class="sl-toast-msg">${message}</div>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  function bindGlobalModals() {
    // Close modal on click of backdrop or close button
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('sl-modal-backdrop')) {
        e.target.classList.remove('active');
      }
      if (e.target.closest('.sl-modal-close')) {
        const modal = e.target.closest('.sl-modal-backdrop');
        if (modal) modal.classList.remove('active');
      }
    });

    // Escape key closes modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.sl-modal-backdrop.active').forEach(m => m.classList.remove('active'));
      }
    });
  }

  function bindLanguageSwitcher() {
    const topLangSelect = document.getElementById('top-language-select');
    const settingLangSelect = document.getElementById('setting-language-select');

    const sync = (select) => {
      if (!select) return;
      select.value = window.SL_STORAGE.getLanguage();
      select.addEventListener('change', (e) => {
        const lang = e.target.value;
        window.SL_STORAGE.setLanguage(lang);
        applyLanguage(lang);
        showToast(`Language switched to ${lang.toUpperCase()}`, 'info');
      });
    };

    sync(topLangSelect);
    sync(settingLangSelect);
  }

  function applyLanguage(lang) {
    const strings = I18N[lang] || I18N.en;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (strings[key]) {
        el.textContent = strings[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (strings[key]) {
        el.setAttribute('placeholder', strings[key]);
      }
    });

    const exactTextMap = {
      'Citizen Sign In': strings.citizenSignIn || 'Citizen Sign In',
      'Citizen Portal': strings.citizenPortal || 'Citizen Portal',
      'Officer Portal': strings.officerLoginTitle || 'Officer Portal',
      'Officer Portal →': strings.officerPortal ? `${strings.officerPortal} →` : 'Officer Portal →',
      'Officer Portal &rarr;': strings.officerPortal ? `${strings.officerPortal} &rarr;` : 'Officer Portal &rarr;',
      'OFFICER PORTAL': strings.officerPortal ? strings.officerPortal.toUpperCase() : 'OFFICER PORTAL',
      'USER PORTAL': strings.citizenPortal ? strings.citizenPortal.toUpperCase() : 'USER PORTAL',
      'ENTER USER PORTAL &rarr;': strings.openUserPortal ? `${strings.openUserPortal} &rarr;` : 'ENTER USER PORTAL &rarr;',
      'ENTER OFFICER PORTAL &rarr;': strings.openOfficerPortal ? `${strings.openOfficerPortal} &rarr;` : 'ENTER OFFICER PORTAL &rarr;',
      'CONTINUE AS CITIZEN USER &rarr;': strings.continueAsCitizen ? `${strings.continueAsCitizen} &rarr;` : 'CONTINUE AS CITIZEN USER &rarr;',
      'CONTINUE AS GOVERNMENT OFFICER &rarr;': strings.continueAsOfficer ? `${strings.continueAsOfficer} &rarr;` : 'CONTINUE AS GOVERNMENT OFFICER &rarr;',
      'Sign Out': strings.signOut || 'Sign Out',
      'Back': strings.back || 'Back',
      'Home': strings.home || 'Home',
      'Map': strings.map || 'Map',
      'My Land': strings.myLand || 'My Land',
      'Requests': strings.requests || 'Requests',
      'Profile': strings.profile || 'Profile',
      'GIS Assistant': strings.gisAssistant || 'GIS Assistant',
      'Dashboard': strings.dashboard || 'Dashboard',
      'GIS Workspace': strings.gisWorkspace || 'GIS Workspace',
      'Datasets': strings.datasets || 'Datasets',
      'Harmonization': strings.harmonization || 'Harmonization',
      'Land Parcels': strings.parcels || 'Land Parcels',
      'Conflicts': strings.conflicts || 'Conflicts',
      'Change Detection': strings.changes || 'Change Detection',
      'Ground Truthing': strings.surveys || 'Ground Truthing',
      'Reports': strings.reports || 'Reports',
      'Settings': strings.settings || 'Settings',
      'Create Account': strings.createAccount || 'Create Account',
      'Sign In': strings.signIn || 'Sign In',
      'Switch Portal': strings.switchPortal || 'Switch Portal',
      'Citizen Sign In': strings.citizenSignIn || 'Citizen Sign In',
      'Back to Home': strings.home ? `${strings.back} ${strings.home}` : 'Back to Home',
      'Switch Portal': strings.switchPortal || 'Switch Portal',
      'My Properties': strings.myProperties || 'My Properties',
      'Submit Request': strings.submitRequest || 'Submit Request',
      'Track Request': strings.trackRequest || 'Track Request',
      'This digital extract is compiled from integrated multi-source administrative records (Revenue Cadastre, Drone Orthomosaic ORI, Municipal Property Tax, and GNSS CORS Benchmarks). Digitally authenticated under Urban Land Record Modernization (SIH26013).': 'இது ஒருங்கிணைக்கப்பட்ட பல ஆதார நிர்வாக பதிவுகளிலிருந்து தொகுக்கப்பட்ட டிஜிட்டல் விவரம் (வருவாய் கேடஸ்டர், ட்ரோன் ஆர்த்தோமோசிக் ORI, நகராட்சி சொத்து வரி மற்றும் GNSS CORS பெஞ்ச்மார்க்குகள்). நகர்ப்புற நில பதிவு நவீனமயமாக்கல் (SIH26013) கீழ் டிஜிட்டல் முறையில் அங்கீகரிக்கப்பட்டது.'
    };

    document.querySelectorAll('*').forEach((el) => {
      if (el.nodeType === Node.TEXT_NODE && el.textContent && el.parentElement && el.parentElement.tagName !== 'SCRIPT') {
        const trimmed = el.textContent.trim();
        if (trimmed && exactTextMap[trimmed]) {
          el.textContent = exactTextMap[trimmed];
        }
      }
      if (el.childNodes.length === 1 && el.textContent && exactTextMap[el.textContent.trim()]) {
        el.textContent = exactTextMap[el.textContent.trim()];
      }
    });

    const topLangSelect = document.getElementById('top-language-select');
    const settingLangSelect = document.getElementById('setting-language-select');
    if (topLangSelect) topLangSelect.value = lang;
    if (settingLangSelect) settingLangSelect.value = lang;

    if (lang !== 'en') {
      void translateVisibleText(lang);
    }
  }

  async function translateVisibleText(lang) {
    const nodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      const text = node.textContent.trim();
      if (!parent || !text || text.length < 2 || /^(https?:\/\/|[\d\W]+$)/.test(text)) continue;
      if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'OPTION'].includes(parent.tagName)) continue;
      if (!/[A-Za-z]/.test(text) || /[\u0B80-\u0BFF\u0900-\u097F]/.test(text)) continue;
      nodes.push({ node, text });
    }

    const uniqueTexts = [...new Set(nodes.map(item => item.text))];
    const translated = new Map();
    const pending = [];

    uniqueTexts.forEach(text => {
      const cacheKey = `sl_translation_${lang}_${text}`;
      const cached = window.localStorage.getItem(cacheKey);
      if (cached) translated.set(text, cached);
      else pending.push(text);
    });

    for (let index = 0; index < pending.length; index += 30) {
      const batch = pending.slice(index, index + 30);
      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ texts: batch, target: lang })
        });
        if (!response.ok) throw new Error('Translation proxy unavailable');
        const result = await response.json();
        batch.forEach((text, batchIndex) => {
          const value = result.translations && result.translations[batchIndex];
          if (value) {
            translated.set(text, value);
            window.localStorage.setItem(`sl_translation_${lang}_${text}`, value);
          }
        });
      } catch (error) {
        console.warn('Sarvam translation unavailable; using built-in translations.', error.message);
        break;
      }
    }

    nodes.forEach(({ node, text }) => {
      const value = translated.get(text);
      if (value && node.parentElement) {
        node.textContent = node.textContent.replace(text, value);
      }
    });
  }

  function bindSettings() {
    const resetBtn = document.getElementById('btn-reset-demo-data');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset all demo records back to hackathon starting defaults?')) {
          window.SL_STORAGE.resetToDemo();
          showToast('Demo records reset to default state.', 'success');
          setTimeout(() => window.location.reload(), 500);
        }
      });
    }
  }

  return {
    init,
    showToast,
    applyLanguage
  };
})();

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.SL_APP.init();
});
