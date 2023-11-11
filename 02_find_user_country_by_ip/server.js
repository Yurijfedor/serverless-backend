const express = require("express");
const app = express();

const PORT = 5000;

app.use(
  "/locate",
  require("./src/middleware/setIPMiddleware"),
  require("./src/routes/locate")
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
