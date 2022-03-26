const mongoose = require('mongoose');
const SolicitudSchema = mongoose.Schema ({
    nombre: {
        type: String,
        require: true
    },
    codigo: {
        type: Number,
        require: true
    },
    semestre: {
        type: Number,
        require: true
    },
    programa: {
        type: String,
        require: true
    },
    tipo_solicitud: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    fechaCreacion:{
        type: Date,
        default: Date.now
    },
    correo:{
        type:String,
        require: true
    },
    archivoUsuarioUrl:{
        type: String,
        require: false
    },
    archivoSecretariaUrl:{
        type: String,
        require: false
    }, 
    estado:{
        type: Boolean,
        require: false
    },
    estadoSolicitud: {
        type: Number,
        require: true,
        default: 0
    }
    
});

module.exports = mongoose.model('Solicitud', SolicitudSchema);