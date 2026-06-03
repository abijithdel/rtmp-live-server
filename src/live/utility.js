const rstring = require("random-string-generator");
const pool = require("../dbConfig");
const { getAkey, updateLiveStatus } = require("../db/query");

const createStreamKey = async () => {
  const key = rstring(18);
  return key;
};

const getAStreamKey = async (Key) => {
  try {
    const result = await pool.query(getAkey, [Key]);

    if (result.rows.length === 0) {
      console.log("Key not found");
      return { status: false, key: "" };
    }

    return {
      status: true,
      key: result.rows[0].streamkey,
    };
  } catch (error) {
    console.log(error.message);
    return { status: false, message: error.message, key: "" };
  }
};

const changeStreamStatus = async (status, key) => {
  try {
    const result = await pool.query(updateLiveStatus, [status, key]);

    if (result.rowCount === 0) {
      console.log("No stream found with that key");
      return false;
    }

    console.log("Stream status updated");
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

module.exports = { createStreamKey, getAStreamKey, changeStreamStatus };
