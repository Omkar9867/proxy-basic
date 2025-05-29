const httpProxy = require('http-proxy');
const http = require('http');

const LOCAL_PORT = 18000;
const TARGET_URL = 'http://localhost:6969';

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
    // Log the requested URL
    console.log(`Proxying request for: ${req.url}`);
    proxy.web(req, res, {target: TARGET_URL} , (error) => {
        console.error('Proxy error: ', error);
        res.writeHead(500, {'Content-Type' : 'text/plain'});
        res.end('Something went wrong while proxying');
    })
})
server.listen(LOCAL_PORT, '0.0.0.0', () => {
    console.log(`Proxy listening on http://0.0.0.0:${LOCAL_PORT} → ${TARGET_URL}`);
})