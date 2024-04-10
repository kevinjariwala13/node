const router = require("express").Router();

const Users = require("../Models/UserModel");
const Incidents = require("../Models/Incident");
const Suspect = require("../Models/Suspect");
// To get a count of total users,complaints,suspect.
router.get(
  "/count/all",

  async (req, res, next) => {
    try {
      const totalComplaints = await Incidents.find({}).count();
      const totalSuspects = await Suspect.find({}).count();
      const totalUsers = await Users.find({}).count();
      return res.status(200).json({
        success: true,
        totalComplaints,
        totalSuspects,
        totalUsers,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
