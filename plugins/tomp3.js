import { toAudio } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
   /* let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `🇱🇰 Mention to 💝 Queen Hentai 💝 a video or document for convert to mp3,with the command :\n\n*${usedPrefix + command}*`*/
    let media = await q.download?.()
    if (!media) throw 'حذثت مشكلة راسل صاحب البوت \n instagram.com/noureddine_ouafy'
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw ' Error'
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, null, { mimetype: 'audio/mp4' })
}
handler.help = ['tomp3']
handler.tags = ['fun']
handler.command = /^tomp3$/i

export default handler
