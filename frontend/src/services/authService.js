const API = "http://127.0.0.1:8000";

export async function loginUser(email, password) {

    const formData = new URLSearchParams();

    formData.append("username", email);

    formData.append("password", password);

    const response = await fetch(`${API}/auth/login`, {

        method: "POST",

        headers: {

            "Content-Type":
                "application/x-www-form-urlencoded",

        },

        body: formData,

    });

    if (!response.ok) {

        throw new Error("Invalid Email or Password");

    }

    return await response.json();

}