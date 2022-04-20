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
    .then(data => loadCategories(data));
};

// Load Category into sidebar
function loadCategories(data) {
    const option = document.getElementById("sidenav");
    
    if (data.length === 0) {
        return;
    } 

    let optionHtml = "";

    data.forEach(function ({categoryId,categoryName}){
        optionHtml += `<a id=\"category\" onclick=\"loadRun(\'${categoryId}\')\">${categoryName}</a>`;
    });
    option.innerHTML = optionHtml;
}

// Get Run data for Category
function loadRun(categoryId){
    fetch(`http://localhost:3000/api/run/${categoryId}`)
    .then(res => res.json())
    .then(data => loadRunTable(data));
};

// Load Run data into a table
function loadRunTable(data) {
    const table = document.getElementById("table");

    if (data.length === 0) {
        return;
    } 

    let tableHtml = "";

    data.forEach(function ({runTime,placement,datePlayed}){
        tableHtml += `<td border: 1px solid;></td>`;
    });

    console.log(tableHtml.innerHTML);

    table.outerHTML = `<th border: 1px solid;>runTime</th><th border: 1px solid;>placement</th><th border: 1px solid;>datePlayed</th>`
    table.innerHTML = tableHtml;
}