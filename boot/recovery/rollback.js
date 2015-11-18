var mkdirp = require('mkdirp');
var error = require('../../libs/error/bsod.js');
var clicolour = require("cli-color");
var datea = "./recovery/rollback/backup";
var exec = require('child_process').exec;

//var PythonShell = require('python-shell');
exports.createBackup = function createBackup(x){
  if(x === "test"){
    mkdirp("./tmp/test", function (err) {
      if(err){
        error.throwError("RECOVERY_ROLLBACK_CREATE_BACKUP_DIR:"+err.code, err, err.code);
      }
      else {
        //console.log(clicolour.cyanBright("webOS ")  + clicolour.yellowBright("recovery ")  + "Created Rollback DIR for today");
      };
    });
    // Copy test stuff
    exec("cp -R ./testing/* ./tmp/", function(){
      //console.log(clicolour.cyanBright("webOS ")  + clicolour.yellowBright("recovery ")  + "Created rollback Backup");
    });
  } else {
    mkdirp(datea, function (err) {
      if(err){
        error.throwError("RECOVERY_ROLLBACK_CREATE_BACKUP_DIR:"+err.code, err, err.code);
      }
      else {
        console.log(clicolour.cyanBright("boss ")  + clicolour.yellowBright("recovery ")  + "Created Rollback DIR for today");
      };
    });
    // Create backup
    if(process.env.NODE_ENV !== "dev"){
    exec("cp -R ./ ~/.boss/recovery/rollback/backup", function(error, stdout, stderr){
      console.log(clicolour.cyanBright("boss ")  + clicolour.yellowBright("recovery ")  + "Created rollback Backup");
    });
    // rm .git
    exec("rm -rf ~/.boss/recovery/rollback/backup/.git ~/.boss/recovery/rollback/backup/node_modules", function(error, stdout, stderr){
      console.log(clicolour.cyanBright("boss ")  + clicolour.yellowBright("recovery ")  + "Removed .git folder and node_modules");
    });
  } else {
    console.log(clicolour.redBright("rollback: ") + "Not backing up as dev env");
  }
  };
  };
