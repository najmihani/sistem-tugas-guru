/* ============================================================
   APP.JS — Shared Admin JavaScript
   Auth check, logout, navbar, navigation helpers
   ============================================================ */

// --- Auth Check ---
function authCheck() {
  const isAdmin = localStorage.getItem('stg_admin');
  if (isAdmin !== 'true') {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// --- Logout ---
function logout() {
  if (confirm('Anda pasti ingin log keluar?')) {
    localStorage.removeItem('stg_admin');
    window.location.href = 'login.html';
  }
}

// --- Get current page filename ---
function getCurrentPage() {
  const path = window.location.pathname;
  return path.split('/').pop() || 'index.html';
}

// --- Set active nav link ---
function setActiveNav() {
  const currentPage = getCurrentPage();
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// --- Mobile Nav Toggle ---
function setupMobileNav() {
  const toggleBtn = document.querySelector('.navbar-toggle');
  const nav = document.querySelector('.navbar-nav');
  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      nav.classList.toggle('show');
    });
    // Close nav when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !toggleBtn.contains(e.target)) {
        nav.classList.remove('show');
      }
    });
  }
}

// --- Flash Message Helper ---
function showFlash(message, type) {
  type = type || 'success';
  // Remove any existing flash
  const existing = document.querySelector('.alert-flash');
  if (existing) existing.remove();

  const container = document.querySelector('.container') || document.body;
  const div = document.createElement('div');
  div.className = 'alert alert-' + type + ' alert-dismissible alert-flash';
  div.style.animation = 'slideUp 0.3s ease';
  div.innerHTML = '<span>' + message + '</span>' +
    '<button type="button" class="btn-close" onclick="this.parentElement.remove()">&times;</button>';

  // Insert at top of main content
  const main = document.querySelector('.section') || container;
  main.insertBefore(div, main.firstChild);

  // Auto-dismiss after 3s
  setTimeout(function() {
    if (div.parentElement) {
      div.remove();
    }
  }, 3000);
}

// --- Create Modal ---
function showModal(title, bodyHTML, footerHTML) {
  // Remove existing modal
  const existing = document.querySelector('.modal-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<h4>' + title + '</h4>' +
    '<button type="button" class="btn-close" onclick="this.closest(\'.modal-overlay\').remove()">&times;</button>' +
    '</div>' +
    '<div class="modal-body">' + bodyHTML + '</div>' +
    (footerHTML ? '<div class="modal-footer">' + footerHTML + '</div>' : '') +
    '</div>';

  document.body.appendChild(overlay);

  // Close on overlay click
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      overlay.remove();
    }
  });

  return overlay;
}

// --- Format Date ---
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  const months = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun',
    'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis'];
  return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
}

// --- Get kategori badge class ---
function kategoriBadgeClass(kategoriId) {
  const map = {
    'k1': 'badge-pentadbiran',
    'k2': 'badge-kurikulum',
    'k3': 'badge-hem',
    'k4': 'badge-kokurikulum'
  };
  return map[kategoriId] || 'badge-pentadbiran';
}

function kategoriNamaBoleh(kategoriId) {
  const map = {
    'k1': 'Pentadbiran',
    'k2': 'Kurikulum',
    'k3': 'HEM',
    'k4': 'Kokurikulum'
  };
  return map[kategoriId] || '—';
}

// --- Initialize common elements after DOM loaded ---
document.addEventListener('DOMContentLoaded', function() {
  // Run auth check if not on login page
  const currentPage = getCurrentPage();
  if (currentPage !== 'login.html' && !window.location.pathname.endsWith('index.html')) {
    // Only check auth for admin pages (in /admin/ path)
    if (window.location.pathname.includes('/admin/')) {
      authCheck();
    }
  }

  setActiveNav();
  setupMobileNav();

  // Apply theme color & logo from settings
  try {
    const tetapan = getTetapan();
    if (tetapan.warnaTema) {
      document.documentElement.style.setProperty('--primary', tetapan.warnaTema);
      document.documentElement.style.setProperty('--primary-dark', tetapan.warnaTema);
    }
    // Logo untuk admin navbar
    if (tetapan.logoUrl && tetapan.logoUrl.trim() !== '') {
      var brand = document.querySelector('.navbar-brand');
      if (brand) {
        brand.innerHTML = '<img src="' + tetapan.logoUrl.trim() + '" style="height:32px;width:auto;vertical-align:middle;margin-right:8px;" alt="Logo"> STG Admin';
      }
    }
  } catch(e) {
    // data.js not loaded yet or not needed
  }
});

// --- Export for use in other pages ---
window.stg = {
  authCheck: authCheck,
  logout: logout,
  showFlash: showFlash,
  showModal: showModal,
  formatDate: formatDate,
  kategoriBadgeClass: kategoriBadgeClass,
  kategoriNamaBoleh: kategoriNamaBoleh,
  getCurrentPage: getCurrentPage
};
