const axios = require("axios");
const sheetsService = require("../services/sheetsService");

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const MANAGER_CHAT_ID = process.env.MANAGER_CHAT_ID; // добавьте это в .env

exports.submitOrder = async (req, res) => {
  try {
    const {
      deliveryType,
      senderName,
      senderPhone,
      senderAddress,
      recipientName,
      recipientPhone,
      recipientAddress,
      weight,
    } = req.body;

    const date = new Date().toLocaleString("ru-RU");

    // Подготовка строки для Google Sheets
    const row = [
      date,
      deliveryType,
      `${senderName} (${senderPhone})`,
      senderAddress,
      `${recipientName} (${recipientPhone})`,
      recipientAddress,
      weight,
    ];

    await sheetsService.appendRow("Заявки!A2:G", row);

    // Сообщение для Telegram
    const message = `
📦 *Новая заявка!*

🚚 Вариант: ${deliveryType}
👤 Отправитель: ${senderName} (${senderPhone})
📍 Адрес отправителя: ${senderAddress}
👤 Получатель: ${recipientName} (${recipientPhone})
📍 Адрес получателя: ${recipientAddress}
⚖️ Вес: ${weight} кг
    `;

    // Отправка сообщения менеджеру
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: MANAGER_CHAT_ID,
      text: message,
      parse_mode: "Markdown"
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Ошибка при приёме заявки:", error);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};
