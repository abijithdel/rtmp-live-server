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
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await pool.query(createTableQuery);
        console.log('Users table ready.');
    } catch (err) {
        console.error(err);
    }
})();

module.exports = pool;