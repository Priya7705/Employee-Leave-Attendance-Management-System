function WelcomeBanner() {

    const token = localStorage.getItem("token");

    let name = "User";

    try {

        if (token) {

            const payload = JSON.parse(atob(token.split(".")[1]));

            name = payload.email.split("@")[0];

        }

    }

    catch {

        name = "User";

    }

    return (

        <div
            style={{
                background:"#ffffff",
                padding:"20px",
                borderRadius:"15px",
                marginBottom:"25px",
                boxShadow:"0 4px 10px rgba(0,0,0,.08)"
            }}
        >

            <h2>

                Welcome Back, {name} 👋

            </h2>

            <p>

                Employee Leave & Attendance Management System

            </p>

        </div>

    );

}

export default WelcomeBanner;