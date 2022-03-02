//rutas para solicitud

const express= require('express');
const router= express.Router();
const solicitudController= require('../controller/solicitudController');

//api/solicitudes

router.post('/', solicitudController.crearSolicitud);
router.get('/', solicitudController.obtenerSolicitudes);
router.put('/:id', solicitudController.actualizarSolicitud);
router.get('/:id', solicitudController.obtenerSolicitud);
router.delete('/:id', solicitudController.eliminarSolcitud);

module.exports =router;