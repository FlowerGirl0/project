import Card from 'react-bootstrap/Card'
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';

export default function Account() {
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    useEffect(() => {
        let data = {
            email: "",
            password: ""
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
                    <Card.Title className="text-center" style={{ fontSize: 50 }}><strong>Login</strong></Card.Title>
                    <div className="loginForm">
                    <form onSubmit={handleSubmit(submitForm)}>
                        Email Address:<br/>
                        <input {...register("email")} /><br />
                        Password:<br />
                        <input {...register("password")} /> <br /><br/>
                        <span><Button type="submit">Login</Button></span>
                    </form>
                    </div>
                </Card.Body>
            </Card>
      </>
    )
}