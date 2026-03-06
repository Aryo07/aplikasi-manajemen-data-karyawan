const { sql, pool, poolConnect } = require("../config/db");

class EmployeeModel {
    
    // Tampilkan semua karyawan
    static async getAll() {
        await poolConnect;
        const result = await pool.request().query(`
            SELECT * FROM Employees
        `);
        return result.recordset;
    }

    // Tampilkan karyawan berdasarkan ID
    static async getById(id) {
        await poolConnect;
        const result = await pool.request()
            .input("id", sql.Int, id)
            .query(`
                SELECT * FROM Employees
                WHERE EmployeeID = @id
            `);
        return result.recordset[0];
    }

    // Tambahkan karyawan baru
    static async create(name, position, salary) {
        await poolConnect;
        const result = await pool.request()
            .input("name", sql.VarChar, name)
            .input("position", sql.VarChar, position)
            .input("salary", sql.Decimal(12, 2), salary)
            .query(`
                INSERT INTO Employees (Name, Position, Salary)
                OUTPUT INSERTED.EmployeeID, INSERTED.Name, INSERTED.Position, INSERTED.Salary
                VALUES (@name, @position, @salary)
            `);

        return { message: "Employee created", employee: result.recordset[0] };
    }

    // Ubah data karyawan
    static async update(id, name, position, salary) {
        await poolConnect;
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("name", sql.VarChar, name)
            .input("position", sql.VarChar, position)
            .input("salary", sql.Decimal(12, 2), salary)
            .query(`
                UPDATE Employees
                SET Name=@name, Position=@position, Salary=@salary
                OUTPUT INSERTED.EmployeeID, INSERTED.Name, INSERTED.Position, INSERTED.Salary
                WHERE EmployeeID=@id
            `);

        return { message: "Employee updated", employee: result.recordset[0] };
    }

    // Hapus karyawan
    static async delete(id) {
        await poolConnect;
        const result = await pool.request()
            .input("id", sql.Int, id)
            .query(`
                DELETE FROM Employees
                OUTPUT DELETED.EmployeeID
                WHERE EmployeeID=@id
            `);

        return { message: "Employee deleted", employeeID: result.recordset[0]?.EmployeeID || id };
    }
}

module.exports = EmployeeModel;
