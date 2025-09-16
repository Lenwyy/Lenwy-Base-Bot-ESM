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
import axios from "axios"
import fetch from "node-fetch"
import ytdl from "ytdl-core"

import Ai4Chat from "./scrape/Ai4Chat.js"
import tiktok2 from "./scrape/Tiktok.js"

import { writeExif } from "./lib/sticker.js"

// Track Messages
const processedMessages = new Set()

// Export Handler
export default async (lenwy, m) => {
    const msg = m.messages[0]
    if (!msg.message) return

    // Jangan Balas Pesan Sendiri (Bot)
    if (msg.key.fromMe) return

    // Anti Double
    if (processedMessages.has(msg.key.id)) return
    processedMessages.add(msg.key.id)
    setTimeout(() => processedMessages.delete(msg.key.id), 30000)

    const body = msg.message.conversation || msg.message.extendedTextMessage?.text || ""
    const sender = msg.key.remoteJid
    const pushname = msg.pushName || "Lenwy"

    // Default Quoted Lenwy
    const pplu = fs.readFileSync(globalThis.MenuImage) // Ganti Sesuai Keinginan
    const len = {
        key: {
            participant: `0@s.whatsapp.net`,
            ...(msg.chat ? { remoteJid: `status@broadcast` } : {})
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

// Multi Prefix + Tanpa Prefix
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
    const lenwyreply = (teks) => lenwy.sendMessage(sender, { text: teks }, { quoted: len })

    // Kondisi
    const isGroup = sender.endsWith("@g.us")
    const isAdmin = globalThis.admin.includes(sender)

    // Gambar Menu
    const MenuImage = fs.readFileSync(globalThis.MenuImage)

switch (command) {
case "menu": {
    await lenwy.sendMessage(sender, {
        image: MenuImage,
        caption: globalThis.lenwymenu,
        mentions: [sender]
    }, { quoted: len }) // pakai quoted privasi
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

case "ai": {
    if (!q) return lenwyreply("☘️ *Contoh:* !ai Apa itu JavaScript?")
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

case "ttdl": {
    if (!q) return lenwyreply("⚠ *Mana Link Tiktoknya?*")
    lenwyreply(globalThis.mess.wait)
    try {
        const result = await tiktok2(q)
        await lenwy.sendMessage(sender, {
            video: { url: result.no_watermark },
            caption: `*🎁 Lenwy Tiktok Downloader*`
        }, { quoted: msg })
    } catch (error) {
        console.error("Error TikTok DL:", error)
        lenwyreply(globalThis.mess.error)
    }
}
break

case 's':
case 'sticker': {
  const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage
  const mediaSource = quoted || msg.message

  const hasMedia =
    mediaSource?.imageMessage ||
    mediaSource?.videoMessage ||
    mediaSource?.stickerMessage ||
    mediaSource?.documentMessage ||
    mediaSource?.audioMessage

  if (!hasMedia) return lenwyreply('⚠️ *Reply Media Yang Ingin Di Jadikan Sticker*')

  try {
    const { buffer, mimetype } = await lenwy.downloadMediaMessage({ message: mediaSource })

    const stickerPath = await writeExif(
      { mimetype, data: buffer },
      { packname: globalThis.spackname, author: globalThis.sauthor }
    )

    await lenwy.sendMessage(sender, { sticker: fs.readFileSync(stickerPath) }, { quoted: len })
  } catch (e) {
    console.error('Sticker Error:', e)
    lenwyreply('❌ Gagal membuat sticker')
  }
}
break

        default: { // Reply Pesan Tidak Dikenal
           // lenwyreply(globalThis.mess.default) 
        }
    }
}
