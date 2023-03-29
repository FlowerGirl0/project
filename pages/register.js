import { Card, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function Register() {
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            pass: "",
            confirmPass: "",
            country: ""
        }
    });

    useEffect(() => {
        let data = {
            fullName: "",
            email: "",
            pass: "",
            confirmPass: "",
            country: ""
        }

        for (const prop in data) {
            setValue(prop, data[prop]);
        }
    }, []);

    function submitForm(data) {
        console.log(data);
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title className="text-center" style={{ fontSize: 50 }}><strong>Register an Account</strong></Card.Title>
                    <div className="registerForm">
                        <form onSubmit={handleSubmit(submitForm)}>
                            Full Name:<br />
                            <input {...register("fullName")} /><br />
                            Email Address:<br />
                            <input {...register("email")} /> <br />
                            Password:<br />
                            <input {...register("pass")} /><br />
                            Confirm Password:<br />
                            <input {...register("confirmPass")} /><br />
                            Country:<br />
                            <input {...register("country")} /><br /><br />
                            <span><Button type="submit">Register</Button></span>
                        </form>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}