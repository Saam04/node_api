const mariadb = require("mariadb");

// Create a connection pool
const pool = mariadb.createPool({
    host: "localhost",
    user: "root",       // Default XAMPP username
    password: "",       // Default XAMPP password (empty)
    database: "node_api_db",
    connectionLimit: 5
});

// Function to get a database connection
async function getConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Connected to MariaDB via XAMPP!");
        return connection;
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        throw error;
    }
}

// Export the connection function
module.exports = { getConnection };
