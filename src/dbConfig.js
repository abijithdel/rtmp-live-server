const { Pool } = require('pg');

const pool = new Pool({
    user: 'Abhijith',
    host: 'localhost',
    database: 'live',
    password: '123',
    port: 5432,
});

(async function testConnection() {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Connected!');
        console.log(result.rows[0]);
    } catch (err) {
        console.error(err);
    }
})();

module.exports = pool;