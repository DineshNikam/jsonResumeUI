import React, { useState } from "react";
import { useFormik } from "formik";
import { Input, Alert, Typography, Box } from "@mui/material";
import resumeSchema from "../Data/yup";
import { filterValidProperties } from "./filterValidProperty";
import { initialResumeData } from "../Data/initialValue";
import { mergeObjectsRecursively } from "./addNullData";

const JsonFileProcessor = ({ setValues }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileStatus, setFileStatus] = useState(null);

  const setImportedValues = (importData) => {
    setValues(importData);
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      setFileStatus("Processing...");
      console.log("pro");
      // Simulate processing delay
      setTimeout(() => {
        setFileStatus("File Processed Successfully");
      }, 2000);
    },
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const jsonContent = event.target.result;
        // console.log(event.target.result);
        try {
          const jsonData = JSON.parse(jsonContent);
          try {
            // console.log("0");
            (async () => {
              try {
                // Filter and get only the valid properties
                const validData = await filterValidProperties(
                  jsonData,
                  resumeSchema
                );
                // console.log("valid Dta :", JSON.stringify(validData));
                mergeObjectsRecursively(initialResumeData, validData);
                setImportedValues(validData);
              } catch (error) {
                console.error("Error occurred:", error);
              }
            })();
            console.log("1 : ");
            setSelectedFile(file);
            console.log("2");
            setFileStatus(null);
            console.log("3");
            formik.handleSubmit(); // Automatically trigger processing
          } catch (validationError) {
            // Find the first validation error and display the corresponding field
            // const firstErrorPath = validationError.inner[0].path;
            // setFileStatus(`Invalid JSON data at: ${firstErrorPath}`);
            console.log(validationError);
          }
        } catch (parseError) {
          setFileStatus("Error parsing JSON");
          console.log(parseError);
        }
      };
      reader.readAsText(file);
    } else {
      setFileStatus("Invalid file format. Please select a JSON file.");
    }
  };

  return (
    <Box height="100%">
      <Typography variant="h3">JSON File Processor</Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignContent="center"
        justifyContent="space-evenly"
        height="100%"
        paddingY="1rem"
      >
        <Box>
          <Input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            onClick={() => {
              setSelectedFile(null);
              setFileStatus(null);
            }}
            disabled={fileStatus === "Processing..."}
          />
          {selectedFile && <p>Selected File: {selectedFile.name}</p>}
        </Box>

        {fileStatus && (
          <Alert
            severity={
              fileStatus === "File Processed Successfully" ? "success" : "error"
            }
          >
            <Typography variant="subtitle1">{fileStatus}</Typography>
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default JsonFileProcessor;
