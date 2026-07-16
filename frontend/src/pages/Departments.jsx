import { useEffect, useState } from "react";
import EmployeeModal from "../components/EmployeeModal";
import DepartmentForm from "../components/DepartmentForm";
import { updateDepartment } from "../services/departmentService";
import Layout from "../components/Layout";
import DepartmentTable from "../components/DepartmentTable";
import { getDepartments } from "../services/departmentService";

import "../styles/Search.css";

function Departments() {

    const [departments, setDepartments] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    useEffect(() => {

        loadDepartments();

    }, []);

    async function loadDepartments() {

        try {

            const data = await getDepartments();

            setDepartments(data);

        }

        catch (err) {

            console.log(err);

        }

    }
async function handleUpdateDepartment(department) {

    try {

        await updateDepartment(
            selectedDepartment.department_id,
            department
        );

        await loadDepartments();

        setSelectedDepartment(null);

        alert("Department Updated Successfully");

    }

    catch (err) {

        alert(err.message);

    }

}

    return (

        <Layout>

            <h1>Departments</h1>

            <input
                type="text"
                className="search-box"
                placeholder="Search department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <DepartmentTable
                departments={departments.filter((department) =>

                    department.department_name
                        .toLowerCase()
                        .includes(search.toLowerCase())

                )}
                onEdit={(department) => setSelectedDepartment(department)}
            />
<EmployeeModal
    open={selectedDepartment !== null}
    onClose={() => setSelectedDepartment(null)}
>

    <h2>Edit Department</h2>

    <DepartmentForm
        department={selectedDepartment}
        onSubmit={handleUpdateDepartment}
    />

</EmployeeModal>
        </Layout>

    );

}

export default Departments;