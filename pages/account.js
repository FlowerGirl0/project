import Card from "react-bootstrap/Card";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { apis } from './HTTP_requests'
import { Modal } from "react-bootstrap";
import { removeSessionToken } from "@/utils";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";

export default function Account() {
  const router = useRouter();
  const [user, setUser] = useState();
  const [showModal, setShowModal] = useState(false);
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

  const updateValues = () => {
    const user = JSON.parse(window?.localStorage.getItem("__user__"));
    let data = {
      fullName: user?.fullName,
      email: user?.email,
      country: user?.country,
      oldPass: user?.oldPass,
      password: "",
      confirmPass: "",
      elementry: user?.amenities?.elementry,
      secondery: user?.amenities?.secondery,
      hospital: user?.amenities?.hospital,
      gym: user?.amenities?.gym,
      mall: user?.amenities?.mall,
      grocery: user?.amenities?.grocery,
      park: user?.amenities?.park,
    };

    for (const prop in data) {
      setValue(prop, data[prop]);
    }
    setUser(user)
  }

  function submitForm(data) {
    const amenities = {
      elementry: data?.elementry,
      secondery: data?.secondery,
      hospital: data?.hospital,
      gym: data?.gym,
      mall: data?.mall,
      grocery: data?.grocery,
      park: data?.park,
    };

    apis.updateUser({ id: user.id, password: data.password, confirmPass: data.confirmPass, oldPass: data.oldPass, amenities }).then((res) => {
      if (res?.user) {
        toast.success(res?.message || "Success");
        window?.localStorage.setItem('__user__', JSON.stringify({ ...res.user, oldPass: data.password ? data.password : data.oldPass }));
        updateValues()
      } else {
        toast.error(res?.message || "Error");
      }
    }).catch(error => {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message || "Error");
      }
    })
  }

  const handleDeleteAccount = async () => {
    apis.deleteAccount(user.id).then(res => {
      if(res.code === 200) {
        toast.success(res?.message || "Success");
        removeSessionToken();
        window?.localStorage.removeItem('__user__');
        router.push('/register')
        setShowModal(false);
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
          <Card.Title className="text-center" style={{ fontSize: 50 }}>
            <strong>User Information</strong>
          </Card.Title>
          <form onSubmit={handleSubmit(submitForm)}>
            Full Name: <span className="checkBoxClassA">Old Password:</span>
            <br />
            <input disabled {...register("fullName")} />
            <span className="checkBoxClass2">
              <input {...register("oldPass")} disabled />
            </span>
            <br />
            Email Address: <span className="checkBoxClassB">New Password:</span>
            <br />
            <input disabled {...register("email")} />{" "}
            <span className="checkBoxClass2">
              <input {...register("password")} type="password" />
            </span>
            <br />
            Country:{" "}
            <span className="checkBoxClassC">Confirm New Password:</span>
            <br />
            <input disabled {...register("country")} />{" "}
            <span className="checkBoxClass2">
              <input {...register("confirmPass")} type="password" />
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
            <span className="btnRank">
              <br />
              <Button type="submit">Save Information</Button>
            </span>
            <Button type="button" variant="danger" className=" mx-2" onClick={() => setShowModal(true)}>Delete Account</Button>
          </form>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure you?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography className='my-2'>
            You are about to delete your account permanently, think one time!
          </Typography>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
