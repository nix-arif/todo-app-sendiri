let http = require('http')

let ourApp = http.createServer(function(req, res) {
    if (req.url == '/') {
        res.end('Hello Arif')
    }
    if (req.url == '/about') {
        res.end('Thank you')
    }
    
})

ourApp.listen(3000)