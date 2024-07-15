const express = require("express");
const { check, validationResult } = require("express-validator");
const { Applicant } = require("../models/applicant");
const Router = express.Router();

// add applicant details
Router.post(
  "/addApplicant",
  [
    check("name", "Name should not less than three characters")
      .notEmpty()
      .isLength({ min: 3 }),
    check("fatherName", "Father Name should not less than 3 Characters")
      .notEmpty()
      .isLength({ min: 3 }),
    check("contact", "contact is not valid please check")
      .notEmpty()
      .isLength({ max: 14 }),
    check("postalAddress", "postal address should not be empty").notEmpty(),
    check(
      "permanentAddress",
      "permanent address should not be empty"
    ).notEmpty(),
    check("email", "Email address is not correct please check").isEmail(),
    check("domicile", "Domicile should not be empty").notEmpty(),
    check("gender", "gender must be provided").notEmpty(),
    check("dob", "please add DOB").notEmpty(),
    check("meritalStatus", "marital status should be provided").notEmpty(),
    check("nationality", "nationality should be provided").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const applicantData = req.body;

    try {
      const {userId} = req.body;
      const applicant = await Applicant.findOne({where :{userId : userId}});

      if(applicant == null){
        const newApplicant = await Applicant.create(applicantData);
        res.status(200).json({
          success: true,
          message: "Data entered Successfully",
          applicant : newApplicant
        });
      }else{
        const updatedApplicant = await Applicant.update(applicantData, {where : {userId : userId}});
        res.status(200).json({success : true, message : "applicant Updated", applicant:updatedApplicant})
      }
     
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, error: error });
    }
  }
);

// get all applicant details
Router.get("/getAllApplicant", async (req, res) => {
  try {
    const applicant = await Applicant.findAll({});
    res.status(200).json({ success: true, applicant: applicant });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
});

Router.get("/getSingleApplicant/:id", async (req, res) => {
  const applicantId = req.params.id;
  console.log(applicantId);
  try {
    const applicant = await Applicant.findOne({
      where: {
        applicantId: applicantId,
      },
    });

    res.status(200).json({ success: true, applicant: applicant });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error });
  }
});

Router.delete("/deleteApplicant/:id", async (req, res) => {
  const  applicantId  = req.params.id;
  console.log(applicantId);
  try {
    await Applicant.destroy({
      where: {
        applicantId: applicantId,
      },
    });
    res.status(200).json({ success: true, message: "Applicant Deleted" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({
        success: false,
        error:
          "cannot delete the parent beacause there is associated data with it",
      });
  }
});

Router.patch("/updateApplicant/:id", async (req, res) => {
  const  applicantId  = req.params.id;
  try {
    const applicant = await Applicant.update(req.body, {
      where: {
        applicantId: applicantId,
      },
    });
    res.status(200).json({ success: true, applicant: applicant });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error });
  }
});

module.exports = Router;
