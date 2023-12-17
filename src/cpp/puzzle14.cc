#include <cstdio>
#include <cstring>

#define GRID_SIZE 128
#define PATTERN_SIZE 256
#define PART_2_TARGET_ITERATION 1000000000

void printGrid(char grid[GRID_SIZE][GRID_SIZE], int width, int height) {
    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            printf("%c", grid[i][j]);
        }
        printf("\n");
    }

    printf("\n");
}

void spinNorth(char grid[GRID_SIZE][GRID_SIZE], int width, int height) {
    // loop through grid
    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            // when find a rock that can fall
            // check if previous row is in bounds and empty
            // if so, make it fall and continue until oob or not empty
            if (grid[i][j] == 'O') {
                int prevHeight = i - 1;
                int currHeight = i;

                while (prevHeight >= 0 && grid[prevHeight][j] == '.') {
                    grid[currHeight][j] = '.';
                    grid[prevHeight][j] = 'O';

                    currHeight--;
                    prevHeight--;
                }
            }
        }
    }
}

void spinWest(char grid[GRID_SIZE][GRID_SIZE], int width, int height) {
    // loop through grid
    for (int j = 0; j < width; j++) {
        for (int i = 0; i < height; i++) {
            // when find a rock that can fall
            // check if previous row is in bounds and empty
            // if so, make it fall and continue until oob or not empty
            if (grid[i][j] == 'O') {
                int prevWidth = j - 1;
                int currWidth = j;

                while (prevWidth >= 0 && grid[i][prevWidth] == '.') {
                    grid[i][currWidth] = '.';
                    grid[i][prevWidth] = 'O';

                    currWidth--;
                    prevWidth--;
                }
            }

            /* printGrid(grid, width, height); */
        }
    }
}

void spinSouth(char grid[GRID_SIZE][GRID_SIZE], int width, int height) {
    // loop through grid
    for (int i = height - 1; i >= 0; i--) {
        for (int j = 0; j < width; j++) {
            // when find a rock that can fall
            // check if previous row is in bounds and empty
            // if so, make it fall and continue until oob or not empty
            if (grid[i][j] == 'O') {
                int currHeight = i;
                int nextHeight = i + 1;

                while (nextHeight < height && grid[nextHeight][j] == '.') {
                    grid[currHeight][j] = '.';
                    grid[nextHeight][j] = 'O';

                    currHeight++;
                    nextHeight++;
                }
            }
        }
    }
}

void spinEast(char grid[GRID_SIZE][GRID_SIZE], int width, int height) {
    // loop through grid
    for (int j = width - 1; j >= 0; j--) {
        for (int i = 0; i < height; i++) {
            // when find a rock that can fall
            // check if previous row is in bounds and empty
            // if so, make it fall and continue until oob or not empty
            if (grid[i][j] == 'O') {
                int currWidth = j;
                int nextWidth = j + 1;

                while (nextWidth < width && grid[i][nextWidth] == '.') {
                    grid[i][currWidth] = '.';
                    grid[i][nextWidth] = 'O';

                    currWidth++;
                    nextWidth++;
                }
            }
        }
    }
}

int part1(char grid[GRID_SIZE][GRID_SIZE], int width, int height) {
    // loop through grid
    spinNorth(grid, width, height);

    int sum = 0;

    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            if (grid[i][j] == 'O') sum += height - i;
        }
    }

    return sum;
}

void findPattern(int array[], int size, int &patternStart, int &patternLength) {
    // loop through pattern
    for (int i = 0; i < size; i++) {
        // pattern lengths
        // start at 2 to avoid getting false patterns of length 1
        for (int j = 2; j < size - i; j++) {
            // if array starting at i for j elements
            // is equal to array starting at i + j for j elements
            if (memcmp(array + i, array + i + j, j * sizeof(*array)) == 0) {
                printf("Found pattern starting at %d with length %d\n", i, j);
                /* for (int s = 0; s < j; s++) { */
                /*     printf("%d %d\n", array[i + s], array[i + j + s]); */
                /* } */

                patternStart = i;
                patternLength = j;
                return;
            }
        }
    }

}

// NOT 101097, TOO LOW
// NOT 108203, TOO LOW

int part2(char grid[GRID_SIZE][GRID_SIZE], int width, int height) {
    // make sure it's initialized ;)
    int sums[PATTERN_SIZE] = { 0 };

    // loop through grid
    for (int c = 0; c < PATTERN_SIZE; c++) {
        spinNorth(grid, width, height);
        spinWest(grid, width, height);
        spinSouth(grid, width, height);
        spinEast(grid, width, height);

        for (int i = 0; i < height; i++) {
            for (int j = 0; j < width; j++) {
                if (grid[i][j] == 'O') sums[c] += height - i;
            }
        }

        /* printf("Finished cycle %d, sum: %d\n", c, sums[c]); */
    }

    int patternStart = 0;
    int patternLength = 0;
    findPattern(sums, PATTERN_SIZE, patternStart, patternLength);

    // -1 because it's zero indexed
    // (target - start) % length gets us the index, from the start
    return sums[(PART_2_TARGET_ITERATION - patternStart - 1) % patternLength + patternStart];
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
            memcpy(grid[h++], line, len);

            printf("copied %i bytes to grid\n", w);
        }
    }

    printf("Result %d\n", sum);

    delete[] line;
    return 0;
}
