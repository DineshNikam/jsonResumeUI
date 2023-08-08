import React from "react";
import { useFormikContext } from "formik";
import { IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Items from "../../../components/item";
import { createFeildsName } from "../../../components/createFeildsName";
import DynamicArrayComp from "../../../components/dynamicArrayComp";

const dataProps = [
  { label: "Interest", name: "name", required: false },
  { label: "Keywords", name: "keywords", required: false },
];

const InterestsFeild = ({ index, onRemove }) => {
  const { touched, errors } = useFormikContext();
  const Info = createFeildsName(index, dataProps, "interests");
  //   console.log(educationInfo);
  const arrayName = `interests[${index}].keywords`;
  return (
    <Grid container spacing={2} mt={3}>
      <Items array={Info.slice(0, -1)} touched={touched} errors={errors} />
      <DynamicArrayComp
        index={index}
        arrayName={arrayName}
        initWith={""}
        addBtnName={"Keyword"}
        labelText={"Keyword"}
      />
      <IconButton onClick={() => onRemove(index)}>
        <DeleteIcon />
      </IconButton>
    </Grid>
  );
};

export default InterestsFeild;
