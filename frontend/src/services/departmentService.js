const API = "http://127.0.0.1:8000";

export async function getDepartments() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/departments/`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {

        throw new Error("Unable to fetch departments");

    }

    return await response.json();

}

export async function updateDepartment(id, department) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/departments/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(department)
        }
    );

    if (!response.ok) {

        throw new Error("Unable to update department");

    }

    return await response.json();

}