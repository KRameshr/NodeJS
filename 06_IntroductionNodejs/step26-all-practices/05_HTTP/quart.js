const quary = require("querystring");

data = {
  name: "Ramesh",
  password: "agddd",
  passwordd: "agddd",
  passwordd: "agddd",
  passdwordd: "agddd",
};

const str = "name=Ramesh&password=agddd&passwordd=agddd&passdwordd=agddd";

console.log(quary.encode(data));
console.log(quary.decode(str));
console.log("name", str.name);
