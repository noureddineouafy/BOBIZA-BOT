import puppeteer from "puppeteer"
import fetch from "node-fetch"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "مثال \n.chatgpt1 عاصمة المغرب"
    await m.reply(wait)
    try {
        let res = await ChatGpt(text)
        await m.reply(res)
    } catch (e) {
        try {
            let res = await ChatGptV2(text)
            await m.reply(res.answer)
        } catch (e) {
        try {
            let res = await ChatGptV3(text)
            await m.reply(res[0].generated_text)
            } catch (e) {
            throw eror
            }
        }
    }
}
handler.help = ["chatgpt"]
handler.tags = ["internet"]
handler.command = /^chatgpt1$/i

export default handler

/* New Line */
async function ChatGpt(input) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://chatgpt.botwa.me/');

    // Masukkan teks ke dalam tag div dengan class input
    await page.type('div.input', input);

    // Masukkan teks ke dalam tag input dengan class user-input
    await page.type('input.user-input', input);

    // Klik tombol dengan class button-submit
    await page.click('button.button-submit');

    // Tunggu sampai pesan muncul di dalam class message animated fadeInLeftBig, kecuali yang sebelumnya
    await page.waitForSelector('.message.animated.fadeInLeftBig:not(:first-child)');

    // Ambil teks dari pesan yang muncul
    const message = await page.$eval('.message.animated.fadeInLeftBig:not(:first-child)', el => el.textContent);
    // Cetak output pesan yang muncul
    return message;
    await browser.close();
}

async function ChatGptV2(query) {
  try {
    const response = await fetch(`https://api.caonm.net/api/ai/o.php?msg=${query}`);
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
async function ChatGptV3(query) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/gpt2", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer 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",
                },
                body: JSON.stringify({
                    inputs: query
                }),
            }
        );

        return await response.json();
    } catch (error) {
        console.error('Error:', error.message);
    }
}
