const sheets = require('../config/googleSheets');
const spreadsheetId = process.env.GOOGLE_SHEET_ID;

exports.appendRow = async (range, values) => {
    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [values],
        },
    });
};

exports.findOrderStatus = async (orderId) => {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Заявки!A2:H',
    });
    const rows = res.data.values;
    if (rows.length) {
        const order = rows.find(row => row[0] === orderId);
        return order ? order[7] : 'Не найдено';
    }
    return 'Не найдено';
};
