/**
 * SL: Geospatial Land Intelligence Platform
 * SIH26013 - Automated Integration and Intelligent Harmonization of Multi-source Geospatial Data
 * Module: Storage & State Management (localStorage with Demo Seed Fallback)
 */

window.SL_STORAGE = (function() {
  'use strict';

  const KEYS = {
    USER: 'sl_current_user',
    PARCELS: 'sl_parcels',
    DATASETS: 'sl_datasets',
    CONFLICTS: 'sl_conflicts',
    SURVEYS: 'sl_surveys',
    REQUESTS: 'sl_requests',
    CHANGES: 'sl_changes',
    NOTIFICATIONS: 'sl_notifications',
    AUDIT_LOGS: 'sl_audit_logs',
    OFFLINE_QUEUE: 'sl_offline_queue',
    ATTRIBUTE_MAPPINGS: 'sl_attribute_mappings',
    TOPOLOGY_ISSUES: 'sl_topology_issues',
    LANG: 'sl_language',
    OFFLINE_MODE: 'sl_offline_mode'
  };

  function init() {
    if (!localStorage.getItem(KEYS.PARCELS)) {
      localStorage.setItem(KEYS.PARCELS, JSON.stringify(window.SL_DEMO.parcelsGeoJSON));
    }
    if (!localStorage.getItem(KEYS.DATASETS)) {
      localStorage.setItem(KEYS.DATASETS, JSON.stringify(window.SL_DEMO.datasets));
    }
    if (!localStorage.getItem(KEYS.CONFLICTS)) {
      localStorage.setItem(KEYS.CONFLICTS, JSON.stringify(window.SL_DEMO.conflicts));
    }
    if (!localStorage.getItem(KEYS.SURVEYS)) {
      localStorage.setItem(KEYS.SURVEYS, JSON.stringify(window.SL_DEMO.surveys));
    }
    if (!localStorage.getItem(KEYS.REQUESTS)) {
      localStorage.setItem(KEYS.REQUESTS, JSON.stringify(window.SL_DEMO.requests));
    }
    if (!localStorage.getItem(KEYS.CHANGES)) {
      localStorage.setItem(KEYS.CHANGES, JSON.stringify(window.SL_DEMO.changes));
    }
    if (!localStorage.getItem(KEYS.NOTIFICATIONS)) {
      localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(window.SL_DEMO.notifications));
    }
    if (!localStorage.getItem(KEYS.AUDIT_LOGS)) {
      localStorage.setItem(KEYS.AUDIT_LOGS, JSON.stringify(window.SL_DEMO.auditLogs));
    }
    if (!localStorage.getItem(KEYS.ATTRIBUTE_MAPPINGS)) {
      localStorage.setItem(KEYS.ATTRIBUTE_MAPPINGS, JSON.stringify(window.SL_DEMO.attributeMappings));
    }
    if (!localStorage.getItem(KEYS.TOPOLOGY_ISSUES)) {
      localStorage.setItem(KEYS.TOPOLOGY_ISSUES, JSON.stringify(window.SL_DEMO.topologyIssues));
    }
    if (!localStorage.getItem(KEYS.OFFLINE_QUEUE)) {
      localStorage.setItem(KEYS.OFFLINE_QUEUE, JSON.stringify([]));
    }
    if (!localStorage.getItem(KEYS.LANG)) {
      localStorage.setItem(KEYS.LANG, 'en');
    }
  }

  // Generic Helpers
  function getItem(key, fallback = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn('Storage read error for key:', key, e);
      return fallback;
    }
  }

  function setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage write error for key:', key, e);
      return false;
    }
  }

  // Auth User
  function getCurrentUser() {
    return getItem(KEYS.USER, null);
  }

  function setCurrentUser(user) {
    if (!user) {
      localStorage.removeItem(KEYS.USER);
    } else {
      setItem(KEYS.USER, user);
    }
  }

  // Parcels
  function getParcels() {
    return getItem(KEYS.PARCELS, window.SL_DEMO.parcelsGeoJSON);
  }

  function saveParcels(geojson) {
    return setItem(KEYS.PARCELS, geojson);
  }

  function getParcelById(id) {
    const geo = getParcels();
    if (!geo || !geo.features) return null;
    return geo.features.find(f => f.properties.id === id || f.properties.surveyNumber === id);
  }

  function updateParcel(id, updatedProps) {
    const geo = getParcels();
    if (!geo || !geo.features) return false;
    const idx = geo.features.findIndex(f => f.properties.id === id);
    if (idx !== -1) {
      geo.features[idx].properties = { ...geo.features[idx].properties, ...updatedProps };
      saveParcels(geo);
      return true;
    }
    return false;
  }

  // Datasets
  function getDatasets() {
    return getItem(KEYS.DATASETS, window.SL_DEMO.datasets);
  }

  function addDataset(dataset) {
    const list = getDatasets();
    list.unshift(dataset);
    setItem(KEYS.DATASETS, list);
    addAuditLog({
      action: 'Dataset uploaded',
      parcel: '-',
      dataset: dataset.name,
      status: 'Success'
    });
    addNotification({
      title: 'Dataset uploaded',
      message: `${dataset.name} uploaded successfully and queued for AI harmonization.`,
      target: 'datasets'
    });
    return list;
  }

  // Conflicts
  function getConflicts() {
    return getItem(KEYS.CONFLICTS, window.SL_DEMO.conflicts);
  }

  function updateConflict(id, patch) {
    const list = getConflicts();
    const idx = list.findIndex(c => c.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...patch };
      setItem(KEYS.CONFLICTS, list);
      return list[idx];
    }
    return null;
  }

  // Surveys / Ground Truthing
  function getSurveys() {
    return getItem(KEYS.SURVEYS, window.SL_DEMO.surveys);
  }

  function addSurvey(survey) {
    const list = getSurveys();
    list.unshift(survey);
    setItem(KEYS.SURVEYS, list);
    addAuditLog({
      action: 'Ground truth survey submitted',
      parcel: survey.parcelId,
      dataset: 'Field Verification',
      status: 'Submitted'
    });
    addNotification({
      title: 'Survey submitted',
      message: `Ground truth verification recorded for parcel ${survey.parcelId}.`,
      target: 'surveys'
    });
    return list;
  }

  function updateSurvey(id, patch) {
    const list = getSurveys();
    const idx = list.findIndex(s => s.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...patch };
      setItem(KEYS.SURVEYS, list);
      return list[idx];
    }
    return null;
  }

  // Requests
  function getRequests() {
    return getItem(KEYS.REQUESTS, window.SL_DEMO.requests);
  }

  function addRequest(req) {
    const list = getRequests();
    list.unshift(req);
    setItem(KEYS.REQUESTS, list);
    addAuditLog({
      action: 'Citizen request submitted',
      parcel: req.parcelId,
      dataset: req.type,
      status: 'Submitted'
    });
    addNotification({
      title: 'New request submitted',
      message: `${req.id} for parcel ${req.parcelId} registered in processing queue.`,
      target: 'review'
    });
    return req;
  }

  function updateRequestStatus(id, newStatus) {
    const list = getRequests();
    const idx = list.findIndex(r => r.id === id);
    if (idx !== -1) {
      list[idx].status = newStatus;
      const historyItem = list[idx].history.find(h => h.step === newStatus);
      if (historyItem) {
        historyItem.done = true;
        historyItem.date = new Date().toISOString().replace('T', ' ').substring(0, 16);
      } else {
        list[idx].history.push({
          step: newStatus,
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          done: true
        });
      }
      setItem(KEYS.REQUESTS, list);
      addAuditLog({
        action: `Request status updated: ${newStatus}`,
        parcel: list[idx].parcelId,
        dataset: id,
        status: newStatus
      });
      return list[idx];
    }
    return null;
  }

  // Changes
  function getChanges() {
    return getItem(KEYS.CHANGES, window.SL_DEMO.changes);
  }

  // Notifications
  function getNotifications() {
    return getItem(KEYS.NOTIFICATIONS, window.SL_DEMO.notifications);
  }

  function addNotification({ title, message, target = 'dashboard' }) {
    const list = getNotifications();
    const newNotif = {
      id: 'NOTIF-' + Date.now().toString().slice(-4),
      title,
      message,
      time: 'Just now',
      unread: true,
      target
    };
    list.unshift(newNotif);
    setItem(KEYS.NOTIFICATIONS, list);
    return newNotif;
  }

  function markNotificationRead(id) {
    const list = getNotifications();
    const notif = list.find(n => n.id === id);
    if (notif) notif.unread = false;
    setItem(KEYS.NOTIFICATIONS, list);
  }

  function markAllNotificationsRead() {
    const list = getNotifications();
    list.forEach(n => n.unread = false);
    setItem(KEYS.NOTIFICATIONS, list);
  }

  // Audit Logs
  function getAuditLogs() {
    return getItem(KEYS.AUDIT_LOGS, window.SL_DEMO.auditLogs);
  }

  function addAuditLog({ action, parcel = '-', dataset = '-', status = 'Success' }) {
    const list = getAuditLogs();
    const user = getCurrentUser();
    const entry = {
      id: 'AUD-' + (list.length + 101),
      user: user ? user.email || user.id : 'system@sl.gov.in',
      role: user ? (user.role === 'officer' ? 'GIS Officer' : 'Citizen User') : 'System',
      action,
      parcel,
      dataset,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status
    };
    list.unshift(entry);
    setItem(KEYS.AUDIT_LOGS, list);
    return entry;
  }

  // Attribute Mappings
  function getAttributeMappings() {
    return getItem(KEYS.ATTRIBUTE_MAPPINGS, window.SL_DEMO.attributeMappings);
  }

  function updateAttributeMapping(sourceField, status) {
    const list = getAttributeMappings();
    const item = list.find(m => m.sourceField === sourceField);
    if (item) {
      item.status = status;
      setItem(KEYS.ATTRIBUTE_MAPPINGS, list);
    }
    return list;
  }

  // Topology Issues
  function getTopologyIssues() {
    return getItem(KEYS.TOPOLOGY_ISSUES, window.SL_DEMO.topologyIssues);
  }

  function updateTopologyIssue(id, status) {
    const list = getTopologyIssues();
    const item = list.find(i => i.id === id);
    if (item) {
      item.status = status;
      setItem(KEYS.TOPOLOGY_ISSUES, list);
    }
    return list;
  }

  // Offline Queue
  function getOfflineQueue() {
    return getItem(KEYS.OFFLINE_QUEUE, []);
  }

  function addOfflineRecord(record) {
    const queue = getOfflineQueue();
    queue.push(record);
    setItem(KEYS.OFFLINE_QUEUE, queue);
    return queue.length;
  }

  function clearOfflineQueue() {
    setItem(KEYS.OFFLINE_QUEUE, []);
  }

  // Reset to Demo Factory Defaults
  function resetToDemo() {
    localStorage.clear();
    init();
    return true;
  }

  // Language & Offline Mode
  function getLanguage() {
    return localStorage.getItem(KEYS.LANG) || 'en';
  }

  function setLanguage(lang) {
    localStorage.setItem(KEYS.LANG, lang);
  }

  function isOfflineMode() {
    return localStorage.getItem(KEYS.OFFLINE_MODE) === 'true';
  }

  function setOfflineMode(val) {
    localStorage.setItem(KEYS.OFFLINE_MODE, val ? 'true' : 'false');
  }

  // Initialize on load
  init();

  return {
    getCurrentUser,
    setCurrentUser,
    getParcels,
    saveParcels,
    getParcelById,
    updateParcel,
    getDatasets,
    addDataset,
    getConflicts,
    updateConflict,
    getSurveys,
    addSurvey,
    updateSurvey,
    getRequests,
    addRequest,
    updateRequestStatus,
    getChanges,
    getNotifications,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    getAuditLogs,
    addAuditLog,
    getAttributeMappings,
    updateAttributeMapping,
    getTopologyIssues,
    updateTopologyIssue,
    getOfflineQueue,
    addOfflineRecord,
    clearOfflineQueue,
    resetToDemo,
    getLanguage,
    setLanguage,
    isOfflineMode,
    setOfflineMode
  };
})();
