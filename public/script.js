document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/api/game')
    .then(res => res.json())
    .then(data => loadGames(data));
});

// Load Game Data into nav-bar
function loadGames(data) {
    const tab = document.getElementById("nav-links");

    if (data.length === 0) {
        return;
    } 

    let tabHtml = "";

    data.forEach(function ({gameId,name}){
        tabHtml += `<li><a id=\"games\" onclick=\"loadCategory(\'${gameId}\')\">${name}</a></li>`;
    });
    tabHtml += `<li><a class="active" href="#gameForm" onclick=\"loadGameForm()\">New Game</a></li>`

    tab.innerHTML = tabHtml;
}

// GameForm to Submit Games [visble : hidden]
function loadGameForm() {
    var node = document.getElementById("#gameForm");
    var visibility = node.style.visibility;
    node.style.visibility = visibility == "visible" ? 'hidden' : "visible"
}

// Get Category data for Game
function loadCategory(gameId){
    fetch(`http://localhost:3000/api/category/${gameId}`)
    .then(res => res.json())
    .then(data => loadCategories(gameId, data));
};

// Load Category into sidebar
function loadCategories(gameId, data) {
    const option = document.getElementById("sidenav");
    
    if (data.length === 0) {
        return;
    } 

    let optionHtml = "";

    data.forEach(function ({categoryId,categoryName}){
        optionHtml += `<a id=\"category\" onclick=\"loadRun(\'${gameId}\', \'${categoryId}\')\">${categoryName}</a>`;
    });
    option.innerHTML = optionHtml;
}

// Get Run data for Category
function loadRun(gameId, categoryId){
    fetch(`http://localhost:3000/api/run/${gameId}/${categoryId}`)
    .then(res => res.json())
    .then(data => loadRunTable(data));
};

// Load Run data into a table
function loadRunTable(data) {
    const table = document.getElementById("table");

	console.log(data);
	console.log(table);

    if (data.length === 0) {
        return;
    } 

    let tableHtml = `<tr>
                    <th border: 1px solid;>Placement</th>
                    <th border: 1px solid;>Run Time</th>
                    <th border: 1px solid;>Date Played</th>
                    <th border: 1px solid;>Edit</th>
                    <th border: 1px solid;>Delete</th>
                    </tr>`;

    data.forEach(function ({runId, runTime,placement,datePlayed}){
        tableHtml += `<tr>
                    <td border: 1px solid;>${placement}</td>
                    <td border: 1px solid;>${runTime}</td>
                    <td border: 1px solid;>${datePlayed}</td>
                    <td border: 1px solid;>
                    <button type="button" onclick="runEdit('${runId}');"class="btn btn-default">Edit</button>
                    </td>
                    <td border: 1px solid;>
                    <button type="button" onclick="runDelete('${runId}');"class="btn btn-default">Delete</button>
                    </td>
                    </tr>`;
    });

    tableHtml += `</tr>`
    
    console.log(table);

    table.innerHTML = tableHtml;
}

// Edit on Run table
function runEdit(runId){
    console.log(runId);
}

// Delete on Run table
function runDelete(runId){
    fetch(`http://localhost:3000/api/run/delete/${runId}`);
}