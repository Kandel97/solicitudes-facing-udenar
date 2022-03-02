const { json } = require("body-parser");
const express = require("express");
const Solicitud = require("../models/Solicitud");

exports.crearSolicitud= async( req, res) =>{
    try {
        let solicitud;
        //crea solicitud
        solicitud= new Solicitud(req.body);
        await solicitud.save();
        res.send(solicitud);
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }
}

exports.obtenerSolicitudes= async(req, res)=>{
    
    try {
        console.log(req.query.correo)
        const solicitudes = await Solicitud.find({correo: req.query.correo});
        res.json(solicitudes);
      
           
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error' );
    }
    
}

exports.actualizarSolicitud= async(req, res)=>{
    try {
        const {nombre,codigo,semestre,programa,tipo_solicitud,descripcion} = req.body;
        //buscar id que llega como parametro
        let solicitud = await Solicitud.findById(req.params.id);
        if(!solicitud){
            res.status(484).json({msg: 'No existe la solicitud'})
        }

        solicitud.nombre= nombre;
        solicitud.codigo= codigo;
        solicitud.semestre= semestre;
        solicitud.programa= programa;
        solicitud.tipo_solicitud= tipo_solicitud;
        solicitud.descripcion= descripcion;
        

        solicitud = await Solicitud.findByIdAndUpdate({_id: req.params.id},solicitud,{new:true} )
        res.json(solicitud);
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }
}

exports.obtenerSolicitud = async(req, res)=>{
    try {
        
        let solicitud = await Solicitud.findById(req.params.id);
        if(!solicitud){
            res.status(484).json({msg: 'No existe la solicitud'})
        }
        res.json(solicitud);
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }
}

exports.eliminarSolcitud = async(req, res)=>{
    try {
        
        let solicitud = await Solicitud.findById(req.params.id);
        if(!solicitud){
            res.status(484).json({msg: 'No existe la solicitud'})
        }
        await Solicitud.findOneAndRemove({_id: req.params.id})
        res.json({msg:'Solicitud eliminada con exito'});

    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }
}
