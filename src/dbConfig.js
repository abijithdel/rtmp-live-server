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
        const createUsersTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                is_superuser BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await pool.query(createUsersTableQuery);
        
        // Add column if table already exists (safe for subsequent runs)
        try {
            await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS is_superuser BOOLEAN DEFAULT FALSE;');
        } catch (alterErr) {
            console.log('Column is_superuser might already exist or older postgres version.');
        }

        console.log('Users table ready.');

        const createLivestreamTableQuery = `
            CREATE TABLE IF NOT EXISTS livestream (
                id SERIAL PRIMARY KEY,
                thumbnail VARCHAR(255),
                title VARCHAR(255),
                description VARCHAR(255),
                status VARCHAR(50),
                endview INT,
                streamkey VARCHAR(255)
            );
        `;
        await pool.query(createLivestreamTableQuery);
        console.log('Livestream table ready.');
    } catch (err) {
        console.error(err);
    }
})();

module.exports = pool;