'use strict'
const express=require('express')
const router=express.Router()
const trazabilidad=require('../controllers/trazabilidad')

/**
 * @swagger
 * /Trazabilidad/:
 *  get:
 *    tags: [Trazabilidad]
 *    description: Obtiene todos los Trazabilidads.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',trazabilidad.getTrazabilidads)
router.get('/count',trazabilidad.getTrazabilidadsCount)
router.get('/range&limit=:limit?&offset=:offset',trazabilidad.getTrazabilidadsByLimitAndOffset)
router.get('/id/:id',trazabilidad.getTrazabilidad)
router.post('/create',trazabilidad.createTrazabilidad)
router.put('/update',trazabilidad.updateTrazabilidad)
router.delete('/delete/:id', trazabilidad.deleteTrazabilidad)

module.exports=router
/** 
* @swagger
*definitions:
*  Trazabilidad:           
*    type: object
*    required:
*      - cod_Trazabilidad
*    properties:
*      cod_Trazabilidad:
*        type: integer
*/