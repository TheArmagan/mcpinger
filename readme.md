# MCPinger

## Installation
#### `$ npm install mcpinger`

## Example
```js
let mcpinger = require("mcpinger");

/**
 * 
 * Options:
 * - host: The ip of the server.
 * - port?: Port of the server. (Default 25565)
 * - timeout?: (Default 5000)
 * - protocolVersion?: (Default -1) https://wiki.vg/Protocol_version_numbers
 * 
 * */
mcpinger.java({ host: "example.com" }).then((res) => {
  console.log(res);
  /**
   * 
   * Example output:
   * 
   * {
   *   ip: '127.0.0.1',
   *   hostName: 'example.com', // Host name exist if you are using a hostname instead of a normal ip like 127.0.0.1.
   *   protocolVersion: 754,
   *   version: 'Paper 1.16.5',
   *   onlinePlayerCount: 1,
   *   maxPlayerCount: 25,
   *   playerList: [
   *     {
   *       uuid: 'example-uuid',
   *       name: 'example-name'
   *     }
   *   ],
   *   favicon: 'Base64 string.',
   *   motd: 'Example.',
   *   ms: 10
   * }
   * 
   * */
});
```