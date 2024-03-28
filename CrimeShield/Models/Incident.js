const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  category: {
    type: String,
    required: true,
    enum: ["Cyber Crime", "Domestic Violence", "Abuse", "Theft", "Robbery"],
  },
  dateofcmp: {
    type: Date,
    default: Date.now,
  },

  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  // policestation: {
  //    type: String,
  //    required: true,
  //  },
  dateofincident: {
    type: Date,
  },
  reasonofdelay: {
    type: String,
  },
  location: {
    type: String,
  },
  evidence: {
    type: String,
  },
  nameofsus: {
    type: String,
  },
  additionalinfo: {
    type: String,
    required: false,
    default: null,
  },
});

const incident = new mongoose.model("incident", incidentSchema);

module.exports = incident;
