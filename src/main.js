import Gyre from "./components/gyres";

const createGyre = (definition, options = {}) => {
  if (typeof definition !== "object") {
    throw new Error("GyreJS (createGyre): First argument should be an object containing the gyre definition.");
  }

  return Gyre(Object.assign({}, definition))(options);
};

module.exports = {
  createGyre
};
