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
      console.log("Commit Message:", commitMessage);
      return commitMessage;
    } catch (error) {
      console.error("Error retrieving commit message:", error);
      return null;
    }
  }

  function createMarkDownContent(){
    const markdownContent = `
    # My Markdown File

    This is a sample Markdown file created using JavaScript.

    ## Markdown Syntax

    You can use various Markdown syntax elements to format your text, such as:

    - Headings
    - Lists
    - Bold and italic text
    - Links
    - Images
    - and more...

    For more information about Markdown syntax, you can refer to the [Markdown Guide](https://www.markdownguide.org/).

    `;

    console.log(`Md content: => ${markdownContent}`);
  }
  
  getCommitMessage();
  createMarkDownContent();