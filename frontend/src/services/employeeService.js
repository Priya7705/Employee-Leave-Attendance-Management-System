const API = "http://127.0.0.1:8000";

export async function getEmployees() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/employees/`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {

        throw new Error("Unable to fetch employees");

    }

    return await response.json();

}

export async function addEmployee(employee) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/employees/`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(employee)
        }
    );

    if (!response.ok) {

        throw new Error("Unable to add employee");

    }

    return await response.json();

}
export async function updateEmployee(employeeId, employee) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/employees/${employeeId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(employee)
        }
    );

    if (!response.ok) {

        throw new Error("Unable to update employee");

    }

    return await response.json();

}
export async function deleteEmployee(employeeId) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/employees/${employeeId}`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {

        throw new Error("Unable to delete employee");

    }

    return await response.json();

}