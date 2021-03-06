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
                    <th>Placement</th>
					<th>Runner</th>
					<th>Region</th>
                    <th>Run Time</th>
                    <th>Date Played</th>
					<th>Hide Name</th>
                    </tr>`;

			data.forEach(function ({ runId, runTime, placement, datePlayed, username, region }) {
				tableHtml += `<tr>
                    <td>${placement}</td>
					<td>${username}</td>
					<td>${region}</td>
                    <td>${runTime}</td>
                    <td>${datePlayed}</td>
					<td><button onclick=\"updateUsername(\'${username}\')\">Hide</a></td>
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

			const dbStats = document.getElementById("dbTable");
			const stats = document.getElementById("statsTable");
			const categoryStats = document.getElementById("categoryTable");

			let dbStatsInnerHTML = "";
			let statsInnerHTML = "";
			let categoryInnerHTML = "";

			//
			// DB Stats
			//
			dbStatsInnerHTML += `<tr>
			<th border: 1px solid;>Runners With</th>
			<th border: 1px solid;>Most Runs</th>
			</tr>`;

			data.runners.forEach(function ({ username, totalRuns }) {
				dbStatsInnerHTML += `<tr>
                    <td border: 1px solid;>${username}</td>
					<td border: 1px solid;>${totalRuns}</td>
                    </tr>`;
			});

			dbStatsInnerHTML += `<tr>
			<th border: 1px solid;>Extreme</th>
			<th border: 1px solid;>Times</th>
			</tr>`;

			data.extreme.forEach(function ({ username, runTime }) {
				dbStatsInnerHTML += `<tr>
                    <td border: 1px solid;>${username}</td>
					<td border: 1px solid;>${runTime}</td>
                    </tr>`;
			});

			//
			// Game Stats
			//
			statsInnerHTML += `<tr>
			<th>Game</th>
			<th>Stats</th>
			</tr>`;

			data.category.forEach(function ({ categoryName, totalTime }) {
				statsInnerHTML += `<tr>
                    <td>${categoryName}</td>
					<td>${totalTime}</td>
                    </tr>`;
			});

			//
			// Category Stats
			//
			categoryInnerHTML += `<tr>
			<th border: 1px solid;>Most Popular</th>
			<th border: 1px solid;>Regions</th>
			</tr>`;

			data.regions.forEach(function ({ region, percentage }) {
				categoryInnerHTML += `<tr>
                    <td border: 1px solid;>${region}</td>
					<td border: 1px solid;>${percentage}</td>
                    </tr>`;
			});

			dbStats.innerHTML = dbStatsInnerHTML;
			stats.innerHTML = statsInnerHTML;
			categoryStats.innerHTML = categoryInnerHTML;
		});
}