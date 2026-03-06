const EmployeeModel = require("../models/employeeModel");

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
    try {
        const employee = await EmployeeModel.getById(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Proses Menambahkan Karyawan Baru
exports.createEmployee = async (req, res) => {
    const { name, position, salary } = req.body;
    try {
        const result = await EmployeeModel.create(name, position, salary);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Proses Mengubah Data Karyawan
exports.updateEmployee = async (req, res) => {
    const { name, position, salary } = req.body;
    try {
        const result = await EmployeeModel.update(req.params.id, name, position, salary);
        if (!result.employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Proses Menghapus Karyawan
exports.deleteEmployee = async (req, res) => {
    try {
        const result = await EmployeeModel.delete(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
