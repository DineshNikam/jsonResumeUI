import React from "react";
import { useFormikContext } from "formik";
import { IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Items from "../../../components/item";
import { createFeildsName } from "../../../components/createFeildsName";
import DynamicArrayComp from "../../../components/dynamicArrayComp";

const dataProps = [
  { label: "name", name: "name", required: false },
  { label: "startDate", name: "startDate", required: false },
  { label: "endDate", name: "endDate", required: false },
  { label: "summary", name: "summary", required: false },
  { label: "url", name: "url", required: false },
  { label: "highlights", name: "highlights", required: false },
];

const ProjectsFeild = ({ index, onRemove }) => {
  const { touched, errors } = useFormikContext();
  const Info = createFeildsName(index, dataProps, "projects");
  //   console.log(educationInfo);
  const arrayName = `projects[${index}].highlights`;
  return (
    <Grid container spacing={2} mt={3}>
      <Items array={Info.slice(0, -1)} touched={touched} errors={errors} />
      <DynamicArrayComp
        index={index}
        arrayName={arrayName}
        initWith={""}
        addBtnName={"Project"}
        labelText={"Project"}
      />
      <IconButton onClick={() => onRemove(index)}>
        <DeleteIcon />
      </IconButton>
    </Grid>
  );
};

export default ProjectsFeild;
