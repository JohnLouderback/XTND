(function() {
	var XTNDFactory = function() {
		var XTND = function(options) {
			var defaultOptions = {
				namespacing: true,
				alwaysPrefix: true,
				addPrefixedForExisting: true,
				logWarnings: true
			};

			XTND._initialized = true;

			var globalScope = typeof global !== "undefined" ? global : window;

			var mergeObjects = function(first, second) {
				var len = +second.length,
						j = 0,
						i = first.length;
				for (; j < len; j++) {
					first[i++] = second[j];
				}
				first.length = i;
				return first;
			};

			XTND.options = options ? mergeObjects(defaultOptions, options) : defaultOptions;

			XTND.importMethods(XTND._importBuffer);
		};

		XTND._initialized = false;

		XTND._importBuffer = {};

		XTND._getFunctions = function(forType, functionHandler) {
			for (var methodName in forType) {
				functionHandler(methodName, forType[methodName]);
			}
		};

		XTND._capitaliseFirstLetter = function(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		};

		XTND.importMethods = function(methodsObject) {
			debugger;
			for (var namespace in methodsObject) {
				if(!XTND._initialized) { //If XTND has not yet been initialized
					XTND._importBuffer[namespace] = methodsObject[namespace]; //save methods to import buffer to import after initialization
				} else { //Otherwise, let's add them.
					var methodsObject = methodsObject[namespace];
					for (var type in methodsObject) {
						var Extends = eval(type);
						if (XTND.options.namespacing === true) {
							var Ext = null;
							console.log("for type: " + type);
							Object.defineProperty(Extends.prototype, namespace, {
								value: (function (thisType, thisExtends, thisNamespace) {
									return function () {
										if(this.__xtndCurrentNamespace !== thisNamespace) {
											console.log("object: "+thisExtends+" - "+this.__xtndCurrentNamespace+" vs "+thisNamespace);
											if (typeof thisExtends.prototype.currentInjectMethods !== "undefined") {
												thisExtends.prototype.currentInjectMethods.forEach(function (methodName) {
													delete thisExtends.prototype[methodName];
												});
											}

											thisExtends.prototype.__xtndCurrentInjectMethods = [];
											thisExtends.prototype.__xtndCurrentNamespace = thisNamespace;

											XTND._getFunctions(methodsObject[thisType], function (methodName, method) {
												console.log("defining: " + methodName);
												thisExtends.prototype.__xtndCurrentInjectMethods.push(methodName);
												Object.defineProperty(thisExtends.prototype, methodName, {
													value: method,
													writable: true,
													configurable: true,
													enumerable: false
												});
											});
										}
										return this;
									}
								}(type, Extends, namespace)),
								writable: true,
								configurable: true,
								enumerable: false
							});

						} else {
							XTND._getFunctions(methodsObject[type], function (methodName, method) {
								if (typeof Extends.prototype[methodName] === "undefined" && XTND.options.alwaysPrefix === false) {
									with (globalScope) {
										Object.defineProperty(Extends.prototype, methodName, {
											value: method,
											writable: false,
											configurable: true,
											enumerable: false
										});
									}
								} else if (XTND.options.addPrefixedForExisting) {
									var newMethodName = namespace + XTND._capitaliseFirstLetter(methodName);
									if (XTND.options.alwaysPrefix === false && XTND.options.logWarnings)
										console.warn("Method \"" + methodName + "\"" + " already exists in type " + type + ".\nTrying to add with prefix: \"" + newMethodName + "\"...");
									if (typeof Extends.prototype[newMethodName] === "undefined") {
										if (XTND.options.alwaysPrefix === false && XTND.options.logWarnings)
											console.warn("Method \"" + newMethodName + "\" was added successfully instead of method \"" + methodName + "\" for type " + type + ".");
										with (globalScope) {
											Object.defineProperty(Extends.prototype, newMethodName, {
												value: method,
												writable: true,
												configurable: true,
												enumerable: false
											});
										}
									} else {
										if (XTND.options.logWarnings)
											console.warn("Both methods \"" + newMethodName + "\" and \"" + methodName + "\" already exist in type " + type + ".\nMethod was not added.");
									}
								}
							});
						}
						console.log(Extends.prototype);
					}
				}
			}
		};

		return XTND;
	};
	if (typeof module !== "undefined" && module.exports) {
		module.exports = XTNDFactory();
	} else {
		window.XTND = XTNDFactory();
	}
}());