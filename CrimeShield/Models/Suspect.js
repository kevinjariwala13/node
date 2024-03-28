const mongoose = require("mongoose");

const suspectSchema = new mongoose.Schema(
  {
    incidentId: {
      type: mongoose.Types.ObjectId,
      ref: "incident",
    },
    susname: {
      type: String,
      // required: true,
    },
    sussocial: {
      type: String,
    },
    sususername: {
      type: String,
    },
    susphoto: {
      type: String,
    },
    otherdetails: {
      type: String,
    },
    // EvidenceType: {
    //   type: String,
    //   require: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Suspect = new mongoose.model("suspect", suspectSchema);

module.exports = Suspect;
