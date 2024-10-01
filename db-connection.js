const { Pool } = require('pg');

// PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Test the connection
async function testDatabaseConnection() {
    try {
        const client = await pool.connect();
        console.log('Successfully connected to the database');
        await client.query('SELECT NOW()');
        client.release();
    } catch (err) {
        console.error('Database connection error:', err.message);
    }
}

testDatabaseConnection();
