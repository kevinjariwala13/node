const Incident = require("../Models/Incident");
const multer = require("multer");
const path = require("path");
const incident = require("../Models/Incident");
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) =>{
//     cb(null,'./public/evidence');

//   },
//   filename: (req,file,cb) =>{
//       // const ext = file.mimetype.split('/')[1];
//       cb(null,`${Date.now()}-${file.originalname}`);
//   }
// })
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/evidence"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
// const multerFilter=(req,file,cb)=>{
//   if(file.mimetype.startsWith('image')){
//       cb(null,true);
//   }else{
//       cb(new Error('this filetype is not allowed'),false);
//   }
// }

const upload = multer({
  storage: multerStorage,
  // fileFilter: multerFilter,
}).single("evidence");

const createIncident = async (req, res) => {
  try {
    // const {
    //   category,
    //   state,
    //   city,
    //   userId,
    //   policestation,
    //   dateofincident,
    //   reasonofdelay,
    //   location,
    //   nameofsus,
    //   additionalinfo,
    //   firstname,
    //   lastname,
    // } = req.body;
    if (req.file) {
      req.body.evidence = req.file.originalname;
    }
    console.log(req.file);
    console.log(req.body);
    const data = await Incident.create(
      req.body
      //   {
      //   category,
      //   state,
      //   city,
      //   userId,
      //   policestation,
      //   dateofincident,
      //   reasonofdelay,
      //   location,
      //   nameofsus,
      //   additionalinfo,
      //   firstname,
      //   lastname,
      //   evidence: req.file.originalname,
      // }
    );
    res.status(201).json({
      status: "success",
      data: {
        data,
      },
    });
    // }
    // else{
    // throw new Error(`Complaint With Id ${complaintId} Not Found`);
    // }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

const showData = async (req, res) => {
  try {
    const data = await Incident.find();
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
const searchComplaint = async (req, res) => {
  try {
    const data = await Incident.find(req.query);
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

const countresult = async (req, res) => {
  try {
    const data = await Incident.find(req.query);
    res.status(200).json({
      status: "success",
      length: data.length,
    });
  } catch {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

const mycomplaints = async (req, res) => {
  try {
    const data = await Incident.find(req.query);
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

const showonerecord = async (req, res) => {
  try {
    const data = await Incident.findById(req.params.id);
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

const updateIncident = async (req, res) => {
  try {
    const data = await Incident.findByIdAndUpdate(req.params.id, req.body, {
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

const deleteIncident = async (req, res) => {
  try {
    const data = await Incident.findByIdAndDelete(req.params.id);
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
  createIncident,
  showData,
  showonerecord,
  updateIncident,
  deleteIncident,
  upload,
  mycomplaints,
  searchComplaint,
  countresult,
};
