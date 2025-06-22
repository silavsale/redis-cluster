# Cluster of Redis instance running in Docker.

### Key Differences Redis Cluster vs Regular Redis


| Feature               | Redis (Standalone)  | Redis Cluster                        |
| --------------------- | ------------------- | ------------------------------------ |
| Data Distribution     | No (single node)    | Yes (sharded)                        |
| High Availability     | Manual              | Automatic w/ replicas                |
| Failover              | No                  | Yes (leader election)                |
| Scaling               | Vertical (RAM)      | Horizontal (more nodes)              |
| Client library needed | Basic `redis` works | Needs cluster support like `ioredis` |

### Create script to generate redis.config file  `generate-redis-configs.sh`

This script sets up the configuration files needed to run a Redis Cluster on a single machine. It works by looping through three port numbers: 7000, 7001, and 7002.

For each port, the script creates a folder with that port number as the name (like "7000"), and inside that folder it creates a file called "redis.conf". This file contains the settings needed to run Redis in cluster mode.

Each "redis.conf" file tells Redis which port to use, that it should run in cluster mode, and that it should use a file called "nodes.conf" to store cluster information. It also sets a timeout of 5000 milliseconds to detect if a node is unavailable. The "appendonly yes" setting means Redis will save every change it makes to disk. The "protected-mode no" setting allows connections from outside the container, which is useful when testing locally.

The script also sets Redis to announce its IP address as 127.0.0.1 (localhost) and tells other Redis nodes which ports to use for normal communication and for internal cluster communication.

When the script is done running, you’ll have three folders (7000, 7001, and 7002), each with a Redis config file inside. These config files are used later when running the Redis containers so that each one knows how to participate in the cluster.

- Make the script executable:

```sh
chmod +x generate-redis-configs.sh
```

- Run script:

```sh
./generate-redis-configs.sh
```

# Run Redis

```sh
docker compose up -d
```

#   Initialize the Cluster

```sh
docker run -it --rm --net=host redis:8.0.2 \
  redis-cli --cluster create \
  127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 \
  --cluster-replicas 0
```

# Test cluster with node.js 

```sh
node test.js
```