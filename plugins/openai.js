import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*مثال*\n*.openai* ما هي عاصمة المغرب `;

  try {
    const response = await fetch(`https://guru-scrapper.cyclic.app/api/chatgpt?query=${encodeURIComponent(text)}`);
    const data = await response.json();
    const { text: result } = data.data || {};
    const model = data.data?.detail?.model;
    const creator = data.creator || '';
    const fullResult = `${result}\n\nfollow me : instagram.com/noureddine_ouafy\n`;
    m.reply(fullResult.trim());
  } catch (error) {
    console.error('Error:', error); // Log the error
    throw `*ERROR*`;
  }
};

handler.command = ['bro', 'openai', 'siri'];
handler.diamond = false;

export default handler;
