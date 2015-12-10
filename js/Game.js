;(function(document, Cell, Draw, Gameboard, Helper) {
	// The length of a generation in milliseconds
	var generationLength = 1000;
	
	var canvas    = document.createElement('canvas');
	canvas.id     = 'game';
	canvas.width  = 500; // window.innerWidth;
	canvas.height = 500; // window.innerHeight;
  
  var activeGameLoop;
	
	var gameboard = new Gameboard({
    tileSize : 10
  });
  
  function gameLoop() {
    if (gameboard.occupiedTiles.length > 0) {
      gameboard.simulateGeneration();
      Draw.clear();
      gameboard.draw();
    } else {
      activeGameLoop = null;
    }
  }
  
  function startGame() {
    return setInterval(gameLoop, generationLength);
  }

	function initGame() {
		// Set the canvas and context
		Draw.canvas  = document.getElementById('game');
		Draw.context = canvas.getContext('2d');

		// Add some random cells
		for (var x = 0; x < gameboard.tileCount.x; x++) {
			for (var y = 0; y < gameboard.tileCount.y; y++) {
				if (Helper.randomInt(0, 10) === 10) {
					gameboard.occupiedTiles.push(new Cell({ x : x, y : y }));
				}
			}
		}
    
    // Rig the board
    // gameboard.occupiedTiles.push(new Cell({ x : x, y : y }));
    // gameboard.occupiedTiles.push(new Cell({ x : 0, y : 0 }));
    // gameboard.occupiedTiles.push(new Cell({ x : 1, y : 0 }));
    // gameboard.occupiedTiles.push(new Cell({ x : 1, y : 1 }));

		// Log and draw the game board
		console.log(gameboard);
		gameboard.draw();
    
    activeGameLoop = startGame();
	}
	
	document.addEventListener("DOMContentLoaded", function() {
		document.body.appendChild(canvas);
		initGame();
	});
})(document, Cell, Draw, Gameboard, Helper);