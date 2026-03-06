-- SQL Server schema for employee management test
IF OBJECT_ID('dbo.Employees', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Employees (
        EmployeeID INT IDENTITY(1,1) PRIMARY KEY,
        Name VARCHAR(100) NOT NULL,
        Position VARCHAR(50) NOT NULL,
        Salary DECIMAL(12,2) NOT NULL,
        CreatedAt DATETIME NOT NULL CONSTRAINT DF_Employees_CreatedAt DEFAULT GETDATE()
    );
END;
