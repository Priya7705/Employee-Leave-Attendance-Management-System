import { useEffect, useState } from "react";

import { getUsers } from "../services/userService";
import { getDepartments } from "../services/departmentService";

import "../styles/EmployeeForm.css";

function EmployeeForm({ onSubmit,employee=null,buttonText="Add Employee" }) {

    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [form, setForm] = useState({

        user_id: "",

        department_id: "",

        employee_code: "",

        first_name: "",

        last_name: "",

        phone: "",

        designation: "",

        joining_date: "",

        status: "Active"

    });

    useEffect(() => {

        loadData();

    }, []);
    useEffect(() => {

    if (employee) {

        setForm({

            user_id: employee.user_id,

            department_id: employee.department_id,

            employee_code: employee.employee_code,

            first_name: employee.first_name,

            last_name: employee.last_name,

            phone: employee.phone,

            designation: employee.designation,

            joining_date: employee.joining_date,

            status: employee.status

        });

    }

}, [employee]);

    async function loadData() {

        try {

            const usersData = await getUsers();

            const departmentData = await getDepartments();

            setUsers(usersData);

            setDepartments(departmentData);

        }

        catch (err) {

            console.log(err);

        }

    }

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        onSubmit(form);

    }

    return (

        <form
            className="employee-form"
            onSubmit={handleSubmit}
        >

            <select
                name="user_id"
                value={form.user_id}
                onChange={handleChange}
                required
            >

                <option value="">
                    Select User
                </option>

                {

                    users.map((user) => (

                        <option
                            key={user.user_id}
                            value={user.user_id}
                        >

                            {user.email}

                        </option>

                    ))

                }

            </select>

            <select
                name="department_id"
                value={form.department_id}
                onChange={handleChange}
                required
            >

                <option value="">
                    Select Department
                </option>

                {

                    departments.map((department) => (

                        <option
                            key={department.department_id}
                            value={department.department_id}
                        >

                            {department.department_name}

                        </option>

                    ))

                }

            </select>

            <input
                name="employee_code"
                placeholder="Employee Code"
                value={form.employee_code}
                onChange={handleChange}
                required
            />

            <input
                name="first_name"
                placeholder="First Name"
                value={form.first_name}
                onChange={handleChange}
                required
            />

            <input
                name="last_name"
                placeholder="Last Name"
                value={form.last_name}
                onChange={handleChange}
                required
            />

            <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
            />

            <input
                name="designation"
                placeholder="Designation"
                value={form.designation}
                onChange={handleChange}
                required
            />

            <input
                type="date"
                name="joining_date"
                value={form.joining_date}
                onChange={handleChange}
                required
            />
            <button type="submit">

                    {buttonText}

            </button>

        </form>

    );

}

export default EmployeeForm;