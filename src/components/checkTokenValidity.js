import { Octokit } from "https://esm.sh/octokit";

export const checkTokenValidity = async (token) => {
  const octokit = new Octokit({
    auth: token,
  });

  try {
    await octokit.request("GET /user"); // This request checks the validity of the token
    return true; // Token is valid
  } catch (error) {
    return false; // Token is invalid
  }
};
