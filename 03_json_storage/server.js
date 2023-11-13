const express = require("express");
const app = express();
const loadEnvVars = require("./src/helpers/loadEnvVars");
loadEnvVars();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", require("./src/routes/storage"));


app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});
