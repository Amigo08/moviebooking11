import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "admin") {
      navigate("/admin");
    }
  }, [role, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/adminlogin", { email, password })
      .then(({ data }) => {
        console.log(data);
        alert(data.message);
        if (data.success) {
          localStorage.setItem("token", data.adminData.id);
          localStorage.setItem("role", data.adminData.role);
          localStorage.setItem("name", data.adminData.name);
          navigate("/admin");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Box
        component={"div"}
        maxWidth="300px"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <TextField
          label="Email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit} fullWidth variant="contained">
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default AdminLogin;
