/**
 * SL: Geospatial Land Intelligence Platform
 * SIH26013 - Automated Integration and Intelligent Harmonization of Multi-source Geospatial Data
 * Module: Service API Layer (Asynchronous abstraction ready for FastAPI / PostGIS / Node.js)
 */

window.SL_API = (function() {
  'use strict';

  // Network latency simulation helper
  const delay = (ms = 250) => new Promise(resolve => setTimeout(resolve, ms));

  // Authentication API
  async function loginUser(emailOrMobile, password) {
    await delay(300);
    // Demo credential check
    if ((emailOrMobile === 'user@sl.demo' || emailOrMobile === '9840212345' || emailOrMobile.includes('user')) && password === 'user123') {
      const user = {
        id: 'USR-2026-081',
        name: 'R. Sundararaman',
        email: 'user@sl.demo',
        mobile: '+91 98402 12345',
        role: 'user',
        district: 'Madurai',
        taluk: 'Madurai South',
        village: 'Anuppanadi',
        primaryParcelId: 'TN-MDU-000124',
        loginTime: new Date().toISOString()
      };
      window.SL_STORAGE.setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials. Use demo: user@sl.demo / user123' };
  }

  async function registerUser(formData) {
    await delay(350);
    // Auto-generate citizen user profile
    const user = {
      id: 'USR-2026-' + Math.floor(100 + Math.random() * 900),
      name: formData.name || 'Citizen User',
      email: formData.email,
      mobile: formData.mobile,
      role: 'user',
      district: formData.district || 'Madurai',
      taluk: formData.taluk || 'Madurai South',
      village: formData.village || 'Anuppanadi',
      primaryParcelId: 'TN-MDU-000124',
      loginTime: new Date().toISOString()
    };
    window.SL_STORAGE.setCurrentUser(user);
    window.SL_STORAGE.addAuditLog({
      action: 'Citizen user registered',
      parcel: '-',
      dataset: 'User Registry',
      status: 'Success'
    });
    return { success: true, user };
  }

  async function loginOfficer(officialId, password, department) {
    await delay(350);
    if ((officialId === 'officer@sl.gov.in' || officialId.includes('officer')) && password === 'SL@1234') {
      const officer = {
        id: 'OFF-MDU-004',
        officialId: 'officer@sl.gov.in',
        name: 'K. Meenakshi Sundaram',
        designation: 'Sub-Divisional Magistrate / RDO',
        department: department || 'Revenue Department',
        role: 'officer',
        jurisdiction: 'Madurai South Urban Taluk',
        securityClearance: 'Level-3 (Full Spatial Authority)',
        twoFactorVerified: true,
        loginTime: new Date().toISOString()
      };
      window.SL_STORAGE.setCurrentUser(officer);
      window.SL_STORAGE.addAuditLog({
        action: 'Officer authenticated (2FA Verified)',
        parcel: '-',
        dataset: 'Officer Command Center',
        status: 'Authorized'
      });
      return { success: true, officer };
    }
    return { success: false, message: 'Invalid Officer credentials. Use demo: officer@sl.gov.in / SL@1234' };
  }

  async function logout() {
    await delay(100);
    window.SL_STORAGE.addAuditLog({
      action: 'User signed out',
      parcel: '-',
      dataset: 'Session Manager',
      status: 'Success'
    });
    window.SL_STORAGE.setCurrentUser(null);
    return { success: true };
  }

  // Geospatial Parcels API
  async function getParcels() {
    await delay(150);
    return window.SL_STORAGE.getParcels();
  }

  async function getParcelById(id) {
    await delay(100);
    return window.SL_STORAGE.getParcelById(id);
  }

  async function searchParcels(query) {
    await delay(150);
    if (!query || query.trim() === '') return [];
    const q = query.toLowerCase().trim();
    const geo = window.SL_STORAGE.getParcels();
    return geo.features.filter(f => {
      const p = f.properties;
      return (
        p.id.toLowerCase().includes(q) ||
        p.surveyNumber.toLowerCase().includes(q) ||
        (p.oldSurveyNumber && p.oldSurveyNumber.toLowerCase().includes(q)) ||
        p.ward.toLowerCase().includes(q) ||
        p.village.toLowerCase().includes(q) ||
        (p.owner && p.owner.toLowerCase().includes(q)) ||
        p.landUse.toLowerCase().includes(q)
      );
    });
  }

  async function approveParcel(parcelId, decisionNotes = 'Officer Verified through Multi-source Harmonization') {
    await delay(300);
    const success = window.SL_STORAGE.updateParcel(parcelId, {
      status: 'Officer Verified',
      confidence: 97.8,
      verifiedDate: new Date().toISOString().substring(0, 10),
      verificationNotes: decisionNotes
    });
    if (success) {
      window.SL_STORAGE.addAuditLog({
        action: 'Parcel approved & certified',
        parcel: parcelId,
        dataset: 'Integrated Land Cadastre',
        status: 'Officer Verified'
      });
      window.SL_STORAGE.addNotification({
        title: 'Parcel Approved',
        message: `Parcel ${parcelId} certified as official harmonized land record.`,
        target: 'parcels'
      });
    }
    return { success, parcelId };
  }

  async function rejectParcel(parcelId, reason = 'Boundary discrepancies require resurvey') {
    await delay(300);
    const success = window.SL_STORAGE.updateParcel(parcelId, {
      status: 'Rejected',
      confidence: 72.0,
      verificationNotes: reason
    });
    if (success) {
      window.SL_STORAGE.addAuditLog({
        action: 'Parcel rejected',
        parcel: parcelId,
        dataset: 'Integrated Land Cadastre',
        status: 'Rejected'
      });
    }
    return { success, parcelId };
  }

  // Datasets API
  async function getDatasets() {
    await delay(150);
    return window.SL_STORAGE.getDatasets();
  }

  async function uploadDataset(metadata) {
    await delay(400);
    const newDS = {
      id: 'DS-2026-' + Math.floor(100 + Math.random() * 900),
      name: metadata.name,
      department: metadata.department,
      type: metadata.category || 'Vector GIS',
      format: metadata.format || 'GeoJSON',
      uploadDate: new Date().toISOString().substring(0, 10),
      surveyDate: metadata.surveyDate || new Date().toISOString().substring(0, 10),
      crs: metadata.crs || 'EPSG:4326 (WGS84)',
      featureCount: Math.floor(1200 + Math.random() * 4500),
      quality: Number((91 + Math.random() * 7).toFixed(1)),
      status: 'Processed',
      fileSize: metadata.fileSize || '12.4 MB',
      description: metadata.description || 'Uploaded via SL Dataset Ingestion Pipeline.'
    };
    window.SL_STORAGE.addDataset(newDS);
    return { success: true, dataset: newDS };
  }

  // AI Harmonization API
  async function runHarmonization(options = {}) {
    await delay(600);
    window.SL_STORAGE.addAuditLog({
      action: 'AI Harmonization executed',
      parcel: 'Ward 12 & 13',
      dataset: 'Multi-source Orchestrator',
      status: 'Harmonized'
    });
    window.SL_STORAGE.addNotification({
      title: 'AI Harmonization Completed',
      message: 'Spatial matching, topology validation and cross-source confidence scoring updated.',
      target: 'harmonization'
    });
    return {
      success: true,
      metrics: {
        spatialMatchAvg: '96.4%',
        topologyErrorsFixed: 3,
        conflictsIdentified: 7,
        overallConfidence: '94.6%'
      }
    };
  }

  // Conflicts API
  async function getConflicts() {
    await delay(150);
    return window.SL_STORAGE.getConflicts();
  }

  async function resolveConflict(conflictId, resolutionType, notes = '') {
    await delay(350);
    const patch = {
      status: 'Resolved',
      resolutionMethod: resolutionType,
      resolvedAt: new Date().toISOString().substring(0, 10),
      resolutionNotes: notes
    };
    const updated = window.SL_STORAGE.updateConflict(conflictId, patch);
    if (updated) {
      window.SL_STORAGE.addAuditLog({
        action: `Conflict resolved via [${resolutionType}]`,
        parcel: updated.parcelId,
        dataset: `Conflict ${conflictId}`,
        status: 'Resolved'
      });
      window.SL_STORAGE.addNotification({
        title: 'Conflict Resolved',
        message: `${conflictId} for ${updated.parcelId} marked as Resolved using ${resolutionType}.`,
        target: 'conflicts'
      });
    }
    return { success: !!updated, conflict: updated };
  }

  // Field Ground Truthing API
  async function getSurveys() {
    await delay(150);
    return window.SL_STORAGE.getSurveys();
  }

  async function submitSurvey(surveyData) {
    await delay(400);
    const newSurvey = {
      id: 'GT-2026-' + Math.floor(100 + Math.random() * 900),
      parcelId: surveyData.parcelId,
      surveyNumber: surveyData.surveyNumber || 'S-Demo',
      status: 'Submitted',
      assignedOfficer: surveyData.officer || 'Officer M. Senthamizhan',
      surveyDate: new Date().toISOString().substring(0, 10),
      gpsCoords: surveyData.gpsCoords || { latitude: 9.9248, longitude: 78.1186, accuracy: 0.5 },
      observedBoundary: surveyData.observedBoundary || 'Physical wall verified',
      observedLandUse: surveyData.observedLandUse || 'Residential',
      photoUrl: surveyData.photoUrl || '',
      notes: surveyData.notes || '',
      syncStatus: window.SL_STORAGE.isOfflineMode() ? 'pending_sync' : 'synced'
    };

    if (window.SL_STORAGE.isOfflineMode()) {
      window.SL_STORAGE.addOfflineRecord(newSurvey);
    } else {
      window.SL_STORAGE.addSurvey(newSurvey);
    }
    return { success: true, survey: newSurvey };
  }

  // Citizen Requests API
  async function getRequests() {
    await delay(150);
    return window.SL_STORAGE.getRequests();
  }

  async function submitRequest(requestData) {
    await delay(350);
    const newReq = {
      id: 'REQ-2026-' + String(Math.floor(50 + Math.random() * 900)).padStart(4, '0'),
      type: requestData.type,
      parcelId: requestData.parcelId,
      surveyNumber: requestData.surveyNumber || 'S-124/3',
      description: requestData.description,
      applicant: requestData.applicant || 'Citizen User',
      mobile: requestData.mobile || '+91 98402 12345',
      email: requestData.email || 'user@sl.demo',
      date: new Date().toISOString().substring(0, 10),
      status: 'Submitted',
      history: [
        { step: 'Submitted', date: new Date().toISOString().replace('T', ' ').substring(0, 16), done: true },
        { step: 'Under Review', date: 'Pending', done: false },
        { step: 'Field Verification', date: 'Pending', done: false },
        { step: 'Approved', date: 'Pending', done: false }
      ]
    };
    window.SL_STORAGE.addRequest(newReq);
    return { success: true, request: newReq };
  }

  async function updateRequestStatus(requestId, status) {
    await delay(300);
    const updated = window.SL_STORAGE.updateRequestStatus(requestId, status);
    return { success: !!updated, request: updated };
  }

  // Reports API
  async function generateReport(type, params = {}) {
    await delay(500);
    const reportId = 'REP-2026-' + Math.floor(1000 + Math.random() * 9000);
    const generatedAt = new Date().toISOString();
    window.SL_STORAGE.addAuditLog({
      action: `Report generated: ${type}`,
      parcel: params.parcelId || 'Sector All',
      dataset: reportId,
      status: 'Success'
    });
    return {
      reportId,
      type,
      generatedAt,
      authority: 'Department of Land Resources & Madurai Municipal GIS',
      status: 'Certified'
    };
  }

  return {
    loginUser,
    registerUser,
    loginOfficer,
    logout,
    getParcels,
    getParcelById,
    searchParcels,
    approveParcel,
    rejectParcel,
    getDatasets,
    uploadDataset,
    runHarmonization,
    getConflicts,
    resolveConflict,
    getSurveys,
    submitSurvey,
    getRequests,
    submitRequest,
    updateRequestStatus,
    generateReport
  };
})();
