(function(){

	var xtnd = {
		xtnd: {
			String: {
				contains: function (checkForString) {
					return this.indexOf(checkForString) > -1
				},
				toUpperCaseWords: function () {
					var str = this.toLowerCase();
					return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function ($1) {
						return $1.toUpperCase();
					});
				},
				firstLetter: function () {
					return this.charAt(0);
				}
			},
			Object: {
				propertyExists: function (propertyNameString) {
					return typeof this[propertyNameString] !== "undefined";
				},
				forEach: function (callbackFunction) {
					if (this == null) {
						throw new TypeError(" this is null or not defined");
					}
					if (typeof callbackFunction !== "function") {
						throw new TypeError(callbackFunction + " is not a function");
					}
					for (var property in this) {
						var cbVal = callbackFunction(this[property], property, this);
						if (cbVal === false)
							break;
					}
				},
				getType: function () {
					return typeof this;
				}
			},
			Array: {
				chunk: function (indexesPerChunkNumber) {
					var chunksArray = [];
					var chunkIndex = 0;
					var numberOfChunks = Math.ceil(this.length / indexesPerChunkNumber);
					for (chunkIndex; chunkIndex < numberOfChunks; chunkIndex++) {
						chunksArray.push(this.slice((chunkIndex * indexesPerChunkNumber), ((chunkIndex + 1) * indexesPerChunkNumber)));
					}
					return chunksArray;
				},
				joinChildArrays: function () {
					var joinedArrays = [];
					for (var i = 0; i < this.length; i++) {
						if (this[i] instanceof Array) {
							for (var i2 = 0; i2 < this[i].length; i2++) {
								joinedArrays.push(this[i][i2]);
							}
						}
					}
					return joinedArrays;
				},
				append: function (itemToAppend) {
					this.push(itemToAppend);
					return this;
				},
				prepend: function (itemToPrepend) {
					this.unshift(itemToPrepend);
					return this;
				},
				getWhere: function (conditionCallbackFunction) {
					var returnedValues = [];
					for (var i = 0; i < this.length; i++) {
						if (conditionCallBackFunction(this[i]))
							returnedValues.push(this[i]);
					}
				},
				getObjectWherePropertyEquals: function (propertyNameString, propertyValue) {
					for (var i = 0; i < this.length; i++) {
						if (this[i][propertyNameString] === propertyValue)
							return this[i];
					}
					return null;
				},
				hasValue: function (valueToSearchFor) {
					for (var i = 0; i < this.length; i++) {
						if (this[i] === valueToSearchFor)
							return true;
					}
					return false;
				}
			}
		}
	};

	if (typeof module !== "undefined" && module.exports) {
		module.exports = xtnd;
	} else {
		window.XTND.importMethods(xtnd);
	}
})();