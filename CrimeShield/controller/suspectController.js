const Suspect = require("../Models/Suspect");
const multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/suspect"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerStorage,
  // fileFilter: multerFilter,
}).single("susphoto");

const createSuspect = async (req, res) => {
  console.log(req.body.suspect);
  console.log(req.body);
  try {
    const { incidentId, susname, sussocial, sususername, otherdetails } =
      req.body;
    if (req.file) {
      req.body.suspect = req.file.filename;
    }
    // const suspect = req.body.suspect;
    const data = await Suspect.create({
      incidentId,
      susname,
      sussocial,
      sususername,
      susphoto: req.file.originalname,
      otherdetails,
    });
    res.status(201).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

const showData = async (req, res) => {
  try {
    const data = await Suspect.find();
    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err,
    });
  }
};

const showonerecord = async (req, res) => {
  try {
    const data = await Suspect.findOne(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err,
    });
  }
};

const updateSuspect = async (req, res) => {
  try {
    const data = await Suspect.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

const deleteSuspect = async (req, res) => {
  try {
    const data = await Suspect.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: {
        data: null,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

module.exports = {
  createSuspect,
  showData,
  showonerecord,
  updateSuspect,
  deleteSuspect,
  upload,
};
