const { Pool } = require("pg");

const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const password = process.env.DB_PASSWORD;

const pool = new Pool({
  user,
  host,
  database,
  password,
  port: 5432,
});
// Перевірка з'єднання з базою даних
pool
  .connect()
  .then(() => console.log("Зєднання з базою даних успішно встановлено"))
  .catch((err) => console.error("Помилка зєднання з базою даних", err));

module.exports = pool;
