import { useEffect, useState } from "react";

import {
    FaUsers,
    FaCalendarCheck,
    FaClipboardList,
    FaMoneyBillWave
} from "react-icons/fa";

import StatCard from "./StatCard";

import { getDashboardStats } from "../services/dashboardService";

import "../styles/DashboardCards.css";

function DashboardCards() {

    const [stats, setStats] = useState({

        total_employees: 0,

        present_today: 0,

        pending_leaves: 0

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const data = await getDashboardStats();

            setStats(data);

        }

        catch (err) {

            console.log(err);

        }

    }

    return (

        <div className="dashboard-cards">

            <StatCard
                title="Employees"
                value={stats.total_employees}
                icon={<FaUsers />}
                color="#4F46E5"
            />

            <StatCard
                title="Attendance"
                value={stats.present_today}
                icon={<FaCalendarCheck />}
                color="#10B981"
            />

            <StatCard
                title="Pending Leaves"
                value={stats.pending_leaves}
                icon={<FaClipboardList />}
                color="#F59E0B"
            />

            <StatCard
                title="Payroll"
                value="₹12.8L"
                icon={<FaMoneyBillWave />}
                color="#EC4899"
            />

        </div>

    );

}

export default DashboardCards;