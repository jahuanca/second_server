'use strict'
const express=require('express')
const router=express.Router()
const etiqueta=require('../controllers/etiqueta')

/**
 * @swagger
 * /Etiqueta/:
 *  get:
 *    tags: [Etiqueta]
 *    description: Obtiene todos los Etiquetas.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',etiqueta.getEtiquetas)
router.get('/count',etiqueta.getEtiquetasCount)
router.get('/range&limit=:limit?&offset=:offset',etiqueta.getEtiquetasByLimitAndOffset)
router.get('/id/:id',etiqueta.getEtiqueta)
router.post('/create',etiqueta.createEtiqueta)
router.put('/update',etiqueta.updateEtiqueta)
router.delete('/delete/:id', etiqueta.deleteEtiqueta)

module.exports=router
/** 
* @swagger
*definitions:
*  Etiqueta:           
*    type: object
*    required:
*      - cod_Etiqueta
*    properties:
*      cod_Etiqueta:
*        type: integer
*/