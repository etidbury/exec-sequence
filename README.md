<h1>exec-sequence</h1>
<h3>Introduction</h3>
A utility script for executing either promises or CLI commands sequentially whilst illustrating the progress via a pretty CLI check list.
<h3>Example Usage</h3>

```javascript

const fse = require('fs-extra');
const envFilePath = './.env';

require('exec-sequence')({
    "Specify a PORT number": {
        command: "exit 0",
        prompt: "Port number? (e.g. 4000) ",
        promise: (port) => fse.writeFile(envFilePath,`PORT=${port}`).then(()=>"Created .env file!"),
        exists:envFilePath,
        options: {cwd: "./"},
        error: "Failed to open Google"
    },
    "Open Google": {
        command: "open http://google.com/ && exit 0",
        options: {cwd: "./"},
        error: "Failed to open Google"
    },
    "Ensure git changes have been committed to branch": {
        command: "git diff --exit-code",
        options: {cwd: "./"},
        error: "Make sure you have committed/stashed your changes before trying to update the development branch"
    },
    "Test a promise resolve after 5s": {
        promise: ()=>new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Successfully resolved after 5s");
            }, 5000);
        }),
        error: "Test promise failed to resolve after 5s"
    },
    "Test a promise rejection after 10s": {
        promise: ()=>new Promise((resolve, reject) => {
            setTimeout(() => {
                reject("No reason what so ever!");
            }, 10000);
        }),
        error: "Don't worry! This task was meant to reject!"
    },
    "Test Command 3 (This does not run because the previous task throws an error)": {
        command: "pwd",
        options: {cwd: "./server"},
        error: "Maybe sure the 'server' folder exists"
    }

}).then(() => {
    console.log(`All tasks ran successfully!`);
    process.exit(0);
})
    .catch(({cmd, err}) => {
        console.error(`Custom handler to spit out error for task '${cmd.text}':`, err);
        process.exit(1);
    });




```

##Roadmap / TODOs

- Change error output log (the last 20 lines of output) to be the last of the stderr, not the beginning
in order to to see what caused the failure (i.e. in docker build output)

- Allow stdout printing during promise execution but minimised like error output
in order to see progress being made by each execution
