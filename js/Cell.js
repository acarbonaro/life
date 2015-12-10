;var Cell = (function(Draw) {
	var Cell = function(properties) {
    this.class = "Cell";
		// Ensure that the properties passed in are an object
		properties = (typeof(properties) !== 'object') ? {} : properties;

		this.x = (properties.x !== undefined) ? properties.x : 5;
		this.y = (properties.y !== undefined) ? properties.y : 5;
		this.color = properties.color || "#000";
	};
	
	Cell.prototype.draw = function(tileSize) {
		Draw.rectangle(this.x * tileSize, this.y * tileSize, tileSize, tileSize, this.color);
	}

	return Cell;
})(Draw);