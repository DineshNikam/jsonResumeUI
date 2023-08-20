import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { Octokit, RequestError } from "https://esm.sh/octokit";
import { filterValidProperties } from "../../../components/filterValidProperty";
import resumeSchema from "../../../Data/yup";
import { initialResumeData } from "./../../../Data/initialValue";
import {
  cleanDataBeforeExport,
  mergeObjectsRecursively,
} from "../../../components/addNullData";
import { Box, Typography } from "@mui/material";
import { GitValues } from "../../../Data/context";
import { checkTokenValidity } from "../../../components/checkTokenValidity";
import { useTheme } from "@emotion/react";
import { Alert } from "@mui/material";
import { tokens } from "../../../theme";
import { checkGistFileExists } from "../../../components/checkGistFileExists";

// /==============================================

const GitForm = ({
  openGit,
  setApiKey,
  setOpenGit,
  editStatus,
  postStatus,
  apiKey,
  setValues,
  values,
  action,
  setPostStatus,
  setEditStatus,
  gistId,
  setGistId,
  setInitialResumeData,
}) => {
  // const gistId = "80a1f8f8d9e743d8a5bbe0e061d6ebb2";
  // const apiUrl = `https://api.github.com/gists/${gistId}`;
  const PAS =
    "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#about-personal-access-tokens";
  const [inputValue, setInputValue] = useState("");
  const [gistValue, setGistValue] = useState("");
  const [gitApiAlert, setGitApiAlert] = useState("");
  const [gistIdAlert, setGistIdAlert] = useState("");
  const theme = useTheme();
  const color = tokens(theme.palette.mode);

  const setImportedValues = (importData) => {
    setInitialResumeData(importData);
  };

  const handleApiKeyChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleApiKeySave = () => {
    (async () => {
      const isValid = await checkTokenValidity(inputValue);
      if (isValid) {
        setApiKey(inputValue);
        setGitApiAlert("OK");
      } else {
        setGitApiAlert("Invalid Token");
        setApiKey("");
      }
    })();
    // console.log("Before :", apiKey);
    // setOpenGit(false);
    // console.log("after :", apiKey);
  };
  const handleGistChange = (event) => {
    setGistValue(event.target.value);
  };
  const handleGistIdSave = () => {
    console.log("Before :", gistId);
    (async () => {
      const [fileExists, msg] = await checkGistFileExists(
        gistValue,
        "resume.json"
      );
      // console.log(`File exists: ${fileExists}`);
      if (fileExists) {
        setGistId(gistValue);
      } else {
        setGistId("");
      }
      setGistIdAlert(msg);
    })();
    // setOpenGit(false);
    // console.log("after :", gistId);
  };

  let octokit = null;
  const octo = () => {
    if (octokit === null) {
      octokit = new Octokit({
        auth: apiKey,
      });
    }
    return octokit;
  };

  const handleGetGistData = async () => {
    // Call a function to fetch Gist data using apiKey
    // Update gistData and editStatus accordingly
    console.log(apiKey, "\t", typeof apiKey);
    // edit
    let reply = null;
    try {
      reply = await octo().request(`GET /gists/${gistId}`, {
        gist_id: { gistId },

        headers: {
          Accept: "application/json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      // console.log(data.files["resume.json"].content);
      // reply = await octokit.gist(gistId);
    } catch (error) {
      console.log(error);
    }

    if (reply.status === 200) {
      const file = reply.data.files["resume.json"].content || "";
      try {
        const jsonData = JSON.parse(file);
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

          // Automatically trigger processing
        } catch (validationError) {
          // Find the first validation error and display the corresponding field
          // const firstErrorPath = validationError.inner[0].path;
          // setFileStatus(`Invalid JSON data at: ${firstErrorPath}`);
          console.log(validationError);
        }
      } catch (parseError) {
        // setFileStatus("Error parsing JSON");
        console.log(parseError);
      }
    }
  };
  // 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
  const handleUpdateGistData = async () => {
    // Octokit.js
    // https://github.com/octokit/core.js#readme
    setPostStatus("Updating Data wait....");
    try {
      const filteredData = cleanDataBeforeExport(values);
      console.log(filteredData);
      const post = JSON.stringify(filteredData);
      // console.log(post);
      try {
        await octo().request(`PATCH /gists/${gistId}`, {
          gist_id: gistId,
          description: "resume updated ",
          files: {
            "resume.json": {
              content: post,
            },
          },
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });
      } catch (error) {
        if (error instanceof RequestError) {
          // handle Octokit error
          // error.message; // Oops
          // error.status; // 500
          // error.request; // { method, url, headers, body }
          // error.response; // { url, status, headers, data }

          if (error.status === 404) {
            setPostStatus(" Resource not found");
          }

          if (error.status === 422) {
            setPostStatus(
              "Validation failed, or the endpoint has been spammed."
            );
          }
        } else {
          // handle all other errors
          console.log(error.status, error.message);
          throw error;
        }
      }
    } catch (e) {
      console.error("filteringData Problem : ", e);
      setPostStatus("Something went wrong ");
    }

    // Call a function to update Gist data using apiKey
    // const updatedGist = {
    //   files: {
    //     "filename.txt": {
    //       content: newContent,
    //     },
    //   },
    // };
    // return fetch(apiUrl, {
    //   method: "PATCH",
    //   headers: {
    //     Authorization: `Bearer ${apiKey}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(updatedGist),
    // });
    // Update postStatus accordingly
  };
  return (
    <div>
      <Dialog open={openGit} onClose={() => setOpenGit(false)}>
        <DialogContent>
          {action === 1 ? (
            <>
              <Button onClick={handleGetGistData}>Get Gist Data</Button>
              <p>Status: {editStatus}</p>
            </>
          ) : action === 3 ? (
            <>
              <Box display="flex">
                <TextField
                  label="GitHub API Key"
                  value={inputValue}
                  onChange={handleApiKeyChange}
                />
                <Button
                  onClick={handleApiKeySave}
                  color="warning"
                  variant="contained"
                  size="small"
                >
                  Save API Key
                </Button>
                {gitApiAlert && (
                  <Alert
                    severity={
                      gitApiAlert === "Invalid Token" ? "error" : "success"
                    }
                  >
                    <Typography variant="subtitle1">{gitApiAlert}</Typography>
                  </Alert>
                )}
              </Box>
              <Box>
                <TextField
                  label="Gist ID"
                  value={gistValue}
                  onChange={handleGistChange}
                />
                <Button
                  onClick={handleGistIdSave}
                  size="small"
                  color="warning"
                  variant="contained"
                >
                  Save Gist ID
                </Button>
                {gistIdAlert && (
                  <Alert
                    severity={
                      gistIdAlert === "Invalid Token" ? "error" : "success"
                    }
                  >
                    <Typography variant="subtitle1">{gistIdAlert}</Typography>
                  </Alert>
                )}
              </Box>

              <ul>
                <li>
                  {" "}
                  <Typography variant="subtitle1">
                    Make sure You provide valid{" "}
                    <a
                      style={{ color: color.primary[300] }}
                      href={PAS}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Personal Access Token
                    </a>
                  </Typography>
                </li>
                <li>
                  {" "}
                  <Typography variant="subtitle1">Gist Id is Valid</Typography>
                </li>
                <li>
                  {" "}
                  <Typography variant="subtitle1">
                    Gist contains file resume.json and it's public (used for
                    html preview)
                  </Typography>
                </li>
              </ul>
            </>
          ) : action === 2 ? (
            <>
              <Button onClick={handleUpdateGistData}>Update Gist Data</Button>
              <p>Status: {postStatus}</p>
            </>
          ) : (
            !openGit && setOpenGit(false)
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GitForm;
