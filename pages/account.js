import Card from "react-bootstrap/Card";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import {apis} from './HTTP_requests'

export default function Account() {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      country: "",
      oldPass: "",
      password: "",
      confirmPass: "",
      elementry: false,
      secondery: false,
      hospital: false,
      gym: false,
      mall: false,
      grocery: false,
      park: false,
    },
  });

  useEffect(() => {
    updateValues();
  }, []);

  const updateValues = () =>  {
    const user = JSON.parse(window?.localStorage.getItem("__user__"));
    let data = {
      fullName: user?.fullName,
      email: user?.email,
      country: user?.country,
      oldPass: user?.password,
      password: "",
      confirmPass: "",
      elementry: false,
      secondery: false,
      hospital: false,
      gym: false,
      mall: false,
      grocery: false,
      park: false,
    };

    for (const prop in data) {
      setValue(prop, data[prop]);
    }
  }

  function submitForm(data) {
    apis.updateUser({ password: data.password, confirmPass: data.confirmPass, oldPass: data.oldPass }).then((res) => {
      toast.success(res?.message || "Success");

      window?.localStorage.setItem('__user__', JSON.stringify(res.user));
      updateValues()
    });
  }
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title className="text-center" style={{ fontSize: 50 }}>
            <strong>User Information</strong>
          </Card.Title>
          <form onSubmit={handleSubmit(submitForm)}>
            Full Name: <span className="checkBoxClassA">Old Password:</span>
            <br />
            <input disabled {...register("fullName")} />
            <span className="checkBoxClass2">
              <input {...register("oldPass")} />
            </span>
            <br />
            Email Address: <span className="checkBoxClassB">New Password:</span>
            <br />
            <input disabled {...register("email")} />{" "}
            <span className="checkBoxClass2">
              <input {...register("password")} type="password"/>
            </span>
            <br />
            Country:{" "}
            <span className="checkBoxClassC">Confirm New Password:</span>
            <br />
            <input disabled {...register("country")} />{" "}
            <span className="checkBoxClass2">
              <input {...register("confirmPass")} type="password"/>
            </span>
            <br />
            <br />
            <h3>Amenity Preferences:</h3>
            <input type="checkbox" {...register("elementry")} /> Elementry
            School &nbsp;
            <span className="checkBoxClass">
              <input type="checkbox" {...register("mall")} /> Shopping Mall
            </span>
            <br />
            <br />
            <input type="checkbox" {...register("secondery")} /> Secondery
            School{" "}
            <span className="checkBoxClass">
              <input
                type="checkbox"
                className="checkBoxClass"
                {...register("grocery")}
              />{" "}
              Grocery Store
            </span>
            <br />
            <br />
            <input type="checkbox" {...register("hospital")} /> Hospital
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="checkBoxClass">
              <input
                type="checkbox"
                className="checkBoxClass"
                {...register("park")}
              />{" "}
              Park
            </span>
            <br />
            <br />
            <input type="checkbox" {...register("gym")} /> Gym
            <br />
            <br />
            <span className="btnRank">
              <Button type="submit">Save Information</Button>
            </span>
          </form>
        </Card.Body>
      </Card>
    </>
  );
}
