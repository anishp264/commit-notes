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

function getPRNumber(){
  const githubRef = process.env.GITHUB_REF;
  const pullRequestRegex = /refs\/pull\/(\d+)\/merge/;
  const match = githubRef.match(pullRequestRegex);
  const pullNumber = match ? match[1] : null;
  return pullNumber;
}

// Example usage
const owner = process.env.GITHUB_REPOSITORY.split("/")[0];
const repo = process.env.GITHUB_REPOSITORY.split("/")[1];

/*const githubRef = process.env.GITHUB_REF;
const pullRequestRegex = /refs\/pull\/(\d+)\/merge/;

const match = githubRef.match(pullRequestRegex);
const pullNumber = match ? match[1] : null;*/

const pullNumber = getPRNumber();

getCommitMessages(owner, repo, pullNumber)
  .then(commitMessages => {
    console.log('Commit messages:', commitMessages);
  })
  .catch(error => {
    console.error('Error:', error);
});