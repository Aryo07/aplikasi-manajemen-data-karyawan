const express = require("express");
const cors = require("cors");
require("dotenv").config();

const employeeRoutes = require("./routes/employeeRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Middleware Autentikasi - Melindungi semua routes
app.use(authMiddleware);

app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server berjalan di port ${PORT}`);

});
