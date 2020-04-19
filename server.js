let express = require('express')
let mongodb = require('mongodb')
let db
let app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))

let connectionString = 'mongodb+srv://todoAppUser:arif@cluster0-dwjsc.mongodb.net/TodoApp?retryWrites=true&w=majority'
mongodb.connect(connectionString, {useUnifiedTopology: true}, function(err, client) {
    db = client.db()
    app.listen(3000)
})

app.get('/', function(req, res) {
    db.collection('items').find().toArray(function(err, items) {
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
    <h1 class="display-4 text-center py-1">To-Do App</h1>

    <div class="jumbotron p-3 shadow">
        <form action="/create-item" class="d-flex" method="POST">
            <input name="item" type="text" class="form-control mr-3">
            <button class="btn btn-primary">Submit</button>
        </form>
    </div>

    <ul class="list-group">
    ${items.map(function(item) {
        return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="text-item">${item.text}</span>
        <div>
            <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
            <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
    </li>`
    }).join('')}
        
    </ul>
</div>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="/browser.js"></script>
</body>
</html>
        `)
    })
})

app.post('/create-item', function(req, res) {
    db.collection('items').insertOne({text: req.body.item}, function() {
        res.redirect('/')
    })
})

app.post('/update-item', function(req, res) {
    db.collection('items').findOneAndUpdate({_id: new mongodb.ObjectId(req.body.id)}, {$set: {text: req.body.text}}, function() {
        res.send("Success")
    })
})

app.post('/delete-item', function(req, res) {
    db.collection('items').deleteOne({_id: new mongodb.ObjectId(req.body.id)}, function() {
        res.send("Success")
    })
})