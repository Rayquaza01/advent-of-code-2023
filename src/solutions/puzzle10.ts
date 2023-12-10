enum Directions {
    NORTH = 0x01,
    EAST  = 0x02,
    SOUTH = 0x04,
    WEST  = 0x08
}

interface Position {
    x: number
    y: number
    steps: number
}

function getAdjacent(pos: Position, dir: Directions, steps: number): Position {
    steps++;

    switch (dir) {
        case Directions.NORTH:
            return { x: pos.x, y: pos.y - 1, steps };
        case Directions.EAST:
            return { x: pos.x + 1, y: pos.y, steps };
        case Directions.SOUTH:
            return { x: pos.x, y: pos.y + 1, steps };
        case Directions.WEST:
            return { x: pos.x - 1, y: pos.y, steps };
    }
}

function isSet(num: number, flag: number) {
    return (num & flag) === flag;
}

const Pipes: Record<string, number> = {
    "|": Directions.NORTH | Directions.SOUTH,
    "-": Directions.EAST | Directions.WEST,
    "L": Directions.NORTH | Directions.EAST,
    "J": Directions.NORTH | Directions.WEST,
    "7": Directions.SOUTH | Directions.WEST,
    "F": Directions.SOUTH | Directions.EAST,
    ".": 0,
    "S": Directions.NORTH | Directions.SOUTH | Directions.EAST | Directions.WEST
};

function PipeLookup(connections: number): string {
    switch (connections) {
        case Directions.NORTH | Directions.SOUTH:
            return "║";
        case Directions.EAST | Directions.WEST:
            return "═";
        case Directions.NORTH | Directions.EAST:
            return "╚";
        case Directions.NORTH | Directions.WEST:
            return "╝";
        case Directions.SOUTH | Directions.WEST:
            return "╗";
        case Directions.SOUTH | Directions.EAST:
            return "╔";
        case 0:
            return ".";
        case Directions.NORTH | Directions.SOUTH | Directions.EAST | Directions.WEST:
            return "S";
    }

    return "";
}

interface Node {
    connections: number,
    distance: number
    filled: boolean
}

export function puzzle10p1(input: string) {
    const grid: Node[][] = input
        .split("\n")
        .slice(0, -1)
        .map(line => {
            return line.split("").map(c => {
                return { connections: Pipes[c] ?? 0, distance: Infinity, filled: false };
            });
        });

    let current: Position = { x: 0, y: 0, steps: 0 };

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].connections === 0x0F) {
                grid[i][j].distance = 0;
                current = { x: j, y: i, steps: 0 };
                break;
            }
        }
    }

    const positions: Position[] = [current];
    let depth = 0;

    // breadth first search to find farthest point
    while (positions.length > 0) {
        const p = positions.shift() as Position;

        const n = getAdjacent(p, Directions.NORTH, p.steps);
        const e = getAdjacent(p, Directions.EAST, p.steps);
        const s = getAdjacent(p, Directions.SOUTH, p.steps);
        const w = getAdjacent(p, Directions.WEST, p.steps);

        // check if connected in a direction, and adjacent in that direction is connected back

        if (isSet(grid[p.y][p.x].connections, Directions.NORTH) && isSet(grid[n.y][n.x]?.connections, Directions.SOUTH)) {
            if (grid[n.y][n.x].distance > p.steps) {
                grid[n.y][n.x].distance = n.steps;
                positions.push(n);

                depth = Math.max(depth, n.steps);
            }
        }

        if (isSet(grid[p.y][p.x].connections, Directions.EAST) && isSet(grid[e.y][e.x]?.connections, Directions.WEST)) {
            if (grid[e.y][e.x].distance > p.steps) {
                grid[e.y][e.x].distance = e.steps;
                positions.push(e);

                depth = Math.max(depth, e.steps);
            }
        }

        if (isSet(grid[p.y][p.x].connections, Directions.SOUTH) && isSet(grid[s.y][s.x]?.connections, Directions.NORTH)) {
            if (grid[s.y][s.x].distance > p.steps) {
                grid[s.y][s.x].distance = s.steps;
                positions.push(s);

                depth = Math.max(depth, s.steps);
            }
        }

        if (isSet(grid[p.y][p.x].connections, Directions.WEST) && isSet(grid[w.y][w.x]?.connections, Directions.EAST)) {
            if (grid[w.y][w.x].distance > p.steps) {
                grid[w.y][w.x].distance = w.steps;
                positions.push(w);

                depth = Math.max(depth, w.steps);
            }
        }
    }

    return depth;
}

export function puzzle10p2(input: string) {
    const grid: Node[][] = input
        .split("\n")
        .slice(0, -1)
        .map(line => {
            return line.split("").map(c => {
                return { connections: Pipes[c] ?? 0, distance: Infinity, filled: false };
            });
        });

    let current: Position = { x: 0, y: 0, steps: 0 };

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].connections === 0x0F) {
                grid[i][j].distance = 0;
                current = { x: j, y: i, steps: 0 };
                break;
            }
        }
    }

    const positions: Position[] = [current];

    // breadth first search to find farthest point
    while (positions.length > 0) {
        const p = positions.shift() as Position;

        const n = getAdjacent(p, Directions.NORTH, p.steps);
        const e = getAdjacent(p, Directions.EAST, p.steps);
        const s = getAdjacent(p, Directions.SOUTH, p.steps);
        const w = getAdjacent(p, Directions.WEST, p.steps);

        // check if connected in a direction, and adjacent in that direction is connected back

        if (isSet(grid[p.y][p.x].connections, Directions.NORTH) && isSet(grid[n.y][n.x]?.connections, Directions.SOUTH)) {
            if (grid[n.y][n.x].distance > p.steps) {
                grid[n.y][n.x].distance = n.steps;
                positions.push(n);
            }
        }

        if (isSet(grid[p.y][p.x].connections, Directions.EAST) && isSet(grid[e.y][e.x]?.connections, Directions.WEST)) {
            if (grid[e.y][e.x].distance > p.steps) {
                grid[e.y][e.x].distance = e.steps;
                positions.push(e);
            }
        }

        if (isSet(grid[p.y][p.x].connections, Directions.SOUTH) && isSet(grid[s.y][s.x]?.connections, Directions.NORTH)) {
            if (grid[s.y][s.x].distance > p.steps) {
                grid[s.y][s.x].distance = s.steps;
                positions.push(s);
            }
        }

        if (isSet(grid[p.y][p.x].connections, Directions.WEST) && isSet(grid[w.y][w.x]?.connections, Directions.EAST)) {
            if (grid[w.y][w.x].distance > p.steps) {
                grid[w.y][w.x].distance = w.steps;
                positions.push(w);
            }
        }
    }

    // find the real connections of the starting point
    const p = current;
    let startConnections = 0;

    const n = getAdjacent(p, Directions.NORTH, p.steps);
    const e = getAdjacent(p, Directions.EAST, p.steps);
    const s = getAdjacent(p, Directions.SOUTH, p.steps);
    const w = getAdjacent(p, Directions.WEST, p.steps);

    if (isSet(grid[p.y][p.x].connections, Directions.NORTH) && isSet(grid[n.y][n.x]?.connections, Directions.SOUTH)) {
        startConnections |= Directions.NORTH;
    }

    if (isSet(grid[p.y][p.x].connections, Directions.EAST) && isSet(grid[e.y][e.x]?.connections, Directions.WEST)) {
        startConnections |= Directions.EAST;
    }

    if (isSet(grid[p.y][p.x].connections, Directions.SOUTH) && isSet(grid[s.y][s.x]?.connections, Directions.NORTH)) {
        startConnections |= Directions.SOUTH;
    }

    if (isSet(grid[p.y][p.x].connections, Directions.WEST) && isSet(grid[w.y][w.x]?.connections, Directions.EAST)) {
        startConnections |= Directions.WEST;
    }

    grid[p.y][p.x].connections = startConnections;

    const counts = [0, 0];

    for (let i = 0; i < grid.length; i++) {
        let out = "";
        let state = 0;

        let enteredFrom: number = 0;

        for (let j = 0; j < grid[i].length; j++) {
            // if not on loop, increment the count for the current state
            if (grid[i][j].distance === Infinity) {
                counts[state]++;
                out += state === 0 ? "O" : "I";
                continue;
            }

            out += PipeLookup(grid[i][j].connections);

            // if NS connection, always toggle state
            // if EW connection, always do nothing
            if (grid[i][j].connections === (Directions.NORTH | Directions.SOUTH)) {
                state = (state + 1) % 2;
            } else if (grid[i][j].connections === (Directions.EAST | Directions.WEST)) {
                continue;
            }

            // if entering loop, mark what type we entered on
            if (grid[i][j].connections === (Directions.SOUTH | Directions.EAST) || grid[i][j].connections === (Directions.NORTH | Directions.EAST)) {
                enteredFrom = grid[i][j].connections;
            }

            // if exiting loop, compare with entrance type
            // if same, don't update state
            // if different, update state
            if (grid[i][j].connections === (Directions.SOUTH | Directions.WEST) || grid[i][j].connections === (Directions.NORTH | Directions.WEST)) {
                // if north is set on both, or if south is set on both
                if (isSet(enteredFrom, Directions.NORTH) && isSet(grid[i][j].connections, Directions.NORTH)) continue;
                if (isSet(enteredFrom, Directions.SOUTH) && isSet(grid[i][j].connections, Directions.SOUTH)) continue;

                // if set on different states, toggle
                state = (state + 1) % 2;
            }
        }

        console.log(out);
    }

    return counts[1];
}
