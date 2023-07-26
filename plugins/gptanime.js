import fetch from 'node-fetch';
import querystring from 'querystring';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
if (!text) return m.reply("اكتب شيئا \nمثال:\n.gptanime naruto")
await m.reply(wait)
try {
    const imageUrl = await getImageUrl(text);
    await conn.sendFile(m.chat, imageUrl, "Wallpaper Default", "instagram.com/noureddine_ouafy.", m);
} catch (e) {
await m.reply(eror)
}
}
handler.help = ["gpteso"]
handler.tags = ["internet"]
handler.command = /^(gptanime)$/i
export default handler

/* New Line */
async function getImageUrl(searchQuery) {
  const baseUrl = 'https://api.wer.plus/api/aiw';
  const queryParams = {
    pra: searchQuery.replace(/\s/g, '%20')
  };
  const url = `${baseUrl}?${querystring.stringify(queryParams)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch image URL.');
    }

    const json = await response.json();
    const imageUrl = json.url;

    if (!imageUrl) {
      throw new Error('No image URL found.');
    }

    return imageUrl;
  } catch (error) {
    throw error;
  }
}
