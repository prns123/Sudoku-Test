<div style={"color : " + settings.accentColour.toLowerCase() + ";"} class = "fill">
	
<div class = "stat">
	<h4><b>Level 1</b></h4>
	<center>
	<p>
		<b class="amountSolved">
			{uiInfo.one[0]}
		</b>
		<br>
		<b class="avgTime">
			{uiInfo.one[1]}
		</b>
	</p>
	</center>
</div>

<div class = "stat">
	<h4><b>Level 2</b></h4>
<center>
	<p>
		<b class="amountSolved">
			{uiInfo.two[0]}
		</b>
		<br>
		<b class="avgTime">
			{uiInfo.two[1]}
		</b>
	</p>
</center>
</div>

<div class = "stat">
	<h4><b>Level 3</b></h4>
<center>
	<p>
		<b class="amountSolved">
			{uiInfo.three[0]}
		</b>
		<br>
		<b class="avgTime">
			{uiInfo.three[1]}
		</b>
	</p>
</center>
</div>


<Button on:click = {() => {refreshStats()}}>Refresh</Button>

	
</div>


<script>
	import { Divider, Button } from 'svelte-materialify';
	export let settings;

	

	//object to hold what UI displayed
	var uiInfo = {
		one: ["0", "00:00"],
		two: ["0", "00:00"],
		three: ["0", "00:00"], 
	}


	refreshStats()

	//refresh button 
	function refreshStats() {
		var lvl1 = [];
		var lvl2 = [];
		var lvl3 = [];

		for (var x = 1; x < parseInt(localStorage.getItem("amount")) + 1; x++) { //loops through all data stored in local storage
			var data = JSON.parse(localStorage.getItem(x)); //converts data from string form to array form
			if (data[1] == 1) { //sorts data into correct levels
				lvl1.push(toSeconds(data[0])); //converts data to seconds and pushes to array
			} else if (data[1] == 2) {
				lvl2.push(toSeconds(data[0]));
			} else if (data[1] == 3) {
				lvl3.push(toSeconds(data[0]));
			} else { //validation incase any errors occured
				alert("an error has occured");
			}
			
		}

		//updates UI
		uiInfo.one[0] = "amount solved: " + lvl1.length.toString();
		uiInfo.two[0] = "amount solved: " + lvl2.length.toString();
		uiInfo.three[0] = "amount solved: " + lvl3.length.toString();
		var holder = toMinutes(average(lvl1)); //gets the average of values stored in the lvl arrays and converts into minutes and seconds form
		uiInfo.one[1] =  "average time: " + holder[0] + " minutes and " + holder[1] + " seconds";
		var holder = toMinutes(average(lvl2)); //gets the average of values stored in the lvl arrays and converts into minutes and seconds form
		uiInfo.two[1] =  "average time: " + holder[0] + " minutes and " + holder[1] + " seconds";
		var holder = toMinutes(average(lvl3)); //gets the average of values stored in the lvl arrays and converts into minutes and seconds form
		uiInfo.three[1] =  "average time: " + holder[0] + " minutes and " + holder[1] + " seconds";

	}

	//minutes to seconds
	function toSeconds(data) {
		return (data[0] * 60) + data[1];
	}

	//seconts to minutes
	function toMinutes(data) {
		var minutes = Math.floor(data/60);
		var seconds = data - minutes * 60;
		return [minutes, seconds] //return array containing minutes and seconds
	}

	//average
	function average(data) {
		if (data.length != 0) { //makes sure the array isn't empty
			return Math.round(data.reduce((a, b) => (a + b)) / data.length); //return average of values in passed array
		}
		return 0
	}

console.log(localStorage)
</script>


<style>
	.stat {
		width : 100%;
		border-style : solid;
		border-width : 1px;
		border-radius : 5px;
		margin-top : 10px;
		padding : 20px;
		display: flex;
		align-items: center;
		flex-direction : column;
		justify-content : center;
		flex : 1;
	}
	
	p {
		font-size : 20px;
	}
	
	.fill {
		display: flex;
		flex: 1;
		flex-direction: column;
	}
	
	h4 {
		color : black;
	}

	.amountSolved {
		color : black;
	}

	.avgTime {
		color : black;
	}

</style>

