const fs = require("fs");

const NUMBER_STRINGS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
// regex in non capturing group, matching digit or text digit at start of line
const NUMBER_REGEX = new RegExp("^(?:\\d|" + NUMBER_STRINGS.slice(1).join("|") + ")");

function textToNumber(val) {
    // if digit, just parse int
    if (/\d/.test(val)) {
        return parseInt(val);
    }

    // otherwise, look up in table
    return NUMBER_STRINGS.indexOf(val);
}

let sum = 0;

const nums = fs.readFileSync("./puzzle1-input", { encoding: "utf-8" })
    .split("\n")
    .map(line => {
        let matches = [];

        // this is dirty, but regex doesn't capture overlapping matches
        // so we run the regex again for every character
        for (let i = 0; i < line.length; i++) {
            const match = line.slice(i).match(NUMBER_REGEX);
            if (match !== null) matches.push(match[0]);
        }

        if (matches.length === 0) return 0;

        matches = matches.map(textToNumber);

        return matches[0] * 10 + matches[matches.length - 1]
    });

for (const num of nums) {
    sum += num;
}

console.log(sum);
