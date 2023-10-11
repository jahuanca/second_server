'use strict'
const express=require('express')
const router=express.Router()
const etapa=require('../controllers/etapa')

/**
 * @swagger
 * /Etapa/:
 *  get:
 *    tags: [Etapa]
 *    description: Obtiene todos los Etapas.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',etapa.getEtapas)
router.get('/count',etapa.getEtapasCount)
router.get('/range&limit=:limit?&offset=:offset',etapa.getEtapasByLimitAndOffset)
router.get('/id/:id',etapa.getEtapa)
router.post('/create',etapa.createEtapa)
router.put('/update',etapa.updateEtapa)
router.delete('/delete/:id', etapa.deleteEtapa)

module.exports=router
/** 
* @swagger
*definitions:
*  Etapa:           
*    type: object
*    required:
*      - cod_Etapa
*    properties:
*      cod_Etapa:
*        type: integer
*/