const path = require("path");
const { readFileSync, existsSync } = require("fs");

const loadEnvVars = () => {
  const envFilePath = path.join(__dirname, "..", "..", ".env");

  if (!existsSync(envFilePath)) {
    console.error(`.env file not found. Make sure it exists.`);
    process.exit(1);
  }

  try {
    const envFile = readFileSync(envFilePath, "utf8");
    const envLines = envFile.split("\n");
    envLines.forEach((line) => {
      const parts = line.split("=");
      if (parts.length === 2) {
        const [key, value] = parts;
        process.env[key] = value.trim();
      } else {
        console.error(`Skipping invalid line: ${line}`);
      }
    });

    if (
      !process.env.DB_USER ||
      process.env.DB_USER.trim() === "" ||
      !process.env.DB_HOST ||
      process.env.DB_HOST.trim() === "" ||
      !process.env.DB_DATABASE ||
      process.env.DB_DATABASE.trim() === "" ||
      !process.env.DB_PASSWORD ||
      process.env.DB_PASSWORD.trim() === "" ||
      !process.env.PORT ||
      process.env.PORT.trim() === "" 
    ) {
      console.error("Error: one or more constants is missing or empty in .env");
      process.exit(1);
    }
  } catch (err) {
    console.error("Error reading .env:", err);
  }
};

module.exports = loadEnvVars;
