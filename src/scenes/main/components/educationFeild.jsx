import React from "react";
import { useFormikContext } from "formik";
import { IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { createFeildsName } from "./../../../components/createFeildsName";
import DynamicArrayComp from "../../../components/dynamicArrayComp";
import Items from "./../../../components/item";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";

const dataProps = [
  { label: "Institution", name: "institution", required: false },
  { label: "Url", name: "url", required: false },
  { label: "Area", name: "area", required: false },
  { label: "Study Type", name: "studyType", required: false },
  { label: "Start Date", name: "startDate", required: false },
  { label: "End Date", name: "endDate", required: false },
  { label: "Score", name: "score", required: false },
  { label: "Courses", name: "courses", required: false },
];

const EducationFeild = ({ index, onRemove }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { touched, errors } = useFormikContext();
  const educationInfo = createFeildsName(index, dataProps, "education");
  //   console.log(educationInfo);
  const arrayName = `education[${index}].courses`;

  return (
    <Grid
      container
      spacing={0.5}
      mt={3}
      sx={{ backgroundColor: colors.primary[700], borderRadius: "20px" }}
    >
      <Items
        array={educationInfo.slice(0, -1)}
        touched={touched}
        errors={errors}
      />
      <DynamicArrayComp
        index={index}
        arrayName={arrayName}
        initWith={""}
        addBtnName={"Cources"}
        labelText={"Cources"}
      />
      <Grid
        item
        sx={{ justifyContent: "flex-end", width: "100%", display: "flex" }}
      >
        <IconButton onClick={() => onRemove(index)} sx={{}}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default EducationFeild;
