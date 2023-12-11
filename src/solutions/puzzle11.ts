enum Types {
    VOID,
    GALAXY
}

interface Position {
    x: number
    y: number
}

interface Node {
    /** The type of node, galaxy or void */
    type: Types
    /** The number of tiles this node should be counted as */
    length: number
}

const dots = [".", ":", "∴", "⸬"];

function printGrid(grid: Node[][]) {
    console.log("Grid");
    for (let i = 0; i < grid.length; i++) {
        let out = "";
        for (let j = 0; j < grid[i].length; j++) {
            out += grid[i][j].type === Types.VOID ? dots[grid[i][j].length - 1] : "#";
        }
        console.log(out);
    }
}

export function puzzle11p1(input: string) {
    // load grid
    const grid: Node[][] = input
        .split("\n")
        .slice(0, -1)
        .map(line => {
            return line.split("").map(i => {
                return {
                    type: i === "#" ? Types.GALAXY : Types.VOID,
                    length: 1
                };
            });
        });

    // if every item in this row is a void, make every item double in length
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].every(item => item.type === Types.VOID)){
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j].length *= 2;
            }
        }
    }

    // if every item in column is void, make every item double in length
    for (let j = 0; j < grid[0].length; j++) {
        let allVoid: boolean = true;
        for (let i = 0; i < grid.length; i++) {
            allVoid &&= (grid[i][j].type === Types.VOID);
        }

        if (allVoid) {
            for (let i = 0; i < grid.length; i++) {
                grid[i][j].length *= 2;
            }
        }
    }

    const galaxies: Position[] = [];

    // find the coordinates of all galaxies
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].type === Types.GALAXY) galaxies.push({ x: j, y: i });
        }
    }

    let sum = 0;

    // loop through each pair of galaxies
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i; j < galaxies.length; j++) {
            // if galaxies are the same, skip (distance is 0)
            if (i === j) continue;

            // make a copy of the current galaxy to prevent overwriting the array
            const current = { ...galaxies[i] };
            const target = galaxies[j];

            let dist = 0;

            // while x and y are different, move them closer
            // every time we move, add the length of the grid tile
            // we're on to the distance

            while (current.x !== target.x) {
                (current.x < target.x) ? current.x++ : current.x--;
                dist += grid[current.y][current.x].length;
            }

            while (current.y !== target.y) {
                (current.y < target.y) ? current.y++ : current.y--;
                dist += grid[current.y][current.x].length;
            }

            // console.log("distance between", galaxies[i], galaxies[j], dist);

            sum += dist;
        }
    }

    return sum;
}

export function puzzle11p2(input: string) {
    // this solution is IDENTICAL to part 1, except blank lines
    // are multiplied by 1 million instead of 2

    const grid: Node[][] = input
        .split("\n")
        .slice(0, -1)
        .map(line => {
            return line.split("").map(i => {
                return {
                    type: i === "#" ? Types.GALAXY : Types.VOID,
                    length: 1
                };
            });
        });

    // double blank lines
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].every(item => item.type === Types.VOID)){
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j].length *= 1000000;
            }
        }
    }

    for (let j = 0; j < grid[0].length; j++) {
        let allVoid: boolean = true;
        for (let i = 0; i < grid.length; i++) {
            allVoid &&= (grid[i][j].type === Types.VOID);
        }

        if (allVoid) {
            for (let i = 0; i < grid.length; i++) {
                grid[i][j].length *= 1000000;
            }
        }
    }

    const galaxies: Position[] = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].type === Types.GALAXY) galaxies.push({ x: j, y: i });
        }
    }

    let sum = 0;

    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i; j < galaxies.length; j++) {
            if (i === j) continue;

            const current = { ...galaxies[i] };
            const target = galaxies[j];

            let dist = 0;
            while (current.x !== target.x) {
                (current.x < target.x) ? current.x++ : current.x--;
                dist += grid[current.y][current.x].length;
            }

            while (current.y !== target.y) {
                (current.y < target.y) ? current.y++ : current.y--;
                dist += grid[current.y][current.x].length;
            }

            // console.log("distance between", galaxies[i], galaxies[j], dist);

            sum += dist;
        }
    }

    return sum;
}
