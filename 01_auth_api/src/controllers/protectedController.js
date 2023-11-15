const pool = require("../db");

exports.getProtectedUserId = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      "SELECT uuid, email FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Користувача з таким ID не знайдено",
      });
    }
    const userData = {
      id: result.rows[0].uuid,
      email: result.rows[0].email,
    };

    res.status(200).json({ success: true, data: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Помилка сервера" });
  }
};

exports.saveDataToStorage = async (req, res) => {
  const userId = req.user.userUuid;
  const jsonPath = req.params.json_path;
  const jsonData = req.body;

  try {
    await pool.query(
      `INSERT INTO json_data (name, userId, data) VALUES ($1, $2, $3) 
         ON CONFLICT (name) DO UPDATE SET data = EXCLUDED.data`,
      [jsonPath, userId, jsonData]
    );
    res.status(200).send("Дані успішно збережено");
  } catch (error) {
    console.error("Помилка при зберіганні даних:", error);

    const errorMessage = error.detail || "Виникла невідома помилка";

    res
      .status(500)
      .json({ message: "Помилка при зберіганні даних", error: errorMessage });
  }
};

exports.getDataFromStorage = async (req, res) => {
  const jsonPath = req.params.json_path;
  const userId = req.user.userUuid;

  try {
    const result = await pool.query(
      "SELECT data FROM json_data WHERE name = $1 AND userId = $2",
      [jsonPath, userId]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0].data);
    } else {
      res.status(404).send("Дані не знайдено");
    }
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
    res.status(500).send("Помилка на сервері");
  }
};
