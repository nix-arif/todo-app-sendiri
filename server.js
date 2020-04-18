let http = require('http')

let ourApp = http.createServer(function(req, res) {
    res.end('Hello')
})

ourApp.listen(3000)