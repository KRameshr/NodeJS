console.log("well come to NODE JS ");

function adder(req, res) {
  return "Addition is:- " + req + res;
}

function logger(result) {
  return result;
}

const printLine = (message) => {
  console.log(message);
};

module.exports = { logger, printLine, adder };
