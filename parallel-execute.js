const { exec } = require("child_process");

const startIdx = 16000;
const endIdx = 17000;
const chunkSize = 1000; // must be divisible by 'step'

let curr = startIdx;
while (curr <= endIdx) {
  const e = curr + chunkSize > endIdx ? endIdx : curr + chunkSize;
  const command = `node index.js ${curr} ${e}`;
  console.log(command);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
  curr = curr + chunkSize;
}
