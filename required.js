/**
 * @function isFilledIn
 * Takes in a DOM element and determines whether it has been filled in or not.
 * @param {Object} element - a DOM element
 * @returns {boolean} Whether the input element is filled in
 */

var isFilledIn = function (element) {
	switch (element.type) {
		case "color":
		case "date":
		case "datetime":
		case "datetime-local":
		case "email":
		case "month":
		case "number":
		case "password":
		case "range":
		case "search":
		case "text":
		case "textarea":
		case "tel":
		case "time":
		case "url":
		case "week":
			if(element.value.length === 0) {
				return false;
			}
			break;
		case "checkbox":
		case "radio":
			if(!element.checked) {
				return false;
			}
			break;
		// submit and button are irrelevant
		default:
			return false;
			break;
	}
	return true;
};

/**
 * @function areAllFilledIn
 * Takes in an array of DOM element and determines whether they all have been filled in or not.
 * @param {Array} elements - Array of DOM elements
 * @returns {boolean|Array} True if all fields are filed in, or an array that contains all DOM elements that are not filled in.
 */

var areAllFilledIn = function (elements) {
	var unfilledEl = [];
	var unfilledRadio = {};
	_.forEach(elements, function (element) {
		if(element.type === "radio") {
			if(!_.has(unfilledRadio, element.name)) {
				unfilledRadio[element.name] = [];
			}
			if(unfilledRadio[element.name] !== false) {
				unfilledRadio[element.name].push(element);
			}
		}
		// If the element is not filled in
		if(!isFilledIn(element)) {
			// If the element is neither a checkbox nor a radio button, push it to the unfilledEl array.
			if(element.type !== "checkbox"
				&& element.type !== "radio") {
				unfilledEl.push(element);
			}
		} else {
			// If the element is filled in and is a radio button, then it must be considered filled-in.
			if(element.type === "radio") {
				unfilledRadio[element.name] = false;
			}
		}
	});
	// Remove any radio button groups that is considered filled in, and add it to the list of unfilled elements
	unfilledEl = unfilledEl.concat(_.reduce(unfilledRadio, function (unfilledRadioArray, radioGroupArray) {
		return radioGroupArray ? unfilledRadioArray.concat(radioGroupArray) : unfilledRadioArray;
	}, []));
	return unfilledEl.length === 0 ? true : unfilledEl;
}

/**
 * @function checkValidOrArray
 * Takes in a class name and determines whether they all input elements with that class name have been filled in or not.
 * @param {string} className - The class name to check for
 * @param {Object} templateInstance - The Meteor template instance
 * @returns {boolean|Array} True if all fields are filed in, or an array that contains all DOM elements that are not filled in.
 */

checkValidOrArray = function (className, templateInstance) {
	var allFields;
	if(templateInstance) {
		allFields = templateInstance.findAll('.' + className);
	} else {
		allFields = document.getElementsByName(className);
	}
	// for each check that it is filled in
	return areAllFilledIn(allFields);
}

Required = {};

/**
 * @method checkClass
 * Checks that all elements within the template instance with the specified class are filled in, otherwise return an array of all elements which are not filled-in.
 * @param {string} className - The name of the class to check for
 * @param {Object} [templateInstance] - A Meteor template instance to check in. If none is provided, the entire document is checked
 * @param {Function} [callback] - An optional callback which will be passed `true` if all elements validate, or `false` and the array of failed elements as the first and second parameters, respectively.
 */

Required.checkClass = function (className, templateInstance, callback) {
	var validOrArray = checkValidOrArray(className, templateInstance);
	if(validOrArray === true) {
		callback(true);
	} else {
		callback(false, validOrArray);
	}
};

/**
 * @method highlightByClass
 * Checks that all elements within the template instance with the specified class are filled in, otherwise add a class to those which are not filled in.
 * @param {string} className - The name of the class to check for
 * @param {string} errorClass - The name of the error class to add
 * @param {Object} [templateInstance] - A Meteor template instance to check in. If none is provided, the entire document is checked
 */

Required.highlightByClass = function (className, errorClass, templateInstance) {
	var validOrArray = checkValidOrArray(className, templateInstance);
	if(validOrArray !== true) {
		_.forEach(validOrArray, function (element, i) {
			$(element).addClass(errorClass);
		});
	}
};