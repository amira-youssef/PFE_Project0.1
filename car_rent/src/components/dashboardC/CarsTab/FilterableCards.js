import { useEffect, useState } from 'react';
import FilterPanel from './FilterPanel';
import Card from './Card';
import './style/layout.css';
import './style/reset.css';
import './style/typography.css';
import './style/variables.css';
import axios from 'axios';

function FilterableCards() {
  const [type, setType] = useState(null);
  const [level, setLevel] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [tools, setTools] = useState([]);
  const [filterCounter, setFilterCounter] = useState(0);
  const [vehicles, setVehicles] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const agencyId = userData?.agencyId;

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!agencyId) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/getByAgId/${agencyId}`);
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, [agencyId]);

  function filterVehicles(type, level, languages, tools) {
    return vehicles.filter((vehicle) => {
      if (type && vehicle.type !== type) {
        return false;
      }

      if (level && vehicle.level !== level) {
        return false;
      }

      if (languages.length > 0 && !languages.every((lang) => vehicle.languages.includes(lang))) {
        return false;
      }

      if (tools.length > 0 && !tools.every((tool) => vehicle.tools.includes(tool))) {
        return false;
      }

      return true;
    });
  }

  const filteredVehicles = filterVehicles(type, level, languages, tools);

  function incrementCounterHandler() {
    setFilterCounter((prevCounter) => prevCounter + 1);
  }

  function decrementCounterHandler() {
    setFilterCounter((prevCounter) => prevCounter - 1);
  }

  function addTagHandler(category, name) {
    let shouldIncrementCounter = false;

    switch (category) {
      case 'type':
        if (name !== type) {
          setType(type);
          shouldIncrementCounter = true;
        }
        break;
      case 'level':
        if (name !== level) {
          setLevel(name);
          shouldIncrementCounter = true;
        }
        break;
      case 'languages':
        if (!languages.includes(name)) {
          setLanguages([...languages, name]);
          shouldIncrementCounter = true;
        }
        break;
      case 'tools':
        if (!tools.includes(name)) {
          setTools([...tools, name]);
          shouldIncrementCounter = true;
        }
        break;
      default:
        break;
    }

    if (shouldIncrementCounter) {
      incrementCounterHandler();
    }
  }

  function removeTagHandler(category, name) {
    let shouldDecrementCounter = false;

    if (category === 'type') {
      setType(null);
      shouldDecrementCounter = true;
    }

    if (category === 'level') {
      setLevel(null);
      shouldDecrementCounter = true;
    }

    if (category === 'languages') {
      const newLanguages = languages.filter((item) => item !== name);
      setLanguages(newLanguages);
      shouldDecrementCounter = true;
    }

    if (category === 'tools') {
      const newTools = tools.filter((item) => item !== name);
      setTools(newTools);
      shouldDecrementCounter = true;
    }

    if (shouldDecrementCounter) {
      decrementCounterHandler();
    }
  }

  function resetTagsHandler() {
    setType(null);
    setLevel(null);
    setLanguages([]);
    setTools([]);
    setFilterCounter(0);
  }

  return (
    <>
      {filterCounter > 0 && (
        <FilterPanel
          type={type}
          level={level}
          languages={languages}
          tools={tools}
          filteredJobs={filteredVehicles}
          removeTagHandler={removeTagHandler}
          resetTagsHandler={resetTagsHandler}
        />
      )}
      <div >
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
                addTagHandler={addTagHandler}
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
