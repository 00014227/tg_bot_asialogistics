const state = {};

module.exports = {
  get: (chatId) => state[chatId] || {},
  set: (chatId, data) => {
    state[chatId] = { ...state[chatId], ...data };
  },
  clear: (chatId) => {
    delete state[chatId];
  },
};
