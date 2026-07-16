import { useEffect, useState } from "react";
import AttendanceTable from "../components/AttendanceTable";
import Layout from "../components/Layout";
import { getAttendance,updateAttendance } from "../services/attendanceService";
import EmployeeModal from "../components/EmployeeModal";
import AttendanceForm from "../components/AttendanceForm";

function Attendance() {

    const [attendance, setAttendance] = useState([]);
    const [selectedAttendance, setSelectedAttendance] = useState(null);
    useEffect(() => {

        loadAttendance();

    }, []);

    async function loadAttendance() {

        try {

            const data = await getAttendance();

            setAttendance(data);

        }

        catch (err) {

            console.log(err);

        }

    }
async function handleUpdateAttendance(attendance) {

    try {

        await updateAttendance(
            selectedAttendance.attendance_id,
            attendance
        );

        await loadAttendance();

        setSelectedAttendance(null);

        alert("Attendance Updated Successfully");

    }

    catch (err) {

        alert(err.message);

    }

}
    return (

        <Layout>

            <h1 className="page-title">

                Attendance

        </h1>

            <AttendanceTable
                    attendance={attendance}
                    onEdit={(record) => setSelectedAttendance(record)}
            />
            <EmployeeModal
    open={selectedAttendance !== null}
    onClose={() => setSelectedAttendance(null)}
>

    <h2>Edit Attendance</h2>
    <p><strong>Employee:</strong> {selectedAttendance?.employee_name}</p>

    <p><strong>Date:</strong> {selectedAttendance?.attendance_date}</p>
    <AttendanceForm
    attendance={selectedAttendance}
    onSubmit={handleUpdateAttendance}
/>

</EmployeeModal>
        </Layout>

    );

}

export default Attendance;