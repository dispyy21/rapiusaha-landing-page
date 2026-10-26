# RapiUsaha — Landing Page & Interactive Showcase

> **Tugas Pekan 4:** Landing Page Development & Deployment  
> **Deskripsi Tugas:** Mengimplementasikan rancangan wireframe menjadi Landing Page yang siap diakses secara daring (Live).  
> **Mitra Proyek:** RapiUsaha — Aplikasi Pengelolaan Usaha untuk UMKM (Kuliner, Retail, Toko Kelontong, Jasa).  
> **Referensi Wireframe:** [Figma Design Canvas](https://www.figma.com/design/4EQQMv7c4VkqwLfRRPoUDW/Untitled?node-id=5-1738&m=dev&t=DefeNggS3NTD1ne1-1)

---

## 🌟 Ringkasan Proyek

RapiUsaha adalah landing page modern dan responsif yang dirancang untuk membantu para pelaku UMKM di Indonesia beralih dari pencatatan manual berceceran ke sistem digital yang ringkas dan otomatis.

Halaman ini mengimplementasikan seluruh struktur wireframe desktop dan mobile dari Figma, dilengkapi dengan **Call-to-Action (CTA) interaktif**, **formulir pendaftaran/pembelian terintegrasi WhatsApp**, **formulir kontak & konsultasi fungsional**, serta **simulator mesin kasir (POS) dan stok interaktif**.

---

## 🚀 Fitur Utama & Kepatuhan Tugas Pekan 4

| Persyaratan Tugas | Implementasi di Halaman | Status |
| :--- | :--- | :---: |
| **Kembangkan Halaman (HTML/CSS/Tailwind/Jamstack)** | Dibangun menggunakan arsitektur HTML5 semantik, Custom Modern CSS Design System (CSS Custom Properties, Glassmorphism, Google Fonts Plus Jakarta Sans), dan Vanilla JavaScript murni tanpa ketergantungan build-step berat. | ✅ Selesai |
| **Formulir Kontak Berfungsi** | Terdapat formulir konsultasi lengkap (`#contact-form`) dengan validasi input, feedback notifikasi instan, dan penyimpanan inquiries otomatis. | ✅ Selesai |
| **Formulir Pembelian / Registrasi Berfungsi** | Modal pendaftaran akun & pembelian paket (`#register-modal`) dengan pilihan paket trial 14 hari, UMKM Dasar (Rp 79rb), dan UMKM Tumbuh (Rp 149rb), terhubung otomatis ke konfirmasi WhatsApp resmi. | ✅ Selesai |
| **Button Call-to-Action (CTA) Berfungsi** | Seluruh tombol CTA (`Coba gratis 14 hari`, `Lihat demo`, `Beli Paket Ini`, `Daftar Sekarang`) memiliki trigger interaktif aktif tanpa broken links. | ✅ Selesai |
| **Simulator POS Interaktif (Showcase Demo)** | Fitur unggulan modal demo interaktif (`#demo-modal`) yang mendemonstrasikan pencatatan kasir, kalkulasi total otomatis, dan pengurangan stok secara real-time. | ✅ Selesai |
| **Deploy ke Server Publik** | Siap dideploy ke Vercel / Netlify / GitHub Pages dengan `vercel.json` bawaan. | ✅ Siap Deploy |

---

## 📂 Struktur Direktori Proyek

```text
Task 4/
├── assets/
│   └── images/
│       ├── hero-dashboard.jpg   # Mockup tampilan dashboard live POS & laporan
│       └── feature-flow.jpg     # Infografis alur transaksi -> stok -> laba rugi
├── css/
│   └── style.css               # Design system, tipografi, grid layout, dan animasi
├── js/
│   └── main.js                 # Logika interaktif: navbar, FAQ accordion, modals, POS simulator, form handlers
├── .gitignore
├── index.html                  # Halaman landing page lengkap & SEO-optimized
├── README.md                   # Dokumentasi teknis & panduan tugas
└── vercel.json                 # Konfigurasi deployment Vercel
```

---

## 🛠️ Cara Menjalankan Secara Lokal

Halaman ini tidak memerlukan proses compile atau build tools yang rumit:

### Opsi 1: Menggunakan Browser Langsung
Cukup buka berkas `index.html` dengan cara klik ganda atau seret ke peramban (Google Chrome, Firefox, Safari, Edge).

### Opsi 2: Menggunakan Local Server (Node.js)
```bash
# Jalankan serve pada port lokal
npx serve -l 8080 .
```
Lalu buka peramban di `http://localhost:8080/`.

---

## 🌐 Panduan Deployment ke Vercel / Netlify / GitHub Pages

### Opsi A: Vercel (Rekomendasi)
1. Buka [Vercel Dashboard](https://vercel.com/new).
2. Impor repositori GitHub atau drag-and-drop folder `Task 4`.
3. Framework Preset: Pilih `Other` (Static HTML).
4. Klik **Deploy** — website akan langsung online dengan domain HTTPS instan (misal: `https://rapiusaha-landing.vercel.app`).

### Opsi B: Netlify
1. Buka [Netlify Drop](https://app.netlify.com/drop).
2. Tarik (drag and drop) folder `Task 4` ke browser.
3. Halaman akan langsung live dalam beberapa detik dengan URL publik.

### Opsi C: GitHub Pages
1. Push folder `Task 4` ke repositori GitHub.
2. Buka menu **Settings** > **Pages**.
3. Pada bagian **Build and deployment**, pilih branch `main` dan folder `/ (root)`.
4. Simpan, URL publik GitHub Pages akan aktif di `https://<username>.github.io/<repo>/`.

---

## 🎨 Palet Warna & Tipografi

- **Primary Brand Color**: Slate Navy `#0F172A` & Electric Sky `#0284C7` / `#38BDF8`
- **Accent Emerald**: `#10B981` (indikator data live & stok aman)
- **Background**: Soft Gray Canvas `#F8FAFC`
- **Typography**: `Plus Jakarta Sans` (400, 500, 600, 700, 800)
