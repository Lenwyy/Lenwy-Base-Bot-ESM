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


// Export Handler
export default async (lenwy, m) => {
    const msg = m.messages[0]
    if (!msg.message) return

    const body = msg.message.conversation || msg.message.extendedTextMessage?.text || ""
    const sender = msg.key.remoteJid
    const pushname = msg.pushName || "Lenwy"
    const args = body.slice(1).trim().split(" ")
    const command = args.shift().toLowerCase()
    const q = args.join(" ")

    if (!body.startsWith(globalThis.prefix)) return

    const lenwyreply = (teks) => lenwy.sendMessage(sender, { text: teks }, { quoted: msg })

    const isGroup = sender.endsWith("@g.us")
    const isAdmin = globalThis.admin.includes(sender)

    const MenuImage = fs.readFileSync(globalThis.MenuImage);

    switch (command) {
        case "menu": {
            await lenwy.sendMessage(sender, {
                image: MenuImage,
                caption: globalThis.lenwymenu,
                mentions: [sender]
            }, { quoted: msg })
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

        case "igdl": {
            if (!q) return lenwyreply("⚠ *Mana Link Instagramnya?*")
            lenwyreply(globalThis.mess.wait)
            try {
                const apiUrl = `https://www.velyn.biz.id/api/downloader/instagram?url=${encodeURIComponent(q)}`
                const response = await axios.get(apiUrl)

                if (!response.data.status || !response.data.data.url[0]) {
                    throw new Error("Link tidak valid atau API error")
                }

                const { url, metadata } = response.data.data
                const mediaUrl = url[0]

                if (metadata.isVideo) {
                    await lenwy.sendMessage(sender, {
                        video: { url: mediaUrl },
                        caption: `*Instagram Reel*\n\n` +
                            `*Username :* ${metadata.username}\n` +
                            `*Likes :* ${metadata.like.toLocaleString()}\n` +
                            `*Comments :* ${metadata.comment.toLocaleString()}\n\n` +
                            `*Caption :* ${metadata.caption || "-"}\n\n` +
                            `*Source :* ${q}`
                    }, { quoted: msg })
                } else {
                    await lenwy.sendMessage(sender, {
                        image: { url: mediaUrl },
                        caption: `*Instagram Post*\n\n` +
                            `*Username :* ${metadata.username}\n` +
                            `*Likes :* ${metadata.like.toLocaleString()}\n\n` +
                            `*Caption :* ${metadata.caption || "-"}`
                    }, { quoted: msg })
                }
            } catch (error) {
                console.error("Error Instagram DL:", error)
                lenwyreply(globalThis.mess.error)
            }
        }
        break

        case "ytdl": {
            if (!q) return lenwyreply("⚠ *Mana Link YouTube-nya?*")
            lenwyreply(globalThis.mess.wait)
            try {
                if (!ytdl.validateURL(q)) return lenwyreply("⚠ *Link YouTube tidak valid!*")

                const info = await ytdl.getInfo(q)
                const title = info.videoDetails.title
                const thumbnail = info.videoDetails.thumbnails[0].url

                const format = ytdl.chooseFormat(info.formats, {
                    quality: "highest",
                    filter: "audioandvideo"
                })

                if (!format) return lenwyreply("❌ *Tidak bisa mendapatkan video dengan audio!*")

                await lenwy.sendMessage(sender, {
                    video: { url: format.url },
                    caption: `*${title}*\n\n🎥 *YouTube Downloader*`,
                    thumbnail: await (await fetch(thumbnail)).buffer()
                }, { quoted: msg })
            } catch (error) {
                console.error("Error YouTube DL:", error)
                lenwyreply(globalThis.mess.error)
            }
        }
        break

        case "tebakangka": {
            const target = Math.floor(Math.random() * 100)
            lenwy.tebakGame = { target, sender }
            lenwyreply("*Tebak Angka 1 - 100*\n*Ketik !tebak [Angka]*")
        }
        break

        case "tebak": {
            if (!lenwy.tebakGame || lenwy.tebakGame.sender !== sender) return
            const guess = parseInt(args[0])
            if (isNaN(guess)) return lenwyreply("❌ *Masukkan Angka!*")

            if (guess === lenwy.tebakGame.target) {
                lenwyreply(`🎉 *Tebakkan Kamu Benar!*`)
                delete lenwy.tebakGame
            } else {
                lenwyreply(guess > lenwy.tebakGame.target ? "*Terlalu Tinggi!*" : "*Terlalu rendah!*")
            }
        }
        break

        case "quote": {
            const quotes = [
                "Jangan menyerah, hari buruk akan berlalu.",
                "Kesempatan tidak datang dua kali.",
                "Kamu lebih kuat dari yang kamu kira.",
                "Hidup ini singkat, jangan sia-siakan."
            ]
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
            lenwyreply(`*Quote Hari Ini :*\n_"${randomQuote}"_`)
        }
        break

        default: {
            lenwyreply(globalThis.mess.default)
        }
    }
}
