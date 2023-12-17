#include <cstdio>
#include <cstring>
#include <stack>

enum TILES {
    EMPTY             = 0x00,
    BACK_REFLECTOR    = 0x01,
    FORWARD_REFLECTOR = 0x02,
    HORI_SPLITTER     = 0x04,
    VERT_SPLITTER     = 0x08,
    ENERGIZED         = 0x10
};

enum BeamHeading {
    NORTH,
    WEST,
    SOUTH,
    EAST
};

struct Beam {
    int x;
    int y;
    BeamHeading heading;
    int energizedTileCount;
};

/**
 * Advances a beam in the direction of its heading.
 * Returns true if new position is in bounds
 * @param beam - Beam to advance
 * @param width - Width of grid
 * @param height - Height of grid
 */
bool AdvanceBeam(Beam &b, int width, int height) {
    switch (b.heading) {
        case NORTH:
            b.y--;
            break;
        case WEST:
            b.x--;
            break;
        case SOUTH:
            b.y++;
            break;
        case EAST:
            b.x++;
            break;
    }

    return b.x >= 0 && b.x < width && b.y >= 0 && b.y < height;
}

bool isSet(char value, char bitw) {
    return (value & bitw) == bitw;
}

int max(int a, int b) {
    return a > b ? a : b;
}

/**
 * Marks all tiles as not energized
 */
void deenergizeGrid(char grid[128][128], int width, int height) {
    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            grid[i][j] &= ~ENERGIZED;
        }
    }
}

/**
 * Counts all tiles marked as energized
 */
int countEnergized(char grid[128][128], int width, int height) {
    int sum = 0;

    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            if (isSet(grid[i][j], ENERGIZED)) {
                sum++;
            }
        }
    }

    return sum;
}

/**
 * Follows the beam given, marking all tiles the beam crosses as energized
 */
void processGrid(Beam initial, char grid[128][128], int width, int height) {
    std::stack<Beam> beams;

    deenergizeGrid(grid, width, height);

    beams.push(initial);

    while (!beams.empty()) {
        Beam current = beams.top();
        beams.pop();
        /* printf("Current x: %d, y: %d, heading: %d\n", current.x, current.y, current.heading); */

        // if the current tile is already energized, mark that we've hit a pre energized tile
        // otherwise reset our pre-energized count and energize the tile
        if (isSet(grid[current.y][current.x], ENERGIZED)) {
            current.energizedTileCount++;
        } else {
            current.energizedTileCount = 0;
            grid[current.y][current.x] |= ENERGIZED;
        }

        // if we've hit 10 pre-energized tiles in a row, guess we're in a loop and break
        if (current.energizedTileCount > 10) {
            continue;
        }


        // if we hit a vert splitter (|) and we're heading east or west
        // create two new beams with north and south headings
        if (isSet(grid[current.y][current.x], VERT_SPLITTER) && (current.heading == EAST || current.heading == WEST)) {
            Beam n = current;
            n.heading = NORTH;
            Beam s = current;
            s.heading = SOUTH;

            if (AdvanceBeam(n, width, height)) {
                beams.push(n);
            }

            if (AdvanceBeam(s, width, height)) {
                beams.push(s);
            }

            continue;
        }

        // if we hit a hori splitter (-) and we're heading north or south
        // create two new beams with east and west headings
        if (isSet(grid[current.y][current.x], HORI_SPLITTER) && (current.heading == NORTH || current.heading == SOUTH)) {
            Beam e = current;
            e.heading = EAST;
            Beam w = current;
            w.heading = WEST;

            if (AdvanceBeam(e, width, height)) {
                beams.push(e);
            }

            if (AdvanceBeam(w, width, height)) {
                beams.push(w);
            }

            continue;
        }

        // if we hit a forward reflector (/), change the heading
        if (isSet(grid[current.y][current.x], FORWARD_REFLECTOR)) {
            switch (current.heading) {
                case NORTH:
                    current.heading = EAST;
                    break;
                case WEST:
                    current.heading = SOUTH;
                    break;
                case SOUTH:
                    current.heading = WEST;
                    break;
                case EAST:
                    current.heading = NORTH;
                    break;
            }

            if (AdvanceBeam(current, width, height)) {
                beams.push(current);
            }

            continue;
        }

        // if we hit a backwards reflector (\), change the heading
        if (isSet(grid[current.y][current.x], BACK_REFLECTOR)) {
            switch (current.heading) {
                case NORTH:
                    current.heading = WEST;
                    break;
                case WEST:
                    current.heading = NORTH;
                    break;
                case SOUTH:
                    current.heading = EAST;
                    break;
                case EAST:
                    current.heading = SOUTH;
                    break;
            }

            if (AdvanceBeam(current, width, height)) {
                beams.push(current);
            }

            continue;
        }

        // if no other conditions met, move in direction of heading
        if (AdvanceBeam(current, width, height)) {
            beams.push(current);
        }
    }
}

int part1(char grid[128][128], int width, int height) {
    Beam initial = { .x = 0, .y = 0, .heading = EAST, .energizedTileCount = 0 };

    processGrid(initial, grid, width, height);

    int sum = 0;

    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            if (isSet(grid[i][j], ENERGIZED)) {
                sum++;
                printf("#");
            } else {
                printf(".");
            }
        }

        printf("\n");
    }

    return sum;
}

int part2(char grid[128][128], int width, int height) {
    Beam initial = { .x = 0, .y = 0, .heading = NORTH, .energizedTileCount = 0 };

    int count = 0;

    initial.heading = EAST;
    for (int i = 0; i < height; i++) {
        initial.y = i;
        processGrid(initial, grid, width, height);
        count = max(count, countEnergized(grid, width, height));
    }

    initial.heading = WEST;
    initial.x = width - 1;
    for (int i = 0; i < height; i++) {
        initial.y = i;
        processGrid(initial, grid, width, height);
        count = max(count, countEnergized(grid, width, height));
    }

    initial.heading = SOUTH;
    initial.y = 0;
    for (int j = 0; j < width; j++) {
        initial.x = j;
        processGrid(initial, grid, width, height);
        count = max(count, countEnergized(grid, width, height));
    }

    initial.heading = NORTH;
    initial.y = height - 1;
    for (int j = 0; j < width; j++) {
        initial.x = j;
        processGrid(initial, grid, width, height);
        count = max(count, countEnergized(grid, width, height));
    }

    return count;
}

int main(int argc, char *argv[]) {
    char *line = new char[128];
    size_t size;
    int read = 0;

    char grid[128][128];
    int w = 0;
    int h = 0;

    int sum = 0;

    if (argc < 2) {
        printf("Missing part argument!\n");
        return 1;
    }

    while (read != -1) {
        read = getline(&line, &size, stdin);

        int len;

        if (read != -1)
            len = strlen(line);

        if (read == -1 || len == 1) {
            if (strcmp(argv[1], "1") == 0) {
                sum = part1(grid, w, h);
            }

            if (strcmp(argv[1], "2") == 0) {
                sum = part2(grid, w, h);
            }

            // reset width and height for next iteration
            w = 0;
            h = 0;
        } else if (len > 1) {
            w = len - 1;
            /* memcpy(grid[h++], line, len); */
            for (int j = 0; j < w; j++) {
                switch (line[j]) {
                    case '/':
                        grid[h][j] = FORWARD_REFLECTOR;
                        break;
                    case '\\':
                        grid[h][j] = BACK_REFLECTOR;
                        break;
                    case '-':
                        grid[h][j] = HORI_SPLITTER;
                        break;
                    case '|':
                        grid[h][j] = VERT_SPLITTER;
                        break;
                    case '.':
                        grid[h][j] = EMPTY;
                        break;
                }
            }

            h++;

            printf("copied %i bytes to grid\n", w);
        }
    }

    printf("Result %d\n", sum);

    delete[] line;
    return 0;
}
