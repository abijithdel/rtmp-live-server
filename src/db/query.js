const newLive = `
    INSERT INTO livestream
    (thumbnail, title, description, status, endview, streamkey)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
`;
const getAkey = `SELECT streamkey FROM livestream WHERE streamkey = $1`;
const getAStream = 'SELECT * FROM livestream WHERE id = $1'
const allLives = 'SELECT * FROM livestream WHERE status = $1'
const getalive = 'SELECT * FROM livestream WHERE id = $1'
const updateLiveData = 'UPDATE livestream SET status = $1 WHERE id = $2' // with id
const updateKeyStatus = 'UPDATE stream_keys SET status = $1 WHERE stream_key = $2'
const updateLiveStatus = 'UPDATE livestream SET status = $1 WHERE streamkey = $2' // with stream key

module.exports = { newLive, getAkey, updateLiveData, getAStream, updateKeyStatus, updateLiveStatus, allLives, getalive };
