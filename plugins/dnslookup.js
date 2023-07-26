import fetch from "node-fetch"

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Enter Domain/Sub Domain!\n\n*exemple:* botcahx.live`;

  if (text.includes('https://') || text.includes('http://')) throw `الرجاء إدخال المجال الكامل / المجال الفرعي. مثال: botcahx.live`;

  try {
    // fetch pertama
    const api_key = 'E4/gdcfciJHSQdy4+9+Ryw==JHciNFemGqOVIbyv';
    const res1 = await fetch(`https://api.api-ninjas.com/v1/dnslookup?domain=${text}`, {
      headers: { 'X-Api-Key': api_key },
      contentType: 'application/json'
    })
    .then(response => response.text())
    .catch(error => {
      console.log(error);
      return fetch(`https://api.hackertarget.com/dnslookup/?q=${text}`)
      .then(response => response.text())
      .then(data => {
        m.reply(`*هذه نتائج بحث عن نظام أسماء النطاقات ${text}:*\n${data}`);
        console.log(data);
      })
      .catch(error => {
        console.error(error);
        m.reply('*غير قادر على معالجة طلب بحث DNS*');
      });
    });
    m.reply(`*هذه نتائج بحث عن نظام أسماء النطاقات ${text}:*\n${res1}`);
    console.log(res1);

  } catch (error) {
    console.log(error);
    m.reply('*Invalid data!*');
  }
};

handler.command = ['dnslookup', 'hackertarget', 'lookup','dns'];
handler.help = ['dnslookup', 'hackertarget', 'lookup','dns'];
handler.tags = ['internet'];
handler.premium = false;

export default handler
