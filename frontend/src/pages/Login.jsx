import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email || !password) {
      return alert("All fields are required");
    }

    axios
      .post("http://localhost:5000/api/auth/login", { email, password })
      .then((response) => {
        alert(response.data.message);
        if (response.data.success) {
          localStorage.setItem("token", response.data.userData.id);
          navigate("/");
        }
      });
  };

  return (
    <Typography
      variant="div"
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"90vh"}
      width={"100vw"}
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
          border: "1px solid black",
          padding: "2rem",
          borderRadius: "5px",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <p>Welcome Again</p>
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
        <span>
          <p>Dont have an account? </p>
          <Link to={"/register"}>Register Now</Link>
        </span>
      </Box>
    </Typography>
  );
};

export default Login;
