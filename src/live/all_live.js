const pool = require("../dbConfig");
const { allLives } = require("../db/query");

const getAllLives = async (req, res) => {
  try {
    const { filter } = req.body || {};

    if (filter) {
      const result = await pool.query(allLives, [filter]);
      return res.status(200).json({ data: result.rows });
    }

    const result = await pool.query(
      "SELECT * FROM livestream WHERE status IN ('running', 'pending')",
    );
    return res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { getAllLives };
