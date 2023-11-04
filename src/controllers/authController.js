const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const secretKey = process.env.SECRET_KEY;
const refreshSecretKey = process.env.REFRESH_SECRET_KEY;

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(409).json({
        success: false,
        error: "Користувач з такою електронною адресою вже існує",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
      [email, hashedPassword]
    );
    const userId = result.rows[0].id;

    const accessToken = jwt.sign({ userId }, secretKey, {
      expiresIn: "60m",
    });
    const refreshToken = jwt.sign({ userId }, refreshSecretKey);

    res.status(201).json({
      success: true,
      data: {
        id: userId,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Помилка сервера" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Користувача з таким email не існує",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(404).json({ success: false, error: "Невірний пароль" });
    }

    const accessToken = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "60m",
    });
    const refreshToken = jwt.sign({ userId: user.id }, refreshSecretKey);

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Помилка сервера" });
  }
};
