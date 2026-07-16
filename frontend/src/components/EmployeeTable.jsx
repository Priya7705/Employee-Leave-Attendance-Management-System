import "../styles/EmployeeTable.css";

function EmployeeTable({ employees ,onEdit,onDelete}) {

    return (

        <table className="employee-table">

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Employee Code</th>

                    <th>Name</th>

                    <th>Department</th>

                    <th>Designation</th>

                    <th>Status</th>
                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {

                    employees.map((employee) => (

                        <tr key={employee.employee_id}>

                            <td>{employee.employee_id}</td>

                            <td>{employee.employee_code}</td>

                            <td>

                                {employee.first_name} {employee.last_name}

                            </td>

                            <td>{employee.department_id}</td>

                            <td>{employee.designation}</td>

                            <td>{employee.status}</td>
                            <td>

                        <button
                            className="edit-btn"
                            onClick={() => onEdit(employee)}
                        >
                            Edit    
                        </button>

                        <button
                                className="delete-btn"
                                onClick={() => onDelete(employee)}
                         >
                                 Delete
                        </button>

</td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}

export default EmployeeTable;