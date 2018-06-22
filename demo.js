const fse = require('fs-extra');

const envFilePath = '.env';


require('./')({
    "Random console logs": {
        promise: () => new Promise((resolve,reject)=>{

            const NUM_OUTS=5;
            const INTERVAL=1000;

            for (let i = 0; i < NUM_OUTS; i++) {
                setTimeout(()=>{
                    console.log("Random output",Math.random());
                },INTERVAL*i);
            }

            setTimeout(()=>{
                resolve();
            },(NUM_OUTS+1)*INTERVAL);

        })
    },
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



