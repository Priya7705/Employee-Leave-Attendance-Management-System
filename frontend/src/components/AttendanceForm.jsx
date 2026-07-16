import { useEffect, useState } from "react";

function AttendanceForm({
    attendance,
    onSubmit
}) {

    const [form, setForm] = useState({

        check_in: "",

        check_out: "",

        status: ""

    });

    useEffect(() => {

        if (attendance) {

            setForm({

                check_in: attendance.check_in || "",

                check_out: attendance.check_out || "",

                status: attendance.status

            });

        }

    }, [attendance]);

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        onSubmit({

            ...attendance,

            ...form

        });

    }

    return (

        <form
            className="employee-form"
            onSubmit={handleSubmit}
        >

            <input
                type="time"
                name="check_in"
                value={form.check_in}
                onChange={handleChange}
            />

            <input
                type="time"
                name="check_out"
                value={form.check_out}
                onChange={handleChange}
            />

            <select
                name="status"
                value={form.status}
                onChange={handleChange}
            >

                <option>Present</option>

                <option>Absent</option>

                <option>Late</option>

                <option>Leave</option>

            </select>

            <button type="submit">

                Update Attendance

            </button>

        </form>

    );

}

export default AttendanceForm;