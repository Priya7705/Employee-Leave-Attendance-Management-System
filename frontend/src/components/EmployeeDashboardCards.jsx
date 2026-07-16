import { useEffect, useState } from "react";
import { FaClipboardCheck, FaClock, FaCalendarAlt } from "react-icons/fa";

import StatCard from "./StatCard";
import { getMyLeaves } from "../services/leaveService";

import "../styles/DashboardCards.css";

function EmployeeDashboardCards() {

    const [approved, setApproved] = useState(0);
    const [pending, setPending] = useState(0);
    const [total, setTotal] = useState(0);
    const [latestLeave, setLatestLeave] = useState(null);

    useEffect(() => {

        loadLeaves();

    }, []);

    async function loadLeaves() {

        try {

            const leaves = await getMyLeaves();

            setTotal(leaves.length);

            setApproved(
                leaves.filter(
                    leave => leave.status === "Approved"
                ).length
            );

            setPending(
                leaves.filter(
                    leave => leave.status === "Pending"
                ).length
            );
            if (leaves.length > 0) {

    setLatestLeave(leaves[leaves.length - 1]);

}

        }

        catch(err){

            console.log(err);

        }

    }

    return (

        <>

{

    latestLeave && (

        <div
            style={{
                background:"#EEF6FF",
                border:"1px solid #2563EB",
                padding:"15px",
                borderRadius:"10px",
                marginBottom:"20px",
                fontWeight:"600"
            }}
        >

            🔔 Your leave request from{" "}
            {latestLeave.start_date}{" "}
            to{" "}
            {latestLeave.end_date}{" "}
            is
            {" "}
            <span
                style={{
                    color:
                        latestLeave.status === "Approved"
                        ? "green"
                        :
                        latestLeave.status === "Rejected"
                        ? "red"
                        :
                        "#D97706"
                }}
            >
                {latestLeave.status}
            </span>

        </div>

    )

}

<div className="dashboard-cards">
        </div>

</>

    );

}

export default EmployeeDashboardCards;