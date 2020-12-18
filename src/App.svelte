<script>
	import { MaterialApp, AppBar, Divider, Button, Tabs, Tab, Switch, CardTitle } from "svelte-materialify";
	import Settings from "./Settings.svelte"
	import Start from "./Start.svelte"
	import Stats from "./Stats.svelte"
	import Play from "./Play.svelte"
	import Generate from './Generator';
	
	let theme = "light"
	//let current = 0;
	let pages = ["Start", "Stats", "Settings"];
	
	function updateColour() {
		appState.settings.accentColour = appState.settings.accentColour;
		console.log("run")
	}
	
	let appState = {
		settings: {
			helper: false,
			accentColour : "Blue",
		},
		currentPage : 0,
		generatedBoard : Generate(3),
	}
	
	function check(val) {
		appState.currentPage = val;
	}
	
	function switchHelper(val) {
		appState.settings.helper = !appState.settings.helper
		console.log(appState.settings.helper)
	}
	
	let playActive = false;

	function start() {
		playActive = true;
	}
	
	function stop() {
		playActive = false;
	}

	function updateDifficulty(val) {
		createBoard(val);
	}
	


	function createBoard(difficulty) {
		appState.generatedBoard = Generate(difficulty);
		//console.log(appState.generatedBoard)
		appState.generatedBoard = appState.generatedBoard;
	}
	

</script>

<style>
	.nav {
		position : absolute;
		bottom: 0;
		width : 100%;
	}


	
</style>

<MaterialApp {theme}>
	<AppBar style="border-radius : 10px;">
		<span slot="title">{pages[appState.currentPage]}</span>
	</AppBar>

	<div class="nav"> 
	<Tabs grow class={appState.settings.accentColour.toLowerCase() + "-text "} on:change = {(val) => {check(val.detail)}}>
		<div slot="tabs">
			<Tab>Start</Tab> 
			<Tab>Stats</Tab>
		</div>
	</Tabs>
	</div>
	
	<Play active = {playActive}  onClose = {stop} newGeneratedBoard = {appState.generatedBoard}/>

	 
		{#if appState.currentPage == 0}
		<Settings onHelperChange = {switchHelper} settings = {appState.settings} onClick = {updateColour}/>
		<Start settings = {appState.settings} onClick = {start} onDifficultyChange = {(val) => updateDifficulty(val)}/>
		{:else}
		{#if appState.currentPage == 1}
		<Stats settings = {appState.settings}/>
		{/if}
		{/if}
	
</MaterialApp>