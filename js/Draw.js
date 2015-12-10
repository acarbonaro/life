;var Draw = (function(document) {
	var Draw = {};

	// The canvas and the context
	Draw.canvas = null;
	Draw.context = null;
	
	/***
	 * Draw a rectangle
	 *
	 * @method drawRectangle
	 * @param {integer} x      The X coordinate of the rectangle
	 * @param {integer} y      The Y coordinate of the rectangle
	 * @param {integer} width  The width of the rectangle
	 * @param {integer} height The height of the rectangle
	 * @param {string}  color  The color of the rectangle
	 */
	Draw.rectangle = function (x, y, width, height, color) {
		Draw.context.fillStyle = color;
		Draw.context.fillRect(x, y, width, height);
	}
  
  /***
   * Clear the canvas
   */
  Draw.clear = function() {
    // Wipe the canvas
    Draw.context.clearRect(0, 0, Draw.canvas.width, Draw.canvas.height);
  }
	
	return Draw;
})(document);