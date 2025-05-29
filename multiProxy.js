const httpProxy = require('http-proxy');
const http = require('http');

const PROXIES = [
    {port: 18441, target: 'http://localhost:8441'},
    {port: 18442, target: 'http://localhost:8442'},
    {port: 18443, target: 'http://localhost:8443'},
    {port: 18444, target: 'http://localhost:8444'},
    {port: 18445, target: 'http://localhost:8445'},
    {port: 18555, target: 'http://localhost:8555'},
]

PROXIES.forEach(({port, target}) => {
    const proxy = httpProxy.createProxyServer({})
    const server = http.createServer((req, res) => {
        console.log(`[${port}] Proxying ${req.method} ${req.url} → ${target}`);
        proxy.web(req, res, { target }, (err) => {
             console.error(`[${port}] Proxy error:`, err.message);
            res.writeHead(502);
            res.end(`Proxy error: ${err.message}`);
        })
    });

    server.listen(port, '0.0.0.0', () => {
        console.log(`✅ Listening on http://0.0.0.0:${port} → ${target}`);
    })
})