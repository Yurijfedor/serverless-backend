const pool = require("../db");

exports.getProtectedUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      "SELECT id, email FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Користувача з таким ID не знайдено",
      });
    }
    const userData = {
      id: result.rows[0].id,
      email: result.rows[0].email,
    };

    res.status(200).json({ success: true, data: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Помилка сервера" });
  }
};
