import { useEffect, useState } from "react";

import { getLeaves } from "../services/leaveService";

import "../styles/DashboardTable.css";

function DashboardTable() {

    const [leaves, setLeaves] = useState([]);

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

    return (

        <div className="dashboard-table">

            <h2>Recent Leave Requests</h2>

            <table>

                <thead>

                    <tr>

                        <th>Employee</th>

                        <th>Leave</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        leaves.slice(0,5).map((leave)=>(

                            <tr key={leave.leave_id}>

                                <td>{leave.employee_name}</td>

                                <td>{leave.leave_type_name}</td>

                                <td>{leave.status}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default DashboardTable;