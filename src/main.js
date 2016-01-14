import Gyre from "./factories/gyres";

// Private variables
const API = {};

// Private methods
/**
 * Get registered gyres object singleton.
 * Gyres object is created on first use instead of on library load.
 *
 * @returns {Object} Gyres object.
 */
const getGyres = (() => {
  let gyres;
  return () => gyres || (gyres = { "empty": Gyre() });
})();

// Public functions
let gyrejsDebugger;
const attachDebugger = gDebugger => gyrejsDebugger = gDebugger;

/**
 * Creates a new gyre instance. Based on a factory function by registered id.
 * If no id is provided, an empty gyre instance will be returned.
 *
 * @param {String} [id] Id of a registered gyre factory.
 * @param {Object} [options] Options object for gyre.
 * @returns {Object|void} Gyre instance.
 */
let gCounter = 0;
const instantiateGyre = (id = "empty", options = {}) => {
  if (getGyres().hasOwnProperty(id)) {
    // Return gyre instance object with a unique namespace.
    const gId = `${id}-${gCounter++}`;
    return getGyres()[id](Object.assign({}, options, {gId, gyrejsDebugger}));
  }
  throw new Error(`GyreJS (instantiateGyre): Error on create - Gyre factory '${id}' not registered.`); // eslint-disable-line no-console
};

/**
 * Register a gyre factory function. Overides any gyre factory which is already present at that ID.
 *
 * @param {String} id Id of to register gyre.
 * @param {Function} factory Gyre factory function.
 * @returns {Object} API Chainable GyreJS object.
 */
const registerGyre = (id, factory) => {
  if (id === "empty") {
    throw new Error("GyreJS (registerGyre): cannot use 'empty, it is a reserved id.");
  }

  getGyres()[id] = factory;
  return API;
};

/**
 * Un-register a gyre factory function.
 *
 * @param {String} id Id of a registered gyre factory.
 * @returns {boolean} Whether the factory has been un-registered.
 */
const unRegisterGyre = (id) => {
  if (!getGyres().hasOwnProperty(id)) {
    console.warn(`>> GyreJS: (unRegisterGyre) Cannot un-register - Gyre factory '${id}' not registered.`); // eslint-disable-line no-console
    return false;
  }
  return (delete getGyres()[id]) && true;
};

/**
 * Gyre factory function.
 *
 * @type {Object}
 */
const createGyre = (...args) =>
  args.length === 1 ? Gyre(...args) : registerGyre(args[0], Gyre(args[1]));

// GyreJS API
export default Object.assign(API, {
  attachDebugger,
  createGyre,
  instantiateGyre,
  registerGyre,
  unRegisterGyre
});
