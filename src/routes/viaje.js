'use strict'
const express=require('express')
const router=express.Router()
const viaje=require('../controllers/viaje')

/**
 * @swagger
 * /Viaje/:
 *  get:
 *    tags: [Viaje]
 *    description: Obtiene todos los Viajes.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',viaje.getViajes)
router.get('/lastViaje',viaje.getLastViaje)
router.get('/count',viaje.getViajesCount)
router.get('/range&limit=:limit?&offset=:offset',viaje.getViajesByLimitAndOffset)
router.get('/id/:id',viaje.getViaje)
router.post('/create',viaje.createViaje)
router.put('/update',viaje.updateViaje)
router.delete('/delete/:id', viaje.deleteViaje)

module.exports=router
/** 
* @swagger
*definitions:
*  Viaje:           
*    type: object
*    required:
*      - cod_Viaje
*    properties:
*      cod_Viaje:
*        type: integer
*/