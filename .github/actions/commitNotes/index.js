const { Octokit } = require("@octokit/rest");

async function getCommitMessage() {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN 
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
      const commitSha = commit.data.sha;
      const committerName = commit.data.commit.committer.name;
      const commitDate = commit.data.commit.committer.date;

      createCommitDataMarkDownContent(commitMessage, committerName, commitDate, commitSha);
      return commitMessage;
    } catch (error) {
      console.error("Error retrieving commit message:", error);
      return null;
    }
  }

  function createCommitDataMarkDownContent(commitMessage, committerName, commitDate, sha){
    const markdownContent = `
    ## Commit Details

    - Commit Message: ${commitMessage}
    - Committer: ${committerName}
    - Commit Date: ${commitDate}
    - SHA: ${sha}
    `;

    console.log(`Commit Md content: => ${markdownContent}`);
  }

  getCommitMessage();