const mongoose = require("mongoose");

const ingoingScehema = new mongoose.Schema(
  {
    regNumber: { type: String },
    time: { type: String },
    date: { type: String },
    patientName: { type: String },
    fatherOrHusbandName: { type: String },
    cnic: { type: String },
    cellNo: { type: String },
    symptomsAndSigns: { type: String },
    diagnosis: { type: String },
    rxPlan: { type: String },
    furtherPlan: { type: String },
    variant: { type: String },
  },
  { collection: "ingoing" }
);

const model = mongoose.model("ingoingRecord", ingoingScehema);

module.exports = model;
