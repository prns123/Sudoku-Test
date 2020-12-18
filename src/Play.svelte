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
		[8,3,5,4,1,6,9,2,7],
		[2,9,6,8,5,7,4,3,1],
		[4,1,7,2,9,3,6,5,8],
		[5,6,9,1,3,4,7,8,2],
		[1,2,3,6,7,8,5,4,9],
		[7,2,8,5,2,9,1,6,3],
		[6,5,2,7,8,1,3,9,4],
		[9,8,1,3,4,5,2,7,6],
		[3,7,4,9,6,2,8,1,5]
	  ]
	  
	  let solvedBoard = [
		[8,3,5,4,1,6,9,2,7],
		[2,9,6,8,5,7,4,3,1],
		[4,1,7,2,9,3,6,5,8],
		[5,6,9,1,3,4,7,8,2],
		[1,2,3,6,7,8,5,4,9],
		[7,4,8,5,2,9,1,6,3],
		[6,5,2,7,8,1,3,9,4],
		[9,8,1,3,4,5,2,7,6],
		[3,7,4,9,6,2,8,1,5]
	  ]

  var stack = new Stack();



 
  export let newGeneratedBoard;
  export let active;
	export let onClose;

	$: boards = copyArray(newGeneratedBoard.board)
  	$: solvedBoard = copyArray(newGeneratedBoard.solvedBoard)

	let playState = {
		running : true,
		time : [0,0],
		notStarted: true,
		hints: 3,
	}


	function startTimer() {
		setInterval(function() {

			if (playState.running == true) {
				playState.time[1] = playState.time[1] + 1
				if (playState.time[1] == 60)  {
					playState.time[0] = playState.time[0] + 1;
					playState.time[1] = 0
				}
			}
			
		}, 1000)
	}



	function copyArray(array) {
		return array;
	}
	

	  


	  function useHint() {
		  if (playState.hints > 0) {
			for (var x = 0; x < boards.length; x++) {
			  for (var y = 0; y < boards.length; y++) {
				  if (boards[x][y] == "") {
					  console.log(x,y)
					  boards[x][y] = solvedBoard[x][y];
					  notEditable[x][y] = true;
					  playState.hints = playState.hints - 1
					  return;
				  }
			  }
		  }
		  }
	  }
		
	

		function undo() {
			if (stack.isEmpty() == false) {
				var holder = stack.pop();
			    boards[holder.y][holder.x] = holder.val;
			} else {
				alert("no more undo")
			}
			

		}


		let notEditable = [];
		set()

		function set() {
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
		

		function checkWin(val, position) {



			if (val != null) {
				stack.push({val: val, x : position.x, y: position.y})
			stack.myStatus()
			}
		

			if (match()) {
				playState.running = false;
				alert(playState.time)
			}
		}


		function match() {

			for (var x = 0; x < boards.length; x++) {
				for (var y = 0; y < boards.length; y++) {
					if (boards[x][y] != solvedBoard[x][y]) {
						return false;
					}
				}
			}
			
		  return true;
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
	}
	
	input[type="text"][disabled] {
   		background-color: red;
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
		{playState.time[0]} : {playState.time[1]}
		</b>
	</h3>
	
	<br />
	
		<div class="board">
				{#each boards as board, y}
				<div class = "row">
					{#each board as cell, x}
					<input type="text" bind:value = {boards[y][x]} disabled = {notEditable[y][x]} on:input = {(val) => {checkWin(val.data, {x: x, y: y})}} />
					{/each}
				</div>
				{/each}
		</div>
	
	<br />
	
	<div class="buttons">
		<Button on:click = {undo}>
			Undo
		</Button>
		<Button on:click = {useHint}>
			Hint
		</Button>
	<b class="hints">Hints: {playState.hints}</b>
	</div>
			<div class="footer">

				<Button class="red-text" on:click={onClose} text ripple = "none">Exit</Button>

				</div>

	</div>
</Dialog>
