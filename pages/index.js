import Card from 'react-bootstrap/Card'
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ResultCard from '@/components/ResultCard';
import { Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getSessionToken } from '@/utils';

const KEY = process.env.MAPQUEST_API_KEY || 'ck2OXUAJsF0iz999XGQ62jyXo8AXOVp7';

export default function Home() {
  const [results, setResults] = useState([])
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
    const user = JSON.parse(window?.localStorage.getItem("__user__"));
    let data = {
      addresses: "1337 Brannon Street, Irvine California, United States;Irvine California, United States; California",
      elementry: user?.amenities?.elementry,
      secondery: user?.amenities?.secondery,
      hospital: user?.amenities?.hospital,
      gym: user?.amenities?.gym,
      mall: user?.amenities?.mall,
      grocery: user?.amenities?.grocery,
      park: user?.amenities?.park,
    }

    for (const prop in data) {
      setValue(prop, data[prop]);
    }
  }, []);

  function submitForm(data) {
    if(!getSessionToken()){
      toast.info("Please login inorder to use the calculator!")
      return;
    }
    const addresses = data.addresses?.split(';').filter(a => a !== '')
    if (data.addresses && addresses?.length) {
      if (addresses.length > 10) {
        toast.error("Too much addresses found, addresses should be less than 10")
        return;
      }
      L.mapquest.key = KEY;

      const inputData = addresses.length > 1 ? addresses : addresses[0]

      L.mapquest.geocoding().geocode(inputData, handleResponse);

      function handleResponse(error, response) {
        var locations = response.results;

        const mergeAllLocations = [];
        const results = [];

        const { elementry, secondery, hospital, gym, mall, grocery, park } = data;
        const amenities = [
          { value: elementry ? "Elementry School" : "" },
          { value: secondery ? "Secondary School" : "" },
          { value: hospital ? "Hospital" : "" },
          { value: gym ? "Gym" : "" },
          { value: mall ? "Shopping Mall" : "" },
          { value: grocery ? "Grocery Store" : "" },
          { value: park ? "Park" : "" }].filter(e => e.value !== "");

        locations.forEach(l => l.locations.forEach(location => mergeAllLocations.push({ ...location, providedLocation: l.providedLocation.location })))
        mergeAllLocations.forEach(async location => {
          const { lat, lng } = location.displayLatLng;
          const amnt = [];
          for (let j = 0; j < amenities.length; j++) {
            const url = `https://www.mapquestapi.com/search/v4/place?location=${lng}, ${lat}&sort=distance&key=${KEY}&q=${amenities[j].value}`;
            const response = await fetch(url);
            const resData = await response.json();
            if (resData?.results?.length)
              amnt.push({
                [amenities[j].value]: resData.results,
              });
          }
          results.push({
            address: location.providedLocation,
            coords: location.displayLatLng,
            amenities: amnt,
          });


          const distances = calculateDistanceFromAmenities(results);
          const ranking = calculateRank(distances);
          setResults(ranking)
        });

      }

    } else {
      toast.error("Please enter the addresses")
    }

  }

  const calculateDistanceFromAmenities = (locationData) => {
    let addressesToDistance = [];
    locationData.forEach((data) => {
      const { address } = data;
      const long1 = data.coords.lng;
      const lat1 = data.coords.lat;



      const amnts = data.amenities;
      // [Long, Lat]
      const distances = [];
      amnts.forEach((amenity) => {
        const amenityName = Object.keys(amenity)[0];

        const addressedAmenities = amenity[amenityName].map(amnt => {
          const [long2, lat2] = amnt.place.geometry.coordinates;
          // console.log(long2, lat2);
          return {
            amenityName,
            amenity: {
              ...amnt,
              distance: (Math.sqrt(
                Math.pow(long2 - long1, 2) + Math.pow(lat2 - lat1, 2)
              )) * 2.230711
            },
          }
        })

        const nearest = addressedAmenities.reduce((prev, current) => {
          return (prev.amenity.distance < current.amenity.distance) ? prev : current;
        });
        distances.push(nearest);
      });

      addressesToDistance.push({
        address,
        distances,
      });
    });



    return addressesToDistance;
  };

  const calculateRank = (addresses) => {
    let updatedAddresses = addresses.map((address) => {
      let rank = 0;
      address.distances.forEach(d =>
        rank += d.amenity.distance
      );
      return {
        ...address,
        rank: addresses.length > 1 ? Math.round(rank) : 10
      }
    });
    function rankings(arr) {
      const sorted = [...arr].sort((a, b) => b.rank - a.rank);
      return arr.map((x) => { return { ...x, rank: sorted.indexOf(x) + 1 } });
    };

    updatedAddresses = rankings(updatedAddresses);
    return updatedAddresses.sort((a, b) => b.rank - a.rank);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title className="text-center" style={{ fontSize: 50 }}><strong>Find Your Dream Home</strong></Card.Title>
          <form onSubmit={handleSubmit(submitForm)}>
            Addresses: <br />
            <textarea placeholder="Please enter your addresses divided by a smicolon" class="form-control" rows="4" {...register("addresses")} id="search-input"></textarea><br />
            <input type="checkbox" {...register("elementry")} /> Elementry School &nbsp;<span className="checkBoxClass" ><input type="checkbox" {...register("mall")} /> Shopping Mall</span><br /><br />
            <input type="checkbox" {...register("secondery")} /> Secondery School <span className="checkBoxClass" ><input type="checkbox" className="checkBoxClass" {...register("grocery")} /> Grocery Store</span><br /><br />
            <input type="checkbox" {...register("hospital")} /> Hospital &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="checkBoxClass"><input type="checkbox" className="checkBoxClass" {...register("park")} /> Park</span><br /><br />
            <input type="checkbox" {...register("gym")} /> Gym<br /><br />
            <span className="btnRank"><Button type="submit">Get Rankings</Button></span>
          </form>
        </Card.Body>
      </Card>
      <div>
        {results?.map(result => (
          <>
            <div className='d-flex gap-2 align-items-center'>
              <h2 className='text-white my-4'>{result.address}</h2>
              <Badge pill bg="success">Rank - {result.rank}</Badge>
            </div>
            <div className='mt-5 d-flex flex-wrap gap-5'>
              {result.distances.map(item => <ResultCard {...item} result={result} />)}
            </div>

          </>
        ))}

      </div>
    </>
  )
}
