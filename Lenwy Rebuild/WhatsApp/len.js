/*  

  Made By Lenwy
  Base : Lenwy
  WhatsApp : wa.me/6283829814737
  Telegram : t.me/ilenwy
  Youtube : @Lenwy

  Channel : https://whatsapp.com/channel/0029VaGdzBSGZNCmoTgN2K0u

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D

  Mohon Untuk Tidak Menghapus Watermark Di Dalam Kode Ini

*/

// Import Module
import { fileURLToPath } from 'url';
import path from "path";
import fs from "fs";

// Path ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Admin
globalThis.admin = ['6283189202482@s.whatsapp.net']; // Sesuaikan Nomor Admin

// Custom Credit Sticker
globalThis.spackname = 'Lenwy Rebuild'; // Ganti Sesuai Keinginan
globalThis.sauthor = 'Youtube : Lenwy\nBot: 0856-2497-5232'; // Ganti Sesuai Keinginan

// Custom Prefix
globalThis.prefix = ['#', '.', '!', '/']; // Multi Prefix (Custom Prefix)
globalThis.noprefix = false; // True = Tanpa Prefix, False = Pakai Prefix 

// Custom Menu Image
globalThis.MenuImage = path.join(__dirname, "./database/image/lenwy.jpeg"); // Ganti Dengan Path Gambar Menu

// Custom Message
globalThis.mess = {
    wait: '☕ *One Moment, Please*',
    error: '⚠ *Gagal Saat Melakukan Proses*',
    default: '📑 *Perintah Tidak Dikenali*',
    admin: '⚠ *Perintah Ini Hanya Bisa Digunakan Oleh Admin*',
    group: '⚠ *Perintah Ini Hanya Bisa Digunakan Di Dalam Grup*',
};
