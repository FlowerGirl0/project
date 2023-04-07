import Card from 'react-bootstrap/Card'
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { apis } from './HTTP_requests'
import { getSessionToken, saveSessionToken } from '@/utils';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function Account() {
    const router = useRouter();
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    useEffect(() => {

        if (getSessionToken()) {
            router.push('/')
        }

        let data = {
            email: "",
            password: ""
        }

        for (const prop in data) {
            setValue(prop, data[prop]);
        }
    }, []);

    async function submitForm(data) {
        apis.login(data).then(res => {
            if (res?.user) {
                saveSessionToken(res.user.token);
                window?.localStorage.setItem('__user__', JSON.stringify(res.user));
                toast.success(res?.message || "Success");
                router.push('/')
            } else {
                toast.error(res?.message || "Error");
            }
        }).catch(error => {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message || "Error");
            }
        })
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title className="text-center" style={{ fontSize: 50 }}><strong>Login</strong></Card.Title>
                    <div className="loginForm">
                        <form onSubmit={handleSubmit(submitForm)}>
                            Email Address:<br />
                            <input {...register("email")} /><br />
                            Password:<br />
                            <input {...register("password")} type="password" /> <br /><br />
                            <span><Button type="submit">Login</Button></span>
                        </form>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}