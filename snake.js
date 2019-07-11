class Body {
  constructor(data, next = null) {
      this.data = data,
      this.next = next;
  }
}

class Snake {
  constructor() {
      this.head = null;
  }
}

var isEquivalent = function (a, b) {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  if (aProps.length != bProps.length) {
      return false;
  }

  for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];

      if (a[propName] !== b[propName]) {
          return false;
      }
  }

  return true;
};

var data, head, test_data, location, snake, direction, insert, result, command;

Snake.prototype.updateBody = function (data, insert) {
  var newBody = new Body(data);
  
  if (!this.head) {
      this.head = newBody;
      return true;
  }

  var tail = this.head;
  var tmp1 = data;
  var tmp2;
  
  while (tail.next !== null) {
    if (isEquivalent(tail.data, data)) {
      return false;
    }

    tmp2 = tail.data;
    tail.data = tmp1;
    tmp1 = tmp2;
    tail = tail.next;
  }

  tmp2 = tail.data;
  tail.data = tmp1;

  if (insert) {
    tail.next = new Body(tmp2);
  }

  return true;
};



process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
    data = chunk.split('\n');
});

process.stdin.on('end', function() {
  head = data.splice(0,1)[0];

  for (var i = 0; i < head; i++) {
    test_data = data[i].split(' ');
    location = { x: 0, y: 0 };
    snake = new Snake();
    direction = 'up';
    insert = true;
    result = -1;
    snake.updateBody(location, insert);

    for (var j = 0; j < test_data[0]; j++) {
      command = test_data[1][j];
      location = Object.assign({}, location);
      insert = false;

      switch (direction + '_' + command) {
        case 'up_E':
          insert = true;
        case 'up_F':
          location.x = location.x;
          location.y = location.y + 1;
          break;
        case 'up_L':
          location.x = location.x - 1;
          location.y = location.y;
          direction = 'left';
          break;
        case 'up_R':
          location.x = location.x + 1;
          location.y = location.y;
          direction = 'right';
          break;
        case 'left_E':
          insert = true;
        case 'left_F':
          location.x = location.x - 1;
          location.y = location.y;
          break;
        case 'left_L':
          location.x = location.x;
          location.y = location.y - 1;
          direction = 'down';
          break;
        case 'left_R':
          location.x = location.x;
          location.y = location.y + 1;
          direction = 'up';
          break;
        case 'down_E':
          insert = true;
        case 'down_F':
          location.x = location.x;
          location.y = location.y - 1;
          break;
        case 'down_L':
          location.x = location.x + 1;
          location.y = location.y;
          direction = 'right';
          break;
        case 'down_R':
          location.x = location.x - 1;
          location.y = location.y;
          direction = 'left';
          break;
        case 'right_E':
          insert = true;
        case 'right_F':
          location.x = location.x + 1;
          location.y = location.y;
          break;
        case 'right_L':
          location.x = location.x;
          location.y = location.y + 1;
          direction = 'up';
          break;
        case 'right_R':
          location.x = location.x;
          location.y = location.y - 1;
          direction = 'down';
          break;
      }

      if (!snake.updateBody(location, insert)) {
        result = j + 1;
        break;
      }
    }

    console.log(result === -1 ? 'YES' : result);
  }
});