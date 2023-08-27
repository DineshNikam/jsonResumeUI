import { React, useState } from "react";
import { Formik } from "formik";
import BasicInfoForm from "./components/basics";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import LocationField from "./components/locationFeild";
// import WorkExperienceForm from "./WorkExperienceForm";
import resumeSchema from "../../Data/yup";
import { initialResumeData as initialData } from "../../Data/initialValue";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import AccordianCustom from "./../../components/accordian";
import FeildsArrayHandler from "../../components/feildsArray";
import ProfileField from "./components/profileFeild";
import WorkFeild from "./components/workFeild";
import EducationFeild from "./components/educationFeild";
import SkillsFeild from "./components/skillsFeild";
import ArrayWithNoNesting from "../../components/arrayWithNoNesting";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import railscasts from "react-syntax-highlighter/dist/esm/styles/hljs/railscasts";
import ProjectsFeild from "./components/projectsFeild";
import InterestsFeild from "./components/interestFeild";
import { CopyButton } from "../../components/copyButton";
import { SaveFile } from "../../components/writeResume";
import JsonFileProcessor from "../../components/jsonFileProc";
import HtmlPreview from "../../components/htmlPreview";
import GitForm, { Selectoptions } from "./components/git";
import BasicMenu from "../../components/menu";
import { GitValues } from "../../Data/context";
import VolunteerFeild from "./components/volunteerFeild";

// ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥   ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥/////

SyntaxHighlighter.registerLanguage("javascript", json);
const debounce = require("lodash/debounce");

//-------------------------------------------------------------------------------

const JsonResumeForm = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const [action, setAction] = useState(null);
  const [selectValue, setSelectValue] = useState(Selectoptions[0]);
  const [output, setOutput] = useState("json");
  const [copied, setCopied] = useState(false);
  const [initialResumeData, setInitialResumeData] = useState(initialData);
  const [importDataPaper, setImportDataPaper] = useState(false);
  const [gitUsername, setGitUsername] = useState("");

  //♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦
  const [jsonData, setJsonData] = useState(
    JSON.stringify(initialResumeData, null, 2)
  );
  const debouncedUpdateJsonData = debounce((values) => {
    setJsonData(JSON.stringify(values, null, 2));
  }, 500);

  // For preView of Data
  const handleFormChange = (values) => {
    debouncedUpdateJsonData(values); // Call the debounced function
    // console.log(resumeSchema.fields["basics"]);
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

  const handleSubmit = (values, { setSubmitting }) => {
    // Your form submission logic here
    console.log(values);
    setSubmitting(false);
  };

  // ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦ Git related  ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦
  const [apiKey, setApiKey] = useState("");
  const [openGit, setOpenGit] = useState(false);
  const [gistId, setGistId] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [postStatus, setPostStatus] = useState("");

  // ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialResumeData}
      validationSchema={resumeSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors, values, setValues, resetForm }) => (
        <Grid container spacing={2} pt={3} px={1} gap={"2"} rowGap={"50px"}>
          <Grid item xs={12} sm={12} md={6} paddingX={2} paddingY={2}>
            <Typography variant="h2">Form</Typography>
            <Box backgroundColor={color.primary[500]} pr={2}>
              <form
                noValidate
                onSubmit={(e) => e.preventDefault()}
                onKeyUp={() => handleFormChange(values)}
                onChange={() => handleFormChange(values)}
              >
                {/* Submit Button */}
                <Box m={"10px 0"}>
                  {/* <Button // Form Elements
                    color={"error"}
                    variant="outlined"
                    type="submit"
                    onClick={async () => {
                      setInitialResumeData(initialData);
                      resetForm();
                      await handleFormChange(values);
                    }}
                  >
                    Reset
                  </Button> */}
                  <Button
                    color={"inherit"}
                    variant="outlined"
                    onClick={() => setImportDataPaper(true)}
                    sx={{ marginLeft: "5px" }}
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
                          <JsonFileProcessor setValues={setValues} />
                        </Box>
                      </Paper>
                    </Box>
                  )}
                  {/* Download Resume */}
                  <Button
                    color="info"
                    variant="outlined"
                    onClick={() => SaveFile(values)}
                    sx={{ marginLeft: "5px" }}
                  >
                    Download File
                  </Button>
                  {/* Git button */}
                  <Box marginLeft="5px" display="inline">
                    <BasicMenu
                      action={action}
                      setAction={setAction}
                      setOpenGit={setOpenGit}
                    />
                  </Box>
                  {openGit && (
                    <GitValues.Provider
                      value={{
                        gistId,
                        setGistId,
                      }}
                    >
                      <GitForm
                        gistId={gistId}
                        setGistId={setGistId}
                        openGit={openGit}
                        setApiKey={setApiKey}
                        setOpenGit={setOpenGit} // dialogu box
                        editStatus={editStatus}
                        postStatus={postStatus}
                        apiKey={apiKey} // api key of github
                        setValues={setValues} //set  values of form
                        values={values} // getting values from form to update
                        action={action}
                        setAction={setAction}
                        setEditStatus={setEditStatus}
                        setPostStatus={setPostStatus}
                        setInitialResumeData={setInitialResumeData}
                        gitUsername={gitUsername}
                        setGitUsername={setGitUsername}
                      />{" "}
                    </GitValues.Provider>
                  )}
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
                </Box>
              </form>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} paddingY={2} position="sticky">
            <Typography variant="h2">Output</Typography>

            <Box
              display={"flex"}
              flexDirection={"row"}
              mt="4px"
              columnGap="1rem"
            >
              <Button
                onClick={() => setOutput("json")}
                variant="outlined"
                color="info"
                size="small"
              >
                <Typography variant="h5"> JSON</Typography>
              </Button>
              <Button
                onClick={() => setOutput("html")}
                variant="outlined"
                color="info"
                size="small"
              >
                <Typography variant="h5"> WEB</Typography>
              </Button>
            </Box>
            <Box
              sx={{
                maxHeight: "80vh", // Set the maximum height for the Box
                overflowY: "auto", // Add a vertical scrollbar when content overflows
              }}
            >
              {output === "json" ? (
                <SyntaxHighlighter
                  language="json"
                  style={railscasts}
                  wrapLines={true}
                >
                  {jsonData}
                </SyntaxHighlighter>
              ) : (
                <HtmlPreview
                  gitUsername={gitUsername}
                  setGitUsername={setGitUsername}
                  selectValue={selectValue}
                  setSelectValue={setSelectValue}
                />
              )}
            </Box>
            {output === "json" && (
              <CopyButton
                copied={copied}
                jsonData={jsonData}
                setCopied={setCopied}
                handleClick={handleClick}
                open={open}
                handleClose={handleClose}
              />
            )}
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default JsonResumeForm;
