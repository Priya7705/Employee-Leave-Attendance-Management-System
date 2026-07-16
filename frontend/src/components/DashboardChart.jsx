import { useEffect, useState } from "react";

import "../styles/DashboardChart.css";

import { getDashboardStats } from "../services/dashboardService";

function DashboardChart() {

    const [stats, setStats] = useState({

        total_employees: 0,

        present_today: 0,

        pending_leaves: 0

    });

    useEffect(() => {

        loadStats();

    }, []);

    async function loadStats() {

        try {

            const data = await getDashboardStats();

            setStats(data);

        }

        catch (err) {

            console.log(err);

        }

    }

    const absent =
        stats.total_employees - stats.present_today - stats.pending_leaves;

    function getWidth(value) {

        if (stats.total_employees === 0) return "0%";

        return `${(value / stats.total_employees) * 100}%`;

    }

    return (

        <div className="dashboard-chart">

            <h2>Attendance Overview</h2>

            <div className="chart-row">

                <span>Present</span>

                <div className="chart-bar">

                    <div
                        className="chart-fill present"
                        style={{
                            width: getWidth(stats.present_today)
                        }}
                    ></div>

                </div>

                <strong>{stats.present_today}</strong>

            </div>

            <div className="chart-row">

                <span>Absent</span>

                <div className="chart-bar">

                    <div
                        className="chart-fill absent"
                        style={{
                            width: getWidth(absent)
                        }}
                    ></div>

                </div>

                <strong>{absent}</strong>

            </div>

            <div className="chart-row">

                <span>Pending Leave</span>

                <div className="chart-bar">

                    <div
                        className="chart-fill leave"
                        style={{
                            width: getWidth(stats.pending_leaves)
                        }}
                    ></div>

                </div>

                <strong>{stats.pending_leaves}</strong>

            </div>

        </div>

    );

}

export default DashboardChart;