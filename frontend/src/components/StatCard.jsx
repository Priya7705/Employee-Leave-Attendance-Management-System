import "../styles/StatCard.css";

function StatCard({ title, value, icon, color }) {

    return (

        <div className="stat-card">

            <div
                className="stat-icon"
                style={{ background: color }}
            >
                {icon}
            </div>

            <div>

                <h3>{value}</h3>

                <p>{title}</p>

            </div>

        </div>

    );

}

export default StatCard;