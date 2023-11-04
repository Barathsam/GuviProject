import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
import API_URL from "../../config/global";

const Login = () => {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = ({ target: { name, value } }) => {
    setFormdata({ ...formdata, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, formdata);
      console.log(response);
      if (response.data === "invalid user or password") {
        alert("invalid user or password");
      } else if (response.data === "server busy") {
        alert("verify your email id");
      } else if (response?.status) {
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        navigate("/home");
      }
    } catch (error) {
      console.error("error during registeration", error);
    }
  };
  return (
    <div>
      <Container>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
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
            Login
          </Button>
          <p>Already have an Account</p>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
