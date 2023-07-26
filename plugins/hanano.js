const { NeoxrApi } = await(await import( '../lib/neoxr.js' ))
import fetch from  'node-fetch' 
let handler = async (m, {
    text,
    command,
    usedPrefix,
    conn
}) => {

var salah_input = "*Example:*\n" + usedPrefix + command + " cyberpunk \n*[ Menampilkan list gambar cyberpunk ]*\n"
if (!text) throw salah_input
try {
let neo = new NeoxrApi( kyaOnechan )
let res = await neo.diffusion(text)
let randm = res.data
    let resul = randm.getRandom()

var arr = ["《 ███▒▒▒▒▒▒▒▒▒▒▒》20%",
  "《 ██████▒▒▒▒▒▒▒▒》40%",
  "《 █████████▒▒▒▒▒》60%",
  "《 ████████████▒▒》80%",
  "《 ██████████████》100%",
  "تم!"
  ]
let {key} = await conn.sendMessage(m.chat, {text:wait})
for (let i = 0; i < arr.length; i++) {
await new Promise(resolve =>
setTimeout(resolve, 100));

await conn.sendMessage(m.chat,
{text: arr[i], edit: key });
}
    await conn.sendFile(m.chat,
    resul.url, text, "*[ Result ]*\n" + text, m)
} catch (e) {
try {
    let res = await(await fetch( 'https://lexica.art/api/v1/search?q= ' + text)).json()
    let randm = res.images
    let resul = randm.getRandom()
var arr = ["《 ███▒▒▒▒▒▒▒▒▒▒▒》20%",
  "《 ██████▒▒▒▒▒▒▒▒》40%",
  "《 █████████▒▒▒▒▒》60%",
  "《 ████████████▒▒》80%",
  "《 ██████████████》100%",
  "حنان شريرة",
  "حنان سيئة الحظ",
  "حنان ضربت رأسها مع الحيط",
  "لا تكن مثل حنان 😝",
  "آسف يا حنان 😁"
  ]
let {key} = await conn.sendMessage(m.chat, {text:wait})
for (let i = 0; i < arr.length; i++) {
await new Promise(resolve =>
setTimeout(resolve, 100));

await conn.sendMessage(m.chat,
{text: arr[i], edit: key });
}
    await conn.sendFile(m.chat, 
    resul.src, text, "*[ Result ]*\n" + resul.prompt, m)
    } catch (e) {
    throw eror
    }
    }
}
handler.help = ["lexica"]
handler.tags = [ 'internet' ]
handler.command = ["حنان"]

export default handler
