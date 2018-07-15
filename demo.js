const fse = require('fs-extra');

const envFilePath = '.env';


require('./').run({
    "Big error log": {
        promise: () => new Promise((resolve,reject)=>{

            reject(`
            
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lobortis malesuada elementum. Praesent lobortis pulvinar odio sit amet ultrices. Phasellus bibendum mollis urna vitae pulvinar. In vestibulum faucibus quam ut sagittis. Donec ut tellus in lectus elementum mattis. Donec ac ipsum eget ipsum blandit tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lectus libero, hendrerit ac turpis nec, placerat lacinia justo. Aenean facilisis purus libero, nec lobortis tellus auctor et. Ut interdum nibh dolor, ac bibendum neque mattis ut. Cras mauris purus, lacinia vel justo in, porta ultrices sapien. Fusce porttitor augue non tempus consectetur.

Phasellus luctus eu justo ac ultricies. Sed nec maximus nisl. Duis elementum gravida dui vitae ultrices. Fusce interdum nisl tortor, non rutrum ex facilisis eu. Praesent nec magna luctus, rhoncus urna non, commodo tellus. Praesent a nisl id urna sagittis feugiat. Sed ac eros vestibulum, scelerisque nibh ac, scelerisque leo. Quisque at velit sed felis rutrum commodo. Ut consequat a libero quis posuere.

Donec vitae orci diam. Quisque tempor dignissim felis. Nullam sed felis blandit odio eleifend lobortis in sit amet velit. Mauris tincidunt mattis mauris a lobortis. Pellentesque sodales orci eu purus ornare venenatis. Suspendisse vehicula, quam sit amet semper luctus, urna purus placerat tellus, in tincidunt tortor quam ut quam. Nullam ut orci in dolor mattis fringilla.

Nunc varius ligula ac arcu vulputate, tempor posuere tortor iaculis. Vestibulum metus mauris, elementum a leo sed, rhoncus aliquam dolor. Phasellus tristique est id neque varius, non rutrum lorem vehicula. Maecenas aliquam suscipit mauris id varius. Ut eros dolor, imperdiet eget nunc ac, aliquam laoreet turpis. Aliquam et tincidunt eros. Suspendisse eu tristique justo. Sed sit amet elementum ante. Nam gravida, est id ullamcorper pellentesque, elit ex interdum ex, eu imperdiet lorem dolor at ligula. Praesent malesuada gravida sollicitudin. Nunc varius finibus purus non vehicula. Interdum et malesuada fames ac ante ipsum primis in faucibus.

Morbi mattis nec velit nec iaculis. Aliquam porttitor volutpat risus sit amet eleifend. Sed dictum nisi eu dictum tempor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque ultricies iaculis tellus et consectetur. Etiam vulputate arcu et mollis vulputate. Sed porta sodales lectus at gravida. Aenean dolor neque, tristique id molestie eget, euismod eget lorem. Vivamus nec lectus in nisi imperdiet bibendum ac ut libero. Vestibulum ligula erat, cursus eu pretium eu, laoreet sit amet est. Integer sit amet nisl suscipit, egestas urna in, sodales nibh. Proin nec sapien eu nisi aliquet dictum.

Suspendisse consectetur condimentum leo a hendrerit. Maecenas id mollis dui, et lobortis lacus. Duis semper eget est eu vehicula. Donec malesuada felis non sodales placerat. Ut finibus imperdiet quam, id rutrum metus pulvinar eget. Quisque pretium, odio sed blandit malesuada, nulla nisi sagittis orci, ac sollicitudin leo turpis ac risus. Sed et odio id tortor scelerisque sollicitudin. Phasellus sodales orci quis gravida faucibus. Phasellus ac luctus magna.

Nullam non pharetra dui. Nam accumsan ipsum eget urna varius, eu vulputate magna dignissim. Fusce vitae finibus sapien. Donec consectetur porttitor mattis. Phasellus et efficitur turpis, quis vehicula velit. Nullam vitae ullamcorper ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mattis eu risus ac iaculis. Nam tempus ac sem at bibendum.

Donec pharetra, turpis nec dapibus sollicitudin, diam lacus suscipit nisl, pellentesque fringilla dui ex vel elit. Mauris quis euismod felis. Donec eleifend leo odio, id sollicitudin lectus faucibus non. Ut eu magna id mi commodo posuere quis ultricies leo. Aliquam erat volutpat. Aenean ornare ex eu leo interdum tempus. Nunc tempus erat nec dictum consectetur. Curabitur tellus nisi, venenatis et risus ut, feugiat bibendum turpis. Etiam vehicula non mi non fringilla. In hac habitasse platea dictumst. In cursus felis non scelerisque maximus. Aliquam eros justo, consectetur vel mauris quis, pellentesque aliquam est. Ut a condimentum dolor. Etiam dui sapien, porttitor non euismod at, eleifend ut lorem. Nulla pellentesque odio in laoreet aliquam. Donec vel sem a ante pellentesque tempus vitae eget sapien.

Etiam sit amet diam in mauris sollicitudin pulvinar ac et nibh. Nullam quis tortor fermentum, imperdiet eros at, cursus odio. Nunc ornare, ligula sit amet convallis dignissim, risus elit cursus sapien, vitae lobortis ipsum ipsum vel orci. Aenean ac quam quis leo pulvinar dignissim. Aenean at arcu nibh. Maecenas ornare dictum metus, id feugiat augue scelerisque at. Proin hendrerit ante eget massa venenatis vestibulum. Nullam dapibus ut nunc feugiat fermentum. Nulla erat purus, placerat a consequat quis, dapibus eu arcu. Nunc id magna fermentum, posuere massa ut, maximus mauris. Sed in nunc at massa dapibus lacinia ut at est. Curabitur feugiat risus ligula, pellentesque facilisis magna sagittis laoreet. Mauris placerat lorem sit amet sapien viverra varius.

Morbi sit amet condimentum arcu, vitae posuere elit. Nulla sit amet purus non turpis pulvinar accumsan sit amet id nunc. Mauris consequat, elit finibus posuere feugiat, quam ex malesuada purus, quis auctor eros dui non velit. Pellentesque gravida ligula non libero volutpat, eget sollicitudin nisl dictum. Aliquam bibendum magna venenatis, consequat diam eu, tempus ligula. Fusce venenatis nibh in elit tincidunt, sit amet pulvinar justo convallis. Aenean non felis laoreet, laoreet elit non, pellentesque sapien. Nam rutrum congue diam in rhoncus. Nullam imperdiet risus elit, ut vulputate tortor volutpat quis. Integer ac magna non sapien luctus scelerisque non quis sem. Curabitur ullamcorper sem sem, rhoncus blandit risus ornare at. Nulla pellentesque justo enim, ac luctus justo tristique sit amet. Suspendisse vestibulum quam leo. Pellentesque cursus facilisis nulla, ut rhoncus orci vestibulum ac. In hac habitasse platea dictumst.

Duis quis varius metus. Fusce ac volutpat mauris. Pellentesque ac lacinia elit. Quisque commodo purus interdum nisi suscipit, sit amet porttitor elit malesuada. Aliquam varius velit metus, a rutrum odio interdum sit amet. Nunc porttitor nulla vel sapien fringilla efficitur. Aliquam lacus turpis, tincidunt tempus lacus fermentum, rutrum maximus risus. Sed accumsan eget augue commodo venenatis. Praesent placerat dui lacus, gravida mollis ipsum sagittis id. Etiam rutrum vehicula lorem et lobortis. Phasellus et pretium quam. Curabitur vel mauris neque. Pellentesque dolor mi, viverra eu quam ut, sagittis tristique turpis.

Morbi volutpat nisl id augue eleifend, porta rutrum magna vestibulum. Proin lobortis tristique auctor. Phasellus magna ipsum, rutrum et orci in, bibendum convallis quam. Maecenas turpis turpis, accumsan vitae ultricies nec, rutrum vitae erat. Nam at semper nunc. Cras eu nisi aliquam, molestie urna non, rhoncus risus. Sed sollicitudin, neque quis aliquam suscipit, eros dolor viverra elit, id iaculis dui sapien eu ante. Maecenas in hendrerit sapien. Duis mi tortor, iaculis vitae pretium sit amet, auctor eget lacus. Ut tristique at sem et laoreet. Aliquam mi lorem, malesuada vel condimentum vestibulum, interdum non ipsum. Quisque tristique felis purus, nec dapibus tortor accumsan porta.

Donec sit amet sapien et arcu bibendum venenatis et a arcu. Pellentesque nec leo eu diam sollicitudin euismod. Proin consectetur odio ex, ac scelerisque erat accumsan nec. Nulla in diam at lacus placerat rutrum. Nam non quam bibendum, pretium diam id, pretium libero. Nulla id justo at risus commodo posuere vel et arcu. Suspendisse vulputate nisi ut risus placerat ornare. Curabitur mattis lectus vel nisi ultricies, auctor commodo quam faucibus. Phasellus tincidunt mollis justo, vel tincidunt ipsum semper ut. Nulla vel augue neque.

Cras quis lacus suscipit, varius dui id, vestibulum orci. Integer tincidunt gravida lorem eget elementum. Morbi sed dolor vehicula, pretium velit a, efficitur metus. Nunc quis posuere quam. Nullam tincidunt, odio quis lacinia dictum, felis nunc eleifend tortor, in varius arcu sem sed quam. Curabitur nibh nulla, consectetur sed porttitor in, volutpat commodo erat. Vestibulum posuere maximus vulputate. Integer venenatis risus ut consectetur vulputate.

Suspendisse bibendum velit quis ex consequat, nec hendrerit enim porta. Aenean vel ipsum quis odio tristique hendrerit. Curabitur laoreet sem ac tellus rutrum dignissim. Sed rutrum odio ante, id convallis erat ultricies ac. Sed vitae ex dolor. Praesent dignissim, nunc in blandit sagittis, velit augue finibus ante, in elementum elit neque consequat eros. Etiam eu est non tortor porta sodales in sit amet odio. Vivamus ultrices, nibh eu egestas ornare, ex velit placerat libero, id vestibulum ipsum purus eu diam. Vestibulum consequat ultrices eros et imperdiet.

Duis at feugiat magna. Vivamus aliquet mollis mauris id maximus. Etiam facilisis, quam ac blandit rutrum, mauris lectus interdum ante, ac vestibulum urna sapien id felis. Nunc rutrum nisi ultrices libero dignissim, at dapibus odio tincidunt. Vestibulum elit diam, viverra scelerisque nisi et, mollis auctor mi. Praesent vitae sem eget urna pulvinar scelerisque sit amet eu dolor. Donec pharetra erat ut tortor mollis dictum. Etiam sollicitudin commodo nulla eu commodo. Nulla facilisi.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec efficitur at quam vel tempus. Quisque eleifend scelerisque laoreet. Nullam condimentum sem vitae vehicula mattis. Etiam sed ex sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam scelerisque quam a ante venenatis, sed rhoncus purus vestibulum. Nullam sed purus a dui maximus vulputate.

Nam euismod urna non justo sagittis, eu viverra magna accumsan. Duis pellentesque, libero vel porta sagittis, magna arcu elementum diam, nec mollis orci leo eu massa. Cras efficitur tristique nibh, in molestie erat accumsan ac. Donec dignissim at lorem volutpat fermentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum sagittis efficitur eros vel imperdiet. Proin felis elit, dictum eu porttitor ac, tincidunt ut arcu. Vestibulum suscipit mattis leo fermentum porttitor. Nullam vel lectus id nunc suscipit scelerisque. Fusce faucibus leo sit amet felis blandit bibendum. Donec facilisis, elit et facilisis convallis, orci nisi finibus odio, a convallis diam dolor et sem. Morbi sodales et velit ut fringilla. Suspendisse potenti.

Vestibulum sed metus sodales, congue enim vitae, semper lectus. Sed et blandit ex. Aliquam quis velit ut augue blandit cursus. Donec et lacinia dui. Curabitur consectetur, augue at vehicula efficitur, orci turpis tincidunt ex, non rutrum libero mauris at lacus. Aliquam erat volutpat. Phasellus sit amet lacinia risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque tincidunt, elit eget dapibus interdum, mauris lectus fermentum leo, molestie commodo lectus ipsum ac ipsum. Donec maximus tellus ut lacinia sodales.

Fusce vulputate eget ante eget venenatis. Duis interdum, diam et congue tempor, mi tortor viverra sem, eu convallis odio libero sit amet felis. In ac magna rutrum neque ullamcorper condimentum at sed metus. Nulla viverra dolor nec justo lacinia aliquet. Fusce a tellus sed justo blandit commodo. Maecenas pellentesque iaculis urna at iaculis. Nullam placerat nisl at ipsum bibendum ornare. Sed tempor, metus a viverra commodo, magna leo auctor ipsum, rutrum posuere neque leo id est. Donec nec eros blandit, bibendum justo a, varius leo.
            
            
            
            `);

        })
    },
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
    .catch(({task, err}) => {
        console.error(`Custom handler to spit out error for task '${task.name}':`, err);
        process.exit(1);
    });



