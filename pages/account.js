import Card from 'react-bootstrap/Card'
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';

export default function Account() {
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            country: "",
            oldPass: "",
            newPass: "",
            confirmPass: "",
            elementry: false,
            secondery: false,
            hospital: false,
            gym: false,
            mall: false,
            grocery: false,
            park: false
        }
    });

    useEffect(() => {
        let data = {
            fullName: "",
            email: "",
            country: "",
            oldPass: "",
            newPass: "",
            confirmPass: "",
            elementry: false,
            secondery: false,
            hospital: false,
            gym: false,
            mall: false,
            grocery: false,
            park: false
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
                    <Card.Title className="text-center" style={{ fontSize: 50 }}><strong>User Information</strong></Card.Title>
                    <form onSubmit={handleSubmit(submitForm)}>
                        Full Name: <span className="checkBoxClassA">Old Password:</span><br/>
                        <input {...register("fullName")} /><span className="checkBoxClass2"><input {...register("oldPass")} /></span><br />
                        Email Address: <span className="checkBoxClassB">New Password:</span><br />
                        <input {...register("email")} /> <span className="checkBoxClass2"><input {...register("newPass")} /></span><br />
                        Country: <span className="checkBoxClassC">Confirm New Password:</span><br />
                        <input {...register("country")} /> <span className="checkBoxClass2"><input {...register("confirmPass")} /></span><br /><br/>
                        <h3>Amenity Preferences:</h3>
                        <input type="checkbox" {...register("elementry")} /> Elementry School &nbsp;<span className="checkBoxClass" ><input type="checkbox" {...register("mall")} /> Shopping Mall</span><br /><br />
                        <input type="checkbox" {...register("secondery")} /> Secondery School <span className="checkBoxClass" ><input type="checkbox" className="checkBoxClass" {...register("grocery")} /> Grocery Store</span><br /><br />
                        <input type="checkbox" {...register("hospital")} /> Hospital &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="checkBoxClass"><input type="checkbox" className="checkBoxClass" {...register("park")} /> Park</span><br /><br />
                        <input type="checkbox" {...register("gym")} /> Gym<br /><br />
                        <span className="btnRank"><Button type="submit">Save Information</Button></span>
                    </form>
                </Card.Body>
            </Card>
        </>
    )
}