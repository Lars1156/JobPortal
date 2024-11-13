const express =  require('express');
const bodyParser = require('body-parser');
const {connection} = require('./connection')

const app = express();

connection('mongodb://localhost:27017/JobPortal').then(()=>{
    console.log("Connection Sucessfully Database");
    
}).catch((error)=>{
    console.log("Connection Faild to data base");
    
})

app.listen(4000 , ()=>{
    console.log("Server is Running On port 4000 ");
});