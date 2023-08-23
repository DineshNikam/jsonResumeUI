import React from "react";
import { useFormikContext } from "formik";
import { IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Items from "./../../../components/item";
import { createFeildsName } from "./../../../components/createFeildsName";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";
// const labels = ["Network", "Username", "Url"];
// const namesList = ["network", "username", "url"];

const dataProps = [
  { label: "Network", name: "network", required: false },
  { label: "Username", name: "username", required: false },
  { label: "Url", name: "url", required: false },
];

const ProfileField = ({ index, onRemove }) => {
  const { touched, errors } = useFormikContext();
  const profileInfo = createFeildsName(index, dataProps, "basics.profiles");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // console.log(profileInfo);
  return (
    <Grid
      container
      spacing={0.5}
      mt={3}
      sx={{ backgroundColor: colors.primary[700], borderRadius: "20px" }}
    >
      <Items array={profileInfo} touched={touched} errors={errors} />
      <Grid
        item
        sx={{ justifyContent: "flex-end", width: "100%", display: "flex" }}
      >
        <IconButton onClick={() => onRemove(index)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
    // <Box
    //   display="grid"
    //   gridTemplateColumns="1fr auto"
    //   gap="10px"
    //   alignItems="center"
    // >
    //   <Field
    //     as={TextField}
    //     label="Network"
    //     name={`basics.profiles[${index}].network`}
    //     fullWidth
    //   />
    //   <Field
    //     as={TextField}
    //     label="Username"
    //     name={`basics.profiles[${index}].username`}
    //     fullWidth
    //   />
    //   <Field
    //     as={TextField}
    //     label="URL"
    //     name={`basics.profiles[${index}].url`}
    //     fullWidth
    //   />
    //   <IconButton onClick={() => onRemove(index)}>
    //     <DeleteIcon />
    //   </IconButton>
    // </Box>
  );
};

export default ProfileField;
