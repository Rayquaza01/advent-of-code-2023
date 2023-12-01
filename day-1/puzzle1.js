const fs = require("fs");

let sum = 0;

const nums = fs.readFileSync("./puzzle1-input", { encoding: "utf-8" })
    .split("\n")
    .map(line => {
        const matches = line.match(/\d/g);

        if (matches === null) return 0;

        return parseInt(matches[0] + matches[matches.length - 1])
    });

for (const num of nums) {
    sum += num;
}

console.log(sum);
