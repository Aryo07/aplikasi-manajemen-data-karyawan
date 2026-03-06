// Middleware Autentikasi dengan Token Statis
const API_KEY = "secret123";

const authMiddleware = (req, res, next) => {
    // Ambil token dari header x-api-key
    const token = req.headers["x-api-key"];

    // Jika token tidak ada
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token tidak ditemukan.",
            error: "Unauthorized"
        });
    }

    // Jika token tidak sesuai dengan API_KEY
    if (token !== API_KEY) {
        return res.status(401).json({
            success: false,
            message: "Token tidak valid",
            error: "Unauthorized"
        });
    }

    // Token valid, lanjutkan ke handler selanjutnya
    next();
};

module.exports = authMiddleware;
