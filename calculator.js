process.stdin.resume();
process.stdin.setEncoding('utf8');

var data;

var ops = {
  '+': function(a, b) { return a + b; },
  '-': function(a, b) { return a - b; },
  '*': function(a, b) { return a * b; },
  '/': function(a, b) { return a / b; },
  '%': function(a, b) { return a % b; }
};

process.stdin.on('data', function(chunk) {
  data = chunk.split('\n');
});

process.stdin.on('end', function() {
  data.forEach(function(val) {
    if (val !== '') {
      val = val.split(' ');
      console.log(Math.floor(ops[val[0]](parseInt(val[1]),parseInt(val[2]))));
    }
  });
});