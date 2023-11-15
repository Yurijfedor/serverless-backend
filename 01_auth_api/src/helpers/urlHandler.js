const { v4: uuidv4 } = require("uuid");

const validateUrl = (url) => {
  const regex =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*(\?.*)?\/?$/;
  return regex.test(url);
};

const generateShortLink = (url) => {
  const parsedUrl = new URL(url);
  const baseUrl = `${parsedUrl.hostname}/`;
  const uuid = uuidv4().slice(0, 8);
  return `${baseUrl}${uuid}`;
};
module.exports = { validateUrl, generateShortLink };
