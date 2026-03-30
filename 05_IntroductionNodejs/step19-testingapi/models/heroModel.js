const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  title: String,
  firstname: String,
  lastname: String,
  email: String,
  city: String,
});

//DB Commands
//sever side Reading

// setTimeout(() => {
//   //rading
//   Hero.find()
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))
//     .finally(() => console.log("Query Finished!"));

//   //create
//   // let hero = new Hero({
//   //   title: "Enginer",
//   //   firstname: "K",
//   //   lastname: "Ramesh",
//   //   email: "Ramesh@k.com",
//   //   city: "New Delhi",
//   // });
//   // hero
//   //   .save()
//   //   .then((dres) => console.log(dres))
//   //   .catch((err) => console.log(err));

//   //  delete

//   // Hero.findByIdAndDelete("69c07d9901cbb73a508f8cda")
//   //   .then((dres) => console.log(dres))
//   //   .catch((err) => console.log(err));

//   // Hero.findByIdAndUpdate("69bfd56e1bfbcf0ab68dd75b", {
//   //   title: String,
//   //   firstname: String,
//   //   lastname: String,
//   //   email: String,
//   //   city: String,
//   // })
//   //   .then((dres) => console.log(dres))
//   //   .catch((err) => console.log(err));
// }, 1000);

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;
