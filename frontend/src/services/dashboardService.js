const API = "http://127.0.0.1:8000";

export async function getDashboardStats() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/dashboard/stats`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {

        throw new Error("Unable to load dashboard");

    }

    return await response.json();

}