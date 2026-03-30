var user = "Ramesh";
var ur = "Ramesh will ur";
// module.exports.user = user;
// module.exports.ur = ur;

global.user = user;

module.exports = {
  user: user,
  ur: ur,
};
