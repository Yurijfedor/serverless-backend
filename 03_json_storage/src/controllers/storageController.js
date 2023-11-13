const pool = require("../db");

exports.saveDataToStorage = async (req, res) => {
  const jsonPath = req.params.json_path;
  const jsonData = req.body;

  try {
    await pool.query(
      `INSERT INTO "02_json_data" (name, data) VALUES ($1, $2) 
           ON CONFLICT (name) DO UPDATE SET data = EXCLUDED.data`,
      [jsonPath, jsonData]
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

  try {
    const result = await pool.query(
      'SELECT data FROM "02_json_data" WHERE name = $1',
      [jsonPath]
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
