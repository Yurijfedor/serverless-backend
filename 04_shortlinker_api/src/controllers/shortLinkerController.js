const pool = require("../db");
const { validateUrl, generateShortLink } = require("../helpers/urlHandler");

exports.makeShortLInk = async (req, res) => {
  const { url } = req.body;

  if (!url || !validateUrl(url)) {
    return res
      .status(400)
      .send({ error: "Необхідно передати дійсний URL в правильному форматі" });
  }

  const shortLink = generateShortLink(url);

  try {
    await pool.query(
      "INSERT INTO links (originalLink, shortLink) VALUES ($1, $2)",
      [url, shortLink]
    );
    res.status(201).send({ url, shortLink });
  } catch (err) {
    console.error(err);
    res.status(500).send("Помилка при збереженні даних");
  }
};

exports.getOriginalUrl = async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const result = await pool.query(
      "SELECT originallink FROM links WHERE shortLink LIKE $1",
      [`%${shortId}`]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Посилання не знайдено");
    }

    const originalLink = result.rows[0].originallink;
    res.redirect(301, originalLink);
  } catch (err) {
    console.error(err);
    res.status(500).send("Помилка переадресації");
  }
};
