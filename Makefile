all: dist/puzzle13p1 dist/puzzle13p2 dist/puzzle14 dist/puzzle15 dist/puzzle16 dist/puzzle17 dist/puzzle21

dist/puzzle13p1: src/cpp/puzzle13p1.cc
	gcc src/cpp/puzzle13p1.cc -o dist/puzzle13p1

dist/puzzle13p2: src/cpp/puzzle13p2.cc
	gcc src/cpp/puzzle13p2.cc -o dist/puzzle13p2

dist/puzzle14: src/cpp/puzzle14.cc
	g++ src/cpp/puzzle14.cc -o dist/puzzle14

dist/puzzle15: src/cpp/puzzle15.cc
	g++ src/cpp/puzzle15.cc -o dist/puzzle15

dist/puzzle16: src/cpp/puzzle16.cc
	g++ src/cpp/puzzle16.cc -o dist/puzzle16

dist/puzzle17: src/cpp/puzzle17.cc
	g++ src/cpp/puzzle17.cc -o dist/puzzle17

dist/puzzle21: src/cpp/puzzle21.cc
	g++ src/cpp/puzzle21.cc -o dist/puzzle21
