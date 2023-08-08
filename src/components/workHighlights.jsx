// import React from "react";
// import { useFormikContext } from "formik";
// import { IconButton, Grid } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { TextField } from "@mui/material";
// import { Field, getIn } from "formik";
// // import Items from "./item";
// // import { createFeildsName } from "./createFeildsName";
// import { styled } from "@mui/material/styles";

// const CssTextField = styled(TextField)({
//   "& label.Mui-focused": {
//     color: "#A0AAB4",
//   },
//   "& .MuiInput-underline:after": {
//     borderBottomColor: "#B2BAC2",
//   },
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: "#E0E3E7",
//     },
//     "&:hover fieldset": {
//       borderColor: "#B2BAC2",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#6F7E8C",
//     },
//   },
// });

// const HighLights = ({ index, onRemove, arrayName }) => {
//   const { touched, errors } = useFormikContext();
//   const name = `${arrayName}[${index}]`;
//   console.log("name : ", name);
//   return (
//     <>
//       <Field
//         as={CssTextField}
//         fullWidth
//         label={`Heighlight ${index}`}
//         name={name}
//         type="text"
//         id={name}
//         variant="outlined"
//       />

//       <IconButton onClick={() => onRemove(index)}>
//         <DeleteIcon />
//       </IconButton>
//     </>
//   );
// };

// export default HighLights;
