let http = require('http')

let ourApp = http.createServer(function(req, res) {
    if (req.url == '/') {
        res.end('Hello arif')
    }
    if (req.url == '/about') {
        res.end('Hai')
    }
    
})


ourApp.listen(3000)