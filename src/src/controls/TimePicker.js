import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

/**
 *
 * Alright this is some fucked up thing going on, Im not sure why tf is DateFnsUtils needed if we are working with time only
 * bad docs are the reason I don't like js much
 *
 */

export default function TimePicker(props) {
  const { name, label, value, dateFormat, onChange, ...other } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        name={name}
        value={value}
        onChange={(time) => onChange(convertToDefEventPara(name, time))}
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
}
