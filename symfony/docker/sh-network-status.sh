#!/usr/bin/env bash

if docker network inspect ${COMPOSE_PROJECT_NAME}_network > /dev/null; then
    DATA=$(docker network inspect ${COMPOSE_PROJECT_NAME}_network)

    NETWORK_NAME=$(echo $DATA | python -c 'import json,sys; data = json.load(sys.stdin); print data[0]["Name"];')
    NETWORK_SUBNET=$(echo $DATA | python -c 'import json,sys; data = json.load(sys.stdin); print data[0]["IPAM"]["Config"][0]["Subnet"];')
    NETWORK_GATEWAY=$(echo $DATA | python -c 'import json,sys; data = json.load(sys.stdin); print data[0]["IPAM"]["Config"][0]["Gateway"];')
    ( \
    echo "Network name * Network subnet * Network gateway"; \
    echo "$NETWORK_NAME * $NETWORK_SUBNET * $NETWORK_GATEWAY"; \
    ) | column -t -s "*"
    echo ""
    I=0
    CONTAINERS_NUMBER=$(echo $DATA | python -c 'import json,sys; data = json.load(sys.stdin); print len(data[0]["Containers"].items());')
    ( \
    echo "Container name * Container IPv4 address"; \
    while [ "$I" -lt "$CONTAINERS_NUMBER" ]; do \
        echo $DATA | python -c 'import json,sys; data = json.load(sys.stdin); print str(data[0]["Containers"].items()['$I'][1]["Name"]) + " * " + str(data[0]["Containers"].items()['$I'][1]["IPv4Address"]);'; \
        I=$((I+1)); \
    done ) | column -t -s "*"
else
    echo "${COMPOSE_PROJECT_NAME}_network is not running"
fi

