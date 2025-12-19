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
import "./len.js"
import "./database/Menu/LenwyMenu.js"

import fs from "fs"
import axios from "axios";
import { downloadContentFromMessage, jidNormalizedUser, getContentType } from "@whiskeysockets/baileys"
import path from 'path'

// Scrape
import Ai4Chat from "./scrape/Ai4Chat.js"

// Track Messages
const processedMessages = new Set()
const groupMetadataCache = new Map();

// Export Handler
export default async (lenwy, m, meta) => {
    const { body, mediaType, sender: originalSender, pushname } = meta 
    const msg = m.messages[0]
    if (!msg.message) return

    const replyJid = msg.key.remoteJid;

    let authJid = originalSender; 

    const key = msg.key;
    if (key.participantAlt) {
      authJid = key.participantAlt;
    } else if (key.remoteJidAlt) {
      authJid = key.remoteJidAlt;
    } 
    
    const sender = authJid; 
    const normalizedSender = jidNormalizedUser(sender);

    // console.log(chalk.yellow(`[DEBUG JID] Sender Original: ${originalSender}`));
    // console.log(chalk.yellow(`[DEBUG JID] Sender Auth (PN): ${sender}`));
    // console.log(chalk.green(`[DEBUG JID] Sender Normal: ${normalizedSender}`));

    if (msg.key.fromMe) return

    // Anti Double
    if (processedMessages.has(msg.key.id)) return
    processedMessages.add(msg.key.id)
    setTimeout(() => processedMessages.delete(msg.key.id), 30000)

    const pplu = fs.readFileSync(globalThis.MenuImage)
    const len = {
        key: {
            participant: `0@s.whatsapp.net`,
            remoteJid: replyJid 
        },
        message: {
            contactMessage: {
                displayName: `${pushname}`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;Lenwy,;;;\nFN: Lenwy V2.2\nitem1.TEL;waid=${sender.split("@")[0]}:+${sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
                jpegThumbnail: pplu,
                thumbnail: pplu,
                sendEphemeral: true
            }
        }
    }

let usedPrefix = null
    for (const pre of globalThis.prefix) {
        if (body.startsWith(pre)) {
            usedPrefix = pre
            break
        }
    }
    if (!usedPrefix && !globalThis.noprefix) return

    const args = usedPrefix
        ? body.slice(usedPrefix.length).trim().split(" ")
        : body.trim().split(" ")

    const command = args.shift().toLowerCase()
    const q = args.join(" ")

    // Custom Reply
    const lenwyreply = (teks) => lenwy.sendMessage(replyJid, { text: teks }, { quoted: len })

    // Gambar Menu
    const MenuImage = fs.readFileSync(globalThis.MenuImage)

    // Deteksi Grup & Admin
    const isGroup = replyJid.endsWith("@g.us") 

    // Hanya Private
    const IsPriv = !isGroup

    let isAdmin = false
    let isBotAdmin = false

    if (isGroup) {
      let metadata = groupMetadataCache.get(replyJid); 
      if (!metadata) {
        try {
          metadata = await lenwy.groupMetadata(replyJid); 
          groupMetadataCache.set(replyJid, metadata);
        } catch (e) {
          console.error("Gagal mengambil metadata grup:", e);
        }
      }

      if (metadata) {
        const participants = metadata.participants;
        
        const userParticipant = participants.find(p => p.id === msg.key.participant);
        if (userParticipant) {
          isAdmin = userParticipant.admin === 'admin' || userParticipant.admin === 'superadmin';
        }

        const botJid = jidNormalizedUser(lenwy.user.id);
        const botParticipant = participants.find(p => p.id === botJid);

        if (botParticipant) {
          isBotAdmin = botParticipant.admin === 'admin' || botParticipant.admin === 'superadmin';
        } else {
          isBotAdmin = false;
        }
      }
    }

    // Premium
    const premiumPath = path.join(process.cwd(), 'WhatsApp', 'database', 'premium.json')
    const premiumUsers = JSON.parse(fs.readFileSync(premiumPath, 'utf8') || '[]')
    const isPremium = premiumUsers.includes(normalizedSender) 

    const CreatorPath = path.join(process.cwd(), 'WhatsApp', 'database', 'creator.json')
    const isCreatorArray = JSON.parse(fs.readFileSync(CreatorPath, 'utf8') || '[]')
    const isLenwy = isCreatorArray.includes(normalizedSender) 

    // Command Yang Diperbolehkan User Free
    const allowedPrivateCommands = ['menu', 'aimenu', 'downmenu', 'downloadmenu']

    if (!isGroup && !isPremium && !isLenwy && !allowedPrivateCommands.includes(command)) {
        return lenwyreply("⚠️ *Kamu Bukan User Premium!*\n\nKamu Hanya Bisa Menggunakan Fitur *Menu* Di Private Chat");
    }

switch (command) {

case "menu": {
  await lenwy.sendMessage(replyJid, {
    image: MenuImage,
    caption: globalThis.lenwymenu,
    mentions: [normalizedSender]
  }, { quoted: len })
}
break 

case "admin": {
    if (!isAdmin) return lenwyreply(globalThis.mess.admin)
    lenwyreply("🎁 *Kamu Adalah Admin*")
}
break

case "group": {
    if (!isGroup) return lenwyreply(globalThis.mess.group)
    lenwyreply("🎁 *Kamu Sedang Berada Di Dalam Grup*")
}
break

case "private": {
    if (!IsPriv) return lenwyreply(globalThis.mess.private)
    lenwyreply("🎁 *Kamu Sedang Berada Di Dalam Private Chat*")
}

case "panel": {
lenwyreply(`📑 *Halo Ini List Harga panelnya Ya*

*[+] Ram 2Gb*
*[+] CPU 120%*
*[+] Disk 5Gb*
*[+] Rp10.000/Bulan*

*[+] Ram 4Gb*
*[+] CPU 150%*
*[+] Disk 10Gb*
*[+] Rp15.000/Bulan*

*[+] Ram 6Gb*
*[+] CPU 200%*
*[+] Disk 15Gb*
*[+] Rp25.000/Bulan*

*[+] Ram 8Gb*
*[+] CPU 250%*
*[+] Disk 20Gb*
*[+] Rp35.000/Bulan*

*[+] Ram 10Gb*
*[+] CPU 300%*
*[+] Disk 25Gb*
*[+] Rp50.000/Bulan*

📣 *Benefit :*
*[+] Server Pribadi* 
*[+] Bergaransi 30 Hari*  
*[+] Script Kalian Terjamin Aman*  

☘️ *Mau Beli? Bisa Chat :*
🎁 *Chat :* wa.me/6283829814737
🎁 *Langsung Ke Tele :* t.me/ilenwy`)
}
break

// AI Menu =========================

case "aimenu": {
  lenwyreply(globalThis.aimenu)
}
break

case "ai": {
    if (!q) return lenwyreply("☘️ *Contoh:* Ai Apa itu JavaScript?")
    lenwyreply(globalThis.mess.wait)
    try {
        const lenai = await Ai4Chat(q)
        await lenwyreply(`*Lenwy AI*\n\n${lenai}`)
    } catch (error) {
        console.error("Error:", error)
        lenwyreply(globalThis.mess.error)
    }
}
break

// Download Menu =========================

case "downmenu":
case "downloadmenu": {
  lenwyreply(globalThis.downmenu)
}
break

case "tt": 
case "ttdl":
case "tiktok": {
    if (!q) return lenwyreply("⚠ *Mana Link Tiktoknya?*");
    if (!q.includes("tiktok.com")) return lenwyreply("❌ *Link yang Anda berikan bukan link TikTok.*");

    lenwyreply(globalThis.mess.wait);
    
    try {
        const encodedUrl = encodeURIComponent(q.trim());
        const apiUrl = `https://api.fromscratch.web.id/v1/api/down/tiktok?url=${encodedUrl}`;

        const { data: response } = await axios.get(apiUrl);
        
        if (response.status !== 200 || !response.data?.no_watermark) {
            console.error("API TikTok Error Response:", response);
            return lenwyreply(`❌ *Gagal mengunduh video TikTok:*\nStatus: ${response.message || 'Data tidak ditemukan'}`);
        }

        const videoUrl = response.data.no_watermark;
        
        await lenwy.sendMessage(replyJid, {
            video: { url: videoUrl },
            caption: `*🎁 Lenwy Tiktok Downloader*\n*[+] Powered by api.fromscratch.web.id*`
        }, { quoted: len }); //
        
    } catch (error) {
        console.error("Error TikTok DL via API:", error.message);
        lenwyreply(`❌ *Gagal mengunduh video TikTok. Coba Link Lain.*\n*Detail Error:* ${error.message}`);
    }
}
break

        default: { // Reply Pesan Tidak Dikenal
           // lenwyreply(globalThis.mess.default) 
        }
    }
}
