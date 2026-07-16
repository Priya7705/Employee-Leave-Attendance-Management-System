import "../styles/EmployeeTable.css";

function DepartmentTable({ departments, onEdit }) {

    return (

        <table className="employee-table">

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Department Name</th>
                    <th>Description</th>
                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {

                    departments.map((department) => (

                        <tr key={department.department_id}>

                            <td>{department.department_id}</td>

                            <td>{department.department_name}</td>

                            <td>{department.description}</td>

                            <td>

                                <button
                                    className="edit-btn"
                                    onClick={() => onEdit(department)}
                                >
                                    Edit
                                </button>

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}

export default DepartmentTable;