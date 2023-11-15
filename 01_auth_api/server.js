const express = require("express");
const app = express();
const loadEnvVars = require("./src/helpers/loadEnvVars");
loadEnvVars();

const port = process.env.PORT || 3000;

app.use(express.json());

// task #1
app.use("/auth", require("./src/routes/auth"));

//task #1 and task #3
app.use(
  "/me",
  require("./src/middleware/authMiddleware"),
  require("./src/routes/protected")
);

// task #2
app.use(
  "/locate",
  require("./src/middleware/setIPMiddleware"),
  require("./src/routes/locate")
);

// task #4
app.use("/", require("./src/routes/shorten"));

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});
