#include <cstdio>
#include <cstring>
#include <queue>

#define GRID_SIZE 256

struct Node {
    int distance;
    char tile;
};

struct Position {
    int x;
    int y;
    int depth;
};

enum Directions { N, W, S, E };

Position findStart(Node grid[][GRID_SIZE], int width, int height) {
    Position start = { .x = -1, .y = -1, .depth = -1 };

    for (int i = 0; i < height; i++) {
        for (int j = 0; j < height; j++) {
            if (grid[i][j].tile == 'S') {
                start.x = j;
                start.y = i;
                start.depth = 0;
                return start;
            }
        }
    }

    return start;
}

bool findAdjacent(Position p, Position &p2, Directions d, Node grid[][GRID_SIZE], int width, int height) {
    p2 = p;
    p2.depth++;

    switch (d) {
        case N:
            p2.y--;
            break;
        case W:
            p2.x--;
            break;
        case S:
            p2.y++;
            break;
        case E:
            p2.x++;
            break;
    }

    return p2.x >= 0 && p2.x < width && p2.y >= 0 && p2.y < height && grid[p2.y][p2.x].tile != '#';
}

// NOT 3721, too low
// this was an off by one. i forgot to count the start tile.
// real answer is 3722

int part1(Node grid[][GRID_SIZE], int width, int height) {
    Position start = findStart(grid, width, height);

    std::queue<Position> positions;

    positions.push(start);

    while (!positions.empty()) {
        Position top = positions.front();
        positions.pop();

        if (grid[top.y][top.x].distance < 0 || top.depth < grid[top.y][top.x].distance) {
            grid[top.y][top.x].distance = top.depth;

            Position n, w, s, e;
            if (findAdjacent(top, n, N, grid, width, height)) {
                positions.push(n);
            }

            if (findAdjacent(top, w, W, grid, width, height)) {
                positions.push(w);
            }

            if (findAdjacent(top, s, S, grid, width, height)) {
                positions.push(s);
            }

            if (findAdjacent(top, e, E, grid, width, height)) {
                positions.push(e);
            }
        }
    }

    int sum = 0;

    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            if ((grid[i][j].tile == '.' || grid[i][j].tile == 'S') && grid[i][j].distance <= 64) {
                if ((grid[i][j].distance & 1) == 0) {
                    sum++;
                    /* printf("O"); */
                } else {
                    /* printf("."); */
                }
            } else {
                /* printf("%c", grid[i][j].tile); */
            }
        }
        /* printf("\n"); */
    }
    /* printf("\n"); */

    return sum;
}

int part2(Node grid[][GRID_SIZE], int width, int height) {
    Position start = findStart(grid, width, height);

    std::queue<Position> positions;

    positions.push(start);

    while (!positions.empty()) {
        Position top = positions.front();
        positions.pop();

        if (grid[top.y][top.x].distance < 0 || top.depth < grid[top.y][top.x].distance) {
            grid[top.y][top.x].distance = top.depth;

            Position n, w, s, e;
            if (findAdjacent(top, n, N, grid, width, height)) {
                positions.push(n);
            }

            if (findAdjacent(top, w, W, grid, width, height)) {
                positions.push(w);
            }

            if (findAdjacent(top, s, S, grid, width, height)) {
                positions.push(s);
            }

            if (findAdjacent(top, e, E, grid, width, height)) {
                positions.push(e);
            }
        }
    }

    int sum = 0;

    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            if ((grid[i][j].tile == '.' || grid[i][j].tile == 'S') && grid[i][j].distance <= 64) {
                if ((grid[i][j].distance & 1) == 0) {
                    sum++;
                    printf("O");
                } else {
                    printf(".");
                }
            } else {
                printf("%c", grid[i][j].tile);
            }
        }
        printf("\n");
    }
    printf("\n");

    return sum;
}

int main(int argc, char *argv[]) {
    char *line = new char[256];
    size_t size;
    int read = 0;

    Node grid[GRID_SIZE][GRID_SIZE];
    int w = 0;
    int h = 0;

    int sum = 0;

    if (argc < 2) {
        printf("Missing part argument!\n");
        return 0;
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
            for (int j = 0; j < w; j++) {
                grid[h][j] = { .distance = -1, .tile = line[j] };
            }

            h++;

            printf("copied %i bytes to grid\n", w);
        }
    }

    printf("Result %d\n", sum);

    delete[] line;
    return 0;
}

