const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
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
  policestation: {
    type: String,
    required: true,
  },
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
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
});

const incident = new mongoose.model("incident", incidentSchema);

module.exports = incident;
