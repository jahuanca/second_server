'use strict'
const express=require('express')
const router=express.Router()
const cultivo=require('../controllers/cultivo')

/**
 * @swagger
 * /Cultivo/:
 *  get:
 *    tags: [Cultivo]
 *    description: Obtiene todos los Cultivos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',cultivo.getCultivos)
router.get('/count',cultivo.getCultivosCount)
router.get('/range&limit=:limit?&offset=:offset',cultivo.getCultivosByLimitAndOffset)
router.get('/id/:id',cultivo.getCultivo)
router.post('/create',cultivo.createCultivo)
router.put('/update',cultivo.updateCultivo)
router.delete('/delete/:id', cultivo.deleteCultivo)

module.exports=router
/** 
* @swagger
*definitions:
*  Cultivo:           
*    type: object
*    required:
*      - cod_Cultivo
*    properties:
*      cod_Cultivo:
*        type: integer
*/  