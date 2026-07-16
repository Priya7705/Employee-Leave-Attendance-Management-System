const API = "http://127.0.0.1:8000";


export async function getUsers() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/users/`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );


    if (!response.ok) {

        throw new Error("Unable to fetch users");

    }


    return await response.json();

}



export async function getUserById(id) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/users/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );


    if (!response.ok) {

        throw new Error("Unable to fetch profile");

    }


    return await response.json();

}
export async function getEmployeeById(id) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `http://127.0.0.1:8000/employees/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {

        throw new Error("Unable to fetch employee profile");

    }

    return await response.json();

}
export async function getMyEmployeeProfile() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://127.0.0.1:8000/employees/me",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {

        throw new Error("Unable to fetch profile");

    }

    return await response.json();

}