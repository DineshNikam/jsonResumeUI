import { Octokit } from "octokit";

export const checkTokenValidity = async (token, setGitUsername) => {
  const octokit = new Octokit({
    auth: token,
  });

  try {
    const user = await octokit.request("GET /user"); // This request checks the validity of the token
    setGitUsername(user.data.login);
    console.log(user.data.login);
    return true; // Token is valid
  } catch (error) {
    return false; // Token is invalid
  }
};
