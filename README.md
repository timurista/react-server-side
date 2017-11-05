# React Server Side Rendering

the entire goal is to reduce load time from request to build of the webpage

user gets as much content as possible on the screen first

just like traditional react app
we get bundle, gets data back. Doesn't mean we are not using react
we just defer loading of react to farther along down the line.

## Approach
mock up is simple app
api server -> rendering server -> users browser

2 different backend servers
server-side rendering

1) business logic and data layer

2) view layer
takes data and produces html
separate into 2 diff servers
  2 tiers, easier time to scale in future


Application A
  Business logic on api <- maybe aws, etc we can use multiple servers
  react app -> we can do rendering server

Application B
  business logic on api
  complex react app, we can provision other servers to do this

running react on server is very slow
  performance of rendering server




