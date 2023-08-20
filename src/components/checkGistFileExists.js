import { Octokit } from "https://esm.sh/octokit";
export const checkGistFileExists = async (gistID, fileName) => {
  const octokit = new Octokit();

  try {
    const gistResponse = await octokit.request(`GET /gists/${gistID}`);
    const gistFiles = gistResponse.data.files;
    // console.log("response : ", gistResponse);
    return gistFiles.hasOwnProperty(fileName) === true
      ? [true, "Ok"]
      : [false, "File does not Exists"];
  } catch (error) {
    console.error(error);
    return [false, "Incorrect Id"]; // Return false if there's an error or if the Gist doesn't exist
  }
};
