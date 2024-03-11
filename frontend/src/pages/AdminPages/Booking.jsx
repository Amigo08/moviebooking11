import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movie/activemovies")
      .then((response) => {
        console.log(response.data);
        setMovies(response.data);
      });
  }, []);

  const handleBooking = (id) => {
    console.log(id);
    navigate(`/admin/bookings/${id}`);
  };

  return (
    <Typography
      variant="div"
      maxWidth={"1200px"}
      margin={"auto"}
      marginTop={"80px"}
      marginBottom={"100px"}
      display={"flex"}
      justifyContent={"center"}
      flexWrap={"wrap"}
      gap={"20px"}
    >
      {movies.map((value, index) => {
        return (
          <Card
            key={index}
            style={{ width: "300px" }}
            sx={{ maxWidth: "260px" }}
          >
            <CardMedia
              sx={{ height: "360px" }}
              image={`http://localhost:5000/uploads/${value._id}.jpg`}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {value.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => handleBooking(value._id)}
                fullWidth
                size="small"
              >
                Bookings
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </Typography>
  );
};

export default Booking;
