const newLive = `
    INSERT INTO livestream
    (thumbnail, title, description, status, endview, streamkey)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
`;

const getAkey = `SELECT streamkey FROM livestream WHERE streamkey = $1`;

module.exports = { newLive, getAkey };
