import assert from "assert";
import { describe, it } from "mocha";

import * as PuzzleSolutions from "./solutions";

import fs from "fs";

function ReadFile(name: string): string {
    return fs.readFileSync(name, { encoding: "utf-8" });
}

const d01p1 = ReadFile("./input/d01p1.test");
const d01p2 = ReadFile("./input/d01p2.test");

const d02p1 = ReadFile("./input/d02p1.test");
const d03p1 = ReadFile("./input/d03p1.test");
const d04p1 = ReadFile("./input/d04p1.test");
const d05p1 = ReadFile("./input/d05p1.test");

describe("Puzzle 1", function () {
    describe("Part 1", function () {
        it("find the first and last digit in a line, and sum each line", function() {
            assert.equal(PuzzleSolutions.puzzle01p1(d01p1), 142);
        });
    });

    describe("Part 2", function () {
        it("find the first and last digit in a line, including digits written as words, and sum each line", function() {
            assert.equal(PuzzleSolutions.puzzle01p2(d01p2), 281);
        });
    });
});

describe("Puzzle 2", function () {
    describe("Part 1", function () {
        it("should find if a key contains a larger value than maximum, and sum ids that have valid keys", function () {
            assert.equal(PuzzleSolutions.puzzle02p1(d02p1), 8);
        });
    });

    describe("Part 2", function () {
        it("should find the max of each key in each line, multiply each line's maxes, and sum the products", function () {
            assert.equal(PuzzleSolutions.puzzle02p2(d02p1), 2286);
        });
    });
});


describe("Puzzle 3", function () {
    describe("Part 1", function () {
        it("should find all numbers adjacent to a symbol and sum them", function () {
            assert.equal(PuzzleSolutions.puzzle03p1(d03p1), 4361);
        });
    });

    describe("Part 2", function () {
        it("should find all symbols with two adjacent numbers, and sum the the adjacent number's products", function () {
            assert.equal(PuzzleSolutions.puzzle03p2(d03p1), 467835);
        });
    });
});

describe("Puzzle 4", function () {
    describe("Part 1", function () {
        it("should find all winning numbers on a card, and sum the cards", function () {
            assert.equal(PuzzleSolutions.puzzle04p1(d04p1), 13);
        });
    });

    describe("Part 2", function () {
        it("should give copies of the next card for number of winners, and count the number of processed cards", function () {
            assert.equal(PuzzleSolutions.puzzle04p2(d04p1), 30);
        });
    });
});

describe("Puzzle 5", function () {
    describe("Part 1", function () {
        it("should find the closest location that maps tot the initial seeds", function () {
            assert.equal(PuzzleSolutions.puzzle05p1(d05p1), 35);
        });
    });

    describe("Part 2", function () {
        it("should find the closest location that maps to a range of seeds", function () {
            assert.equal(PuzzleSolutions.puzzle05p2(d05p1), 46);
        });
    });
});
