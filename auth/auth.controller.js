const User = require('./auth.dao');
const jwt= require('jsonwebtoken');// para encriptar la contraseña
const bcrypt =require('bcryptjs');
const SECRET_KEY='secretkey123456';

exports.createUser=(req, res, next)=>{
    const newUser={
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        admin: false
    }

    User.create(newUser, (err, user)=>{
        
        if(err && err.code == 11000) return res.status(409).send('El email ya existe');
        if (err) return res.status(500).send('Server error');
        const expiresIn= 24*60*60;
        const accessToken= jwt.sign({id: user.id},
        SECRET_KEY ,{
            expiresIn: expiresIn
        });
        const dataUser ={
            name: user.name,
            email: user.email,
            admin: false,
            accessToken: accessToken,
            expiresIn:expiresIn
        }
        console.log(dataUser);
        //response
        res.send({dataUser});
    });
}

exports.loginUser=(req,res,next)=>{
    const userData={
        email: req.body.email,
        password: req.body.password
    }
    User.findOne({email:userData.email}, (err,user)=>
    {
        if (err) return res.status(500).send('Server error!'); 
        if(!user){
            //email no existe

            res.status(401).send({message: 'Something is wrong', status: 401});
        }else{
            const resultPassword= bcrypt.compareSync(userData.password, user.password);
            if (resultPassword){
                const expiresIn= 24*60*60;
                const accessToken= jwt.sign({ id: user.id}, SECRET_KEY,{expiresIn:expiresIn});
               
                const dataUser ={
                    name: user.name,
                    email: user.email,
                    admin: user.admin,
                    accessToken: accessToken,
                    expiresIn:expiresIn,
                    status: 200
                }
                res.send({dataUser});
            }else{
                //contraseña incorrect
                res.status(401).send({mesagge: 'Something is wrong', status:401});
            }
        }
    })
}
