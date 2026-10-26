/**
 * RapiUsaha — Main Interactive Logic
 * Landing Page Development & Interactive Demonstrations
 * Pekan 4: Landing Page Development & Deployment
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initSmoothScroll();
  initActiveNavOnScroll();
});

// ==========================================
// 1. NAVBAR SCROLL EFFECT
// ==========================================
function initNavbarScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ==========================================
// 2. MOBILE MENU DRAWER
// ==========================================
function initMobileMenu() {
  const toggleBtn = document.getElementById('btn-mobile-toggle');
  const drawer = document.getElementById('mobile-menu-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Close drawer when pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeRegisterModal();
      closeDemoModal();
      closeLoginModal();
    }
  });
}

function openMobileMenu() {
  const toggleBtn = document.getElementById('btn-mobile-toggle');
  const drawer = document.getElementById('mobile-menu-drawer');
  if (drawer && toggleBtn) {
    drawer.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileMenu() {
  const toggleBtn = document.getElementById('btn-mobile-toggle');
  const drawer = document.getElementById('mobile-menu-drawer');
  if (drawer && toggleBtn) {
    drawer.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

// ==========================================
// 3. SMOOTH SCROLLING
// ==========================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          closeMobileMenu();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// ==========================================
// 4. ACTIVE NAVIGATION HIGHLIGHTING
// ==========================================
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

// ==========================================
// 5. FAQ ACCORDION
// ==========================================
function toggleFaq(index) {
  const item = document.getElementById(`faq-item-${index}`);
  const answer = document.getElementById(`faq-answer-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);

  if (!item || !answer || !icon) return;

  const isCurrentlyActive = item.classList.contains('active');

  // Collapse all other items for clean accordion behavior
  document.querySelectorAll('.faq-item').forEach(otherItem => {
    if (otherItem !== item && otherItem.classList.contains('active')) {
      otherItem.classList.remove('active');
      const otherAnswer = otherItem.querySelector('.faq-answer');
      const otherIcon = otherItem.querySelector('.faq-icon');
      const otherBtn = otherItem.querySelector('.faq-question');
      if (otherAnswer) otherAnswer.style.display = 'none';
      if (otherIcon) otherIcon.innerHTML = '&#43;';
      if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
    }
  });

  const button = item.querySelector('.faq-question');

  if (isCurrentlyActive) {
    item.classList.remove('active');
    answer.style.display = 'none';
    icon.innerHTML = '&#43;';
    if (button) button.setAttribute('aria-expanded', 'false');
  } else {
    item.classList.add('active');
    answer.style.display = 'block';
    icon.innerHTML = '&minus;';
    if (button) button.setAttribute('aria-expanded', 'true');
  }
}

// ==========================================
// 6. REGISTRATION / ORDER MODAL (WORKING FORM)
// ==========================================
function openRegisterModal(planName = 'Coba Gratis 14 Hari') {
  const modal = document.getElementById('register-modal');
  const planSelect = document.getElementById('order-plan');
  const feedback = document.getElementById('order-feedback');

  if (!modal) return;

  if (planSelect && planName) {
    // Attempt to match option
    for (let i = 0; i < planSelect.options.length; i++) {
      if (planSelect.options[i].value.includes(planName) || planName.includes(planSelect.options[i].value)) {
        planSelect.selectedIndex = i;
        break;
      }
    }
  }

  if (feedback) {
    feedback.classList.add('hidden');
    feedback.innerHTML = '';
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Focus on first input
  setTimeout(() => {
    const firstInput = document.getElementById('order-owner-name');
    if (firstInput) firstInput.focus();
  }, 200);
}

function closeRegisterModal() {
  const modal = document.getElementById('register-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleOrderSubmit(event) {
  event.preventDefault();

  const plan = document.getElementById('order-plan').value;
  const ownerName = document.getElementById('order-owner-name').value.trim();
  const bizName = document.getElementById('order-biz-name').value.trim();
  const waNumber = document.getElementById('order-wa').value.trim();
  const category = document.getElementById('order-category').value;
  const submitBtn = document.getElementById('btn-submit-order');
  const feedback = document.getElementById('order-feedback');

  if (!ownerName || !bizName || !waNumber) {
    showToast('Validasi Gagal', 'Mohon lengkapi seluruh kolom berbintang (*) dengan benar.', 'error');
    return;
  }

  // Simulate network request / API dispatch
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <span class="spinner"></span> Memproses Aktivasi Akun...
  `;

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;

    // Save mock order into localStorage
    const newOrder = {
      id: 'RPI-' + Math.floor(100000 + Math.random() * 900000),
      plan,
      ownerName,
      bizName,
      waNumber,
      category,
      timestamp: new Date().toISOString()
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem('rapiusaha_orders') || '[]');
      existingOrders.push(newOrder);
      localStorage.setItem('rapiusaha_orders', JSON.stringify(existingOrders));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    // Success feedback
    if (feedback) {
      feedback.className = 'form-feedback success';
      feedback.innerHTML = `
        <div class="feedback-icon">🎉</div>
        <div>
          <strong>Pendaftaran Berhasil! ID Akun: ${newOrder.id}</strong>
          <p>Selamat bergabung, <strong>${escapeHtml(ownerName)}</strong> (${escapeHtml(bizName)})! Paket <em>${escapeHtml(plan)}</em> Anda telah aktif. Anda dapat langsung melanjutkan konsultasi atau aktivasi via WhatsApp resmi kami.</p>
          <div style="margin-top: 10px;">
            <a href="https://wa.me/6281234567890?text=${encodeURIComponent(`Halo Tim RapiUsaha, saya telah mendaftar paket ${plan} untuk usaha ${bizName} (Pemilik: ${ownerName}, ID: ${newOrder.id}). Mohon panduan aktivasinya.`)}" target="_blank" class="btn-primary btn-sm" style="display:inline-block; text-decoration:none;">
              Buka WhatsApp Konfirmasi &rarr;
            </a>
          </div>
        </div>
      `;
      feedback.classList.remove('hidden');
    }

    showToast('Aktivasi Berhasil', `Akun untuk "${bizName}" berhasil dibuat! ID: ${newOrder.id}`, 'success');

    // Reset inputs
    document.getElementById('order-owner-name').value = '';
    document.getElementById('order-biz-name').value = '';
    document.getElementById('order-wa').value = '';
  }, 900);
}

// ==========================================
// 7. CONTACT FORM (WORKING FORM)
// ==========================================
function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('contact-name').value.trim();
  const phone = document.getElementById('contact-wa').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const bizType = document.getElementById('contact-biz-type').value;
  const message = document.getElementById('contact-message').value.trim();
  const submitBtn = document.getElementById('btn-submit-contact');
  const feedback = document.getElementById('contact-feedback');

  if (!name || !phone || !message) {
    showToast('Validasi Gagal', 'Harap isi nama, nomor WhatsApp, dan pesan Anda.', 'error');
    return;
  }

  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="spinner"></span> Mengirim Pesan...`;

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;

    // Save contact message to localStorage
    const inquiry = {
      id: 'INQ-' + Date.now(),
      name,
      phone,
      email,
      bizType,
      message,
      createdAt: new Date().toISOString()
    };

    try {
      const messages = JSON.parse(localStorage.getItem('rapiusaha_inquiries') || '[]');
      messages.push(inquiry);
      localStorage.setItem('rapiusaha_inquiries', JSON.stringify(messages));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    if (feedback) {
      feedback.className = 'form-feedback success';
      feedback.innerHTML = `
        <div class="feedback-icon">✅</div>
        <div>
          <strong>Pesan Konsultasi Terkirim!</strong>
          <p>Terima kasih, <strong>${escapeHtml(name)}</strong>. Pertanyaan seputar usaha <em>${escapeHtml(bizType)}</em> telah kami terima. Tim konsultan RapiUsaha akan menghubungi nomor WhatsApp <strong>${escapeHtml(phone)}</strong> dalam waktu maksimal 15 menit.</p>
        </div>
      `;
      feedback.classList.remove('hidden');
    }

    showToast('Pesan Terkirim', 'Konsultasi Anda telah diterima oleh tim RapiUsaha.', 'success');
    document.getElementById('contact-form').reset();
  }, 750);
}

// ==========================================
// 8. INTERACTIVE POS DEMO SIMULATOR
// ==========================================
const demoState = {
  products: {
    'Kopi Susu Gula Aren': { price: 18000, stock: 12, initialStock: 12, elementId: 'stock-item-1' },
    'Roti Bakar Cokelat': { price: 15000, stock: 8, initialStock: 8, elementId: 'stock-item-2' },
    'Es Teh Melati Jumbo': { price: 7000, stock: 25, initialStock: 25, elementId: 'stock-item-3' }
  },
  cart: []
};

function openDemoModal() {
  const modal = document.getElementById('demo-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderDemoCart();
    updateDemoStockUI();
  }
}

function closeDemoModal() {
  const modal = document.getElementById('demo-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function addDemoItem(productName, price) {
  const prod = demoState.products[productName];
  if (!prod) return;

  // Check if stock remaining
  const inCartQty = demoState.cart.filter(item => item.name === productName).length;
  if (prod.stock <= 0 || inCartQty >= prod.stock) {
    showToast('Stok Terbatas', `Stok ${productName} saat ini hanya tersisa ${prod.stock} porsi.`, 'error');
    return;
  }

  demoState.cart.push({
    name: productName,
    price: price,
    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  });

  renderDemoCart();
  showToast('Item Ditambahkan', `${productName} dimasukkan ke struk kasir.`, 'info');
}

function removeDemoItem(index) {
  if (index >= 0 && index < demoState.cart.length) {
    const removed = demoState.cart.splice(index, 1)[0];
    renderDemoCart();
    showToast('Item Dihapus', `${removed.name} dikeluarkan dari struk.`, 'info');
  }
}

function renderDemoCart() {
  const cartList = document.getElementById('demo-cart-list');
  const totalAmountEl = document.getElementById('demo-total-amount');
  const checkoutBtn = document.getElementById('btn-demo-checkout');
  const statusBox = document.getElementById('demo-status-message');

  if (!cartList || !totalAmountEl || !checkoutBtn) return;

  if (statusBox) statusBox.classList.add('hidden');

  if (demoState.cart.length === 0) {
    cartList.innerHTML = `<p class="empty-cart-hint">Belum ada item dipilih. Klik salah satu produk di sebelah kiri.</p>`;
    totalAmountEl.textContent = 'Rp 0';
    checkoutBtn.disabled = true;
    return;
  }

  let total = 0;
  let html = `<ul class="cart-items-wrapper">`;

  demoState.cart.forEach((item, idx) => {
    total += item.price;
    html += `
      <li class="cart-item-row">
        <div class="cart-item-info">
          <span class="cart-item-name">${escapeHtml(item.name)}</span>
          <span class="cart-item-time">${item.time}</span>
        </div>
        <div class="cart-item-price-wrap">
          <span class="cart-item-price">Rp ${formatNumber(item.price)}</span>
          <button type="button" class="cart-item-del" onclick="removeDemoItem(${idx})" title="Hapus item">&times;</button>
        </div>
      </li>
    `;
  });

  html += `</ul>`;
  cartList.innerHTML = html;
  totalAmountEl.textContent = `Rp ${formatNumber(total)}`;
  checkoutBtn.disabled = false;
}

function checkoutDemoOrder() {
  if (demoState.cart.length === 0) return;

  const total = demoState.cart.reduce((sum, item) => sum + item.price, 0);
  const checkoutBtn = document.getElementById('btn-demo-checkout');
  const statusBox = document.getElementById('demo-status-message');

  checkoutBtn.disabled = true;
  checkoutBtn.innerHTML = `<span class="spinner"></span> Memproses Pembayaran & Potong Stok...`;

  setTimeout(() => {
    // Deduct stock
    demoState.cart.forEach(item => {
      if (demoState.products[item.name]) {
        demoState.products[item.name].stock = Math.max(0, demoState.products[item.name].stock - 1);
      }
    });

    updateDemoStockUI();

    const itemCount = demoState.cart.length;
    const invoiceNo = 'TRX-' + Math.floor(1000 + Math.random() * 9000);

    // Show simulated status
    if (statusBox) {
      statusBox.className = 'demo-status-box success';
      statusBox.innerHTML = `
        <div class="status-badge">✅ Transaksi ${invoiceNo} Sukses!</div>
        <p><strong>Total Rp ${formatNumber(total)}</strong> (${itemCount} item) telah dicatat ke Laporan Laba Rugi hari ini. Stok gudang otomatis diperbarui dan struk digital siap dikirim ke WhatsApp pelanggan.</p>
        <div class="demo-status-actions">
          <button type="button" class="btn-primary btn-sm" onclick="closeDemoModal(); openRegisterModal('Coba Gratis 14 Hari');">
            Mulai Pakai di Usaha Anda (Coba Gratis 14 Hari) &rarr;
          </button>
        </div>
      `;
      statusBox.classList.remove('hidden');
    }

    demoState.cart = [];
    renderDemoCart();

    checkoutBtn.disabled = false;
    checkoutBtn.innerHTML = `Proses Transaksi & Update Stok`;

    showToast('Simulasi Berhasil', `Transaksi senilai Rp ${formatNumber(total)} berhasil diproses!`, 'success');
  }, 800);
}

function resetDemo() {
  for (const key in demoState.products) {
    demoState.products[key].stock = demoState.products[key].initialStock;
  }
  demoState.cart = [];
  updateDemoStockUI();
  renderDemoCart();

  const statusBox = document.getElementById('demo-status-message');
  if (statusBox) statusBox.classList.add('hidden');

  showToast('Demo Direset', 'Semua stok produk dan struk kasir kembali ke kondisi awal.', 'info');
}

function updateDemoStockUI() {
  for (const key in demoState.products) {
    const item = demoState.products[key];
    const el = document.getElementById(item.elementId);
    if (el) {
      el.textContent = `Stok: ${item.stock}`;
      if (item.stock <= 3) {
        el.style.color = '#ef4444';
        el.style.fontWeight = '700';
      } else {
        el.style.color = '';
        el.style.fontWeight = '';
      }
    }
  }
}

// ==========================================
// 9. LOGIN MODAL HELPER
// ==========================================
function openLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const emailInput = document.getElementById('login-email');
      if (emailInput) emailInput.focus();
    }, 200);
  } else {
    // Fallback if modal element not present: direct to trial
    openRegisterModal('Masuk Akun / Daftar Baru');
  }
}

function closeLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const submitBtn = document.getElementById('btn-submit-login');
  const feedback = document.getElementById('login-feedback');

  if (!email) {
    showToast('Perhatian', 'Silakan masukkan email atau nomor WhatsApp Anda.', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="spinner"></span> Memverifikasi...`;

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `Masuk ke Dashboard`;

    if (feedback) {
      feedback.className = 'form-feedback success';
      feedback.innerHTML = `
        <div class="feedback-icon">🔑</div>
        <div>
          <strong>Tautan Masuk Terkirim!</strong>
          <p>Tautan masuk ajaib (Magic Link) telah dikirimkan ke <strong>${escapeHtml(email)}</strong>. Cek inbox atau folder spam untuk langsung membuka dashboard usaha Anda.</p>
        </div>
      `;
      feedback.classList.remove('hidden');
    }

    showToast('Tautan Masuk Dikirim', `Periksa email/WhatsApp ${email} untuk masuk.`, 'success');
  }, 700);
}

// ==========================================
// 10. TOAST NOTIFICATION UTILITY
// ==========================================
function showToast(title, message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;

  const icons = {
    success: '🎉',
    error: '⚠️',
    info: '💡'
  };

  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || '🔔'}</span>
    <div class="toast-body">
      <strong class="toast-title">${escapeHtml(title)}</strong>
      <p class="toast-msg">${escapeHtml(message)}</p>
    </div>
    <button type="button" class="toast-close" aria-label="Tutup notifikasi">&times;</button>
  `;

  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    dismissToast(toast);
  });

  container.appendChild(toast);

  // Auto dismiss after 4.5 seconds
  setTimeout(() => {
    dismissToast(toast);
  }, 4500);
}

function dismissToast(toast) {
  if (!toast || toast.classList.contains('dismissing')) return;
  toast.classList.add('dismissing');
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(10px)';
  toast.style.transition = 'all 0.25s ease';
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 260);
}

// ==========================================
// 11. STRING / NUMBER HELPERS
// ==========================================
function formatNumber(num) {
  return new Intl.NumberFormat('id-ID').format(num);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Attach functions to window object so inline HTML onclick handlers can access them
window.toggleFaq = toggleFaq;
window.openRegisterModal = openRegisterModal;
window.closeRegisterModal = closeRegisterModal;
window.handleOrderSubmit = handleOrderSubmit;
window.handleContactSubmit = handleContactSubmit;
window.openDemoModal = openDemoModal;
window.closeDemoModal = closeDemoModal;
window.addDemoItem = addDemoItem;
window.removeDemoItem = removeDemoItem;
window.checkoutDemoOrder = checkoutDemoOrder;
window.resetDemo = resetDemo;
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.handleLoginSubmit = handleLoginSubmit;
window.openMobileMenu = openMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.showToast = showToast;
