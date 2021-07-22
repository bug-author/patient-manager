import React from "react";
import { useForm, Form } from "./useForm";
import { Grid } from "@material-ui/core";
import { Button, DatePicker, TimePicker, Input } from "../controls/index";

const modelObject = {
  regNumber: "",
  time: new Date(),
  date: new Date(),
  patientName: "",
  fatherOrHusbandName: "",
  cnic: "",
  cellNo: "",
  symptomsAndSigns: "",
  diagnosis: "",
  rxPlan: "",
  furtherPlan: "",
  variant: "",
};

const electron = eval("require")("electron");
const ipcRenderer = electron.ipcRenderer;

/**

  ingoing: {
    regNumber;
    time;
    date;
    patientName;
    fatherOrHusbandName;
    cnic;
    cellNo;
    symptomsAndSigns;
    diagnosis;
    rxPlan;
    furtherPlan;
  }[];
}; 

* 
*/

export default function Patient(props) {
  const { values, handleInputChange, resetForm } = useForm(modelObject);

  const handleSubmit = (e) => {
    e.preventDefault();
    ipcRenderer.send("message", values);
    resetForm();
  };
  values.variant = props.variant;
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Input
            label="Patient Name"
            name="patientName"
            value={values.patientName}
            onChange={handleInputChange}
          />
          <Input
            label="Father/ Husband Name"
            name="fatherOrHusbandName"
            value={values.fatherOrHusbandName}
            onChange={handleInputChange}
          />
          <Input
            label="CNIC"
            name="cnic"
            value={values.cnic}
            onChange={handleInputChange}
            type="number"
          />
          <Input
            label="Cell Number"
            name="cellNo"
            value={values.cellNo}
            onChange={handleInputChange}
            type="number"
          />
          <Input
            label="Symptoms And Signs"
            name="symptomsAndSigns"
            value={values.symptomsAndSigns}
            onChange={handleInputChange}
          />
          <Input
            label="Diagnosis"
            name="diagnosis"
            value={values.diagnosis}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            name="regNumber"
            label="Registration Number"
            value={values.regNumber}
            onChange={handleInputChange}
            type="number"
          />
          <DatePicker
            name="date"
            label="Date"
            value={values.date}
            onChange={handleInputChange}
          />
          <TimePicker
            name="time"
            label="Time"
            value={values.time}
            onChange={handleInputChange}
          />

          <Input
            label="RX Plan"
            name="rxPlan"
            value={values.rxPlan}
            onChange={handleInputChange}
          />
          <Input
            label="Further Plan"
            name="furtherPlan"
            value={values.furtherPlan}
            onChange={handleInputChange}
          />
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <Button type="submit" text="Submit" />
            <Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
