import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography, CircularProgress, TextField } from "@mui/material";

const Schedule = () => {
  const [time, setTime] = useState(null);
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movie/onemovie/${id}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleSchedule = () => {
    console.log(time)
    axios
      .post(
        `http://localhost:5000/api/movie/schedule/${id}`, { time }
      )
      .then((response) => {
        console.log(response);
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6">Error: {error}</Typography>;
  }

  return (
    <Box
      component={"div"}
      display={"flex"}
      flexDirection={"column"}
      gap={"20px"}
    >
      {/* Movie details section */}
      <Box
        component={"div"}
        display={"flex"}
        gap={"2rem"}
        justifyContent={"space-around"}
        width={"800px"}
        margin={"auto"}
      >
        <img
          width={"300px"}
          src={`http://localhost:5000/uploads/${movie._id}.jpg`}
        />

        <Box
          component={"div"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"10px"}
        >
          <Typography variant="h4">{movie.name}</Typography>
          <Typography variant="p">Director : {movie.director}</Typography>
          <Typography variant="p">Language : {movie.language}</Typography>
          <Typography variant="p">Genre : {movie.genre}</Typography>
          <Typography variant="p">Duration : {movie.duration}</Typography>
        </Box>
      </Box>

      {/* DateTimePicker */}
      <Box width={'800px'} margin={'auto'}>

        <TextField fullWidth type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} />

      </Box>

      {/* Schedule button */}
      <Button
        style={{
          color: "white",
          backgroundColor: "black",
          width: "800px",
          margin: "auto",
        }}
        onClick={handleSchedule}
      >
        Schedule Now
      </Button>
    </Box>
  );
};

export default Schedule;
