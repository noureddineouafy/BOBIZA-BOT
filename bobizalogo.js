import axios from 'axios'
import fs from 'fs'
import fetch from 'node-fetch'
import formData from 'form-data'
import cheerio from 'cheerio'

let split = '|'
let handler = async (m, {
    conn,
    args: [effect],
    text: txt,
    usedPrefix,
    command
}) => {
    var effects = await theme()
    var salah = 'اكتب الامر متبوعا برقم التأثير + الكلمة التي تريد تحويلها للوغو\n مثلا:\n.bobizalogo 23 noureddine\n\n' + effects.map((v, index) => {
        return `${++index}. ${v.title}`
    }).join('\n')
    if (!effect) return m.reply(salah)
    effect = effect.toLowerCase()
    if (!effects[effect - 1]) return m.reply(salah)
    let text = txt.replace(new RegExp(effect, 'gi'), '').trimStart()
    if (text.includes(split)) text = text.split(split)
    text = Array.isArray(text) ? text : [text]
    await m.reply(wait)
    let res = await tekspro(effect, ...text)
    if (typeof res == 'number') return m.reply(salah)
    const proxyurl = 'https://files.xianqiao.wang/';
    let tag = `@${m.sender.replace(/@.+/, '')}`
    await conn.sendMessage(m.chat, {
        image: {
            url: proxyurl + res
        },
        caption: `instagram.com/noureddine_ouafy ${tag}`,
        mentions: [m.sender]
    }, {
        quoted: m
    })
}
handler.help = ['tekspro'].map(v => v + ' <effect> <text>')
handler.tags = ['maker']
handler.command = /^(bobizalogo)$/i

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

async function tekspro(effect, ...texts) {
    var effects = await theme()
    texts = texts.filter(v => v);
    let eff = effects[effect - 1];
    if (!eff) return -1
    let resCookie = await fetch(eff.url, {
        headers: {
            "User-Agent": "GoogleBot",
        },
    })
    let html = await resCookie.text()
    const $$$ = cheerio.load(html)
    let textRequire = [!!$$$('#text-0').length, !!$$$('#text-1').length, !!$$$('#text-2').length].filter(v => v)
    // console.log({ textRequire, texts, textRequireLength: textRequire.length, textsLength: texts.length })
    if (textRequire.length > texts.length) return textRequire.length
    let cookieParse = (cookie, query) => cookie.includes(query + '=') ? cookie.split(query + '=')[1].split(';')[0] : 'undefined'
    let hasilcookie = resCookie.headers
        .get("set-cookie")
    hasilcookie = {
        __cfduid: cookieParse(hasilcookie, '__cfduid'),
        PHPSESSID: cookieParse(hasilcookie, 'PHPSESSID')
    }
    hasilcookie = Object.entries(hasilcookie).map(([nama, value]) => nama + '=' + value).join("; ")
    const $ = cheerio.load(html)
    const token = $('input[name="token"]').attr("value")
    const form = new formData()
    for (let text of texts) form.append("text[]", text)
    form.append("submit", "Go")
    form.append("token", token)
    form.append("build_server", "https://textpro.me")
    form.append("build_server_id", 1)
    let resUrl = await fetch(eff.url, {
        method: "POST",
        headers: {
            Accept: "*/*",
            "Accept-Language": "en-US,en;q=0.9",
            "User-Agent": "GoogleBot",
            Cookie: hasilcookie,
            ...form.getHeaders(),
        },
        body: form.getBuffer(),
    })
    const $$ = cheerio.load(await resUrl.text())
    let token2 = JSON.parse($$('#form_value').eq(1).text())
    let encode = encodeURIComponent;
    let body = Object.keys(token2)
        .map((key) => {
            let vals = token2[key];
            let isArray = Array.isArray(vals);
            let keys = encode(key + (isArray ? "[]" : ""));
            if (!isArray) vals = [vals];
            let out = [];
            for (let valq of vals) out.push(keys + "=" + encode(valq));
            return out.join("&");
        })
        .join("&")
    let resImgUrl = await fetch(`https://textpro.me/effect/create-image?${body}`, {
        headers: {
            Accept: "*/*",
            "Accept-Language": "en-US,en;q=0.9",
            "User-Agent": "GoogleBot",
            Cookie: hasilcookie,
        }
    })
    let results = await resImgUrl.json()
    return 'https://textpro.me' + results.fullsize_image
}

async function fetchData(url) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const effects = [];

  $('.col-md-4').each((index, element) => {
    const url = $(element).find('.div-effect a').attr('href');
    const title = $(element).find('.title-effect-home').text();
    effects.push({ url: 'https://textpro.me' + url, title: title });
  });

  return effects;
}

async function mergeAndFilterArray(arr1, arr2, arr3, arr4) {
  const mergedArray = [...arr1, ...arr2, ...arr3, ...arr4];
  const filteredArray = mergedArray.filter(
    (item, index) => mergedArray.findIndex(obj => obj.url === item.url) === index
  );
  return filteredArray;
}

async function theme() {
const effects1 = await fetch('https://raw.githubusercontent.com/AyGemuy/Textpro-Theme/master/textprome.json').then(response => response.json());
const effects2 = await fetchData('https://textpro.me');
const effects3 = await fetchData('https://textpro.me/home-p2');
const effects4 = await fetchData('https://textpro.me/home-p2');

return await mergeAndFilterArray(effects1, effects2, effects3, effects4);
}
