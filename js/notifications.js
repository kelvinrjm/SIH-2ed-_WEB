/**
 * SL: Geospatial Land Intelligence Platform
 * SIH26013 - Automated Integration and Intelligent Harmonization of Multi-source Geospatial Data
 * Module: Notifications Center
 */

window.SL_NOTIFICATIONS = (function() {
  'use strict';

  function init() {
    renderNotifications();
    bindEvents();
    updateUnreadCount();
  }

  function bindEvents() {
    // Top bar bell button toggle
    const bellBtn = document.getElementById('btn-header-notifications');
    const dropdown = document.getElementById('notifications-dropdown');

    if (bellBtn && dropdown) {
      bellBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && !bellBtn.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      });
    }

    const markAllBtn = document.getElementById('btn-mark-all-read');
    if (markAllBtn) {
      markAllBtn.addEventListener('click', () => {
        window.SL_STORAGE.markAllNotificationsRead();
        renderNotifications();
        updateUnreadCount();
        window.SL_APP.showToast('All notifications marked as read.', 'info');
      });
    }
  }

  function renderNotifications() {
    const listContainer = document.getElementById('notifications-list-container');
    const fullContainer = document.getElementById('notifications-full-container');

    const notifs = window.SL_STORAGE.getNotifications();

    const html = notifs.map(n => `
      <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="window.SL_NOTIFICATIONS.handleNotificationClick('${n.id}', '${n.target}')"
           style="padding: 0.85rem 1rem; border-bottom: 1px solid var(--sl-border-light); cursor: pointer; background: ${n.unread ? 'var(--sl-blue-50)' : '#ffffff'}; transition: background 0.15s;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.25rem;">
          <strong style="font-size: 0.85rem; color: var(--sl-navy-900);">${n.title}</strong>
          <span style="font-size: 0.7rem; color: var(--sl-text-muted);">${n.time}</span>
        </div>
        <div style="font-size: 0.8rem; color: var(--sl-text-secondary); line-height: 1.4;">${n.message}</div>
      </div>
    `).join('');

    if (listContainer) listContainer.innerHTML = html;
    if (fullContainer) fullContainer.innerHTML = html;
  }

  function handleNotificationClick(notifId, targetSection) {
    window.SL_STORAGE.markNotificationRead(notifId);
    renderNotifications();
    updateUnreadCount();

    const dropdown = document.getElementById('notifications-dropdown');
    if (dropdown) dropdown.classList.remove('active');

    // Route to target
    const user = window.SL_STORAGE.getCurrentUser();
    if (user && user.role === 'officer') {
      window.SL_NAV.switchOfficerSection(targetSection);
    } else {
      window.SL_NAV.switchUserTab('requests');
    }
  }

  function updateUnreadCount() {
    const notifs = window.SL_STORAGE.getNotifications();
    const unreadCount = notifs.filter(n => n.unread).length;

    document.querySelectorAll('.notif-badge-count').forEach(el => {
      el.textContent = unreadCount;
      el.style.display = unreadCount > 0 ? 'block' : 'none';
    });
  }

  return {
    init,
    renderNotifications,
    handleNotificationClick,
    updateUnreadCount
  };
})();
