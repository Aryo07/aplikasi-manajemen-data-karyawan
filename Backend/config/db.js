const sql = require("mssql");
require("dotenv").config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: process.env.DB_ENCRYPT === "true",
        trustServerCertificate: process.env.DB_TRUST_CERTIFICATE === "true"
    }
};

const pool = new sql.ConnectionPool(config);

// Koneksi ke database saat aplikasi dijalankan
const poolConnect = pool.connect()
    .then(() => {
        console.log('✅ Sukses terhubung ke database SQL Server');
    })
    .catch((err) => {
        console.error('❌ Gagal terhubung ke database SQL Server:', err.message);
    });

module.exports = {
    sql,
    pool,
    poolConnect
};
