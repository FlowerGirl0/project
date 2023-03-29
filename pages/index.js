import Card from 'react-bootstrap/Card'
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';

export default function Home() {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      addresses: "",
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
      addresses: "",
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
          <Card.Title className="text-center" style={{ fontSize: 50}}><strong>Find Your Dream Home</strong></Card.Title>
          <form onSubmit={handleSubmit(submitForm)}>
            Addresses: <br />
            <textarea placeholder="Please enter your addresses divided by a smicolon" class="form-control" rows="4" {...register("addresses")}></textarea><br />
            <input type="checkbox" {...register("elementry")} /> Elementry School &nbsp;<span className="checkBoxClass" ><input type="checkbox" {...register("mall")} /> Shopping Mall</span><br /><br />
            <input type="checkbox" {...register("secondery")} /> Secondery School <span className="checkBoxClass" ><input type="checkbox" className="checkBoxClass" {...register("grocery")} /> Grocery Store</span><br /><br />
            <input type="checkbox" {...register("hospital")} /> Hospital &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="checkBoxClass"><input type="checkbox" className="checkBoxClass" {...register("park")} /> Park</span><br /><br />
            <input type="checkbox" {...register("gym")} /> Gym<br /><br />
            <span className="btnRank"><Button type="submit">Get Rankings</Button></span>
          </form>
        </Card.Body>
      </Card>
    </>
  )
}
