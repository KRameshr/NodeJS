module.exports = function MakeGreeter(greeting) {
  return function (name) {
    return greeting + "," + name;
  };
};
