import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from './Card';
import FilterPanel from './FilterPanel';

function FilterableCards() {
  const [type, setType] = useState(null);
  const [maker, setMaker] = useState(null);
  const [boite, setBoite] = useState(null);
  const [filterCounter, setFilterCounter] = useState(0);
  const [vehicles, setVehicles] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const agencyId = userData?.agencyId;

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/getByAgId/${userData?.agencyId}`);
        const vehiclesWithUpdatedImagePaths = response.data.map(vehicle => ({
          ...vehicle,
          mainImage: `http://localhost:5000/${vehicle.mainImage}`,
          image1: `http://localhost:5000/${vehicle.image1}`,
          image2: `http://localhost:5000/${vehicle.image2}`,
          image3: `http://localhost:5000/${vehicle.image3}`,
        }));
        setVehicles(vehiclesWithUpdatedImagePaths);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, [agencyId]);

  function filterVehicles(type, maker, boite) {
    return vehicles.filter((vehicle) => {
      if (type && vehicle.type !== type) return false;
      if (maker && vehicle.maker !== maker) return false;
      if (boite && vehicle.boite !== boite) return false;
      return true;
    });
  }

  const filteredVehicles = filterVehicles(type, maker, boite);

  function incrementCounterHandler() {
    setFilterCounter((prevCounter) => prevCounter + 1);
  }

  function decrementCounterHandler() {
    setFilterCounter((prevCounter) => prevCounter - 1);
  }

  function addTagHandler(category, name) {
    switch (category) {
      case 'type':
        setType(name);
        incrementCounterHandler();
        break;
      case 'maker':
        setMaker(name);
        incrementCounterHandler();
        break;
      case 'boite':
        setBoite(name);
        incrementCounterHandler();
        break;
      default:
        break;
    }
  }

  function removeTagHandler(category, name) {
    switch (category) {
      case 'type':
        setType(null);
        decrementCounterHandler();
        break;
      case 'maker':
        setMaker(null);
        decrementCounterHandler();
        break;
      case 'boite':
        setBoite(null);
        decrementCounterHandler();
        break;
      default:
        break;
    }
  }

  function resetTagsHandler() {
    setType(null);
    setMaker(null);
    setBoite(null);
    setFilterCounter(0);
  }

  return (
    <>
      {filterCounter > 0 && (
        <FilterPanel
          type={type}
          maker={maker}
          boite={boite}
          filteredJobs={filteredVehicles}
          removeTagHandler={removeTagHandler}
          resetTagsHandler={resetTagsHandler}
        />
      )}
      <div>
        <div className="cards-list">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle) => (
              <Card
                key={vehicle._id}
                _id={vehicle._id}
                maker={vehicle.maker}
                model={vehicle.model}
                boite={vehicle.boite}
                year={vehicle.year}
                capacity={vehicle.capacity}
                type={vehicle.type}
                description={vehicle.description}
                mainImage={vehicle.mainImage}
                image1={vehicle.image1}
                image2={vehicle.image2}
                image3={vehicle.image3}
                pricePerDay={vehicle.pricePerDay}
                count={vehicle.count}
                address={vehicle.address}
                addTagHandler={addTagHandler}
                hidden={vehicle.hidden}
              />
            ))
          ) : (
            <p>No vehicles found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default FilterableCards;
