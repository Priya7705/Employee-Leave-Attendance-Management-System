const API = "http://127.0.0.1:8000";

export async function getAttendance() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/attendance/`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {

        throw new Error("Unable to fetch attendance");

    }

    return await response.json();

}

export async function updateAttendance(id, attendance) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/attendance/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(attendance)

        }
    );

    if (!response.ok) {

        throw new Error("Unable to update attendance");

    }

    return await response.json();

}