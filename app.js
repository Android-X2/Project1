const express = require('express');
const app = express();
const dotenv = require('dotenv');
const passport = require('passport');
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override');
const logger = require('morgan')
const connectDB = require('./config/db')
const morgan = require('morgan')
const validUrl = require('valid-url')


const mainRoutes = require('./routes/main')
const authRoutes = require('./routes/auth')

require('dotenv').config({path: './config/config.env'})
require('./config/passport')(passport)

connectDB()

if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(methodOverride("_method"));

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ //Creates a new store sessions in mongodDB
            mongoUrl: process.env.MONGO_URI,
        })
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/',mainRoutes);
app.use('/auth',authRoutes)
app.use('/main', mainRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running ${process.env.NODE_ENV} mode on ${process.env.PORT}`)
})


//create a edit page to delete/add the seperate links
    //the edit page will be just the add page but also show the current links in the group
//How to show the specific page for each person?
    //Maybe have the group id linked?
        //When linked make anyone see the page 
//make a white