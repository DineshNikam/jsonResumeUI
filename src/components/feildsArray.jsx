import React from "react";
import { FieldArray, useFormikContext } from "formik";
import { Button } from "@mui/material";

var get = require("lodash/get");
const FeildsArrayHandler = ({
  arrayName,
  FeildName,
  initObject,
  buttonName,
}) => {
  // console.log(arrayName, FeildName, initObject, buttonName);
  const { values } = useFormikContext();
  const array = ("values ", get(values, arrayName, null));
  // console.log("arrayName : ", arrayName, "\tarray : ", array);
  return (
    <FieldArray name={arrayName}>
      {({ push, remove }) => (
        <div style={{}}>
          {array &&
            array.map((profile, index) => (
              <FeildName
                key={index}
                index={index}
                onRemove={() => remove(index)}
                arrayName={arrayName}
              />
            ))}
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => push(initObject)}
          >
            Add {buttonName}
          </Button>
        </div>
      )}
    </FieldArray>
  );
};

export default FeildsArrayHandler;
