all: dist/puzzle13p1 dist/puzzle13p2 dist/puzzle14

dist/puzzle13p1: src/cpp/puzzle13p1.cc
	gcc src/cpp/puzzle13p1.cc -o dist/puzzle13p1

dist/puzzle13p2: src/cpp/puzzle13p2.cc
	gcc src/cpp/puzzle13p2.cc -o dist/puzzle13p2

dist/puzzle14: src/cpp/puzzle14.cc
	g++ src/cpp/puzzle14.cc -o dist/puzzle14
