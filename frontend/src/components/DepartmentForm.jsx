import { useEffect, useState } from "react";

function DepartmentForm({ department, onSubmit }) {

    const [form, setForm] = useState({

        department_name: "",
        description: ""

    });


    useEffect(() => {

        if (department) {

            setForm({

                department_name: department.department_name,
                description: department.description || ""

            });

        }

    }, [department]);


    function handleChange(e) {

        setForm({

            ...form,
            [e.target.name]: e.target.value

        });

    }


    function handleSubmit(e) {

        e.preventDefault();

        onSubmit({

            ...department,
            ...form

        });

    }


    return (

        <form
            className="employee-form"
            onSubmit={handleSubmit}
        >

            <input
                name="department_name"
                value={form.department_name}
                onChange={handleChange}
                placeholder="Department Name"
                required
            />


            <input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
            />


            <button type="submit">

                Update Department

            </button>

        </form>

    );

}

export default DepartmentForm;