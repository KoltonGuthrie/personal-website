// Add delay to project animations
$('.project-card').each((i, card) => {
    $(card).attr('data-aos-delay', 100 * i);
});

const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;

const grid = {
    create: function ({ width = 10, height = 10 }) {
        function createTile(tile, position, style = {}) {
			const $element = $('<div></div>').css({
				width: `${tile.width}px`,
				height: `${tile.height}px`,
				left: `${(position.x * 100) / GRID_WIDTH}%`,
				top: `${(position.y * 100) / GRID_HEIGHT}%`,
				...style,
			});
            return $element[0]; // Returns the DOM element
        }

        this.width = width;
        this.height = height;
        this.tiles = [];

        const $heroElement = $('.hero');
        const $gridElement = $('<div></div>').addClass('grid');
        const tile = {
            width: Math.ceil(window.innerWidth / GRID_WIDTH),
            height: Math.ceil(window.innerHeight / GRID_HEIGHT),
        };

        let idx = 0;
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                const $bg = $(createTile(tile, { x, y }, { backgroundColor: (x + y) % 2 !== 0 ? '#002439' : '#005066' }));
                const $el = $(createTile(
                    tile,
                    { x, y },
                    { backgroundColor: (x + y) % 2 === 0 ? '#002439' : '#005066', borderRadius: '0px 55%' }
                ));
                if (y === GRID_HEIGHT - 1) {
                    $bg.addClass('last-row');
                    $el.addClass('last-row');
                }
                $el.addClass('tile').css('animationDelay', `${-idx * 0.25}s`);
                $bg.addClass('bg');
                $gridElement.append($bg, $el);
                this.tiles.push($bg[0], $el[0]);
                idx++;
            }
        }

        $heroElement.append($gridElement);
    },
    update: function () {
        const newTile = {
            width: Math.round(window.innerWidth / GRID_WIDTH),
            height: Math.round(window.innerHeight / GRID_HEIGHT),
        };
        $(this.tiles).each((_, tile) => {
			$(tile).css({
				width: `${newTile.width}px`,
				height: `${newTile.height}px`,
			});
        });
    },
};

// Initialize grid
grid.create({ width: GRID_WIDTH, height: GRID_HEIGHT });

// Bind the update method to the grid object for the resize event
$(window).on('resize', grid.update.bind(grid));

// Initial update
grid.update();