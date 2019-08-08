const express = require('express');
const cors = require('cors');
const app = express();
const serverRoutes = require('./routes/server-routes');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

app.use('/', serverRoutes); 

app.listen(8888, function() {
    console.log('Todo List Data Ready'); 
});