import React, { useState } from "react";
import Input from "../controls/Input";
import Button from "../controls/Button";

export default function Ingoing() {
  const [NameInput, setNameInput] = useState("Enter the name");
  return (
    <div>
      <Input
        name="Name"
        type="Text"
        label="Name"
        value={NameInput}
        onChange={(text) => setNameInput(text)}
      />
    </div>
  );
}
