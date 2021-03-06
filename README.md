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

## Structure
1) simple component
2) server side renderings

## Problems
JSx on server, need to compile using babel (run webpack bundler to do this)
then you can run renderToHtml string
watcher on js files, then rerun the webpack and restart server

## Terminology
server-side rendering == produce html and push it to browser
(could do handlebars, etc)
more terms: universal javascript and isomorphic javascript

same coding style on server and client side. Because we are using webpack, we can use es2015 modules on code. So we move from common js to es2015 imports.

## Javascript
we need to ship down js related to app after we send down js
2 bundles using js
second bundle is react app
  server code we never ship to browser (security)

## Client JS
our approach is two fold.
Server index.js file which depends on home component
and Browser has Home.js and client.js
- server can pull in high order components
- but don't important server code (for sensitive business logic)
- basically a bootup location
- so code that adds for specifically server and configuration only executed on client.

so we render first, then we reload the app a second time.
Initial render on server, then client side breathes life on browser. -- react will crawl over it and add life cycle


## React Router
Express Route Handler
- delegates routing to react-router
- GET /users => * => /users (react-router)

### Quick overview of react router
request to express server -> shows index.html
BrowserRouter Component looks at url in address bar renders some route. This wont work on server

2 routers in app
static router for server
browserRouter for client

## Redux autentication
4 challenges
1. Redux needs different configuration on browser vs server
  - precedent of 2 diff server/client configuration
2. aspects of authentication needs to be handled on server
  - server from action creator, we need to know instance action is finished
3. need some way to detect when all initial data load action creators are completed on server
  - biggest challenge. Redux / React to fix this
4. need state rehydration on browser

## 2 solutions app sent back to browser before data loading
1. Render app twice. First with all action creators in componentWillMount
then we could monitor each request and get notification finished
and render it a second time
PROS / CONS. Pros not alot of new code written.
  - rendering app on server is computational intensive
  - twice means it isn't faster. And only works with one round of data loading

### Next js does this to
  - attach  little component
  - call function to data loading process
  - each one says hey here is a resource i need
  - call dataLoad method, detect all request are complete

### Pros and Cons
  only render app once
  makes data requirements clear

### Cons
  requires a ton of extra code. Clutch right now


## Rehydration
Redux fetches data, new store with bunch of state in it
so state is sent to client whatsoever
  client side store is made from complete scratch
  it is empty until we complete the fetch action
  We want to preserve state we have prefetched

## Proxy and authorization
  Step 1, write proxy
  Any action creators need to be send to api
    and same action creators on browser are sent to server and then api server
  
## Render to Node Strem
  it's like render to stream, but it returns a readable stream
  tiny packages of data, then send to users browser
  TTFB is really fast with node stream, and content downloaded is very slow
    GOTCHA
      you call renderer and you also pass in response object
      and immediately start sending back

    we can change status page
      redirects won't show 404 stauts code
  


