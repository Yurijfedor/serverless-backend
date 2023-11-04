const express = require("express");
const app = express();
const pool = require("./src/db");
const loadEnvVars = require("./src/helpers/loadEnvVars");
loadEnvVars();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", require("./src/routes/auth"));

app.use(
  "/me",
  require("./src/middleware/authMiddleware"),
  require("./src/routes/protected")
);

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});
