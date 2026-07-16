import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {

    return (

        <div className="app-layout">

            <Sidebar />

            <div
                className="main-content"
                style={{
                    marginLeft: "290px"
                }}
            >

                <Navbar />

                <div className="page-content">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default Layout;