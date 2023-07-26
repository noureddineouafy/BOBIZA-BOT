import fs from 'fs'
import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix: _p }) => {
let info = `بوبيزة متصلة الان بالانترنيت \nيمكنك كتابة \n.menu\n لتنبتق لك جميع الاوامر \n@${m.sender.split('@')[0]} \nhttps://chat.whatsapp.com/FCudAHwTYLtJu242Zv1MmR`
await conn.reply(m.chat, info, m, { contextInfo: { mentionedJid: [m.sender],forwardingScore: 256,
      isForwarded: true, externalAdReply: { title: author, body: bottime,thumbnail: fs.readFileSync('./thumbnail.jpg') }}})
}
handler.customPrefix = /^(tes|سلام|menu|Menu|apk|salam|hy|Hello|.|شكرا|مرحبا)$/i
handler.command = new RegExp

export default handler
