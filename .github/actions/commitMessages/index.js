const { Octokit } = require('@octokit/rest');

async function getCommitMessages(owner, repo, pullRequestNumber) {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN 
      });

  try {
    const response = await octokit.pulls.listCommits({
      owner,
      repo,
      pull_number: pullRequestNumber,
    });

    const commitMessages = response.data.map(commit => commit.commit.message);
    return commitMessages;
  } catch (error) {
    console.error('Error retrieving commit messages:', error);
    return [];
  }
}


async function fetchReleaseNotes(owner, repo, pullRequestNumber){
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN 
  });

  try {
    const response = await octokit.pulls.listCommits({
      owner,
      repo,
      pull_number: pullRequestNumber
    });

    const commits = response.data.map(commit => {
      const container = {};
      container.message = commit.commit.message;
      container.committerName = commit.commit.committer.name;
      container.commitDate = commit.commit.committer.date;
      container.commitSha = commit.sha;
      return container;
    });

    let markdownContent = '';

    commits.forEach((commit) => {
      markdownContent += `
      ## Commit Details
  
      - Commit Message: ${commit.message}
      - Committer: ${commit.committerName}
      - Commit Date: ${commit.commitDate}
      - SHA: ${commit.commitSha}
      `;;
    });
    console.log(`Commit Md content: => ${markdownContent}`);
    return commits;
  } catch (error) {
    console.error('Error retrieving commit messages:', error);
    return [];
  }
}




function getPRNumber(){
  const githubRef = process.env.GITHUB_REF;
  const pullRequestRegex = /refs\/pull\/(\d+)\/merge/;
  const match = githubRef.match(pullRequestRegex);
  const pullNumber = match ? match[1] : null;
  return pullNumber;
}

const owner = process.env.GITHUB_REPOSITORY.split("/")[0];
const repo = process.env.GITHUB_REPOSITORY.split("/")[1];

const pullNumber = getPRNumber();

/*getCommitMessages(owner, repo, pullNumber)
  .then(commitMessages => {
    console.log('Commit messages:', commitMessages);
  })
  .catch(error => {
    console.error('Error:', error);
});*/

fetchReleaseNotes(owner, repo, pullNumber);