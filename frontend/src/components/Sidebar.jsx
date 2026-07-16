import {
    FaTachometerAlt,
    FaUsers,
    FaBuilding,
    FaCalendarCheck,
    FaClipboardList,
    FaMoneyCheckAlt,
    FaUserCircle,
    FaSignOutAlt
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import "../styles/Sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };
const token = localStorage.getItem("token");

const payload = token
    ? JSON.parse(atob(token.split(".")[1]))
    : null;

const roleId = payload?.role_id;
console.log("JWT Payload:", payload);
console.log("Role ID:", roleId);
 const menus = [

    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <FaTachometerAlt />
    },


    // Admin + HR
    ...(roleId === 1 || roleId === 2 ? [

        {
            name: "Employees",
            path: "/employees",
            icon: <FaUsers />
        },

        {
            name: "Departments",
            path: "/departments",
            icon: <FaBuilding />
        },

        {
            name: "Attendance",
            path: "/attendance",
            icon: <FaCalendarCheck />
        },

        {
            name: "Leave",
            path: "/leave",
            icon: <FaClipboardList />
        },

        {
            name: "Payroll",
            path: "/payroll",
            icon: <FaMoneyCheckAlt />
        }

    ] : []),


    // Manager
    ...(roleId === 6 ? [

        {
            name: "Attendance",
            path: "/attendance",
            icon: <FaCalendarCheck />
        },

        {
            name: "Leave",
            path: "/leave",
            icon: <FaClipboardList />
        }

    ] : []),


    // Employee
    ...(roleId === 7 ? [

        {
            name: "Apply Leave",
            path: "/apply-leave",
            icon: <FaClipboardList />
        },

        {
            name: "My Leaves",
            path: "/my-leaves",
            icon: <FaCalendarCheck />
        }

    ] : []),


    {
        name: "Profile",
        path: "/profile",
        icon: <FaUserCircle />
    }

];
    return (

        <aside className="sidebar glass">

            <div className="logo">

                ELAMS

            </div>

            <div className="menu">

                {

                    menus.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "menu-item active"
                                    : "menu-item"
                            }
                        >

                            <span>{item.icon}</span>

                            {item.name}

                        </NavLink>

                    ))

                }

            </div>

            <button
                className="logout"
                onClick={handleLogout}
            >

                <FaSignOutAlt />

                Logout

            </button>

        </aside>

    );

}

export default Sidebar;