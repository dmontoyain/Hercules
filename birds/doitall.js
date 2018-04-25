const { execSync } = require('child_process');
var fs = require('fs');

var args = process.argv;
var language = process.argv[2];
var projectpath = process.argv[3];

function usage()
{
    console.log("\nPrepares your project for quickstart:\nArgument 1 -> programming language(C, node js...)\nArgument 2 -> Project Root Path (if not found, one will be created.)\nArgument 3 -> includes (libft, printf...)");
    console.log("\x1b[33m%s\x1b[0m", "Languages supported: C & Node (Javascript)\n");
}

function createdir(){
    execSync('mkdir '+ projectpath, (err, stdout, stderr) => {
        if (err){
            throw new Error(err);
            process.exit();
        }
    });
	execSync('cp -f .gitignore '+ projectpath, (err, stdout, stderr) => {
			if (err){
				throw new Error(err);
				process.exit();
			}
	});
}

function install_nodeenv(){
    execSync('npm init -y', (err, stdout, stderr) => {
        if (err){
            throw new Error(err);
        }
    });
    execSync('mv ./package.json '+projectpath, (err, stdout, stderr) => {
    });
    execSync('npm install --prefix '+ projectpath + ' --save', (err, stdout, stderr) => {
        console.log("\x1b[32m%s\x1b[0m", "Modules succesfully created..");
    });
}

function add_libft(){
    if (fs.existsSync(projectpath+'/libft')){
        console.log("Libft already exists.");
    }
    else{
        execSync('cp -r ~/42/lem_in/libft '+ projectpath, (err, stdout, stderr) => {
            if (err){
                throw new Error(err);
                process.exit();
            }
        });
        console.log("\x1b[32m%s\x1b[0m", "Libft added to your project succesfully!")
    }
}

function install_clib(){
    if (fs.existsSync(projectpath+'/src')){
        console.log("Src directory already created.");
    }
    else{
        execSync('mkdir '+ projectpath +'/src', (err, stdout, stderr) => {
            if (err){
                throw new Error(err);
                process.exit();
            }
        });
    }
    if (fs.existsSync(projectpath+'/Makefile')){
        console.log("Makefile version already available in project.");
    }
    else{
        execSync('cp ~/42/Makefile '+ projectpath, (err, stdout, stderr) => {
            if (err){
                throw new Error(err);
                process.exit();
            }
        });
        console.log("\x1b[32m%s\x1b[0m","Makefile created.")
    }
    args.forEach((val, index) => {
        if (index >= 4)
        {
            if (val == "libft"){
                add_libft();
            }
        }
    });
}

if (language == null || projectpath == null)
{
    usage();
    process.exit(0);
}
else if (language == "C" || language == "c")
{
    if (fs.existsSync(projectpath)){
        install_clib();
    }
    else{
        createdir();
        install_clib();
    }
    console.log("\x1b[32m%s\x1b[0m", ">>>Project ready!<<<\n");
}
else if (language == "node" || language == "Node")
{
    if (fs.existsSync(projectpath)){
        install_nodeenv();
    }
    else{
        createdir();
        install_nodeenv();
    }
    console.log("\x1b[32m%s\x1b[0m", ">>>Project ready!<<<\n");
}
else{
    console.log("Programming language not supported :(\n");
    usage();
}
