const Redis = require("ioredis");

const cluster = new Redis.Cluster([
  { host: "redis1", port: 7000 },
  { host: "redis2", port: 7001 },
  { host: "redis3", port: 7002 },
]);

(async () => {
  try {
    await cluster.set("greeting", "hello from docker client!");
    const value = await cluster.get("greeting");
    console.log("Cluster Value:", value);
  } catch (err) {
    console.error("Redis error:", err);
  } finally {
    cluster.disconnect();
  }
})();
