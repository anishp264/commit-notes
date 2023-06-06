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

async function getCommits(owner, repo, pullRequestNumber) {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN 
      });

  try {
    await octokit.pulls.listCommits({
      owner,
      repo,
      pull_number: pullRequestNumber,
    }).then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error('Error retrieving commit messages:', error);
    return [];
  }
}


// Example usage
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const repo = process.env.GITHUB_REPOSITORY;
const pullRequestNumber = process.env.GITHUB_EVENT_PULL_REQUEST_NUMBER;
//console.log('Commit pullRequestNumber:', pullRequestNumber);

/*getCommitMessages(owner, repo, pullRequestNumber)
  .then(commitMessages => {
    console.log('Commit messages:', commitMessages);
  })
  .catch(error => {
    console.error('Error:', error);
});*/
getCommits('Commit pullRequestNumber:', 4);

