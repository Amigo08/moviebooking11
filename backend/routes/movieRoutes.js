const Movie = require("../models/Movie");
const Schedule = require("../models/Schedule");
const Seat = require("../models/Seat");
const User = require("../models/User");

const router = require("express").Router();

router.post("/newmovie", (req, res) => {
  const newMovie = Movie(req.body);

  newMovie.save().then((data) => {
    if (data) {
      const imagePath = `./uploads/${data._id}.jpg`;

      if (req.files.image) {
        req.files.image.mv(imagePath, (err) => {
          return res.send({
            message: "New Movie Added Successfully",
            success: true,
          });
        });
      } else {
        return res.send({ message: "Image Upload failed" });
      }
    } else {
      return res.send({ message: "Movie Added failed", success: false });
    }
  });
});

router.get("/movies", (req, res) => {
  Movie.find().then((data) => {
    res.send({ data });
  });
});

router.put("/status/activate/:id", (req, res) => {
  const { id } = req.params;

  Movie.findByIdAndUpdate(
    id,
    { $set: { status: "Active" } },
    { new: true }
  ).then((data) => {
    return res.send({ message: "Activated Successfully" });
  });
});

router.put("/status/inactivate/:id", (req, res) => {
  const { id } = req.params;

  Movie.findByIdAndUpdate(
    id,
    { $set: { status: "InActive" } },
    { new: true }
  ).then((data) => {
    return res.send({ message: "InActivated Successfully" });
  });
});

router.put("/updatemovie/:id", (req, res) => {
  const { id } = req.params;

  Movie.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ error: "Movie not found" });
      }
      if (req.files && req.files.image) {
        const imagePath = `./uploads/${data._id}.jpg`;
        req.files.image.mv(imagePath, (err) => {
          if (err) {
            console.error("Error uploading image:", err);
            return res.status(500).send({ error: "Image upload failed" });
          }
          return res.send({ message: "Updated successfully", success: true });
        });
      } else {
        return res.send({ message: "Updated successfully", success: true });
      }
    })
    .catch((error) => {
      console.error("Error updating movie:", error);
      return res.status(500).send({ error: "Update failed" });
    });
});

router.get("/activemovies", (req, res) => {
  Movie.aggregate([
    {
      $match: {
        status: {
          $eq: "Active",
        },
      },
    },
  ]).then((data) => {
    console.log(data);
    res.send(data);
  });
});

router.get("/onemovie/:id", (req, res) => {
  const { id } = req.params;

  Movie.findById(id).then((data) => {
    console.log(data);
    res.send(data);
  });
});

router.post("/tickets/:mid/:uid", async (req, res) => {
  console.log(req.params, req.body);

  const newSeat = new Seat({
    movie: req.params.mid,
    user: req.params.uid,
    tickets: req.body.tickets,
  });

  newSeat.save().then((data) => {
    console.log(data);
    res.send({ message: "Ticket purchased", success: true, data });
  });
});

router.post('/schedule/:id', (req, res) => {
  const { id } = req.params;
  const { time } = req.body;

  const newSchedule = new Schedule({
    movie: id,
    dateandtime: time
  });

  newSchedule.save()
    .then(data => {
      console.log(data);
      res.status(201).send({ message: "Scheduled a movie", success: true });
    })
    .catch(error => {
      console.error("Error scheduling movie:", error);
      res.status(500).send({ message: "Failed to schedule movie", success: false });
    });
});

router.get('/scheduledmovies', (req, res) => {

  const currentDate = new Date();

  console.log(currentDate)

  Schedule.aggregate([
    {
      $match: {
        $expr: {
          $gt: ["$dateandtime", currentDate]
        }
      }
    },
    {
      $lookup: {
        from: 'movies',
        localField: 'movie',
        foreignField: '_id',
        as: 'movieInfo'
      }
    },
    {
      $unwind: '$movieInfo'
    }
  ]).then(data => {
    console.log(data)
    res.send(data)
  })
})


router.get('/booking/:id', (req, res) => {

  const { id } = req.params
  const { seat } = req.body

  console.log(seat, id)

  Schedule.findByIdAndUpdate(id,)

})

module.exports = router;
