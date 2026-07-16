import { useState } from "react";

import Layout from "../components/Layout";
import { addLeave } from "../services/leaveService";

function ApplyLeave() {

    const [form, setForm] = useState({

        employee_id: "",
        leave_type: "",
        start_date: "",
        end_date: "",
        reason: ""

    });


    function handleChange(e) {

        setForm({

            ...form,
            [e.target.name]: e.target.value

        });

    }


    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await addLeave(form);

            alert("Leave Applied Successfully");


            setForm({

                employee_id: "",
                leave_type: "",
                start_date: "",
                end_date: "",
                reason: ""

            });

        }

        catch(err) {

            alert(err.message);

        }

    }


    return (

        <Layout>

            <h1>Apply Leave</h1>


            <form
                className="employee-form"
                onSubmit={handleSubmit}
            >

                <input
                    name="employee_id"
                    placeholder="Employee ID"
                    value={form.employee_id}
                    onChange={handleChange}
                />


                <input
                    name="leave_type"
                    placeholder="Leave Type"
                    value={form.leave_type}
                    onChange={handleChange}
                />


                <input
                    type="date"
                    name="start_date"
                    value={form.start_date}
                    onChange={handleChange}
                />


                <input
                    type="date"
                    name="end_date"
                    value={form.end_date}
                    onChange={handleChange}
                />


                <input
                    name="reason"
                    placeholder="Reason"
                    value={form.reason}
                    onChange={handleChange}
                />


                <button type="submit">
                    Apply Leave
                </button>


            </form>


        </Layout>

    );

}

export default ApplyLeave;