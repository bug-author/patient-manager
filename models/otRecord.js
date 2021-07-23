const mongoose = require("mongoose");

const otScehema = new mongoose.Schema(
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
  { collection: "ot" }
);

const model = mongoose.model("otRecordModel", otScehema);

module.exports = model;
