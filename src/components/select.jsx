import React, { useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import { CssTextField } from "./CssTextField";
import { Selectoptions } from "../scenes/main/components/git";

export default function Select({ value, setValue }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (newValue !== "" && Selectoptions.includes(newValue)) {
            setValue(newValue);
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="select"
        options={Selectoptions}
        sx={{ width: 300 }}
        renderInput={(params) => <CssTextField {...params} label="Theme" />}
      />
    </div>
  );
}
