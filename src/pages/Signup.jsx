import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config/global";
import "../styles/Signup.css";

const Signup = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = ({ target: { name, value } }) => {
    setFormdata({ ...formdata, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/signin/verify`, formdata);
      console.log(response);
      if (response.data === true) {
        alert("Registeration Link Send to your EmailId");
      } else {
        alert("User already registered");
      }
    } catch (error) {
      console.error("error during registeration", error);
    }
  };
  return (
    <div>
      <Container>
        <h1>User Registeration</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formdata.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
          <p>
            Already have an Account <Link to="/login">Login</Link>
          </p>
        </Form>
      </Container>
    </div>
  );
};

export default Signup;
