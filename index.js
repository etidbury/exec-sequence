const UI = require('console-ui');
const clear = require('cli-clear');
const chalk = require('chalk');
const figures = require('figures');
const inquirer = require('inquirer');
const fse = require('fs-extra');
const _exec = require('child_process').exec;

const exec = async (command, options) => {

    const e = await _exec(command, Object.assign(options || {}, {}));

    const {stdout, stderr} = e;

    return new Promise((resolve, reject) => {

        const _data = [];

        stdout.on('data', function (data) {
            _data.push(data);
        });

        stderr.on('data', function (data) {
            _data.push(data);
        });

        e.on('exit', function (code) {

            if (code === 0) {
                resolve(_data.join('\n'))
            } else {
                reject({err: _data.join('\n'), code})
            }
            //console.log('child process exited with code ' + code.toString());
        });
    });

};

const ui = new UI({
    inputStream: process.stdin,
    outputStream: process.stdout,
    errorStream: process.stderr,
    writeLevel: 'DEBUG',
    ci: !!process.env.CI
});

module.exports = async (_tasks, config) => {

    let tasks = [];

    if (!Object.keys(_tasks) || !Object.keys(_tasks).length)
        throw new Error("No tasks specified");

    Object.keys(_tasks).forEach((text) => {
        if (!text || !text.length) throw new Error("Invalid task name specified");

        if (typeof _tasks[text].promise === "undefined" && typeof _tasks[text].command === "undefined")
            throw new Error(`Task '${text}' has no promise or command specified! At least one must be specified`);

        tasks.push(Object.assign(_tasks[text], {name: text}))
    });


    config = Object.assign({
        maxStdOutPerTask: 10
    }, config);


    const p = {
        states: {
            'PROGRESS': 'PROGRESS',
            'INACTIVE': "INACTIVE",
            'SUCCESS': 'SUCCESS',
            'ERROR': 'ERROR'
        },
        lines: [],
        addLine: function ({task, state}) {
            this.lines.push({name: task.name, state});
        },
        addSubmessage: function ({task, message}) {

            for (let i = 0; i < this.lines.length; i++) {

                const line = this.lines[i];

                if (line.name === task.name) {
                    if (!this.lines[i].sub)
                        this.lines[i].sub = "";

                    this.lines[i].sub += "\t" + message + "\n";
                    break;
                }
            }

            this.render();
        },
        updateState: function ({task, state}) {

            for (var i = 0; i < this.lines.length; i++) {

                var line = this.lines[i];

                if (line.name === task.name) {
                    this.lines[i].state = state;
                    break;
                }
            }

            this.render();
        },
        render: function () {
            clear();


            let inProgressLine;

            ui.writeLine(chalk.grey("_____________________"));


            for (let i = 0; i < this.lines.length; i++) {
                const line = this.lines[i];


                switch (line.state) {
                    case this.states.PROGRESS:
                        ui.writeLine(chalk.bold(chalk.yellow(figures.pointer) + " " + line.name));
                        ui.startProgress(line.name);
                        inProgressLine = line;
                        //ui.stopProgress();
                        //ui.startProgress(chalk.yellow(line.name));
                        break;
                    case this.states.SUCCESS:
                        ui.writeLine(chalk.green(figures.tick + " " + line.name));
                        break;
                    case this.states.ERROR:
                        ui.writeLine(chalk.red(figures.cross + " " + line.name));
                        break;

                    default:
                        ui.writeLine(chalk.white(figures.squareSmall + "  " + line.name));
                        break;
                }
                if (line.sub && line.sub.length)
                    ui.writeLine("   " + chalk.grey(line.sub));


            }

            ui.writeLine(chalk.grey("_____________________"));
            if (inProgressLine)
                ui.startProgress(inProgressLine.name);
            else ui.stopProgress();

            //inProgressLi


        }
    };

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        p.addLine({task: task, state: p.states.INACTIVE});
    }
    //process.exit();
    //init

    p.updateState({task: tasks[0], state: p.states.INACTIVE});

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        try {

            p.updateState({task, state: p.states.PROGRESS});

            let promptResponse;

            if (task.prompt) {

                ui.stopProgress();

                if (typeof task.prompt === "string") {
                    //format to default string specifier

                    const responseName = "promptResponse";

                    task.prompt = {type: "string", message: task.prompt, name: responseName};

                    promptResponse = await inquirer.prompt(task.prompt).then((r) => r[responseName]);

                } else {
                    promptResponse = await inquirer.prompt(task.prompt);
                }

                if (promptResponse) {
                    p.addSubmessage({task, message: chalk.reset(`${figures.tick} Passed values from prompt`)})
                }else{
                    p.addSubmessage({task, message: chalk.reset(`${chalk.red(figures.cross)} Passed values from prompt`)})
                }
            }


            let response;


            if (task.promise && typeof task.promise === "function") {

                ui.startProgress(task.name + " (Executing promise...)");
                response = await task.promise(promptResponse);

            }

            ui.stopProgress();

            if (response) {//todo: add validator
                p.addSubmessage({task, message: chalk.reset(`${figures.tick} `+response)})
            }


            if (task.command && typeof task.command === "string") {
                ui.startProgress(task.name + " (Executing command...)");

                await exec(task.command).catch(({err, code}) => {


                    //prettify console output from command
                    let errMessage = (err);

                    let message = "";

                    errMessage.split('\n').forEach(function (line) {
                        message += '\t' + line + '\n';
                    });

                    message = message.split('\n').slice(0, 5).join('\n') + (message.split('\n').length > 5 && "\n\t" + chalk.white.italic("(Showing only first 5 lines)") || "");

                    throw `${task.error && task.error.length && chalk.bold(" " + task.error + " ") || `Exit Code ${code}`}\n\t${chalk.white(chalk.bold.underline(task.command) + " output:\n" + chalk.grey(message))}`;


                });


            }


            if (task.exists && typeof task.exists === "string") {
                ui.startProgress(task.name + ` (Checking file '${task.exists}' exists...)`);


                const exists = await fse.exists(task.exists);

                if (!exists) throw new Error(`File '${task.exists}' does not exist!`);
                else p.addSubmessage({task, message: chalk.reset(`${figures.tick} File '${task.exists}' exists`)})
            }


            p.updateState({task, state: p.states.SUCCESS});

        } catch (err) {

            p.updateState({task, state: p.states.ERROR});

            let errMessage;


            if (err instanceof Error) {
                errMessage = chalk.red(err);
            } else if (typeof err === "string") {
                errMessage = err;
            }


            if (errMessage)
                p.addSubmessage({task, message: errMessage});


            break;
        }
    }


};
