import "../styles/AttendanceTable.css";

function LeaveTable({ leaves, onEdit }) {

    return (

        <table className="employee-table">

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Employee</th>
                    <th>Leave Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {

                    leaves.map((leave) => (

                        <tr key={leave.leave_id}>

                            <td>{leave.leave_id}</td>
                            <td>{leave.employee_name}</td>
                            <td>{leave.leave_type_name}</td>
                            <td>{leave.start_date}</td>
                            <td>{leave.end_date}</td>
                            <td>{leave.status}</td>

                            <td>

                                <button
                                    className="edit-btn"
                                    onClick={() => onEdit(leave)}
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

export default LeaveTable;