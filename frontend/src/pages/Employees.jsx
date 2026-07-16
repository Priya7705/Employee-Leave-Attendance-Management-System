import { useEffect, useState } from "react";
import EmployeeModal from "../components/EmployeeModal";
import EmployeeHeader from "../components/EmployeeHeader";
import Layout from "../components/Layout";
import EmployeeTable from "../components/EmployeeTable";
import "../styles/Search.css";
import {
    getEmployees,
    updateEmployee,
    deleteEmployee
} from "../services/employeeService";
import EmployeeForm from "../components/EmployeeForm";
function Employees() {

    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    useEffect(() => {

        loadEmployees();

    }, []);

  async function loadEmployees() {

    try {

        const data = await getEmployees();

        console.log("API Response:", data);

        setEmployees(data);

        console.log("State being set:", data);

    }

    catch (err) {

        console.log(err);

    }

}
async function handleUpdateEmployee(employee) {

    try {

        await updateEmployee(
            selectedEmployee.employee_id,
            employee
        );

        await loadEmployees();

        setSelectedEmployee(null);

        alert("Employee Updated Successfully");

    }

    catch (err) {

        alert(err.message);

    }

}
async function handleDeleteEmployee(employeeId) {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {

        await deleteEmployee(employeeId);

        await loadEmployees();

        alert("Employee Deleted Successfully");

    }

    catch (err) {

        alert(err.message);

    }

}

console.log("Employees state:", employees);
   return (

    <Layout>

        <EmployeeHeader
        />
        <input
    type="text"
    className="search-box"
    placeholder="Search employee..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>

<EmployeeTable
    employees={employees.filter(employee => {

        const text = search.toLowerCase();

        return (

            employee.employee_id.toString().includes(text) ||

            employee.employee_code.toLowerCase().includes(text) ||

            employee.first_name.toLowerCase().includes(text) ||

            employee.last_name.toLowerCase().includes(text) ||

            employee.designation.toLowerCase().includes(text)

        );

    })}
    onEdit={(employee) => {

    setSelectedEmployee(employee);

}}
    onDelete={(employee) =>
        handleDeleteEmployee(employee.employee_id)
    }
/>    
<EmployeeModal
    open={selectedEmployee !== null}
    onClose={() => setSelectedEmployee(null)}
>

    <h2>Edit Employee</h2>

    <EmployeeForm
        employee={selectedEmployee}
        onSubmit={handleUpdateEmployee}
        buttonText="Update Employee"
    />

</EmployeeModal>

        

    </Layout>

);
        

    

}

export default Employees;
