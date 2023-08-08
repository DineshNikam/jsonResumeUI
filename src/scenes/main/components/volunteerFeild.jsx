import React from "react";
import { useFormikContext } from "formik";
import { IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Items from "./../../../components/item";
import { createFeildsName } from "./../../../components/createFeildsName";
import DynamicArrayComp from "./../../../components/dynamicArrayComp";

const dataProps = [
  { label: "name", name: "name", required: false },
  { label: "level", name: "level", required: false },
  { label: "keywords", name: "keywords", required: false },
];

const SkillsFeild = ({ index, onRemove }) => {
  const { touched, errors } = useFormikContext();
  const skillsInfo = createFeildsName(index, dataProps, "skills");

  const arrayName = `skills[${index}].keywords`;
  return (
    <Grid container spacing={2} mt={3}>
      <Items
        array={skillsInfo.slice(0, -1)}
        touched={touched}
        errors={errors}
      />
      <DynamicArrayComp
        index={index}
        arrayName={arrayName}
        initWith={""}
        addBtnName={"Keyword"}
        labelText={"Keywords"}
      />
      <IconButton onClick={() => onRemove(index)}>
        <DeleteIcon />
      </IconButton>
    </Grid>
  );
};

export default SkillsFeild;
