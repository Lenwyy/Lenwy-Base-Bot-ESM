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
import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion,  downloadContentFromMessage, getContentType } from "@whiskeysockets/baileys"
import pino from "pino"
import chalk from "chalk"
import readline from "readline"
import path from "path"
import { fileURLToPath } from "url"
import os from "os"

// Path ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Pairing Mode
const usePairingCode = true

// Fungsi Input Terminal
async function question(prompt) {
  process.stdout.write(prompt)
  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    r1.question("", (ans) => {
      r1.close()
      resolve(ans)
    })
  })
}

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState(
    path.resolve(__dirname, "../LenwySesi")
  )

  const { version, isLatest } = await fetchLatestBaileysVersion()
  console.log(`Lenwy Using WA v${version.join(".")}, isLatest: ${isLatest}`)

  const lenwy = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: !usePairingCode,
    auth: state,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    version,
    syncFullHistory: true,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id)
        return msg?.message || undefined
      }
      return {}
    }
  })

  // Handle Pairing
  if (usePairingCode && !lenwy.authState.creds.registered) {
    try {
      const phoneNumber = await question("☘️ Masukan Nomor Yang Diawali Dengan 62 :\n")
      const code = await lenwy.requestPairingCode(phoneNumber.trim())
      console.log(`🎁 Pairing Code : ${code}`)
    } catch (err) {
      console.error("Failed to get pairing code:", err)
    }
  }

  lenwy.ev.on("creds.update", saveCreds)

  lenwy.ev.on("connection.update", (update) => {
    const { connection } = update
    if (connection === "close") {
      console.log(chalk.red("❌  Koneksi Terputus, Mencoba Menyambung Ulang"))
      connectToWhatsApp()
    } else if (connection === "open") {
      console.log(chalk.green("✔  Bot Berhasil Terhubung Ke WhatsApp"))
    }
  })

  // Console Log
  lenwy.ev.on("messages.upsert", async (m) => {
    const msg = m.messages[0]
    if (!msg.message) return

    const body =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      ""
    const sender = msg.key.remoteJid
    const pushname = msg.pushName || "Lenwy"

    const listColor = ["red", "green", "yellow", "magenta", "cyan", "white", "blue"]
    const randomColor = listColor[Math.floor(Math.random() * listColor.length)]

    console.log(
      chalk.yellow.bold("Credit : Lenwy"),
      chalk.green.bold("[ WhatsApp ]"),
      chalk[randomColor](pushname),
      chalk[randomColor](" : "),
      chalk.white(body)
    )

    // Import Handler 
    const { default: handler } = await import("./lenwy.js")
    handler(lenwy, m)

    // Handler Tipe Media
  const unwrapMessage = (m) => {
    let msg = m?.message ?? m
    while (msg?.ephemeralMessage || msg?.viewOnceMessage || msg?.viewOnceMessageV2 || msg?.viewOnceMessageV2Extension || msg?.documentWithCaptionMessage) {
    msg =
      msg?.ephemeralMessage?.message ??
      msg?.viewOnceMessage?.message ??
      msg?.viewOnceMessageV2?.message ??
      msg?.viewOnceMessageV2Extension?.message ??
      msg?.documentWithCaptionMessage?.message
  }
  return msg
}

// Download Media Message
lenwy.downloadMediaMessage = async (input) => {
  const root = input?.message ? input : { message: input }
  const unwrapped = unwrapMessage(root.message)

  const type = getContentType(unwrapped)
  if (!type) throw new Error('Tidak ada media pada pesan')

  const msgContent = unwrapped[type]
  const mediaKind = type.replace('Message', '') // 'image' | 'video' | 'sticker' | 'audio' | 'document'

  const stream = await downloadContentFromMessage(msgContent, mediaKind)
  let buffer = Buffer.alloc(0)
  for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk])

  const mimetype =
    msgContent.mimetype ||
    (mediaKind === 'sticker' ? 'image/webp' : undefined)

  return { buffer, mimetype, type: mediaKind }
}
  })
}

// Default export agar bisa dipanggil dari LenwySet.js
export default connectToWhatsApp
