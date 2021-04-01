let mcpinger = require(".");

mcpinger.java({ host: "mc.hypixel.net" }).then((res) => {
  console.log(res);
})