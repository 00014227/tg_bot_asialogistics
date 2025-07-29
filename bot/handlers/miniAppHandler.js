const t = require('../utils/lang');

module.exports = (bot, userState) => {
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Получаем язык пользователя, по умолчанию 'ru'
    const langCode = (userState[chatId] && userState[chatId].lang) || 'ru';

    if (text === t(langCode, 'menu_calculator')) {
      bot.sendMessage(chatId, t(langCode, 'open_calculator'), {
        reply_markup: {
          inline_keyboard: [
            [{ text: t(langCode, 'open_calculator'), web_app: { url: 'https://bot.transosiyo-express.uz/' } }]
          ]
        }
      });
    }

    if (text === t(langCode, 'menu_order')) {
      bot.sendMessage(chatId, t(langCode, 'open_order'), {
        reply_markup: {
          inline_keyboard: [
            [{ text: t(langCode, 'open_order'), web_app: { url: 'https://bot.transosiyo-express.uz/order' } }]
          ]
        }
      });
    }
  });
};
