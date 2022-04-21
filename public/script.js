let lastGameId = "", lastCategoryId = "";

document.addEventListener('DOMContentLoaded', function () {
	loadAllGames();
});

function loadAllGames() {
	fetch('http://localhost:3000/api/game')
		.then(res => res.json())
		.then(data => {
			const tab = document.getElementById("nav-links");

			if (data.length === 0) {
				return;
			}

			let tabHtml = "";

			data.forEach(function ({ gameId, name }) {
				tabHtml += `<li><a id=\"games\" onclick=\"loadCategoriesForGame(\'${gameId}\')\">${name}</a></li>`;
			});
			tabHtml += `<li><label for="abbrev">Game Abbrev:</label><input type="text" id="abbrev" name="abbrev"></li>`;
			tabHtml += `<li><a class="active" onclick=\"addNewGame()\">Add Game</a></li>`
			tabHtml += `<li><a class="active" onclick=\"deleteGame()\">Delete Game</a></li>`

			tab.innerHTML = tabHtml;
		});
}

function addNewGame() {
	const abbrev = document.getElementById("abbrev").value;
	fetch(`http://localhost:3000/api/newgame/${abbrev}`)
		.then(() => loadAllGames());
}

function updateUsername(oldUsername) {
	const newUsername = "Hidden";
	fetch(`http://localhost:3000/api/updateusername/${oldUsername}/${newUsername}`)
		.then(() => loadGameCategoryRunsAndRunners(lastGameId, lastCategoryId));
}

function deleteGame() {
	const abbrev = document.getElementById("abbrev").value;
	fetch(`http://localhost:3000/api/deletegame/${abbrev}`)
		.then(() => loadAllGames());
}

// Get Category data for Game
function loadCategoriesForGame(gameId) {
	fetch(`http://localhost:3000/api/category/${gameId}`)
		.then(res => res.json())
		.then(data => {
			const option = document.getElementById("sidenav");

			if (data.length === 0) {
				return;
			}

			let optionHtml = "";

			data.forEach(function ({ categoryId, categoryName }) {
				optionHtml += `<a id=\"category\" onclick=\"loadGameCategoryRunsAndRunners(\'${gameId}\', \'${categoryId}\')\">${categoryName}</a>`;
			});
			option.innerHTML = optionHtml;
		});
};

function loadGameCategoryRunsAndRunners(gameId, categoryId) {
	lastGameId = gameId;
	lastCategoryId = categoryId;

	fetch(`http://localhost:3000/api/run/${gameId}/${categoryId}`)
		.then(res => res.json())
		.then(data => {
			const table = document.getElementById("runTable");

			if (data.length === 0) {
				return;
			}

			let tableHtml = `<tr>
                    <th border: 1px solid;>Placement</th>
					<th border: 1px solid;>Runner</th>
					<th border: 1px solid;>Region</th>
                    <th border: 1px solid;>Run Time</th>
                    <th border: 1px solid;>Date Played</th>
					<th border: 1px solid;>Hide Name</th>
                    </tr>`;

			data.forEach(function ({ runId, runTime, placement, datePlayed, username, region }) {
				tableHtml += `<tr>
                    <td border: 1px solid;>${placement}</td>
					<td border: 1px solid;>${username}</td>
					<td border: 1px solid;>${region}</td>
                    <td border: 1px solid;>${runTime}</td>
                    <td border: 1px solid;>${datePlayed}</td>
					<td border: 1px solid;><button onclick=\"updateUsername(\'${username}\')\">Hide</a></td>
                    </td>
                    </tr>`;
			});

			tableHtml += `</tr>`

			table.innerHTML = tableHtml;

			loadStats(gameId, categoryId);
		});
}

function loadStats(gameId, categoryId) {
	fetch(`http://localhost:3000/api/stats/${gameId}/${categoryId}`)
		.then(res => res.json())
		.then(data => {

			console.log(data);

			const stats = document.getElementById("statsTable");

			let statsInnerHTML = "";

			statsInnerHTML += `<tr>
			<th border: 1px solid;>Game</th>
			<th border: 1px solid;>Stats</th>
			</tr>`;

			data.forEach(function ({ categoryName, totalTime }) {
				statsInnerHTML += `<tr>
                    <td border: 1px solid;>${categoryName}</td>
					<td border: 1px solid;>${totalTime}</td>
                    </tr>`;
			});

			/*
			statsInnerHTML +=`<tr>
			<td border: 1px solid;>${categoryName}</td>
			<td border: 1px solid;>${totalTime}</td></tr>`*/

			
			stats.innerHTML = statsInnerHTML;
		});
}