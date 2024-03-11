import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !email || !password || !cpassword) {
      return alert("All fields are required");
    }

    if (password !== cpassword) {
      return alert("password is not match");
    }

    axios
      .post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      })
      .then((response) => {
        alert(response.data.message);
        if (response.data.success) {
          navigate("/login");
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
          Register
        </Typography>
        <TextField
          label="Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
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
        <TextField
          label="Confirm Password"
          type="password"
          onChange={(e) => setCPassword(e.target.value)}
        />
        <Button onClick={handleSubmit} fullWidth variant="contained">
          Register
        </Button>
        <span>
          <p>Already have an account? </p>
          <Link to={"/login"}>Login Now</Link>
        </span>
      </Box>
    </Typography>
  );
};

export default Register;
