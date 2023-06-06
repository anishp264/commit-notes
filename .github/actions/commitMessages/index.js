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
    await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner: owner,
        repo: repo,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
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
const owner = process.env.GITHUB_REPOSITORY.split("/")[0];
const repo = process.env.GITHUB_REPOSITORY.split("/")[1];
const pullRequestNumber = process.env.GITHUB_EVENT_PULL_REQUEST_NUMBER;
//console.log('Commit pullRequestNumber:', pullRequestNumber);

getCommitMessages(owner, repo, 10)
  .then(commitMessages => {
    console.log('Commit messages:', commitMessages);
  })
  .catch(error => {
    console.error('Error:', error);
});
//getCommits(owner, repo, pullRequestNumber);

