let mcpinger = require(".");

mcpinger.java({ host: "flightsmp.mcserver.us" }).then((res) => {
  console.log(res);
})