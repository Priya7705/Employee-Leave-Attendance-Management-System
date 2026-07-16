import { useEffect, useState } from "react";

function LeaveForm({ leave, onSubmit }) {

    const [form, setForm] = useState({

        status: ""

    });

    useEffect(() => {

        if (leave) {

            setForm({

                status: leave.status

            });

        }

    }, [leave]);

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        onSubmit({

            ...leave,

            ...form

        });

    }

    return (

        <form
            className="employee-form"
            onSubmit={handleSubmit}
        >

            <select
                name="status"
                value={form.status}
                onChange={handleChange}
            >

                <option>Pending</option>

                <option>Approved</option>

                <option>Rejected</option>

            </select>

            <button type="submit">

                Update Leave

            </button>

        </form>

    );

}

export default LeaveForm;