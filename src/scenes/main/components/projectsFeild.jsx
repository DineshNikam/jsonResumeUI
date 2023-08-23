import React from "react";
import { useFormikContext } from "formik";
import { IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Items from "../../../components/item";
import { createFeildsName } from "../../../components/createFeildsName";
import DynamicArrayComp from "../../../components/dynamicArrayComp";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";
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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Grid
      container
      spacing={0.5}
      mt={3}
      sx={{ backgroundColor: colors.primary[700], borderRadius: "20px" }}
    >
      <Items array={Info.slice(0, -1)} touched={touched} errors={errors} />
      <DynamicArrayComp
        index={index}
        arrayName={arrayName}
        initWith={""}
        addBtnName={"Keyword"}
        labelText={"Keyword"}
      />
      <Grid
        item
        sx={{ justifyContent: "flex-end", width: "100%", display: "flex" }}
      >
        <IconButton onClick={() => onRemove(index)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ProjectsFeild;
