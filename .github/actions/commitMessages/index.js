const { Octokit } = require('@octokit/rest');
const { fs } = require('fs');

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

// Example usage
const owner = process.env.GITHUB_REPOSITORY.split("/")[0];
const repo = process.env.GITHUB_REPOSITORY.split("/")[1];
/*const ev = JSON.parse(
    fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')
  )
const prNum = ev.pull_request.number
//const pullRequestNumber = process.env.GITHUB_EVENT_PULL_REQUEST_NUMBER;
console.log('Commit pullRequestNumber:', prNum);*/

const githubRef = process.env.GITHUB_REF;
const pullRequestRegex = /refs\/pull\/(\d+)\/merge/;

const match = githubRef.match(pullRequestRegex);
const pullNumber = match ? match[1] : null;

console.log('Pull Request Number:', pullNumber);

getCommitMessages(owner, repo, 12)
  .then(commitMessages => {
    console.log('Commit messages:', commitMessages);
  })
  .catch(error => {
    console.error('Error:', error);
});