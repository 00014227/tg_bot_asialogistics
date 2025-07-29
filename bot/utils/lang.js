const lang = require('../lang.json')

function t(langCode, key, params = {}) {
    let text = lang[langCode][key] || ''; 

    Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
    });

    return text;
}

module.exports = t 

