import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/tickets/${id}`)
      .then((response) => {
        console.log(response.data);
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, [id]); // <-- Include 'id' in the dependency array

  useEffect(() => {
    // Calculate total tickets whenever 'bookings' changes
    let total = 0;
    bookings.forEach((booking) => {
      total += booking.tickets;
    });
    setTotalTickets(total);
  }, [bookings]); // <-- Include 'bookings' in the dependency array

  return (
    <div>
      <Toolbar />
      <Typography variant="h5">Total Tickets: {totalTickets}</Typography>{" "}
      <Toolbar />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>UserId</TableCell>
              <TableCell>Tickets</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((value, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{value.user}</TableCell>
                <TableCell>{value.tickets}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Display total tickets */}
    </div>
  );
};

export default Bookings;
