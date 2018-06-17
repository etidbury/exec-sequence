require('./')({
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
        promise: new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Successfully resolved after 5s");
            }, 5000);
        }),
        error: "Test promise failed to resolve after 5s"
    },
    "Test a promise rejection after 10s": {
        promise: new Promise((resolve, reject) => {
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



