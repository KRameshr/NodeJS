const sampleGetOne = (req, res) => {
  res.send("Server is running sepated by MVC Model");
};

const samplepostOne = (req, res) => {
  res.send("Server is running sepated by MVC Model is post");
};

const samplepostTwo = (req, res) => {
  res.send("Server is running sepated by MVC Model is post three");
};

//module.exports = sampleGet;
module.exports = { sampleGetOne, samplepostOne, samplepostTwo };
