import { React, useState } from "react";
import { Formik } from "formik";
import BasicInfoForm from "./components/basics";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import LocationField from "./components/locationFeild";
// import WorkExperienceForm from "./WorkExperienceForm";
import resumeSchema from "../../Data/yup";
import { initialResumeData } from "../../Data/initialValue";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import AccordianCustom from "./../../components/accordian";
import FeildsArrayHandler from "../../components/feildsArray";
import ProfileField from "./components/profileFeild";
import WorkFeild from "./components/workFeild";
import EducationFeild from "./components/educationFeild";
import VolunteerFeild from "./components/volunteerFeild";
import ArrayWithNoNesting from "../../components/arrayWithNoNesting";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import railscasts from "react-syntax-highlighter/dist/esm/styles/hljs/railscasts";
import SkillsFeild from "./components/volunteerFeild";
import ProjectsFeild from "./components/projectsFeild";
import InterestsFeild from "./components/interestFeild";
import { CopyButton } from "../../components/copyButton";
import { SaveFile } from "../../components/writeResume";
import JsonFileProcessor from "../../components/jsonFileProc";

// ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥   ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥/////

SyntaxHighlighter.registerLanguage("javascript", json);
const debounce = require("lodash/debounce");

//-------------------------------------------------------------------------------

const JsonResumeForm = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const [copied, setCopied] = useState(false);

  const [importDataPaper, setImportDataPaper] = useState(false);

  //♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦
  const [jsonData, setJsonData] = useState(
    JSON.stringify(initialResumeData, null, 2)
  );
  const debouncedUpdateJsonData = debounce((values) => {
    setJsonData(JSON.stringify(values, null, 2));
  }, 300);

  // For preView of Data
  const handleFormChange = (values) => {
    debouncedUpdateJsonData(values); // Call the debounced function
  };

  //CoppyButton OnClick
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  // Coppy Button handleClose
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦ Upload File And Handle Logic ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦

  // ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦
  return (
    <Grid container spacing={2} pt={3} px={1} gap={"2"} rowGap={"50px"}>
      <Grid item xs={12} sm={12} md={6} paddingX={2} paddingY={2}>
        <Typography variant="h2">Form</Typography>
        <Box backgroundColor={color.primary[500]} pr={2}>
          <Formik
            enableReinitialize
            initialValues={initialResumeData}
            validationSchema={resumeSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ touched, errors, handleSubmit, isValid, values }) => (
              <form
                noValidate
                onSubmit={handleSubmit}
                onKeyUp={() => handleFormChange(values)}
                onMouseUp={() => handleFormChange(values)}
              >
                {/* Submit Button */}
                <Box m={"10px 0"}>
                  <Button // Form Elements
                    color={"inherit"}
                    variant="outlined"
                    type="submit"
                    disabled={!!touched && isValid ? false : true}
                  >
                    Submit
                  </Button>
                  <Button
                    color={"inherit"}
                    variant="outlined"
                    onClick={() => setImportDataPaper(true)}
                    sx={{ marginLeft: "20px" }}
                  >
                    Import Data
                  </Button>
                  {importDataPaper && (
                    <Box
                      position="absolute"
                      top="0px"
                      left="0px"
                      width={"100vw"}
                      height={"100vh"}
                      // backgroundColor="grey"
                      zIndex={10}
                      onClick={() => setImportDataPaper(false)}
                    >
                      <Paper
                        sx={{
                          height: "50%",
                          weight: "50%",
                          position: "absolute",
                          top: "50%",
                          left: "50%",

                          margin: "auto",
                          transform: "translate(-50%,  -50%)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Box
                          margin="2rem"
                          display="flex"
                          flexDirection="column"
                          alignContent="stretch"
                          alignItems="start"
                        >
                          <JsonFileProcessor />
                        </Box>
                      </Paper>
                    </Box>
                  )}

                  {/* Download Resume */}
                  <Button
                    color="info"
                    variant="outlined"
                    onClick={() => SaveFile(values)}
                    sx={{ marginLeft: "20px" }}
                  >
                    Download File
                  </Button>
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  gap="10px"
                  mt="20px"
                  sx={{
                    maxHeight: "80vh", // Set the maximum height for the Box
                    overflowY: "auto", // Add a vertical scrollbar when content overflows
                  }}
                >
                  {/* Basic */}
                  <AccordianCustom
                    summary={"Basic Information"}
                    color={color}
                    Comp={BasicInfoForm}
                  />

                  {/* Location */}
                  <AccordianCustom
                    summary={"Location Feilds"}
                    color={color}
                    Comp={LocationField}
                  />

                  {/* Profiles  */}
                  <AccordianCustom
                    summary={"Profiles "}
                    color={color}
                    Comp={FeildsArrayHandler}
                    propses={{
                      arrayName: "basics.profiles",
                      FeildName: ProfileField,
                      initObject: { network: "", username: "", url: "" },
                      buttonName: "Profile",
                    }}
                  />

                  <AccordianCustom
                    summary={"Work "}
                    color={color}
                    touched={touched}
                    errors={errors}
                    Comp={FeildsArrayHandler}
                    propses={{
                      arrayName: "work",
                      FeildName: WorkFeild,
                      initObject: {
                        name: "",
                        position: "",
                        url: "",
                        startDate: "",
                        endDate: "",
                        summary: "",
                        highlights: [],
                      },
                      buttonName: "Work",
                    }}
                  />
                  <AccordianCustom
                    summary={"Education "}
                    color={color}
                    touched={touched}
                    errors={errors}
                    Comp={FeildsArrayHandler}
                    propses={{
                      arrayName: "education", // important to give as in yup ore initialized feild
                      FeildName: EducationFeild,
                      initObject: {
                        institution: "",
                        url: "",
                        area: "",
                        studyType: "",
                        startDate: "",
                        endDate: "",
                        score: "",
                        courses: "",
                      },
                      buttonName: "Education",
                    }}
                  />

                  {/* Volunteer */}
                  <AccordianCustom
                    summary={"Volunteer "}
                    color={color}
                    touched={touched}
                    errors={errors}
                    Comp={FeildsArrayHandler}
                    propses={{
                      arrayName: "volunteer", // important to give as in yup ore initialized feild
                      FeildName: VolunteerFeild,
                      initObject: {
                        organization: "",
                        position: "",
                        url: "",
                        startDate: "",
                        endDate: "",
                        summary: "",
                        highlights: [],
                      },
                      buttonName: "Volunteer",
                    }}
                  />

                  <AccordianCustom
                    summary={"Award "}
                    color={color}
                    Comp={FeildsArrayHandler}
                    propses={{
                      arrayName: "awards", // important to give as in yup ore initialized feild
                      FeildName: ArrayWithNoNesting,
                      initObject: {
                        title: "",
                        date: "",
                        awarder: "",
                        summary: "",
                      },
                      buttonName: "Award",
                    }}
                  />
                  <AccordianCustom
                    summary={"Certificates "}
                    color={color}
                    Comp={FeildsArrayHandler}
                    propses={{
                      arrayName: "certificates", // important to give as in yup ore initialized feild
                      FeildName: ArrayWithNoNesting,
                      initObject: {
                        name: "",
                        date: "",
                        issuer: "",
                        url: "",
                      },
                      buttonName: "Certificates",
                    }}
                  />
                  <AccordianCustom
                    summary={"Publications "}
                    color={color}
                    Comp={FeildsArrayHandler}
                    propses={{
                      arrayName: "publications", // important to give as in yup ore initialized feild
                      FeildName: ArrayWithNoNesting,
                      initObject: {
                        name: "",
                        publisher: "",
                        releaseDate: "",
                        url: "",
                        summary: "",
                      },
                      buttonName: "Publications",
                    }}
                  />

                  <AccordianCustom
                    summary={"Skills "}
                    color={color}
                    Comp={FeildsArrayHandler}
                    propses={{
                      arrayName: "skills", // important to give as in yup ore initialized feild
                      FeildName: SkillsFeild,
                      initObject: {
                        name: "",
                        level: "",
                        keywords: [],
                      },
                      buttonName: "Skill",
                    }}
                  />
                  <AccordianCustom
                    summary={"Languages "}
                    color={color}
                    Comp={FeildsArrayHandler}
                    propses={{
                      arrayName: "languages", // important to give as in yup ore initialized feild
                      FeildName: ArrayWithNoNesting,
                      initObject: {
                        language: "",
                        fluency: "",
                      },
                      buttonName: "Languages",
                    }}
                  />
                  <AccordianCustom
                    summary={"Interests "}
                    color={color}
                    Comp={FeildsArrayHandler}
                    propses={{
                      arrayName: "interests", // important to give as in yup ore initialized feild
                      FeildName: InterestsFeild,
                      initObject: {
                        name: "",
                        keywords: [""],
                      },
                      buttonName: "Interests",
                    }}
                  />
                  <AccordianCustom
                    summary={"References "}
                    color={color}
                    Comp={FeildsArrayHandler}
                    propses={{
                      arrayName: "references", // important to give as in yup ore initialized feild
                      FeildName: ArrayWithNoNesting,
                      initObject: {
                        language: "",
                        fluency: "",
                      },
                      buttonName: "References",
                    }}
                  />

                  <AccordianCustom
                    summary={"Projects "}
                    color={color}
                    Comp={FeildsArrayHandler}
                    propses={{
                      arrayName: "projects", // important to give as in yup ore initialized feild
                      FeildName: ProjectsFeild,

                      initObject: {
                        name: "",
                        keywords: [""],
                      },
                      buttonName: "Projects",
                    }}
                  />
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={6} paddingY={2} position="sticky">
        <Typography variant="h2">JSON Output</Typography>
        <Box display={"flex"} flexDirection={"row"}>
          {
            <CopyButton
              copied={copied}
              jsonData={jsonData}
              setCopied={setCopied}
              handleClick={handleClick}
              open={open}
              handleClose={handleClose}
            />
          }
        </Box>
        <Box
          sx={{
            maxHeight: "80vh", // Set the maximum height for the Box
            overflowY: "auto", // Add a vertical scrollbar when content overflows
          }}
        >
          <SyntaxHighlighter
            language="json"
            style={railscasts}
            wrapLines={true}
          >
            {jsonData}
          </SyntaxHighlighter>
        </Box>
      </Grid>
    </Grid>
  );
};

export default JsonResumeForm;
