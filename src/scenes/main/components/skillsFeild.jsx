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
  { label: "Organization", name: "organization", required: false },
  { label: "Position", name: "position", required: false },
  { label: "Url", name: "url", required: false },
  { label: "Start Date", name: "startDate", required: false },
  { label: "End Date", name: "endDate", required: false },
  { label: "Summary", name: "summary", required: false },
  { label: "Highlights", name: "highlights", required: false },
];

const VolunteerFeild = ({ index, onRemove }) => {
  const { touched, errors } = useFormikContext();
  const volunteerInfo = createFeildsName(index, dataProps, "volunteer");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //   console.log(educationInfo);
  const arrayName = `volunteer[${index}].highlights`;
  return (
    <Grid
      container
      spacing={0.5}
      mt={3}
      sx={{ backgroundColor: colors.primary[700], borderRadius: "20px" }}
    >
      <Items
        array={volunteerInfo.slice(0, -1)}
        touched={touched}
        errors={errors}
      />
      <DynamicArrayComp
        index={index}
        arrayName={arrayName}
        initWith={""}
        addBtnName={"Volunteers"}
        labelText={"Volunteer"}
      />{" "}
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

export default VolunteerFeild;
