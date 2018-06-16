const MultiSpinner = require('multispinner');
const chalk = require('chalk');
const _exec = require('child_process').exec;

const exec = (command, options) => {

    return new Promise((resolve, reject) => {

        _exec(command, options,(e, stdout, stderr)=> {
            if (e instanceof Error) {
                reject(stderr);
                return;
            }
            resolve(stdout);
        });

    });
};

module.exports=async (cmds) => {


    const _msc = {};

    cmds.forEach((cmd) => {
        _msc[cmd.text] = cmd.text;
    });

    const multispinner = new MultiSpinner(_msc);

    let cmdError = false;

    for (let i = 0; i < cmds.length; i++) {
        const cmd = cmds[i];
        try {

            cmd.id = cmd.text;

            if (cmd.command && cmd.command.length) {
                cmd.promise = exec(cmd.command, cmd.options).catch((err) => {
                    //console.error(err.toString());
                    throw new Error(`Command '${cmd.command}' had an error:\n ${err.toString()}`);
                });

                /*if (cmd.onData&&typeof cmd.onData==="function"){
                    cmd.promise.childProcess.stdout.on('data',cmd.onData);
                    cmd.promise.childProcess.stderr.on('data',cmd.onData);
                }*/

            }
            if (!cmd.promise || !(cmd.promise instanceof Promise)) {
                throw new Error(`Promise not specified for '${cmd.text}'`);
            }

            const response = await cmd.promise.then((c) => {

                multispinner.success(cmd.id);

                return c;
            });

            if (response && cmd.onData && typeof cmd.onData === "function") {
                cmd.onData(response);
            }


        } catch (err) {
            multispinner.error(cmd.id);
            cmdError = {cmd, err};
            break;
        }
    }//end for

    //wait to ensure all commands' states are rendered
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            if (cmdError) {

                if (cmdError.cmd.error && cmdError.cmd.error.length) {
                    console.error("\n", chalk.bold(chalk.red(cmdError.cmd.error)));
                }

                console.error(chalk.grey(`\n${(cmdError.err && "\nError:\n") || ""}`), chalk.grey(cmdError.err && cmdError.err.message || cmdError.err || ""), "\n");

                reject(cmdError);
                return;
            }
            resolve();
        }, 1000);
    });

};
