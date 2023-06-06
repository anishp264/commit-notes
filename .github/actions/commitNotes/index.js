const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");

async function getCommitMessage() {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN // Assumes you have a GitHub token set as a secret in your GitHub Action
    });
  
    const owner = process.env.GITHUB_REPOSITORY.split("/")[0];
    const repo = process.env.GITHUB_REPOSITORY.split("/")[1];
    const sha = process.env.GITHUB_SHA;
  
    try {
      const commit = await octokit.repos.getCommit({
        owner,
        repo,
        ref: sha
      });
  
      const commitMessage = commit.data.commit.message;
      console.log("Commit Message:", commitMessage);
      return commitMessage;
    } catch (error) {
      console.error("Error retrieving commit message:", error);
      return null;
    }
  }
  
  getCommitMessage();