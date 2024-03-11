import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const DateSelector = ({ selectedDate, setSelectedDate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handlePrevDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setSelectedDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const handleToday = () => {
    const today = new Date();
    setSelectedDate(today);
  };

  const handleChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const generateDateRange = (startDate, endDate) => {
    const dates = [];
    for (
      let currentDate = new Date(startDate);
      currentDate <= endDate;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      dates.push(new Date(currentDate));
    }
    return dates;
  };

  const getPastAndNextDateRange = () => {
    const today = new Date();
    const pastDays = new Date(today);
    pastDays.setDate(today.getDate());

    const nextDays = new Date(today);
    nextDays.setDate(today.getDate() + 7);

    return generateDateRange(pastDays, nextDays);
  };

  const DateShort = ({ date }) => {
    const day = date.getDate();
    const weekday = date.toLocaleString("default", { weekday: "short" });
    const isToday =
      new Date(date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
    const isThisDate = selectedDate.toDateString() === date.toDateString();
    const isPast = date < new Date();

    const buttonStyle = {
      minWidth: "48px",
      fontWeight: "600",
      backgroundColor: isThisDate
        ? "linear-gradient(to bottom right, #4F46E5, #4338CA)"
        : isToday
        ? "linear-gradient(to bottom right, #E5E7EB, #FFFFFF)"
        : isPast
        ? "linear-gradient(to bottom right, #4B5563, #6B7280)"
        : "linear-gradient(to bottom right, #FFFFFF, #E5E7EB)",
      color: isThisDate ? "#FFFFFF" : isToday ? "#4F46E5" : "#111827",
    };

    const handleClick = () => {
      setSelectedDate(date);
      sessionStorage.setItem("selectedDate", date);
    };

    return (
      <Button style={buttonStyle} onClick={handleClick}>
        <Typography variant="body1">{weekday}</Typography>
        <Typography variant="h5">{day}</Typography>
      </Button>
    );
  };

  return (
    <Box
      component="div"
      display="flex"
      justifyContent="center"
      width="800px"
      bgcolor="black"
      margin="auto"
      padding="1rem"
      borderRadius="10px"
      flexDirection="column"
      gap="2rem"
    >
      <Box
        component="div"
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        gap="20px"
        width="100%"
      >
        <Button onClick={handlePrevDay}>Prev</Button>
        {isEditing ? (
          <TextField
            type="date"
            InputLabelProps={{ shrink: true }}
            value={selectedDate.toISOString().split("T")[0]}
            onChange={handleChange}
          />
        ) : (
          <Typography variant="p" color="white">
            {formatDate(selectedDate)}
          </Typography>
        )}
        <Button onClick={handleNextDay}>Next</Button>
        <Button onClick={handleToday}>Today</Button>
      </Box>

      <div className="flex gap-2 overflow-auto">
        {getPastAndNextDateRange().map((date, index) => (
          <DateShort key={index} date={date} />
        ))}
      </div>
    </Box>
  );
};

export default DateSelector;
