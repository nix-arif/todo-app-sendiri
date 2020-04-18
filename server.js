let express = require('express')
let ourApp = express()

ourApp.use(express.urlencoded({extended: false}))

ourApp.get('/', function(req, res) {
    res.send(`
    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ToDoApp</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>

<body>
    <div class="container">
        <h1 class="display-4 text-center">To-Do-App</h1>
        
        <div class="jumbotron p-3 shadow">
            <form class="d-flex" action="">
                <input class="form-control mr-3">
                <button class="btn btn-primary">Submit</button>
            </form>
        </div>

        <ul class="list-group">
            <li class="list-group-item list-gruop-item-action d-flex align-items-center justify-content-between">
                <span>Item1</span>
                <div>
                    <button class="btn btn-secondary btn-sm mr-1">Edit</button>
                    <button class="btn btn-danger btn-sm">Delete</button>
                </div>
            </li>
        </ul>
    </div>
        

</body>
</html>
    `)
})

ourApp.post('/answer', function(req, res) {
    if (req.body.skyColor.toUpperCase() == 'BLUE') {
        res.send(`
        <p>Congratulation, your answer is correct!!</p>
        <a href="/">Return to homepage</a>
        `)
    } else {
        res.send(`
        <p>Sorry, your are wrong</p>
        <a href="/">Return to homepage</a>
        `)
    }
})

ourApp.listen(3000)