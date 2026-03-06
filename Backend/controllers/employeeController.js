const EmployeeModel = require("../models/employeeModel");

function parseEmployeeId(id) {
    const parsedId = Number.parseInt(id, 10);
    return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
}

function validateEmployeePayload(payload) {
    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    const position = typeof payload.position === "string" ? payload.position.trim() : "";
    const salary = Number.parseFloat(payload.salary);

    const errors = {};

    if (!name) {
        errors.name = "Nama wajib diisi";
    }

    if (!position) {
        errors.position = "Jabatan wajib diisi";
    }

    if (!Number.isFinite(salary) || salary <= 0) {
        errors.salary = "Gaji harus lebih besar dari 0";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        data: { name, position, salary },
        errors
    };
}

// Proses Menampilkan Semua Karyawan
exports.getEmployees = async (req, res) => {
    try {
        const employees = await EmployeeModel.getAll();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Proses Menampilkan Karyawan Berdasarkan ID
exports.getEmployeeById = async (req, res) => {
    const employeeId = parseEmployeeId(req.params.id);
    if (!employeeId) {
        return res.status(400).json({ error: "ID karyawan tidak valid" });
    }

    try {
        const employee = await EmployeeModel.getById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: "Data karyawan tidak ditemukan" });
        }
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Proses Menambahkan Karyawan Baru
exports.createEmployee = async (req, res) => {
    const validation = validateEmployeePayload(req.body || {});
    if (!validation.isValid) {
        return res.status(400).json({ error: "Validasi gagal", details: validation.errors });
    }

    try {
        const { name, position, salary } = validation.data;
        const result = await EmployeeModel.create(name, position, salary);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Proses Mengubah Data Karyawan
exports.updateEmployee = async (req, res) => {
    const employeeId = parseEmployeeId(req.params.id);
    if (!employeeId) {
        return res.status(400).json({ error: "ID karyawan tidak valid" });
    }

    const validation = validateEmployeePayload(req.body || {});
    if (!validation.isValid) {
        return res.status(400).json({ error: "Validasi gagal", details: validation.errors });
    }

    try {
        const { name, position, salary } = validation.data;
        const result = await EmployeeModel.update(employeeId, name, position, salary);
        if (!result.employee) {
            return res.status(404).json({ error: "Data karyawan tidak ditemukan" });
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Proses Menghapus Karyawan
exports.deleteEmployee = async (req, res) => {
    const employeeId = parseEmployeeId(req.params.id);
    if (!employeeId) {
        return res.status(400).json({ error: "ID karyawan tidak valid" });
    }

    try {
        const result = await EmployeeModel.delete(employeeId);
        if (!result) {
            return res.status(404).json({ error: "Data karyawan tidak ditemukan" });
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
