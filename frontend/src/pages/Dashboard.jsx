import Layout from "../components/Layout";
import HolidayWidget from "../components/HolidayWidget";
import DashboardCards from "../components/DashboardCards";
import DashboardChart from "../components/DashboardChart";
import DashboardTable from "../components/DashboardTable";
import EmployeeDashboardCards from "../components/EmployeeDashboardCards";
import WelcomeBanner from "../components/WelcomeBanner";
function Dashboard() {
    const token = localStorage.getItem("token");

const payload = token
    ? JSON.parse(atob(token.split(".")[1]))
    : null;

const roleId = payload?.role_id;

    return (

    <Layout>
<WelcomeBanner />
        {
            
            roleId === 7 ?

            <EmployeeDashboardCards />

            :

            <>

                <DashboardCards />

                <div
                    style={{
                        display:"grid",
                        gridTemplateColumns:"2fr 1fr",
                        gap:"25px",
                        marginBottom:"25px"
                    }}
                >

                    <DashboardChart />

                    <DashboardTable />

                </div>
                <div
                    style={{
                    marginTop:"25px"
                }}
>
                  <HolidayWidget />
</div>
                

            </>

        }

    </Layout>

);

    

}

export default Dashboard;