import { useEffect, useState } from "react";
import EmployeeModal from "../components/EmployeeModal";
import Layout from "../components/Layout";
import LeaveTable from "../components/LeaveTable";
import LeaveForm from "../components/LeaveForm";
import { getLeaves ,updateLeave} from "../services/leaveService";

function Leave() {

    const [leaves, setLeaves] = useState([]);
    const [selectedLeave, setSelectedLeave] = useState(null);
    useEffect(() => {

        loadLeaves();

    }, []);

    async function loadLeaves() {

        try {

            const data = await getLeaves();

            setLeaves(data);

        }

        catch (err) {

            console.log(err);

        }

    }
async function handleUpdateLeave(leave) {

    try {

        await updateLeave(
            selectedLeave.leave_id,
            leave
        );

        await loadLeaves();

        setSelectedLeave(null);

        alert("Leave Updated Successfully");

    }

    catch (err) {

        alert(err.message);

    }

}

    return (

        <Layout>

            <h1 className="page-title">

                Leave Management

            </h1>

            <LeaveTable
                 leaves={leaves}
                 onEdit={(leave) => setSelectedLeave(leave)}
/>
            <EmployeeModal
    open={selectedLeave !== null}
    onClose={() => setSelectedLeave(null)}
>

    <h2>Edit Leave</h2>

    <p><strong>Employee:</strong> {selectedLeave?.employee_name}</p>

    <LeaveForm
        leave={selectedLeave}
        onSubmit={handleUpdateLeave}
    />

</EmployeeModal>
        </Layout>

    );

}

export default Leave;