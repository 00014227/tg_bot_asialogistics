const t = require('../utils/lang');

module.exports = (bot, userState) => {
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Проверка выбранного языка
    if (!userState[chatId] || !userState[chatId].lang) return;
    const langCode = userState[chatId].lang;

    if (text === t(langCode, 'menu_pickup_points')) {
      bot.sendMessage(chatId, getPickupPointsMessage(), { parse_mode: 'HTML' });
    }
  });
};

function getPickupPointsMessage() {
  return `
📍 <b>Пункты выдачи TRANSASIA:</b>

<b>Фергана</b> — ул. Ал Фаргоний 15, Магазин 1  
<b>Навои</b> — ул. Галаба Шох 149/1  
<b>Андижан</b> — ул. Бобур 3г  
<b>Нукус</b> — ул. Аллаяра Досназарова, д. 26/8  
<b>Самарканд</b> — массив Мархабо, ул. Буюк Ипак Йоли, д. 112  
<b>Ургенч</b> — ул. Хонка 46  
(старый адрес: ул. Ал Хоразимий, д. 20)  
<b>Бухара</b> — ул. Садриддина Айни, д. 7  
<b>Термез</b> — Тупроккогон МФЙ, ул. Умид, д. 2, кв. 10  
<b>Гулистан</b> — Шодлик МФЙ, ул. Хондамир, д. 27Г  
<b>Карши</b> — ул. Ислам Каримов, д. 227  
<b>Наманган</b> — ул. Торакоргон, д. 176  
<b>Джизак</b> — ул. Алишера Навои, д. 153  
<b>Ташкент (Склад)</b> — ул. Муйнак, д. 241
  `;
}
