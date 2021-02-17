



	<Card style = "margin-top : 10px; border-radius : 5px">
		<div on:click = {onClick}>
   <Select solo items = {colourOptions} placeholder = "Accent Colour"  bind:value = {settings.accentColour} /> 
			</div>
</Card>
	
	
	

<script>
		import {Switch, Select, Divider, Card} from "svelte-materialify";
		export let settings;
		export let onClick
	
		const colourOptions = [
				{name: "Blue", value: "Blue"}, 
				{name: "Green", value: "Green"},
				{name: "Orange", value: "Orange"},
				{name: "Red", value: "Red"},
		]
	
function check() {
	console.log("yeay")
}
</script>

<style>
	* {
		padding : 10px;
	}
	
</style>