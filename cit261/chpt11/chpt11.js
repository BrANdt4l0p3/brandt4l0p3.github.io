function* fibonacci(a,b) {
let [ prev,current ] = [ a,b ];
while(true) {
[prev, current] = [current, prev + current];
yield current;
}
}