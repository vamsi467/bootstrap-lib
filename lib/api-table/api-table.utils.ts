/**
 * Retrieve the value of a nested property within an object using a dot-separated path.
 *
 * @param {Object} obj - The object from which to retrieve the nested property value. If obj is null, the function will return null.
 * @param {String} path - A dot-separated string representing the path to the nested property. If path is an empty string or null, the function will return the entire obj.
 * @param {String} default - A default value in case the the out put is not present .
 * @returns {*} - The value of the nested property specified by the path. If the path does not exist in the obj, the function will return undefined.
 */
export const get_deep_value = (obj, path, defaultValue) => {
  // If the object is null, there's nothing to retrieve, so we return null.
  if (!obj) return defaultValue || null;

  // If the path is empty or null, we return the entire object.
  if (!path) return obj;

  // Split the path into an array of keys using the dot as a separator, and then reduce the array
  // to access the nested property step-by-step in the object.
  // For example, if the path is "a.b.c", it will access obj.a.b.c.
  const value = path.split(".").reduce((acc, key) => acc[key], obj);

  // Return the value of the nested property specified by the path.
  // If the path does not exist in the obj, the reduce function will eventually return undefined.
  return value || defaultValue;
};
