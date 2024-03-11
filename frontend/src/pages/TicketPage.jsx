import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Checkbox,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

const TicketPage = () => {
  const [tickets, setTickets] = useState();

  const { id } = useParams();
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .post(`http://localhost:5000/api/movie/tickets/${id}/${token}`, {
        tickets: tickets,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          alert(response.data.message);
          navigate(`/`);
        }
      });
  };

  return (
    <div>
      <Toolbar />
      <Typography
        variant="div"
        maxWidth="400px"
        margin="auto"
        display="flex"
        flexDirection={"column"}
        gap="1rem"
      >
        <TextField
          label="Number of Tickets"
          type="number"
          onChange={(e) => setTickets(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Typography>
    </div>
  );
};

export default TicketPage;
