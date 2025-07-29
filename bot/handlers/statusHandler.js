const t = require('../utils/lang');

module.exports = (bot, userState) => {
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Инициализируем хранилище, если его нет
    if (!userState[chatId]) userState[chatId] = {};

    const langCode = userState[chatId].lang || 'ru'; // язык по умолчанию

    // Проверка: пользователь выбрал "Проверить статус заказа"
    if (
      text === t(langCode, 'menu_check_status') // на любом языке
    ) {
      bot.sendMessage(chatId, t(langCode, 'check_status')); // сообщение "Введите номер заказа"
      userState[chatId].awaitingOrderNumber = true;
      return;
    }

    // Пользователь отправил номер заказа
    if (userState[chatId].awaitingOrderNumber) {
      const orderId = text.trim();
      const trackUrl = `https://my.transosiyo-express.uz/track?id=${orderId}&ids=${orderId}`;

      const message = `🔍 [${t(langCode, 'status_result', {
        orderId,
        status: '🔗 Ссылка ниже',
      })}](${trackUrl})`;

      await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
      userState[chatId].awaitingOrderNumber = false;
    }
  });
};
