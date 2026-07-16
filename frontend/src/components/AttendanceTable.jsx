import "../styles/AttendanceTable.css";

function AttendanceTable({ attendance,onEdit }) {

    return (

        <table className="employee-table">

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Employee</th>

                    <th>Date</th>

                    <th>Check In</th>

                    <th>Check Out</th>

                    <th>Status</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {

                    attendance.map((item) => (

                        <tr key={item.attendance_id}>

                            <td>{item.attendance_id}</td>

                            <td>{item.employee_name}</td>

                            <td>{item.attendance_date}</td>

                            <td>{item.check_in}</td>

                            <td>{item.check_out}</td>

                            <td>{item.status}</td>

                            <td>

                                <button
                                    className="edit-btn"
                                    onClick={() => onEdit(item)}
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

export default AttendanceTable;