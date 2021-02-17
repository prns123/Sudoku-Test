<script>
  import {
    Button,
    Dialog,
    Card,
    CardText,
	CardActions,
	CardTitle,
	Overlay,
		Footer,
		AppBar
  } from 'svelte-materialify';


  import Stack from './Stack.js';


	let boards = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 0, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 0, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 0],
	]
	  
	let solvedBoard = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
	]


	let bgColours = [
		["#ffffcc", "#ffffcc", "#ffffcc", "#ffff99", "#ffff99", "#ffff99", "#ffffcc", "#ffffcc", "#ffffcc"],
		["#ffffcc", "#ffffcc", "#ffffcc", "#ffff99", "#ffff99", "#ffff99", "#ffffcc", "#ffffcc", "#ffffcc"],
		["#ffffcc", "#ffffcc", "#ffffcc", "#ffff99", "#ffff99", "#ffff99", "#ffffcc", "#ffffcc", "#ffffcc"],
		["#ffff99", "#ffff99", "#ffff99", "#ffffcc", "#ffffcc", "#ffffcc", "#ffff99", "#ffff99", "#ffff99"],
		["#ffff99", "#ffff99", "#ffff99", "#ffffcc", "#ffffcc", "#ffffcc", "#ffff99", "#ffff99", "#ffff99"],
		["#ffff99", "#ffff99", "#ffff99", "#ffffcc", "#ffffcc", "#ffffcc", "#ffff99", "#ffff99", "#ffff99"],
		["#ffffcc", "#ffffcc", "#ffffcc", "#ffff99", "#ffff99", "#ffff99", "#ffffcc", "#ffffcc", "#ffffcc"],
		["#ffffcc", "#ffffcc", "#ffffcc", "#ffff99", "#ffff99", "#ffff99", "#ffffcc", "#ffffcc", "#ffffcc"],
		["#ffffcc", "#ffffcc", "#ffffcc", "#ffff99", "#ffff99", "#ffff99", "#ffffcc", "#ffffcc", "#ffffcc"],
	]



var stack = new Stack();


function undo() {
	if (stack.isEmpty() == false) { //validation to make sure can't undo if stack is empty
		var holder = stack.pop(); //takes last value move from stack and holds the value of the move and the position
		boards[holder.y][holder.x] = holder.val; //"carry out the move"
		console.log(boards)
	} else { 
		alert("no moves to undo")
	}
}

export let amountBlankCells;
  export let active;
	export let onClose;
	export let newGeneratedBoard;




	let playState = {
		running : true,
		time : [0,0],
		timeUI : ["00","00"],
		notStarted: true,
		hints: 3,
	}


	function startTimer() {
		setInterval(function() {

			if (playState.running == true) { //allows for the timer to be stopped by changing the value to false
				playState.time[1] = playState.time[1] + 1 //increments the second counter by 1
				if (playState.time[1] == 60)  {	//increments minute counter when second couter is 60
					playState.time[0] = playState.time[0] + 1;
					playState.time[1] = 0 //sets sencond counter back to 0
				}
			}

			if (playState.time[1] < 10) { //checks whether leading zero needs to be added
				playState.timeUI[1] = "0" + playState.time[1].toString() //adds leading zero
			} else {
				playState.timeUI[1] = playState.time[1].toString() //doesn't add leading zero if already two digits
			}

			if (playState.time[0] < 10) { //checks whether leading zero needs to be added
				playState.timeUI[0] = "0" + playState.time[0].toString() //adds leading zero
			} else {
				playState.timeUI[0] = playState.time[0].toString() //doesn't add leading zero if already two digits
			}
			
		}, 1000) //called the function every second
	}



	function useHint() {

		var emptyCells = [] //array to hold the indexes of all empty cells
		  if (playState.hints > 0) { //validation so the user can only use hints when they are avalible
			for (var x = 0; x < boards.length; x++) { //loops through boards array
			  for (var y = 0; y < boards.length; y++) {
				  if (boards[x][y] == "") { //checks to find blank cell
					 emptyCells.push({x: x, y: y}) //adds current index to array
				  }
			  }
		  }
		  } else {
			alert("no hints avalible")
		  }

		var random = Math.floor(Math.random() * emptyCells.length);    //radnom integer between 0 and the length of the emptyCells array
		var x = emptyCells[random].x; //gets index of the random empty cell
		var y = emptyCells[random].y;
		boards[x][y] = solvedBoard[x][y]; //sets the value of that cell to the correct value
		notEditable[x][y] = true; //makes so the user can no longer edit that cell
		playState.hints = playState.hints - 1 //decrements hint counter UI
		checkWin("","");
	  }


	function checkWin(val, position) {

		if (val != "") { //makes sure deleting a number from a cell doesn't count as a move

			stack.push({val: val, x: position.x, y: position.y}) //pushed the last move to the stack, allowing for undoing

		}

		for (var x = 0; x < boards.length; x++) {
				for (var y = 0; y < boards.length; y++) {
					if (boards[x][y] != solvedBoard[x][y]) {
						return false; //if one of the cells don't match then it returns, no need to loop through the rest
					}
				}
			}
			
		alert("complete") //if it gets to this point in the function every cell must have matched
		playState.running = false;


		//stats system

		var amountSudoku = localStorage.getItem("amount");
		var sudokuLevel = 0;

		//works out the level of sudoku based on amount of blanks
		if (amountBlankCells <= 15) {
			sudokuLevel = 1;
		} else if (amountBlankCells <= 30) {
			sudokuLevel = 2;
		} else {
			sudokuLevel = 3;
		}


		if (amountSudoku == null || amountSudoku == "NaN") { //runs if nothing has been stored in localStorage
			localStorage.setItem("amount", "0")
			amountSudoku = 0;
		}
			var toSet = parseInt(amountSudoku) + 1; //incrementes key by one so doesn't override any data
			localStorage.setItem("amount", toSet) //updates amount with new amount so no data is overriden next time
			localStorage.setItem(`${toSet}`, JSON.stringify([playState.time, sudokuLevel])); //stores time and level in localStorage

	}

	


		let notEditable = [];
		set()

		function set() {
			
			//updates to match generated board
			for (var x = 0; x < 9; x++) {
				for (var y = 0; y < 9; y++) {
					boards[x][y] = newGeneratedBoard.solvedBoard[x][y]
					solvedBoard[x][y] = newGeneratedBoard.board[x][y]
				}
			}		


			for (var x = 0; x < boards.length; x++) {
				for (var y = 0; y < boards.length; y++) {
					if (boards[x][y] == 0) {
						boards[x][y] = ""
					}
				}
			}

			notEditable = [];
			for (var i = 0; i < boards.length; i++) {
				var holder = [];
					for (var t = 0; t < boards[i].length; t++) {
						if (boards[i][t] == "") {
							holder.push(false)
						} else {
							holder.push(true)
						}
				}
			notEditable.push(holder)
			}
		}
		


		function refresh() {
			playState.time[0] = 0; //resets timer
			playState.time[1] = 0;
			playState.timeUI[0] = "00";
			playState.timeUI[1] = "00";
			playState.hints = 3; //resets hints
			playState.running = true;
			set() //resets board
			stack.reset() //resets undo
		}
	
	
</script>

<style>
		input {
		width: 35px;
		height : 35px;
		border-style : solid;
		border-width : 2px;
		border-color : black;
		margin : 0px;
		font-weight: bold;
		color : black;
	}
	
	input[type="text"][disabled] {
   		background-color: red;
		   color : black;
	}
	
	.container {
		margin : 20px;
		display : flex;
		justify-content: center;
		flex-direction : column;
	}
	
	.footer {
		position: absolute;
		bottom : 0;
	}
	
	.board, .buttons, .timer {
		margin: 0 auto;
	} 
	
	.hints {
		margin-left : 10px;
		font-size : 20px;
	}
	
	
	
	@media screen and (min-width: 550px) {
		input { 
		width: 50px;
		height : 50px;
		border-style : solid;
		border-width : 2px;
		border-color : black;
		margin : 0px;
		font-weight: bold;
	}
}
</style>


	

<Dialog fullscreen bind:active>

	<AppBar>
			<span slot="title">Play</span>
	</AppBar>
	
<Overlay absolute opacity={1} active = {playState.notStarted}>
	<Dialog persistent bind:active = {playState.notStarted}>
		<Card>
			<CardTitle>Ready?</CardTitle>
			<CardText>
			  Timer will start when you press go!!
			</CardText>
			<CardActions>
			  <Button on:click={() => {set(), playState.notStarted = false, startTimer()}} text class="red-text">Go</Button>
			</CardActions>
		  </Card>
	</Dialog>
</Overlay>

<div class="container">
	
	<h3 class="timer">
		<b>
		{playState.timeUI[0]} : {playState.timeUI[1]}
		</b>
	</h3>
	
	<br />
	
		<div class="board">
				{#each boards as board, y}
				<div class = "row">
					{#each board as cell, x}
					<input type="text" bind:value = {boards[y][x]} disabled = {notEditable[y][x]} on:input = {(val) => {checkWin(boards[y][x], {x: x, y:y})}} style = {`background-color : ${bgColours[y][x]}`}/>
					{/each}
				</div>
				{/each}
		</div>
	
	<br />
	
	<div class="buttons">
		<Button on:click = {() => {refresh()}}>Refresh</Button>
		<Button on:click = {() => {undo()}}>
			Undo
		</Button>
		<Button on:click = {() => {useHint()}}>
			Hint
		</Button>
	<b class="hints">Hints: {playState.hints}</b>
	</div>
			<div class="footer">

				<Button class="red-text" on:click={onClose} text ripple = "none">Exit</Button>

				</div>

	</div>
</Dialog>
