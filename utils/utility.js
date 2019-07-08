import path from 'path';

/**
 * Creates the file paths
 *
 * Returns: Array of upload directories
 *
 * @param {string} uploadDirectory The upload file directory
 */
export const setFileDirectory = uploadDirectory => {
  return (path1, path2) => {
    return [
      path.join(__dirname, `${uploadDirectory}${path1}`),
      path.join(__dirname, `${uploadDirectory}${path2}`)
    ];
  };
};

/**
 * Orders an object by key
 *
 * Returns: Object
 *  *
 * @param {object} obj The object to be ordered
 */
export const orderObject = obj => {
  const orderedObject = {};

  Object.keys(obj)
    .sort()
    .forEach(key => {
      orderedObject[key] = obj[key];
    });

  return orderedObject;
};

/**
 * Checks if the first letter of a string is capitalised
 *
 * Returns: Boolean
 *
 * @param {string} word The word to be tested
 */
export const isCapitalised = word => {
  return /[A-Z]/.test(word[0]);
};

/**
 * Removes a string from another string
 *
 * Returns: String
 *
 * @param {string} string The main string
 * @param {string} toRemove The string to be removed
 */
export const removeFromString = (string, toRemove) => {
  return string.replace(toRemove, '');
};

/**
 * Splits a string by delimiter
 *
 * Returns: Array of Strings
 *
 * @param {string} string The main string
 * @param {string} stringDefiner The delimiter to split the main string on
 */
export const splitString = (string, stringDefiner) => {
  return string.split(stringDefiner);
};

/**
 * Removes the last character from a string
 *
 * Returns: String
 *
 * @param {string} string The main that will have the last character removed
 */
export const removeLastElement = string => {
  return string.substring(0, string.length - 1);
};
