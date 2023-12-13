const PICROSS_MATCH = /[?.#]/g;
const DIGIT_MATCH = /\d+/g;

const DEBUG = false;

enum PicrossValues {
    INVALID       = 0x00,
    UNKNOWN       = 0x01,
    WORKING       = 0x02,
    DAMAGED       = 0x04,
}

function PicrossValuesLookup(v: string) {
    switch (v) {
        case "?":
            return PicrossValues.UNKNOWN;
        case ".":
            return PicrossValues.WORKING;
        case "#":
            return PicrossValues.DAMAGED;
    }

    return PicrossValues.INVALID;
}

function DebugPrint(indentLevel: number, ...rest: any) {
    if (!DEBUG) return;

    let indent = "";
    for (let i = 0; i < indentLevel; i++) {
        indent += "\t";
    }

    console.log(indent + indentLevel.toString(), ...rest);
}

function PrintLine(values: PicrossValues[]) {
    let out = "";
    for (const v of values) {
        switch (v) {
            case PicrossValues.UNKNOWN:
                out += "?";
                break;
            case PicrossValues.WORKING:
                out += ".";
                break;
            case PicrossValues.DAMAGED:
                out += "#";
                break;
        }
    }

    return out;
}

let LookUpTable: Record<string, number> = {};

function readCache(line: PicrossValues[], groups: number[]): number | undefined {
    const lineId = PrintLine(line);
    const groupId = groups.join(",");

    if (!Object.hasOwn(LookUpTable, lineId + groupId)) return undefined;

    // console.log("L cache ID", lineId + groupId);
    return LookUpTable[lineId + groupId];
}

function saveCache(line: PicrossValues[], groups: number[], value: number): void {
    const lineId = PrintLine(line);
    const groupId = groups.join(",");
    // const groupId = "";

    // console.log("S cache ID", lineId + groupId, value);
    LookUpTable[lineId + groupId] = value;
}

// using this comment as the basis for the method I'm using
// https://old.reddit.com/r/adventofcode/comments/18ghux0/2023_day_12_no_idea_how_to_start_with_this_puzzle/kd0npmi/
function FindPossibilities(line: PicrossValues[], groups: number[], lineIndex = 0, groupSum: number | null = null, level = 0): number {
    if (groupSum === null) groupSum = groups.reduce((acc, i) => acc + i, 0);

    DebugPrint(level, PrintLine(line), groups.join(","));
    // console.log(level)

    const cache = readCache(line, groups);
    if (cache) {
        DebugPrint(level, "Loaded cache value", cache);
        return cache;
    }


    let possibilities = 0;

    if (line[0] === PicrossValues.WORKING) {
        possibilities = FindPossibilities(line.slice(1), groups, 0, groupSum, level + 1);
        // possibilities = FindPossibilities(line.slice(1), groups, 0, level + 1);
        saveCache(line, groups, possibilities);
        return possibilities;
    }

    if (line[lineIndex] === PicrossValues.UNKNOWN) {
        line[lineIndex] = PicrossValues.WORKING;
        DebugPrint(level, "Trying working");
        possibilities += FindPossibilities(line, groups, lineIndex, groupSum, level + 1);

        line[lineIndex] = PicrossValues.DAMAGED;
        DebugPrint(level, "Trying damaged");
        possibilities += FindPossibilities(line, groups, lineIndex, groupSum, level + 1);

        line[lineIndex] = PicrossValues.UNKNOWN;

        // LookUpTable[ID] = possibilities;
        saveCache(line, groups, possibilities);
        return possibilities;
    }

    if (lineIndex >= line.length && groups.length === 0) {
        if (line.every(i => i === PicrossValues.WORKING)) {
            DebugPrint(level, "All groups satisfied, return 1");
            // LookUpTable[ID] = 1;
            saveCache(line, groups, 1);
            return 1;
        }

        DebugPrint(level, "All groups satisfied but had extra, return 0");
        // LookUpTable[ID] = 0;
        saveCache(line, groups, 0);
        return 0;
    }

    if (lineIndex >= line.length && groups.length > 0) {
        DebugPrint(level, "Unsatisfied groups, return 0");
        // LookUpTable[ID] = 0;
        saveCache(line, groups, 0);
        return 0;
    }

    // check if groups are satisfied

    // let allDamaged = (line[groups[0]] === PicrossValues.WORKING || groups[0] >= line.length);
    // for (let i = 0; i < groups[0]; i++) {
    //     allDamaged &&= line[i] === PicrossValues.DAMAGED;
    // }

    let i = 0;
    while (line[i] === PicrossValues.DAMAGED) {
        i++;
    }

    if (i === groups[0] && (line[i] === PicrossValues.WORKING || i >= line.length)) {
        DebugPrint(level, "Group satisfied!");
        possibilities = FindPossibilities(line.slice(groups[0]), groups.slice(1), 0, groupSum - groups[0], level + 1);
        // LookUpTable[ID] = possibilities;
        saveCache(line, groups, possibilities);
        return possibilities;
    }

    if (i > groups[0]) {
        DebugPrint(level, "Too many in group", `${i} > ${groups[0]}`, "return 0");
        saveCache(line, groups, 0);
        return 0;
    }

    if (line[i] === PicrossValues.WORKING) {
        DebugPrint(level, "Not enough in group, return 0");
        saveCache(line, groups, 0);
        return 0;
    }

    if (line.length < groupSum) {
        DebugPrint(level, "Not enough symbols to satisfy group, return 0");
        saveCache(line, groups, 0);
        return 0;
    }

    if (line.includes(PicrossValues.DAMAGED)) {
        DebugPrint(level, "Group not satisfied!");
        // if couldn't satisfy group move on to next character
        possibilities = FindPossibilities(line, groups, lineIndex + 1, groupSum, level + 1);
        // LookUpTable[ID] = possibilities;
        saveCache(line, groups, possibilities);
        return possibilities;
    }

    saveCache(line, groups, 0);
    return 0;
}

export function puzzle12p1(input: string) {
    return input
        .split("\n")
        .slice(0, -1)
        .map((line, index) => {
            const values = line.match(PICROSS_MATCH)?.map(PicrossValuesLookup) as PicrossValues[];
            const numbers = line.match(DIGIT_MATCH)?.map(Number) as number[];
            console.log("Starting with group", line);

            LookUpTable = {};

            const possibilities = FindPossibilities(values, numbers);
            console.log(index, "Possibilities for", PrintLine(values), possibilities);

            // console.log(LookUpTable);
            return possibilities;
        })
        .reduce((acc, i) => acc + i, 0);
}

export function puzzle12p2(input: string) {
    return input
        .split("\n")
        .slice(0, -1)
        .map((line, index) => {
            const values = line.match(PICROSS_MATCH)?.map(PicrossValuesLookup) as PicrossValues[];
            const numbers = line.match(DIGIT_MATCH)?.map(Number) as number[];

            const unfoldedValues = [
                ...values, PicrossValues.UNKNOWN,
                ...values, PicrossValues.UNKNOWN,
                ...values, PicrossValues.UNKNOWN,
                ...values, PicrossValues.UNKNOWN,
                ...values
            ];

            const unfoldedGroups = [
                ...numbers,
                ...numbers,
                ...numbers,
                ...numbers,
                ...numbers
            ];

            console.log(index, "Starting with group", PrintLine(unfoldedValues), unfoldedGroups.join(","));

            LookUpTable = {};

            const possibilities = FindPossibilities(unfoldedValues, unfoldedGroups);
            console.log(index, "Possibilities for", PrintLine(unfoldedValues), possibilities);

            // console.log(LookUpTable);
            return possibilities;
        })
        .reduce((acc, i) => acc + i, 0);
}
