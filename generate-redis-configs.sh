for port in 7000 7001 7002; do
  mkdir -p $port
  cat > $port/redis.conf <<EOF
port $port
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
appendonly yes
protected-mode no
cluster-announce-ip 127.0.0.1
cluster-announce-port $port
cluster-announce-bus-port 1$port
EOF
done
