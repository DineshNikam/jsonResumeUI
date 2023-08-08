import { Grid, TextField } from "@mui/material";
import { Field, getIn } from "formik";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

const Items = ({ array, touched, errors }) => {
  return (
    <>
      {array.map((item, index) => {
        const { name, label, required } = item;
        return (
          <Grid
            item
            key={index}
            xs={12}
            md={6}
            xl={4}
            paddingX={2}
            paddingY={2}
          >
            <Field
              as={CssTextField}
              error={Boolean(getIn(touched, name) && getIn(errors, name))}
              fullWidth
              required={required}
              helperText={getIn(touched, name) && getIn(errors, name)}
              label={label}
              name={name}
              type="text"
              id={name}
              variant="outlined"
            />
          </Grid>
        );
      })}{" "}
    </>
  );
};

export default Items;
