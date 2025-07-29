const t = require('../utils/lang');

module.exports = (bot, userState) => {
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Проверяем, выбран ли язык
    if (!userState[chatId] || !userState[chatId].lang) return;

    const langCode = userState[chatId].lang;

    if (text === t(langCode, 'menu_info')) {
      bot.sendMessage(chatId, t(langCode, 'company_info'));
    }
  });
};
