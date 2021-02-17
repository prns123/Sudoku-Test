
export default function Generate(amountToRemove) {



  var board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
 ];
 
 
 var solvedBoard = [	 
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
 ];
 
 
 var startingIndexes = [
   [0,0],
   [1,4],
   [2,8],
   [3,7],
   [4,5],
   [5,1],
   [6,2],
   [7,3],
   [8,6],
 ]
 
 startingValues(startingIndexes)
 let amount = 0;
 solve();
 remove(amountToRemove);
 solve();
 
 function startingValues(startingIndexes) {
   for (var x = 0; x < startingIndexes.length; x++) { //loops through startingIndexes
       board[startingIndexes[x][0]][startingIndexes[x][1]] = Math.floor(Math.random() * 9) + 1; // returns a random integer from 1 to 9
   }
 }
 
 
 
 function possible(y, x, n) {
   //checking x axis
   for (var i = 0; i < 9; i++) { //loops through row to see if anymatches
     if (board[y][i] == n) {
       return false; //if matches then no it's not possible so return
     }
   }
   //checking y axis
   for (var i = 0; i < 9; i++) { //loops through collumn to see if anymatches
     if (board[i][x] == n) {
       return false; //if matches then no it's not possible so return
     }
   }
   //checking grids
   for (var i = 0; i < 3; i++) { //Loops through 3x3 section to see if any matches
     for (var j = 0; j < 3; j++) {
       if (board[Math.floor(y / 3) * 3 + i][Math.floor(x / 3) * 3 + j] == n) { //makes sure that starting point is top-left of 3x3 section
         return false; //if matches then no it's not possible so return
       }
     }
   }
 
   return true; //will only reach here if it's possible so returns true
 }
 
 
 
 function solve() {
   for (var y = 0; y < 9; y++) {
     for (var x = 0; x < 9; x++) {
       if (board[y][x] == 0) { //loops trough till empty space found
         for (var n = 1; n < 10; n++) {
           if (possible(y, x, n)) { //tried the numbers 1 to 9
             board[y][x] = n; //if possible to play number insert it into grid
             solve(); //recusively call solve 
             if (amount < 2) { //sudoku must have only one solution so if there are more than one solution then no need to carry on
               board[y][x] = 0; //will return here if reach a dead end so sets value to zero and tries again
             }
           }
         }
       return;
       }
       
     }
   }
 amount++ //when this point reached a solution has been found so increment amount of solutions
 }
 
 
 
 
 
 
 
 
 function remove(a) { //parameter a is the amount of cells to remove
 
   var removed = 0;
   match(2);
 
   while (removed < a) {
 
     var x = Math.floor(Math.random() * 9); 
     var y = Math.floor(Math.random() * 9);
     
 
     if (solvedBoard[y][x] != 0) {
       var holder = solvedBoard[y][x]
       match(1);
       board[y][x] = 0; //changes index y,x to 0 to see whether it works
       amount = 0; 
       solve(); //solve sudoku to see whether only one posible solution
       if (amount == 1) { //if only one possible solution we can make cell blank
         solvedBoard[y][x] = 0;
         match(1);
         removed = removed + 1;
       } else { //more than one possible solution so can't make cell blank
         solvedBoard[y][x] = holder; //replace value back into solvedBoard
         match(1);
       }
 
     }
 
   }
  }
 
 
 function match(mode) {
     for (var i = 0; i < 9; i++) {
       for (var j = 0; j < 9; j++) {
         if (mode == 1) { //copies the vaue of solvedBoard into Board
           board[i][j] = solvedBoard[i][j]
         } else {
           solvedBoard[i][j] = board[i][j] //copies value of board into solvedBoard
         }
       }
     }
 }
 




 return {solvedBoard: solvedBoard, board: board}
 




}



