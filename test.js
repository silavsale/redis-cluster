const Redis = require("ioredis");

const cluster = new Redis.Cluster([
  { host: "127.0.0.1", port: 7000 },
  { host: "127.0.0.1", port: 7001 },
  { host: "127.0.0.1", port: 7002 },
]);

(async () => {
  await cluster.set("greeting", "hello redis cluster!");
  const value = await cluster.get("greeting");
  console.log("Cluster Value:", value);
  cluster.disconnect();
})();
