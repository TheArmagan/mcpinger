const javaPinger = require("mcping-js");
const pinger = new javaPinger.MinecraftServer();
const {performance} = require("perf_hooks")

/**
 * @param {Object} param0
 * @param {String} param0.host IP of the server. IPv4 IP address or domain of the server.
 * @param {Number?} param0.port Default: `25565`
 * @param {Number?} param0.timeout Default: `5000`
 * @param {Number?} param0.protocolVersion Default: `-1` https://wiki.vg/Protocol_version_numbers
 * @returns {Promise<{ping:Number,version:{protocol:Number,name:String},players:{online:Number,max:Number,sample:{uuid:String,name:String}},favicon:String,description:String|Object}>}
 */
function ping({ host, port = 25565, timeout = 5000, protocolVersion = -1 }) {
  let start = performance.now();
  return new Promise((resolve, reject) => {
    pinger.ping.call({ host, port }, timeout, protocolVersion, (err, res) => {
      if (err) return reject(err);
      let ping = ~~(performance.now() - start);
      resolve({ping, ...res});
    });
  })
}

module.exports = ping;

