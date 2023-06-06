const core = require('@actions/core');
const github = require('@actions/github');

try{
    const name = core.getInput('who-to-greet');
    const newName = name.split("/")[0];
    console.log(`Hello ${newName}`);
    
    const time = new Date();
    core.setOutput("time", time.toTimeString());
} catch (error){
    core.setFailed(error.message);
}