const API = "http://127.0.0.1:8000";

export async function getLeaves() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/leave/`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {

        throw new Error("Unable to fetch leave records");

    }

    return await response.json();

}

export async function updateLeave(id, leave) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/leave/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(leave)

        }
    );

    if (!response.ok) {

        throw new Error("Unable to update leave");

    }

    return await response.json();

}
export async function addLeave(leave) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://127.0.0.1:8000/leave/",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(leave)
        }
    );


    if (!response.ok) {

        throw new Error("Unable to apply leave");

    }


    return await response.json();

}
export async function getMyLeaves() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/leave/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {

        throw new Error("Unable to fetch my leaves");

    }

    return await response.json();

}