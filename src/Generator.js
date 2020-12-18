
export default function Generate(amountToRemove) {



var board = [
  [1,0,0,0,0,0,0,0,0],
  [0,5,0,0,0,0,0,0,0],
  [0,0,3,0,0,0,0,0,0],
  [0,0,0,6,0,0,0,0,0],
  [0,0,0,0,2,0,0,0,0],
  [0,0,0,0,0,9,0,0,0],
  [0,0,0,0,0,0,3,0,0],
  [0,0,0,0,0,0,0,6,0],
  [0,0,0,0,0,0,0,0,1]
];


var solvedBoard = [
 [0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0]
];


var amount = 0;


solve();
match(1);
remove(amountToRemove);
solve();
return {board: solvedBoard, solvedBoard: board};
  




function possible(y, x, n) {
 //checking x axis
 for (var i = 0; i < 9; i++) {
   if (board[y][i] == n) {
     return false;
   }
 }
 //checking y axis
 for (var i = 0; i < 9; i++) {
   if (board[i][x] == n) {
     return false;
   }
 }
 //checking grids
 for (var i = 0; i < 3; i++) {
   for (var j = 0; j < 3; j++) {
     if (board[Math.floor(y / 3) * 3 + i][Math.floor(x / 3) * 3 + j] == n) {
       return false;
     }
   }
 }

 return true;
}

function solve() {
 for (var y = 0; y < 9; y++) {
   for (var x = 0; x < 9; x++) {
     if (board[y][x] == 0) {
       for (var n = 1; n < 10; n++) {
         if (possible(y, x, n)) {
           board[y][x] = n;
           solve();
           if (amount < 2) {
             board[y][x] = 0;
           }
         }
       }
     return;
     }
   }
 }
 amount = amount + 1
}




function remove(a) {

 var removed = 0;
 match(2);

 while (removed < a) {

   var x = Math.floor(Math.random() * 9); 
   var y = Math.floor(Math.random() * 9);
   

   if (solvedBoard[y][x] != 0) {
     var holder = solvedBoard[y][x]
     match(2);
     amount = 0;
     solve();
     if (amount == 1) {
       solvedBoard[y][x] = 0;
       match(2);
       removed = removed + 1;
     } else {
       solvedBoard[y][x] = holder;
       match(2);
     }

   }

 }

}


function match(task) {
// console.log(solvedBoard)
// prompt("go")
   for (var i = 0; i < 9; i++) {
     for (var j = 0; j < 9; j++) {
       if (task == 1) {
         solvedBoard[i][j] = board[i][j]
       } else if (task == 2) {
         board[i][j] = solvedBoard[i][j]
       }
       
     }
   }
}


}