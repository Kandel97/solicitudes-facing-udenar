'use strict'
const cors = require('cors');
const authRoutes = require('./auth/auth.routes');
const express = require('express');//
const fileUpload = require('express-fileupload');
const fs = require('fs');
const http = require('http');
const path = require('path');
//const shelljs= require('shelljs');
const properties = require('./config/properties');
const DB = require('./config/db');
//init db

DB();

const app = express();
const router = express.Router();

app.use(cors());
app.use('/api', router);

app.use(express.json());
app.use('/api/solicitudes', require('./routes/solicitud'));
app.use(fileUpload());


const multipart = require('connect-multiparty');
const multiPartMiddleware = multipart({
    uploadDir: './subidas'
});



const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });


app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(bodyParser.json({type:"application/json"}));
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('public'));
authRoutes(router);



app.post('/api/subir', (req, res) => {
    const file = req.files.file;
    const dirPathCodeUser = "./subidas/" + req.body.codigo;
    if (!fs.existsSync(dirPathCodeUser)) {
        fs.mkdirSync(dirPathCodeUser);
    }
    const dirPathCodeUserRol = dirPathCodeUser + "/" + req.body.rol;
    if (!fs.existsSync(dirPathCodeUserRol)) {
        fs.mkdirSync(dirPathCodeUserRol)
    }
    /* fs.readdir(dirPathCodeUserRol, function(err, data) {
        if(data.length  == 0) {
            console.log("dir vacio")
        }else{
            console.log("dir lleno")
        }
    }) */

    file.mv(dirPathCodeUserRol + "/" + file.name, error => {
        if (error) {
            return res.status(500).send({ message: error })
        } else {
            return res.status(200).send({ status: 200, message: "Archivo subido con exito", urlFile: dirPathCodeUserRol + "/" + file.name })
        }
    })
});

app.get('/api/download', (req, res, next) => {

    const urlFile = req.headers.urlfile;
    const urlFileFinal = urlFile.slice(2);

    let file = `${__dirname}/${urlFileFinal}`;
    const fileFinal = file.replace(new RegExp('\\' + path.sep, 'g'), '/');
    res.download(fileFinal); // Set disposition and send it.

    console.log("tttts: ", fileFinal);
});

router.get('/', (req, res) => {
    res.send('Hello from home');
});

app.use(router);

app.listen(properties.PORT, () =>
    console.log(`Server runing on port ${properties.PORT}`));
