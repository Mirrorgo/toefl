const events = require("events");
const fs = require("fs");
const readline = require("readline");

(async function processLineByLine() {
  try {
    const fWrite = fs.createWriteStream("./new.csv");
    const rl = readline.createInterface({
      input: fs.createReadStream("../vocabulary.csv"),
      output: fWrite,
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      fWrite.write(line + ",1" + "\n");
      console.log(`Line from file: ${line}`);
    });

    await events.once(rl, "close");

    console.log("Reading file line by line with readline done.");
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(
      `The script uses approximately ${Math.round(used * 100) / 100} MB`
    );
  } catch (err) {
    console.error(err);
  }
})();
