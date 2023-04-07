import { Card, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { apis } from "./HTTP_requests";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getSessionToken } from "@/utils";

export default function Register() {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPass: "",
      country: "",
    },
  });

  useEffect(() => {

    if(getSessionToken()) {
      router.push('/')
  }
    let data = {
      fullName: "",
      email: "",
      password: "",
      confirmPass: "",
      country: "",
    };

    for (const prop in data) {
      setValue(prop, data[prop]);
    }
  }, []);

  function submitForm(data) {
    apis.registerUser(data).then((res) => {
      if(res?.user) {
        toast.success(res?.message || "Success");
        router.push('/login')
      }else {
        toast.error(res?.message || "Error");
      }
    }).catch(error => {
      if(error?.response?.data?.message){
        toast.error(error?.response?.data?.message || "Error");
      }
    })
  }
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title className="text-center" style={{ fontSize: 50 }}>
            <strong>Register an Account</strong>
          </Card.Title>
          <div className="registerForm">
            <form onSubmit={handleSubmit(submitForm)}>
              Full Name:
              <br />
              <input {...register("fullName")} />
              <br />
              Email Address:
              <br />
              <input {...register("email")} /> <br />
              Password:
              <br />
              <input {...register("password")} type="password" />
              <br />
              Confirm Password:
              <br />
              <input {...register("confirmPass")} type="password" />
              <br />
              Country:
              <br />
              <input {...register("country")} />
              <br />
              <br />
              <span>
                <Button type="submit">Register</Button>
              </span>
            </form>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
