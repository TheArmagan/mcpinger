const javaPinger = require("mcping-js");
const { performance } = require("perf_hooks");
const util = require("util");
const dns = require("dns");
const resolveHostname = util.promisify(dns.resolve);
const ipRegex = require("ip-regex");

const pinger = new javaPinger.MinecraftServer();
const mainIpRegex = ipRegex({ exact: true, includeBoundaries: true });

/**
 * @param {Object} param0
 * @param {String} param0.host IP of the server. IPv4 IP address or domain of the server.
 * @param {Number?} param0.port Default: `25565`
 * @param {Number?} param0.timeout Default: `5000`
 * @param {Number?} param0.protocolVersion Default: `-1` https://wiki.vg/Protocol_version_numbers
 * @returns {Promise<{ms:Number,protocolVersion:Number,version:String,onlinePlayerCount:Number,maxPlayerCount:Number,playerList:{uuid:String,name:String}[],favicon:String,description:String|Object,ip:String,hostName?:String}>}
 */
function ping({ host, port = 25565, timeout = 5000, protocolVersion = -1 }) {
  let start = performance.now();
  return new Promise((resolve, reject) => {
    pinger.ping.call({ host, port }, timeout, protocolVersion, async (err, res) => {
      if (err) return reject(err);
      let ms = ~~(performance.now() - start);
      let hostName = null;
      let ip = host;
      if (!mainIpRegex.test(host)) {
        hostName = host;
        try {
          ip = (await resolveHostname(ip))[0]
        } catch (err) {
          return reject(err);
        }
      }
      resolve({
        ip,
        hostName,
        protocolVersion: res.version.protocol,
        version: res.version.name,
        onlinePlayerCount: res.players.online,
        maxPlayerCount: res.players.max,
        playerList: (res.players.sample ?? []).map(i => ({
          uuid: i.id,
          name: i.name
        })),
        favicon: res.favicon,
        motd: res.description,
        ms
      });
    });
  })
}

module.exports = ping;

