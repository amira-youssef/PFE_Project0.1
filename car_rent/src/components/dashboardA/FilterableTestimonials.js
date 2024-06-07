import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../dashboardC/CarsTab/style/components.css';

function FilterableTestimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/testimonials/getAll');
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

 
  const handleDeleteTestimonial = async (testimonialId) => {
    try {
      await axios.delete(`http://localhost:5000/api/testimonials/${testimonialId}`);
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  return (
    <div className="container">
      <div className="cards-list">
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="card">
            <h3>{testimonial.name}</h3>
            <p>{testimonial.message}</p>
            <button onClick={() => handleDeleteTestimonial(testimonial._id)} className="delete-button">
              <FontAwesomeIcon icon={faTrashAlt} /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterableTestimonials;
