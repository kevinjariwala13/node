const express = require("express");
const suspectController = require("../controller/suspectController");

const router = express.Router();

// const suspectController = require('./../controllers/suspectController');

// router.route('/user/createuser').post(suspectController.createUser);

// router.get("/get", async (req, res) => {
//   return res.status(404).json({ msg: "Hello Lawdwe!" });
// });

router.route("/").get(suspectController.showData);

router
  .route("/insert")
  .post(suspectController.upload, suspectController.createSuspect);

router
  .route("/:id")
  .get(suspectController.showonerecord)
  .patch(suspectController.updateSuspect)
  .delete(suspectController.deleteSuspect);

// router.post("/login", async (req, res) => {
//   const u = req.body;
//   return res.status(200).json({ u, msg: "Bhag"});
// });

module.exports = router;
