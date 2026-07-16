import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import { getMyEmployeeProfile } from "../services/userService";
function Profile() {

    const [user, setUser] = useState(null);

    const [employee, setEmployee] = useState(null);

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {

        try {

            const token = localStorage.getItem("token");

            const payload = JSON.parse(
                    atob(token.split(".")[1])
);

            const userId = payload.user_id;

            const employeeData = await getMyEmployeeProfile();

            setEmployee(employeeData);

            setUser({
                    email: payload.email,
                    role_id: payload.role_id
});
        }

        catch(err){

            console.log(err);

        }

    }

    if(!user || !employee){

        return (

            <Layout>

                <h2>Loading...</h2>

            </Layout>

        );

    }

    return (

        <Layout>

            <div
                style={{
                    maxWidth:"700px",
                    margin:"30px auto",
                    background:"#fff",
                    padding:"30px",
                    borderRadius:"12px",
                    boxShadow:"0 2px 10px rgba(0,0,0,0.1)"
                }}
            >

                <h1
                    style={{
                        marginBottom:"25px"
                    }}
                >
                    👤 My Profile
                </h1>

                <p><strong>Employee Code:</strong> {employee.employee_code}</p>

                <p><strong>Name:</strong> {employee.first_name} {employee.last_name}</p>

                <p><strong>Email:</strong> {user.email}</p>

                <p><strong>Phone:</strong> {employee.phone}</p>

                <p><strong>Designation:</strong> {employee.designation}</p>

                <p><strong>Department ID:</strong> {employee.department_id}</p>

                <p><strong>Joining Date:</strong> {employee.joining_date}</p>

                <p><strong>Status:</strong> {employee.status}</p>

            </div>

        </Layout>

    );

}

export default Profile;