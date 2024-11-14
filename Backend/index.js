const express =  require('express');
const bodyParser = require('body-parser');
const {connection} = require('./connection')
const routerAPI = require('./Router/api')
const cors = require('cors')
const app = express();

connection('mongodb://localhost:27017/JobPortal').then(()=>{
    console.log("Connection Sucessfully Database");
    
}).catch((error)=>{
    console.log("Connection Faild to data base");
    
})
// / Frontend to backend Connection
corsOption = {
    origin:'http://localhost:3000',
    optionSuccessfulStatus: 200
}


app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOption));
app.use('/api' , routerAPI);

app.listen(4000 , ()=>{
    console.log("Server is Running On port 4000 ");
});