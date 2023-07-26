import { download } from 'aptoide-scraper';

let handler = async (m, { conn, usedPrefix: prefix, command, text }) => {
  try {
    if (command === 'bobizaapk') {
      if (!text) throw `*المرجو كتابة إسم التطبيق الذي تود تحميله يا صديقي.*\nمتابعتك لي في الانستغرام تجعلني أضيف ميزات جديدة للبوت\ninstagram.com/noureddine_ouafy`;

      await conn.reply(m.chat, global.wait, m);
      let data = await download(text);

      if (data.size.replace(' MB', '') > 200) {
        return await conn.sendMessage(m.chat, { text: '*[⛔] The file is too large.*' }, { quoted: m });
      }

      if (data.size.includes('GB')) {
        return await conn.sendMessage(m.chat, { text: '*[⛔] The file is too large.*' }, { quoted: m });
      }

      await conn.sendMessage(
        m.chat,
        { document: { url: data.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data.name + '.apk', caption: null },
        { quoted: m }
      );
    }
  } catch {
    throw `*المرجو ارسال رابط او اسم التطبيق الذي تريد تحميله.*\nمثال : \n.bobizaapk facebook lite\n لا تنسى متابعتي في الانستغرام \ninstagram.com/noureddine_ouafy`;
  }
};

handler.command = /^bobizaapk$/i;
export default handler;
