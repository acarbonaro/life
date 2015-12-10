;var Gameboard = (function(Cell) {
	var Gameboard = function(properties) {
		// Ensure that the properties passed in are an object
		properties = (typeof(properties) !== 'object') ? {} : properties;
		
		// Map those properties to the proper values
		this.tileSize = properties.tileSize ||   5;
		this.width    = properties.width    || 500;
		this.height   = properties.height   || 500;

		// Set the number of tiles on the grid
		this.tileCount = {};
		this.tileCount.x = this.width / this.tileSize;
		this.tileCount.y = this.height / this.tileSize;

		this.occupiedTiles = [];
	};
	
	Gameboard.prototype.draw = function() {
    // Loop through the available tiles
    for (var i = 0; i < this.occupiedTiles.length; i++) {
      // If there's an occupied tile, draw it
      var tile = this.occupiedTiles[i];
      if (tile !== null) {
        tile.draw(this.tileSize);
      }
    }
	};
	
	/***
	 * [0][1][2]
	 * [3]   [4]
	 * [5][6][7]
	 */
  Gameboard.prototype.detectSurroundings = function(tile, map) {
		var surroundings = [];
		// Check the surroundings for stuff, and add it to the array
		surroundings.push(this.getTileByCoordinate(map, (tile.x - 1), (tile.y - 1)));
		surroundings.push(this.getTileByCoordinate(map,  tile.x     , (tile.y - 1)));
		surroundings.push(this.getTileByCoordinate(map, (tile.x + 1), (tile.y - 1)));
		surroundings.push(this.getTileByCoordinate(map, (tile.x - 1),  tile.y     ));
		surroundings.push(this.getTileByCoordinate(map, (tile.x + 1),  tile.y     ));
		surroundings.push(this.getTileByCoordinate(map, (tile.x - 1), (tile.y + 1)));
		surroundings.push(this.getTileByCoordinate(map,  tile.x     , (tile.y + 1)));
		surroundings.push(this.getTileByCoordinate(map, (tile.x + 1), (tile.y + 1)));
		return surroundings;
	};
  
  Gameboard.prototype.getTileByCoordinate = function(tiles, x, y) {
    var tile = tiles.filter(function(tile, index) {
      if ((tile.x === x) && (tile.y === y)) {
        return true;
      } else {
        return false;
      }
    }, [x, y]);
    if (tile.length > 0) {
      tile = tile[0]; 
    } else {
      tile = { x : x, y : y };
    }
    return tile;
  };
	
	Gameboard.prototype.simulateGeneration = function() {
    // Check the surroundings of each cell
    // Generate a new map of tiles using that data
    var oldMap = this.occupiedTiles;
    this.occupiedTiles = [];
    
    console.dir(oldMap);

    // Loop through the available tiles
    for (var x = 0; x < this.tileCount.x; x++) {
      for (var y = 0; y < this.tileCount.y; y++) {
        // Get the tile
        var tile = this.getTileByCoordinate(oldMap, x, y);
        // Detect the tile's surroundings
        var tileSurroundings = this.detectSurroundings(tile, oldMap);
        var occupiedSurroundingsCount = tileSurroundings.filter(function(surroundingTile) {
          return surroundingTile.class !== undefined;
        }).length;

        switch (tile.class) {
          case "Cell":
            // If the cell has less than two neighbors, it dies
            // If the cell has more than three neighbors, it dies
            // if ((occupiedSurroundingsCount < 2) || (3 < occupiedSurroundingsCount)) {
            //   this.occupiedTiles.splice(oldMap.indexOf(tile), 1);
            // }
            // If the cell has two or three neighbors, it survives
            if ((occupiedSurroundingsCount >= 2) && (occupiedSurroundingsCount <= 3)) {
              this.occupiedTiles.push(tile);
            }
            break;
          default:
            // If a dead cell has exactly three neighbors, it becomes a new Cell
            if (occupiedSurroundingsCount === 3) {
              this.occupiedTiles.push(new Cell({ x : x, y : y }));
            }
            break;
        }
      }
    }
	};

	return Gameboard;
})(Cell);