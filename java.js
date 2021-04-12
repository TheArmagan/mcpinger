const javaPinger = require("mcping-js");
const pinger = new javaPinger.MinecraftServer();

/**
 * @param {Object} param0
 * @param {String} param0.host IP of the server. IPv4 IP address or domain of the server.
 * @param {Number?} param0.port Default: `25565`
 * @param {Number?} param0.timeout Default: `5000`
 * @param {Number?} param0.protocolVersion Default: `-1` https://wiki.vg/Protocol_version_numbers
 * @returns {Promise<{protocolVersion:Number,version:String,onlinePlayerCount:Number,maxPlayerCount:Number,playerList:{uuid:String,name:String}[],favicon:Buffer,motd:String|Object}>}
 */
function ping({ host, port = 25565, timeout = 5000, protocolVersion = -1 }) {
  return new Promise((resolve, reject) => {
    pinger.ping.call({ host, port }, timeout, protocolVersion, async (err, res) => {
      if (err) return reject(err);
      if (!res) return reject("not found");
      resolve({
        protocolVersion: res?.version?.protocol,
        version: res?.version?.name,
        onlinePlayerCount: res?.players?.online,
        maxPlayerCount: res?.players?.max,
        playerList: (res?.players?.sample ?? []).map(i => ({
          uuid: i?.id,
          name: i?.name
        })),
        favicon: Buffer.from(res?.favicon?.replace("data:image/png;base64,","") || "","base64"),
        motd: res?.description
      });
    });
  })
}

module.exports = ping;

