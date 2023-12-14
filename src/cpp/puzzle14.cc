#include <cstdio>
#include <cstring>

int part1(char grid[128][128], int width, int height) {
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

    int sum = 0;

    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            if (grid[i][j] == 'O') sum += height - i;
        }
    }

    return sum;
}

// unfinished
int part2(char grid[128][128], int width, int height) {
    // loop through grid

    int sum = 0;

    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            if (grid[i][j] == 'O') sum += height - i;
        }
    }

    return sum;
}

int main(int argc, char *argv[]) {
    char *line;
    size_t size;
    int read = 0;

    char grid[128][128];
    int w = 0;
    int h = 0;

    int sum = 0;

    if (argc < 1) {
        printf("Missing part argument!\n");
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

    return 0;
}
