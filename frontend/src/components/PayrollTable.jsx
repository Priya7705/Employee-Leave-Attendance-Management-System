import { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeService";
import "../styles/Payroll.css";

function PayrollTable() {

    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [payrollStatus, setPayrollStatus] = useState({});

    useEffect(() => {
        loadEmployees();
    }, []);

    async function loadEmployees() {

        try {

            const data = await getEmployees();
            setEmployees(data);
            const statusMap = {};

data.forEach((emp, index) => {

    statusMap[emp.employee_id] =
        index % 2 === 0 ? "Paid" : "Pending";

});

setPayrollStatus(statusMap);

        } catch (err) {

            console.log(err);

        }

    }
console.log(employees);  

    const filtered = employees.filter(emp =>
        `${emp.first_name} ${emp.last_name}`
            .toLowerCase()
            .includes(search.toLowerCase()) ||
        emp.employee_code.toLowerCase().includes(search.toLowerCase())
    );
function toggleStatus(employeeId) {

    setPayrollStatus((prev) => ({

        ...prev,

        [employeeId]:
            prev[employeeId] === "Paid"
                ? "Pending"
                : "Paid"

    }));

}
    return (

        <div className="payroll-card">

            <div className="payroll-header">

                <h2>Payroll Management</h2>

                <input
                    type="text"
                    className="payroll-search"
                    placeholder="Search employee..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <p>{search}</p>

            </div>

            <table className="payroll-table">

                <thead>

                    <tr>
                        <th>Code</th>
                        <th>Employee</th>
                        <th>Designation</th>
                        <th>Monthly Salary</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {filtered.map((emp, index) => (

                        <tr key={emp.employee_id}>

                            <td>{emp.employee_code}</td>

                            <td>{emp.first_name} {emp.last_name}</td>

                            <td>{emp.designation}</td>

                            <td>₹{(45000 + index * 2500).toLocaleString()}</td>

                            <td>

                              <span
    className={
        payrollStatus[emp.employee_id] === "Paid"
            ? "status-paid"
            : "status-pending"
    }
    onClick={() => toggleStatus(emp.employee_id)}
    style={{
        cursor: "pointer"
    }}
>

    {payrollStatus[emp.employee_id]}

</span>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default PayrollTable;