const mongoose = require("mongoose");

const languageSchema = mongoose.Schema(
  {
    language: {
      type: String,
    },
    status: {
      type: String,
      default: "InActive",
    },
  },

  {
    timestamp: true,
  }
);

const Language = mongoose.model("Language", languageSchema);
 
module.exports = Language;
