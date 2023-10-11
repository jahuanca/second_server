'use strict'
const express=require('express')
const router=express.Router()
const destino=require('../controllers/destino')

/**
 * @swagger
 * /Destino/:
 *  get:
 *    tags: [Destino]
 *    description: Obtiene todos los Destinos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',destino.getDestinos)
router.get('/count',destino.getDestinosCount)
router.get('/range&limit=:limit?&offset=:offset',destino.getDestinosByLimitAndOffset)
router.get('/id/:id',destino.getDestino)
router.post('/create',destino.createDestino)
router.put('/update',destino.updateDestino)
router.delete('/delete/:id', destino.deleteDestino)

module.exports=router
/** 
* @swagger
*definitions:
*  Destino:           
*    type: object
*    required:
*      - cod_Destino
*    properties:
*      cod_Destino:
*        type: integer
*/