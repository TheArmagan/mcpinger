let pinger = require(".");
let { inspect } = require("util");

pinger.javaPing({ host: "pearcraft.ddns.net" }).then((res) => {
  console.log(inspect(res,false,16,true));
})