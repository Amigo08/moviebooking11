const router = require("express").Router();
const Language = require("../models/Language");

router.post("/newlanguage", (req, res) => {
  const newLanguage = new Language(req.body);

  newLanguage.save().then((data) => {
    return res.send({
      message: "Language Added Successfully",
      success: true,
      data,
    });
  });
});

router.put("/status/activate/:id", (req, res) => {
  const { id } = req.params;

  Language.findByIdAndUpdate(
    id,
    { $set: { status: "Active" } },
    { new: true }
  ).then((data) => {
    return res.send({ message: "Activated Successfully" });
  });
});

router.put("/status/inactivate/:id", (req, res) => {
  const { id } = req.params;

  Language.findByIdAndUpdate(
    id,
    { $set: { status: "InActive" } },
    { new: true }
  ).then((data) => {
    return res.send({ message: "InActivated Successfully" });
  });
});

router.get("/languages", (req, res) => {
  Language.find().then((data) => {
    return res.send(data);
  });
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  Language.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then(
    (data) => {
      return res.send({ message: "Updated Successfully", success: true, data });
    }
  );
});

module.exports = router;
