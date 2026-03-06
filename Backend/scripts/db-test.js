const { pool, poolConnect } = require("../config/db");

poolConnect
  .then(async () => {
    console.log("Koneksi DB berhasil");
    await pool.close();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error("Koneksi DB gagal");
    console.error(err.message);

    try {
      await pool.close();
    } catch (_) {
      // Tidak perlu melakukan apa-apa jika penutupan pool gagal
    }

    process.exit(1);
  });
