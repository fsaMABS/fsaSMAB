let knightPosition = [0, 0];
let obamaPosition = [7,7];
let observer = null;


let allobamapositions = [
    [1,7, 1],
    [3,7, 2],
    [5,7,3],
    [7,7,4],
    [0,6,5],
    [2,6,6],
    [4,6,7],
    [6,6,8],
    [1,5,9],
    [3,5,10],
    [5,5,11],
    [7,5,12]
]

let allknightpositions = [
    [0,0,1],
    [2,0,2],
    [4,0,3],
    [6,0,4],
    [1,1,5],
    [3,1,6],
    [5,1,7],
    [7,1,8],
    [0,2,9],
    [2,2,10],
    [4,2,11],
    [6,2,12]
]
function emitChange() {
  observer(knightPosition, obamaPosition, allobamapositions, allknightpositions);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
}

// for (var i = 0; i <allknightpositions.length; i++) {
//     var eleArr2 = allknightpositions[i]
// }
// if ((Math.abs(x - toX) === 1) && (Math.abs(y - toY) === 1)) {
 
function check(arr) {
    
}

export function canMovePiece(toX, toY, id) {
    for (var i = 0; i < allknightpositions.length; i++) {
        var eleArr = allknightpositions[i];
        var innerId = eleArr[2];
        if (innerId === id) {
            var x = eleArr[0];
            var y = eleArr[1];
            if ((Math.abs(x - toX) === 2) && (Math.abs(y - toY) === 2)) {
                var otherX = (x - toX);
                var otherY = (y - toY);
                console.log('otherxotherY', otherX, otherY)
                function check(arr) {
                    if (arr[0] === otherX && arr[1] === otherY) {
                        return true;
                    } 
                    return false;
                }
                var thisOne = allknightpositions.find(check);
                console.log('this one', thisOne);
                return true;
            } else {
                return false
            }
        }
    }
}
export function moveKnight(toX, toY, id) {
  for (var i = 0; i < allknightpositions.length; i++) {
      var eleArr = allknightpositions[i];
      var innerId = eleArr[2];
      if (innerId === id) {
          allknightpositions[i] = [toX, toY, id];
      }
  }
  emitChange();
}

export function moveObama(toX, toY, id) {
    for (var i = 0; i < allobamapositions.length; i++) {
        var eleArr = allobamapositions[i];
        var innerId = eleArr[2];
        if (innerId === id) {
            allobamapositions[i] = [toX, toY, id];
        }
    }
    emitChange();
}