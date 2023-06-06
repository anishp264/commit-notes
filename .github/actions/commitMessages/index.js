const { Octokit } = require('@octokit/rest');

async function getCommitMessages(owner, repo, pullRequestNumber) {
  const octokit = new Octokit();

  try {
    const response = await octokit.pulls.listCommits({
      owner,
      repo,
      pull_number: pullRequestNumber,
    });

    const commitMessages = response.data.map(commit => commit.data.commit.message);
    return commitMessages;
  } catch (error) {
    console.error('Error retrieving commit messages:', error);
    return [];
  }
}

// Example usage
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const repo = process.env.GITHUB_REPOSITORY;
const pullRequestNumber = process.env.GITHUB_EVENT_PULL_REQUEST_NUMBER;

getCommitMessages(owner, repo, pullRequestNumber)
  .then(commitMessages => {
    console.log('Commit messages:', commitMessages);
  })
  .catch(error => {
    console.error('Error:', error);
  });
