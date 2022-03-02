//definir modelo de datos que queremos en nuestra collection
const mongoose= require('mongoose');
const Schema= mongoose.Schema;

//mongoose.set('useFindAndModify', false);

const UserSchema= new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true //attributo
    },
    password:{
        type:String,
        required:true,
        trim:true //quitar espacios en blanco
    },
    admin:{
        type: Boolean,
        required: true
    }
},{
    timestamps:true //guardar en nuestra colleccion fecha de crreacion y actualizacion
}
);

module.exports= UserSchema;