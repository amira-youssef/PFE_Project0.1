import axios from 'axios';
import { useEffect, useState } from 'react';
import MaintenanceCard from './MaintenanceCard';
import FilterPanel from '../CarsTab/FilterPanel';
import '../CarsTab/style/layout.css'

function FilterableMaintenances() {
  const [type, setType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterCounter, setFilterCounter] = useState(0);
  const [maintenances, setMaintenances] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/maint/getAllByManager/${userData?._id}`);
        const maintenancesWithUpdatedImagePaths = response.data.map(maintenance => ({
          ...maintenance,
          mainImage: `http://localhost:5000/${maintenance?.mainImage}`,
        }));
        setMaintenances(maintenancesWithUpdatedImagePaths);
      } catch (error) {
        console.error('Error fetching maintenances:', error);
      }
    };

    fetchMaintenances();
  }, [userData?._id]);

  const handleDeleteMaintenance = (maintenanceId) => {
    setMaintenances(maintenances.filter((maintenance) => maintenance?._id !== maintenanceId));
  };

  const handleMaintenanceUpdate = (updatedMaintenance) => {
    setMaintenances((prevMaintenances) =>
      prevMaintenances.map((maintenance) =>
        maintenance._id === updatedMaintenance?._id ? updatedMaintenance : maintenance
      )
    );
  };

  function filterMaintenances(type, startDate, endDate) {
    return maintenances.filter((maintenance) => {
      if (type && maintenance.type !== type) return false;
      if (startDate && new Date(maintenance?.startDate) < new Date(startDate)) return false;
      if (endDate && new Date(maintenance?.endDate) > new Date(endDate)) return false;
      return true;
    });
  }

  const filteredMaintenances = filterMaintenances(type, startDate, endDate);

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
      case 'startDate':
        setStartDate(name);
        incrementCounterHandler();
        break;
      case 'endDate':
        setEndDate(name);
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
      case 'startDate':
        setStartDate(null);
        decrementCounterHandler();
        break;
      case 'endDate':
        setEndDate(null);
        decrementCounterHandler();
        break;
      default:
        break;
    }
  }

  function resetTagsHandler() {
    setType(null);
    setStartDate(null);
    setEndDate(null);
    setFilterCounter(0);
  }

  return (
    <>
      {filterCounter > 0 && (
        <FilterPanel
          type={type}
          startDate={startDate}
          endDate={endDate}
          filteredJobs={filteredMaintenances}
          removeTagHandler={removeTagHandler}
          resetTagsHandler={resetTagsHandler}
          className="filter__panel"
        />
      )}
      <div>
        <div className="cards-list">
          {filteredMaintenances.length > 0 ? (
            filteredMaintenances.map((maintenance) => (
              <MaintenanceCard
                key={maintenance?._id}
                {...maintenance}
                addTagHandler={addTagHandler}
                onMaintenanceUpdate={handleMaintenanceUpdate}
                onDelete={handleDeleteMaintenance}
                hidden={maintenance?.hidden}
              />
            ))
          ) : (
            <p>No maintenances found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default FilterableMaintenances;
