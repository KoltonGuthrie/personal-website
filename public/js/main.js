
// Add delay to project animations
document.querySelectorAll(".project-card").forEach((card, i) => {
	card.dataset.aosDelay = 100 * i;
});

const grid = { width: 10, height: 10 };

const tiles = [];

createGrid();

function createGrid() {
	const heroElement = document.querySelector(".hero");
	const gridElement = document.createElement("div");
	gridElement.classList.add("grid");
	const tile = {
		width: Math.ceil(window.innerWidth / grid.width),
		height: Math.ceil(window.innerHeight / grid.height),
	};

	let idx = 0;
	for (let y = 0; y < grid.height; y++) {
		for (let x = 0; x < grid.width; x++) {
			const bg = createTile(tile, { x, y }, { backgroundColor: (x + y) % 2 !== 0 ? "#002439" : "#005066" });
			const el = createTile(
				tile,
				{ x, y },
				{ backgroundColor: (x + y) % 2 === 0 ? "#002439" : "#005066", borderRadius: "0px 55%" }
			);
			if (y === grid.height - 1) {
				el.classList.add("last-row");
				bg.classList.add("last-row");
			}
			el.classList.add("tile");
			// 0.15, 0.25, or 0.35 for best results
			el.style.animationDelay = `${-idx * 0.25}s`;
			bg.classList.add("bg");
			gridElement.appendChild(bg);
			gridElement.appendChild(el);
			tiles.push(bg, el);
			idx++;
		}
	}

	heroElement.appendChild(gridElement);

	function createTile(tile, position, style = {}) {
		const element = document.createElement("div");
		element.style.width = tile.width + 1 + "px";
		element.style.height = tile.height + 1 + "px";

		// Use % for responsive positioning
		element.style.left = (position.x * 100) / grid.width + "%";
		element.style.top = (position.y * 100) / grid.height + "%";
		Object.assign(element.style, style);
		return element;
	}
}

function updateGrid() {
	for (const tile of tiles) {
		const newTile = {
			width: Math.round(window.innerWidth / grid.width),
			height: Math.round(window.innerHeight / grid.height),
		};

		tile.style.width = newTile.width + "px";
		tile.style.height = newTile.height + "px";
	}
}

window.addEventListener("resize", updateGrid);
updateGrid();
