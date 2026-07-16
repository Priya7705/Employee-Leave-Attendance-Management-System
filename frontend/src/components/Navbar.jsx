import { FaBell, FaUserCircle } from "react-icons/fa";

import "../styles/Navbar.css";

function Navbar() {

    return (

        <div className="navbar glass">

            <div className="navbar-title">

                Employee Leave & Attendance Management System

            </div>

            <div className="navbar-right">

                <FaBell className="nav-icon" />

                <FaUserCircle className="profile-icon" />

            </div>

        </div>

    );

}

export default Navbar;