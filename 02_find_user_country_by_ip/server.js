const express = require("express");
const app = express();
const loadEnvVars = require("./src/helpers/loadEnvVars");

loadEnvVars();

const PORT = process.env.PORT || 3000;

app.use(
  "/locate",
  require("./src/middleware/setIPMiddleware"),
  require("./src/routes/locate")
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
