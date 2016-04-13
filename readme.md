# Dashboard for top active users backend JSON API


This is a basic ResfultAPi built with Node, Express  and PostgreSQL.


## Quick Start

1. Clone the repo
2. Install dependencies: `npm install`
3. Start your Postgres server and create a database called "jobbatical"
4. Create the database tables using data.sql and dum some data on
6. Go to folder " /models/database" change 
7. var conString = "postgres://username:password@localhost/database"; with your credentials
5. Start the server: `$ node start`
8. Go to -> http://localhost:3000/ to found the first solution for Task 1(responsive design).
9. navigatave  to http://localhost:3000/topActiveUsers?page=`number` && http://localhost:3000/users?id=`number` to test res JSOn APi.

## Tests
tests/load-test.sh

This comes with a load test using [Apache Bench](http://httpd.apache.org/docs/2.2/programs/ab.html) that by default exercises the API endpoint for the `/topActiveUsers?page=1` OR `users?id=1` service:

```sh
sh tests/load-test.sh
```

Using this load test it is possible to verify several things:

- that the database is using as many connections as expected (it polls
  PostgreSQL for the number of active connections while it runs)
- the performance of the combined system under different loads



tests/test.js

This comes with unit  test using mocha and should
by default exercises the API endpoint for the `/topActiveUsers?page=1` OR `users?id=1` service:

````mocha
mocha tests/test.js

````
