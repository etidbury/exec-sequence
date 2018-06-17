

const MultiSpinner = require('multispinner');
const chalk = require('chalk');
const _exec = require('child_process').exec;
const cliClear=require('cli-clear');


/*
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
};*/
const exec = async (command, options) => {

    const e = await _exec(command, Object.assign(options,{}));


    const {stdout,stderr}=e;


    return new Promise((resolve,reject)=>{

        const _data=[];

        stdout.on('data', function (data) {
            _data.push(data);
        });

        stderr.on('data', function (data) {
            _data.push(data);
        });

        e.on('exit', function (code) {

            if (code===0){
                resolve(_data.join('\n'))
            }else{
                reject(_data.join('\n'))
            }
            //console.log('child process exited with code ' + code.toString());
        });
    });


};

module.exports=async (cmds,config) => {

    config=Object.assign({
        maxStdOutPerTask:10
    },config);


    const _msc = {};

    let i;


    for (let j = 0; j < cmds.length; j++) {
        cmds[j].id=cmds[j].text+"";
        cmds[j]._text=cmds[j].text+"";

    }


    cmds.forEach((cmd) => {
        _msc[cmd.text] = cmd.text;
    });

    const multispinner = new MultiSpinner(_msc);

    const _origSpinnerText=[];
    const _appendTextLines=[];


    multispinner.appendText=function(cmd,text){

        //this.spinners[cmd.id]._text=this.spinners[cmd.id].text;

        //const cmd=cmds[cmds.length-1];


        if (!_origSpinnerText[cmd.id])
            _origSpinnerText[cmd.id]=Object.assign({},cmd).text;


        if (!_appendTextLines[cmd.id])
            _appendTextLines[cmd.id]=[];

        text=chalk.white(text);//format text

        _appendTextLines[cmd.id].push(text);

        if (_appendTextLines[cmd.id].length>=config.maxStdOutPerTask)//restrict to X lines of text
            _appendTextLines[cmd.id].shift();

        this.spinners[cmd.id].text=cmd._text+("\n"+_appendTextLines[cmd.id].join('\n'));
    };

    //let _activeCMD;

    multispinner.resetText=function(){

        Object.keys(this.spinners).forEach((key)=>{
            if (_origSpinnerText[key])
                this.spinners[key].text= _origSpinnerText[key]+"";
        });
        //this.spinners[_activeCMD.id].text=this.spinners[_activeCMD.id]._text;
    };

    let _oldConsole=[];
    const overrideConsoles=(j)=>{

        ['warn','log','error'].forEach((f)=>{

            if (!_oldConsole[f])
                _oldConsole[f] = console[f];

            global.console[f] = function () {

                const args=[].slice.apply(arguments);
                if (typeof j!=="number") {//reset
                    Array.prototype.unshift.call(arguments);
                    _oldConsole[f].apply(this, arguments);
                }else{
                    const prettyArgs="\t"+args
                        .filter((r)=>(typeof r==="string"||typeof r==="object"||typeof r==="number"))
                        .map((r)=>typeof r==="number"&&r||r.toString())
                        .join('  ')
                        .substr(0,200);

                    multispinner.appendText(cmds[j],prettyArgs);//todo: format arguments based on type
                }
            };
        });



    };


    let cmdError = false;



    for (i = 0; i < cmds.length; i++) {
        const cmd = cmds[i];
        try {

            //cmd.id = cmd.text;

            multispinner.resetText(cmd);//hide output console for task if success

            overrideConsoles(i);

            if (cmd.command && cmd.command.length) {
                cmd.promise = async ()=>exec(cmd.command, cmd.options).catch((err) => {
                    //console.error(err.message);
                   // console.error(`Command '${cmd.command}' had an error:\n`,err);

                    let errMessage=(err);


                    let stringShifted="";

                    errMessage.split('\n').forEach(function(line){
                        stringShifted += '\t' + line + '\n';
                    });


                    //errMessage=errMessage.replace('\n','\n\t');

                    console.error(`${chalk.white(chalk.bold.underline(cmd.command)+" output:\n")} `, chalk.grey(stringShifted), "\n");

                    throw new Error(`Command '${cmd.command}' had an error`);
                });

                /*if (cmd.onData&&typeof cmd.onData==="function"){
                    cmd.promise.childProcess.stdout.on('data',cmd.onData);
                    cmd.promise.childProcess.stderr.on('data',cmd.onData);
                }*/

            }
            //

            if (!cmd.promise || (typeof cmd.promise !=="function")) {
                throw new Error(`'promise' field must be a function returning a Promise for task '${cmd.text}'`);
            }




            if (cmd.onInit&&typeof cmd.onInit==="function") {

                await cmd.onInit();
            }

            const response = await cmd.promise().then((c) => {


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

                overrideConsoles();

                if (cmdError.cmd.error && cmdError.cmd.error.length) {
                    console.error("\n", chalk.black.bgRed(cmdError.cmd.error));

                }

                let errMessage=(cmdError.err && cmdError.err.message || cmdError.err || "");

                if (errMessage.length>300)
                    errMessage=errMessage.substr(0,300)+"\n...";


                console.error(`\n${(cmdError.err && "\nError:\n") || ""}`, chalk.grey(errMessage), "\n");



                reject(cmdError);
                return;
            }
            resolve();
        }, 1000);
    });

};
