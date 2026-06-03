const { createStreamKey } = require("./utility");
const pool = require("../dbConfig");
const { newLive } = require("../db/query");

const createNewLive = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newStreamKey = await createStreamKey();
    const thumbnailName = req.file.filename;

    const values = [thumbnailName, title, description, status, 0, newStreamKey];
    const liveresult = await pool.query(newLive, values);
    res.status(200).json({ message: "Inserted", data: liveresult.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

module.exports = { createNewLive };
