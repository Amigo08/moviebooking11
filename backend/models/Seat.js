const mongoose = require("mongoose");

const seatSchema = mongoose.Schema({
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: "Movie",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  tickets: {
    type: Number,
    default: 0,
  },
});

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat;
