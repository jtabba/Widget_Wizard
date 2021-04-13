const express = require('express')
const session = require('express-session')
const usersController = require('./controllers/usersController.js')

const app = express()

const port = process.env.PORT || 8080;
// const port = 8080;

app.use(session({secret: 'keyboard cat', cookie: { maxAge: null }}))

// app.use(express.bodyParser());

app.set('view engine', 'ejs');
app.set('views','./views');

app.use(express.static('client'))

app.use(express.json())

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


app.get('/api/sessions', usersController.loggedInUser)
app.post('/api/sessions', usersController.newSession)
app.delete('/api/sessions', usersController.endSession)


app.post('/api/users', usersController.createUser)
app.patch('/users/:id')
app.delete('/users/:id')

app.get('/api/users/widgets', usersController.getUsersWidgets)
app.post('/api/users/widgets', usersController.createUsersWidgets)

