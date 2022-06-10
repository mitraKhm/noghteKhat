const N = 4;
const M = 4;

let turn = "R";
let selectedLines = [];

const hoverClasses = { R: "hover-red", B: "hover-blue" };
const bgClasses = { R: "bg-red", B: "bg-blue" };
const fillBox = (id) => {
	const nextTurn = turn === "R" ? "B" : "R";
	let bgCollor = nextTurn === 'R'?'bg-blue':'bg-red'
	document.getElementById(id).classList.add(bgCollor);
}
const playersTurnText = (turn) =>
	`It's ${turn === "R" ? "Red" : "Blue"}'s turn`;

const isLineSelected = (line) =>
	line.classList.contains(bgClasses.R) || line.classList.contains(bgClasses.B);
const isLineSelected2 = (lineId) =>{
	const line = 	document.getElementById(lineId);
	if(line){
		return line.classList.contains(bgClasses.R) || line.classList.contains(bgClasses.B);
	}
}
const createGameGrid = () => {
	const gameGridContainer = document.getElementsByClassName(
		"game-grid-container"
	)[0];

	const rows = Array(N)
		.fill(0)
		.map((_, i) => i);
	const cols = Array(M)
		.fill(0)
		.map((_, i) => i);

	rows.forEach((row) => {
		cols.forEach((col) => {
			const dot = document.createElement("div");
			dot.setAttribute("class", "dot");

			const hLine = document.createElement("div");
			hLine.setAttribute("class", `line-horizontal ${hoverClasses[turn]}`);
			hLine.setAttribute("id", `h-${row}-${col}`);
			hLine.addEventListener("click", handleLineClick);

			gameGridContainer.appendChild(dot);
			if (col < M - 1) gameGridContainer.appendChild(hLine);
		});

		if (row < N - 1) {
			cols.forEach((col) => {
				const vLine = document.createElement("div");
				vLine.setAttribute("class", `line-vertical ${hoverClasses[turn]}`);
				vLine.setAttribute("id", `v-${row}-${col}`);
				vLine.addEventListener("click", handleLineClick);

				const box = document.createElement("div");
				box.setAttribute("class", "box");
				box.setAttribute("id", `box-${row}-${col}`);

				gameGridContainer.appendChild(vLine);
				if (col < M - 1) gameGridContainer.appendChild(box);
			});
		}
	});

	document.getElementById("game-status").innerHTML = playersTurnText(turn);
};

const changeTurn = () => {
	console.log('chang turn ')
	const nextTurn = turn === "R" ? "B" : "R";

	const lines = document.querySelectorAll(".line-vertical, .line-horizontal");

	lines.forEach((l) => {
		//if line was not already selected, change it's hover color according to the next turn
		if (!isLineSelected(l)) {
			l.classList.replace(hoverClasses[turn], hoverClasses[nextTurn]);
		}
	});
	turn = nextTurn;
};

const handleLineClick = (e) => {

	const lineId = e.target.id;

	const selectedLine = document.getElementById(lineId);

	if (isLineSelected(selectedLine)) {
		//if line was already selected, return
		return;
	}

	selectedLines = [...selectedLines, lineId];

	checkForBox(lineId, selectedLines)
	colorLine(selectedLine);
	changeTurn();
};
function checkForBox(lineId,selectedLines ){
	let fd = lineId.split('-')
	if(selectedLines.length  >= 4){
		if (fd[0]=== 'h'){
			if(fd[1]-1 > 0 && fd[1]-1 < 2){
				checkBoxNeedToFill(fd[1]-1,fd[2],selectedLines)
			}
			checkBoxNeedToFill(fd[1],fd[2],selectedLines)
		}
		if (fd[0]=== 'v'){
			if(fd[2]-1 > 0 && fd[2]-1 < 2){
				checkBoxNeedToFill(fd[1],fd[2]-1,selectedLines)
			}
			checkBoxNeedToFill(fd[1],fd[2],selectedLines)
		}
	}
}
function  checkBoxNeedToFill(i , j,selectedLines){
	console.log(selectedLines)
	let m = parseInt(i)
	let h = parseInt(j)
	let leftLin = 'h-'+m+'-'+h
	let rightLin = 'h-'+(m+1)+'-'+h
	let topLin = 'v-'+m+'-'+h
	let bottomLin = 'v-'+m+'-'+(h+1)

	let leftLinSelected = selectedLines.includes(leftLin)
	let rightLinSelected = selectedLines.includes(rightLin)
	let topLinSelected = selectedLines.includes(topLin)
	let bottomLinSelected = selectedLines.includes(bottomLin)

	if(leftLinSelected && rightLinSelected && topLinSelected && bottomLinSelected){
		console.log('fill-box')
		fillBox('box-'+i+'-'+j)
	}
}
const colorLine = (selectedLine) => {
	selectedLine.classList.remove(hoverClasses[turn]);
	selectedLine.classList.add(bgClasses[turn]);
};

createGameGrid();
