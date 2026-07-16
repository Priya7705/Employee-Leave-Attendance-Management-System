import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { getMyLeaves } from "../services/leaveService";

import "../styles/EmployeeTable.css";

function MyLeaves() {

    const [leaves, setLeaves] = useState([]);

    useEffect(() => {

        loadLeaves();

    }, []);

    async function loadLeaves() {

        try {

            const data = await getMyLeaves();

            setLeaves(data);

        }

        catch (err) {

            console.log(err);

        }

    }

    return (

        <Layout>

            <h1>My Leave Requests</h1>

            <table className="employee-table">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Leave Type</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        leaves.map((leave) => (

                            <tr key={leave.leave_id}>

                                <td>{leave.leave_id}</td>

                                <td>{leave.leave_type}</td>

                                <td>{leave.start_date}</td>

                                <td>{leave.end_date}</td>

                                <td>{leave.status}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </Layout>

    );

}

export default MyLeaves;