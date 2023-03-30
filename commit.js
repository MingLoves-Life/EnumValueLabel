const { exec } = require("child_process");

exec("git log -1", (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  console.log(`Git commit: ${stdout}`);
});
