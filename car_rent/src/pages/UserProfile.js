import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, Image, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [rents, setRents] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchRents = async () => {
      if (userData && userData._id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/rents/getAllByUser/${userData._id}`);
          setRents(response.data);
        } catch (error) {
          console.error('Error fetching rents:', error);
        }
      }
    };

    fetchRents();
  }, [userData]);

  const handleLogout = () => {
    // Clear all items from local storage
    localStorage.clear();
    // Set isLoggedIn to false
    localStorage.setItem('isLoggedIn', false);
    // Redirect to login page and reload the window
    navigate("/login");
    window.location.reload();
  };

  if (!userData) {
    return null; // Optionally, show a loading spinner or message
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={4}>
          <Card className="text-center mb-4">
            <Card.Body>
              <Image 
                src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" 
                roundedCircle 
                style={{ width: '100px', height: '100px', marginBottom: '1rem' }} 
              />
              <Card.Title>User Information</Card.Title>
              <Card.Text><strong>Name:</strong> {userData.nom} {userData.prenom}</Card.Text>
              <Card.Text><strong>Email:</strong> {userData.email}</Card.Text>
              <Card.Text><strong>Address:</strong> {userData.address}</Card.Text>
              <Button variant="danger" onClick={handleLogout} className="mt-3">
                Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Rents</Card.Title>
              <ListGroup variant="flush">
                {rents.length > 0 ? (
                  rents.map((rent) => {
                    const { maker, model, mainImage } = rent;
                    return (
                      <ListGroup.Item key={rent._id}>
                        <Row className="align-items-center">
                          <Col xs={3}>
                            <Image src={`http://localhost:5000/${mainImage}`} rounded fluid />
                          </Col>
                          <Col>
                            <strong>Vehicle:</strong> {maker} {model}<br />
                            <strong>Pickup:</strong> {new Date(rent.pickupDateTime).toLocaleDateString()}<br />
                            <strong>Return:</strong> {new Date(rent.returnDateTime).toLocaleDateString()}<br />
                            <strong>Status:</strong> {rent.status}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })
                ) : (
                  <Card.Text>No rents found.</Card.Text>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
