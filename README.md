# ☘️ **Lenwy Base - ESM Version**

Lenwy Base Adalah Sebuah Starter-Kit (Base) Bot WhatsApp Berbasis Node.js Yang Dirancang Menggunakan Arsitektur ESM (ECMAScript Modules). Base Ini Menggunakan Pustaka Baileys Yang Ringan, Modular, Dan Mudah Dikembangkan Untuk Kebutuhan Bot Multi-Platform.

## 🌟 **Fitur Utama**

**[+] Modular Architecture :** Pemisahan Logika Koneksi, Pesan, Dan Fitur Agar Mudah Dikelola.

**[+] Multi-Platform Ready :** Struktur LenwySet.js Yang Memungkinkan Menjalankan Bot WhatsApp Dan Telegram Secara Bersamaan (Telegram Dalam Pengembangan).

**[+] Pairing Code Login :** Login WhatsApp Tanpa Perlu Scan QR, Cukup Menggunakan Kode Pairing Yang Praktis.

**[+] Global Variable Management :** Menggunakan globalThis Untuk Manajemen Prefix, Pesan Respon, Dan Aset Agar Kode Lebih Bersih Dan Efisien.

**[+] Session Manager :** Otomatis Menyimpan Sesi Di Folder LenwySesi Secara Aman Sesuai Dengan Konfigurasi Path.

## 📂 **Struktur Folder**

    LENWY BASE ESM/
    ├── WhatsApp/
    │   ├── database/
    │   │   ├── image/             # Aset Gambar (Contoh: lenwy.jpeg)
    │   │   │   └── lenwy.jpeg
    │   │   ├── Menu/              # Template Teks Menu Bot
    │   │   │   └── LenwyMenu.js
    │   │   ├── creator.json       # Daftar Nomor Owner/Creator
    │   │   └── premium.json       # Daftar Nomor Pengguna Premium
    │   ├── scrape/                # Kumpulan Modul Scraping (AI, Downloader, dll)
    │   │   └── Ai4Chat.js
    │   ├── index.js               # Koneksi Baileys & Manajemen Sesi
    │   ├── len.js                 # Global Message & Config Handler
    │   └── lenwy.js               # Main Command Handler (Switch Case)
    ├── LenwySet.js                # Pusat Kendali & Konfigurasi Global
    ├── package.json               # Dependencies & Script Startup
    └── LenwySesi/                 # (Auto-Generated) Folder Sesi WhatsApp


## ⚙️ **Penjelasan Fungsi File Utama**
**1. LenwySet.js (The Controller)**

Berfungsi Sebagai Gerbang Utama Bot. Di Sini Anda Bisa Mengatur Modul Mana Yang Akan Diaktifkan Menggunakan Sistem True/False

```javascript
const config = {
  whatsapp: true,
  telegram: false // Tahap Pengembangan
};
```

Jika whatsapp Bernilai True, Maka Sistem Akan Otomatis Memanggil Dan Menjalankan WhatsApp/index.js.

**2. WhatsApp/index.js (The Core Connection)**

File Ini Menangani Seluruh Alur Koneksi Ke Server WhatsApp. Menggunakan Multi-File Auth State Dan Mendukung Pairing Code.

**Manajemen Autentikasi :** Sesi Akan Disimpan Secara Otomatis Di Luar Folder WhatsApp Untuk Keamanan.

```JavaScript
const { state, saveCreds } = await useMultiFileAuthState(
  path.resolve(__dirname, "../LenwySesi")
)
```

**Logika Pairing Code :** Jika Fitur usePairingCode Aktif, Bot Akan Meminta Input Nomor WhatsApp Di Terminal Dan Menghasilkan Kode Unik.

```JavaScript
if (usePairingCode && !lenwy.authState.creds.registered) {
    const phoneNumber = await question("☘️ Masukan Nomor Yang Diawali Dengan 62 :\n")
    const code = await lenwy.requestPairingCode(phoneNumber.trim())
    console.log(`🎁 Pairing Code : ${code}`)
}
```

**3. WhatsApp/len.js (Global Manager)**

Mengatur Variabel Yang Bisa Diakses Di Seluruh File Tanpa Perlu Import Berulang Menggunakan globalThis.

```javascript
globalThis.prefix = ['#', '.', '!', '/']; // Multi Prefix
globalThis.noprefix = false; // Set True Untuk Menonaktifkan Prefix

globalThis.mess = {
    wait: '☕ *Sedang Diproses...*',
    admin: '⚠ *Fitur Ini Khusus Admin Grup!*',
    group: '⚠ *Fitur Ini Hanya Dapat Digunakan Di Dalam Grup!*',
    creator: '⚠ *Fitur Ini Hanya Untuk Owner Bot!*',
    error: '⚠ *Terjadi Kesalahan Pada Sistem*'
};
```

**4. WhatsApp/lenwy.js (Feature Logic)**

Tempat Semua Fitur Bot Diletakkan Menggunakan Struktur switch case. File Ini Adalah Jantung Dari Interaksi Bot. Contoh Implementasi Kondisi :

```javascript
switch (command) {
    case "admin": {
        if (!isAdmin) return lenwyreply(globalThis.mess.admin) // Cek Status Admin
        lenwyreply("🎁 *Akses Diterima, Anda Adalah Admin*")
    }
    break

   case "private": {
       if (!IsPriv) return lenwyreply(globalThis.mess.private) // Cek Lokasi Chat (Private)
       lenwyreply("🎁 *Kamu Sedang Berada Di Dalam Private Chat*")
   }
   break

    case "group": {
        if (!isGroup) return lenwyreply(globalThis.mess.group) // Cek Lokasi Chat (Group)
        lenwyreply("🎁 *Bot Berhasil Merespon Di Dalam Grup*")
    }
    break

    case "menu": {
        await lenwy.sendMessage(replyJid, {
            image: MenuImage, // Diambil Dari globalThis di len.js
            caption: globalThis.lenwymenu,
            mentions: [sender]
        }, { quoted: len })
    }
    break
}
```

## 📦 **Cara Instalasi**

Pastikan Anda Sudah Menginstall Node.js (Versi LTS Direkomendasikan).

**1. Clone Repositori**

    git clone https://github.com/Lenwyy/Lenwy-Base-Bot-ESM

**2. Masuk Ke Direktori**

    cd Lenwy-Base-Bot-ESM

**3. Install Dependencies**

    npm install

**4. Jalankan Bot**

    npm start

## 🎁 **Informasi Developer**
**Author : Lenwy**

**YouTube : Lenwy**

**Instagram : @Ilenwy_**

## 🤝 **Kontribusi**
Kontribusi Selalu Terbuka! Jika Anda Ingin Meningkatkan Base Ini, Silakan Lakukan Fork Dan Ajukan Pull Request.

#### **Copyright © 2026 Lenwy**
