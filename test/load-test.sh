#!/bin/bash
#
# load-test.sh
#
# Syntax:
#     load-test.sh [url] [db] [duration] [users]
#
# By default this will perform a load test using Apache Bench of the
# API URL, with 350 users for 10 seconds. That's enough to get a feel for
# how responsive the system is. Longer tests can detect things like
# memory and resource leaks. More intensive tests can detect things
# like connection limits and operating system limits.
#
# Examples:
#     ./load-test.sh
#     load-test.sh http://localhost:3000/topActiveUsers?page=1 
#     load-test.sh http://localhost:3000/users?id=1 

#  bash unofficial strict mode http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -eou pipefail
IFS=$'\n\t'

url=${1:-http://localhost:3000/users?id=1}
db=${2:-jobbatical}
duration=${3:-10}
users=${4:-350}

pg_connections() {
    db=${1:-$USER}
    user=${2:-$USER}
    query='SELECT sum(numbackends) FROM pg_stat_database;'
    conn=$(psql -U "$user" -t "$db" -c "$query" -w -q | sed -e '/^$/d;s/ //g')
    echo "$conn"
}

ps_running() {
    pid=${1:-0}
    # shellcheck disable=SC2009
    psout=$(ps "$pid" | grep -v '  PID' | awk '{ print $1}')
    if [[ -n "$psout" ]]; then return 0; else return 1; fi
}

ab -c "$users" -t "$duration" "$url" & WAITPID=$!
loop=1
while ps_running "$WAITPID"; do
    conn=$(pg_connections jobbatical./)
    echo "$((loop++))s:	$conn connections"
    sleep 1
done
