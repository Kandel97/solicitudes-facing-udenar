'use strict'
const cors = require('cors');
const authRoutes= require('./auth/auth.routes');
const express = require('express');//
const fileUpload= require('express-fileupload');
const fs= require('fs');
const path= require('path');
//const shelljs= require('shelljs');
const properties= require('./config/properties');
const DB = require('./config/db');
//init db

DB();

const app= express();
const router= express.Router();

app.use(cors());
app.use('/api', router);

app.use(express.json());
app.use('/api/solicitudes', require('./routes/solicitud'));
app.use(fileUpload());


const multipart= require('connect-multiparty');
const multiPartMiddleware= multipart({
    uploadDir:'./subidas'
});



const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended:true});


app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use (bodyParser.urlencoded({
    extended:true
}))
authRoutes(router);



app.post('/api/subir', (req,res)=>{
    let file= req.files.file;
    const dirpath= "./subidas/" + req.body.codigo ;
    if(!fs.existsSync(dirpath)){
        fs.mkdirSync(dirpath);
        /*  */
    }
    if(!fs.existsSync(dirpath + "/" + req.body.rol)){
        fs.mkdirSync(dirpath + "/" + req.body.rol)
    }
    console.log("PATH",dirpath);
    file.mv(`./subidas/${req.body.codigo}/${req.body.rol}/${file.name}`, error =>{
        if(error) return res.status(500).send({message: error})
        return res.status(200).send({message: "Archivo subido con exito"})
    })    
});

router.get('/', (req , res) =>{
    res.send('Hello from home');
});

app.use(router);

app.listen(properties.PORT, ()=>
console.log (`Server runing on port ${properties.PORT}`));
