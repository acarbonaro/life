;var Helper = (function() {
	var Helper = {};

	/***
	 * Generate a random integer
	 *
	 * @method randomInt
	 * @param {integer} min The bottom end of the random range
	 * @param {integer} max The top of the random range
	 * @param {bool}    inclusive If true, the random integer can be either the
	 *                  min or max.
	 */
	Helper.randomInt = function (min, max, inclusive) {
		inclusive = (inclusive === undefined ? true : inclusive);
		// data.randomNumbers = data.randomNumbers + 1;
		if (inclusive === true) {
			return (Math.floor(Math.random() * ((max - min) + 1)) + min);
		} else {
			return (Math.floor(Math.random() * (max - min)) + (min + 1));
		}
	}
	
	return Helper;
})();