'use strict'
const express=require('express')
const router=express.Router()
const sincronizar=require('../controllers/sincronizar')
const actualizar=require('../controllers/actualizacion_datos')

/**
 * @swagger
 * /nameMin/:
 *  get:
 *    tags: [nameMin]
 *    description: Obtiene todos los nameMins.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/actualizar', actualizar.llenarAll)
router.get('/sincronizar',sincronizar.sincronizarAll)

module.exports=router
/** 
* @swagger
*definitions:
*  nameMin:           
*    type: object
*    required:
*      - cod_nameMin
*    properties:
*      cod_nameMin:
*        type: integer
*/