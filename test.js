let mcpinger = require(".");

mcpinger.java({ host: "pearcraft.ddns.net" }).then((res) => {
  console.log(res);
})