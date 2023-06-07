const { Octokit } = require("@octokit/rest");
const fs = require('fs');


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
      

      //New Section BEGINS
      const committerName = commit.data.commit.committer.name;
      const commitDate = commit.data.commit.committer.date;
      const commitSha = commit.data.commit.data.sha;
          
      console.log("Committer Name:", committerName);
      console.log("Commit Date:", commitDate);
      console.log("Commit SHA:", commitSha);
      //New Section ENDS

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

    fs.writeFileSync("programming.md", markdownContent);
    console.log("File written successfully\n");
    console.log("The written has the following contents:");
    console.log(fs.readFileSync("programming.md", "utf8"));
  }

  function createMarkDownFromArray(){
    const data = [
      {
        heading: 'Introduction',
        content: 'This is the introduction section.',
      },
      {
        heading: 'Main Section',
        content: 'This is the main content section.',
      },
      {
        heading: 'Conclusion',
        content: 'This is the conclusion section.',
      },
    ];
    
    let markdownContent = '';
    
    data.forEach((section) => {
      markdownContent += `## ${section.heading}\n\n${section.content}\n\n`;
    });

    fs.writeFileSync("example.md", markdownContent);
    console.log("Markdown file created successfully!");
    console.log("READING FROM the example.md=>");
    console.log(fs.readFileSync("example.md", "utf8"));
    
    /*fs.writeFile('example.md', markdownContent, (err) => {
      if (err) {
        console.error('Error creating Markdown file:', err);
      } else {
        console.log('Markdown file created successfully!');
        console.log(fs.readFile("example.md", "utf8"));
      }
    });*/
  }
  
  getCommitMessage();
  createMarkDownContent();
  createMarkDownFromArray();