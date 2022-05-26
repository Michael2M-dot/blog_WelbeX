// регулярка для проверки ID
const REGEX_PASSWORD = (/^(?=.+[0-9])(?=.+[!@#$%&-_])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%&-_]{8,}$/);

module.exports = { REGEX_PASSWORD };
