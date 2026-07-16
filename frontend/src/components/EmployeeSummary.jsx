import "../styles/EmployeeSummary.css";

function EmployeeSummary() {

    return (

        <div className="employee-summary">

            <h2>Employee Summary</h2>

            <div className="summary-item">

                <span>Total Employees</span>

                <strong>42</strong>

            </div>

            <div className="summary-item">

                <span>Present Today</span>

                <strong>38</strong>

            </div>

            <div className="summary-item">

                <span>On Leave</span>

                <strong>4</strong>

            </div>

        </div>

    );

}

export default EmployeeSummary;