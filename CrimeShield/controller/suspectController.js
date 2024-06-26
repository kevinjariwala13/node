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
    // const { incidentId, susname, sussocial, sususername, otherdetails } =
    //   req.body;
    if (req.file) {
      req.body.susphoto = req.file.originalname;
    }
    // const suspect = req.body.suspect;
    const data = await Suspect.create(
      req.body
      //   {
      //   incidentId,
      //   susname,
      //   sussocial,
      //   sususername,
      //   susphoto: req.file.originalname,
      //   otherdetails,
      // }
    );
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
    const data = await Suspect.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err.message,
    });
  }
};

const findonesus = async (req, res) => {
  try {
    const data = await Suspect.find(req.query);
    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err.message,
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
const deleteSuspectsByIncidentId = async (req, res) => {
  const incidentId = req.query;
  console.log(incidentId);
  console.log("hiiii");
  console.log(req.query);
  try {
    const data = await Suspect.deleteMany(incidentId);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
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
  findonesus,
  deleteSuspectsByIncidentId,
};
